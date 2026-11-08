import {
  ObjectTrait,
  settingsStore,
  WordPhysicsSpec,
} from "../config/settings";
import { cacheService } from "./CacheService";
import { WordPhysicsPredictor } from "./WordPhysicsPredictor";

export interface GeneratedWordResult {
  spec: WordPhysicsSpec;
  imageSource: HTMLImageElement | HTMLCanvasElement;
  sourceType: "lan-ai" | "preset" | "procedural" | "cache";
}

export interface ServerConnectionStatus {
  ollamaOk: boolean;
  ollamaMessage: string;
  sdOk: boolean;
  sdMessage: string;
  detectedModel?: string;
}

const VALID_TRAITS: ObjectTrait[] = [
  "normal",
  "heavy",
  "bouncy",
  "float",
  "slippery",
  "sticky",
];

export class AIService {
  // Circuit-breaker cache so when SD WebUI is closed, Auto mode falls back in 0ms
  // without waiting for Ollama or repeated SD timeouts on every summon.
  private static sdHealthCache: {
    url: string;
    ok: boolean;
    timestamp: number;
  } | null = null;

  static resetHealthCache(): void {
    this.sdHealthCache = null;
  }

  private static async isSdServerReachable(
    sdBaseUrl: string,
    forceCheck = false
  ): Promise<boolean> {
    const cleanSd = sdBaseUrl.replace(/\/+$/, "");
    if (!cleanSd) return false;

    const now = Date.now();
    if (
      !forceCheck &&
      this.sdHealthCache &&
      this.sdHealthCache.url === cleanSd &&
      now - this.sdHealthCache.timestamp < 25000
    ) {
      return this.sdHealthCache.ok;
    }

    try {
      const res = await fetch(`${cleanSd}/sdapi/v1/options`, {
        method: "GET",
        signal: AbortSignal.timeout(700),
      });
      const ok = res.ok;
      this.sdHealthCache = { url: cleanSd, ok, timestamp: Date.now() };
      return ok;
    } catch {
      this.sdHealthCache = { url: cleanSd, ok: false, timestamp: Date.now() };
      return false;
    }
  }

  /**
   * Main entry point: resolves physics spec + image for a given word.
   * Supports LAN AI (Windows PC Ollama + Stable Diffusion + U2Net) and zero-latency Offline fallback.
   */
  static async generateForWord(
    rawWord: string,
    onStatus?: (stage: string) => void
  ): Promise<GeneratedWordResult> {
    const word = rawWord.trim();
    const settings = settingsStore.get();

    // 1. If explicitly in Offline mode, return preset or procedural sticker immediately (0ms!)
    if (settings.aiMode === "offline") {
      const localMatch = WordPhysicsPredictor.predictLocal(word);
      return this.resolveLocalFallback(localMatch, onStatus);
    }

    // 2. Check cache if enabled (only cache LAN AI results so offline tweaks stay live)
    const localMatch = WordPhysicsPredictor.predictLocal(word);
    const lookupWord = localMatch.canonicalWord || word;

    if (settings.useCache) {
      const cached = await cacheService.get(lookupWord);
      if (cached && cached.source === "lan-ai") {
        onStatus?.("캐시에서 불러오는 중...");
        const img = await this.loadImageFromUrl(cached.dataUrl);
        // Preserve explicit size modifiers ('큰', '작은') if used; otherwise apply light scale jitter
        const jitter = 0.92 + Math.random() * 0.16;
        return {
          spec: localMatch.sizeTag
            ? {
                ...cached.spec,
                scale: localMatch.spec.scale,
                density: localMatch.spec.density,
                badgeText: localMatch.spec.badgeText,
              }
            : {
                ...cached.spec,
                scale: Math.max(
                  0.32,
                  Math.min(2.65, cached.spec.scale * jitter)
                ),
              },
          imageSource: img,
          sourceType: "cache",
        };
      }
    }

    // 3. Before calling Ollama, verify that Stable Diffusion is actually running!
    // (On Windows, Ollama often stays alive as a background tray service even when SD WebUI is closed.
    // Calling Ollama when SD is off wastes 1~10s generating an unused SD prompt!)
    const sdReachable = settings.sdUrl
      ? await this.isSdServerReachable(settings.sdUrl)
      : false;

    if (!sdReachable) {
      if (settings.aiMode === "lan") {
        throw new Error(
          "Windows PC Stable Diffusion 서버에 연결할 수 없습니다. 설정(⚙️)에서 IP나 모드를 확인해주세요."
        );
      }
      return this.resolveLocalFallback(localMatch, onStatus);
    }

    // 4. Try LAN AI (Ollama for unknown word physics/translation + Stable Diffusion for image)
    let resolvedSpec = localMatch.spec;

    // Skip Ollama when the word has both curated dictionary physics AND a direct 1-to-1 English prompt (0ms!).
    // Otherwise call Ollama (with num_ctx=512 so it runs in ~0.7s without VRAM swapping).
    const needsOllama =
      !localMatch.matchedDictionary || !localMatch.hasSpecificPrompt;

    if (settings.ollamaUrl && needsOllama) {
      try {
        onStatus?.("Ollama 물성 추론 중...");
        const ollamaSpec = await this.queryOllamaPhysics(
          lookupWord,
          settings.ollamaUrl,
          settings.ollamaModel,
          Math.max(settings.requestTimeoutMs, 15000)
        );
        if (ollamaSpec) {
          if (localMatch.matchedDictionary) {
            // Keep battle-tested stage physics from RULES, only use Ollama's exact English prompt!
            resolvedSpec = {
              ...localMatch.spec,
              englishPrompt: ollamaSpec.englishPrompt,
            };
          } else {
            const jitter = 0.92 + Math.random() * 0.16;
            const computedScale =
              localMatch.sizeTag === "tiny"
                ? Math.max(0.34, Math.min(0.44, ollamaSpec.scale * 0.44))
                : localMatch.sizeTag === "giant"
                ? Math.max(1.9, Math.min(2.6, ollamaSpec.scale * 1.65))
                : Math.max(0.36, Math.min(2.3, ollamaSpec.scale * jitter));
            const computedDensity =
              localMatch.sizeTag === "giant"
                ? ollamaSpec.density * 1.5
                : localMatch.sizeTag === "tiny"
                ? Math.max(0.002, ollamaSpec.density * 0.8)
                : ollamaSpec.density;
            const computedBadge =
              localMatch.sizeTag === "tiny"
                ? `⬇️ 소형 · ${ollamaSpec.badgeText}`
                : localMatch.sizeTag === "giant"
                ? `⬆️ 대형 · ${ollamaSpec.badgeText}`
                : ollamaSpec.badgeText;
            resolvedSpec = {
              ...ollamaSpec,
              scale: computedScale,
              density: computedDensity,
              badgeText: computedBadge,
            };
          }
        }
      } catch (err) {
        console.warn("Ollama 추론 폴백 (내장 물성 엔진 사용):", err);
      }
    }

    if (settings.sdUrl) {
      try {
        onStatus?.("Stable Diffusion 이미지 생성 중...");
        const base64Png = await this.queryStableDiffusion(
          resolvedSpec.englishPrompt,
          settings.sdUrl,
          settings.u2netUrl,
          settings.aiMode === "auto" ? 15000 : settings.requestTimeoutMs
        );

        const dataUrl = base64Png.startsWith("data:")
          ? base64Png
          : `data:image/png;base64,${base64Png}`;
        const img = await this.loadImageFromUrl(dataUrl);

        if (settings.useCache) {
          await cacheService.set(lookupWord, {
            spec: resolvedSpec,
            dataUrl,
            source: "lan-ai",
          });
        }

        return {
          spec: resolvedSpec,
          imageSource: img,
          sourceType: "lan-ai",
        };
      } catch (err) {
        this.sdHealthCache = {
          url: settings.sdUrl.replace(/\/+$/, ""),
          ok: false,
          timestamp: Date.now(),
        };
        console.warn("Stable Diffusion 연결 폴백 (내장/프리셋 생성기 사용):", err);
        if (settings.aiMode === "lan") {
          throw new Error(
            "Windows PC Stable Diffusion 서버에 연결할 수 없습니다. 설정(⚙️)에서 IP나 모드를 확인해주세요."
          );
        }
      }
    }

    // 5. Auto mode fallback: use Ollama's spec (if succeeded) + local preset or procedural sticker
    return this.resolveLocalFallback(
      {
        ...localMatch,
        spec: resolvedSpec,
      },
      onStatus
    );
  }

  private static async resolveLocalFallback(
    match: ReturnType<typeof WordPhysicsPredictor.predictLocal>,
    onStatus?: (stage: string) => void
  ): Promise<GeneratedWordResult> {
    onStatus?.("실루엣 생성 중...");
    const canvas = WordPhysicsPredictor.renderProceduralSticker(
      match.shapeType,
      match.spec.word,
      match.spec.colorAccent
    );

    return {
      spec: match.spec,
      imageSource: canvas,
      sourceType: "procedural",
    };
  }

  /**
   * Calls Ollama API on Windows PC to translate the word into an SD prompt
   * and infer 2D physics parameters.
   */
  private static async queryOllamaPhysics(
    word: string,
    ollamaBaseUrl: string,
    model: string,
    timeoutMs: number
  ): Promise<WordPhysicsSpec | null> {
    const cleanUrl = ollamaBaseUrl.replace(/\/+$/, "");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const systemPrompt = `2D physics game assistant. Given a word, output ONLY JSON:
{"englishPrompt":"a single <object in English>","scale":1.1,"density":0.006,"friction":0.6,"restitution":0.2,"gravityScale":1.0,"trait":"normal|heavy|bouncy|float|slippery|sticky","badgeText":"short Korean trait with emoji"}`;

    try {
      const res = await fetch(`${cleanUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          system: systemPrompt,
          prompt: `Word: "${word}"`,
          format: "json",
          stream: false,
          think: false,
          options: {
            temperature: 0.1,
            num_ctx: 512,
            num_predict: 90,
          },
        }),
      });

      if (!res.ok) return null;
      const data = await res.json();
      const parsed = JSON.parse(data.response || "{}");

      const rawTrait = String(parsed.trait || "").toLowerCase();
      const traitAliasMap: Record<string, ObjectTrait> = {
        solid: "heavy",
        weight: "heavy",
        dense: "heavy",
        metal: "heavy",
        stone: "heavy",
        elastic: "bouncy",
        spring: "bouncy",
        rubber: "bouncy",
        flying: "float",
        air: "float",
        light: "float",
        hover: "float",
        ice: "slippery",
        smooth: "slippery",
        glue: "sticky",
        adhesive: "sticky",
      };
      const trait: ObjectTrait = VALID_TRAITS.includes(rawTrait as ObjectTrait)
        ? (rawTrait as ObjectTrait)
        : traitAliasMap[rawTrait] || "normal";

      const colorMap: Record<ObjectTrait, string> = {
        normal: "#a855f7",
        heavy: "#ef4444",
        bouncy: "#22c55e",
        float: "#38bdf8",
        slippery: "#60a5fa",
        sticky: "#ec4899",
      };

      const rawDensity = Number(parsed.density);
      // If LLM returns real-world density in g/cm³ (e.g. 2.5 for rock), map it into Matter.js range (0.0008..0.045)
      const normalizedDensity = Number.isFinite(rawDensity)
        ? rawDensity > 0.1
          ? Math.min(0.042, Math.max(0.002, rawDensity * 0.012))
          : Math.min(0.045, Math.max(0.0008, rawDensity))
        : trait === "heavy"
          ? 0.028
          : 0.006;

      const clamp = (val: unknown, min: number, max: number, fallback: number) => {
        const n = Number(val);
        return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
      };

      return {
        word,
        englishPrompt:
          typeof parsed.englishPrompt === "string" && parsed.englishPrompt
            ? parsed.englishPrompt
            : `a single ${word}, 2d game sprite prop, flat vector illustration, solid pure white background`,
        scale: clamp(parsed.scale, 0.5, 2.2, 1.15),
        density: normalizedDensity,
        friction: clamp(parsed.friction, 0.001, 0.95, 0.6),
        restitution: clamp(parsed.restitution, 0.0, 1.28, trait === "bouncy" ? 1.18 : 0.2),
        gravityScale: clamp(
          parsed.gravityScale,
          -0.05,
          1.3,
          trait === "float" ? 0.0 : 1.0
        ),
        trait,
        badgeText:
          typeof parsed.badgeText === "string" && parsed.badgeText
            ? parsed.badgeText
            : `✨ ${word}`,
        colorAccent: colorMap[trait],
      };
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Calls Automatic1111 / Forge Stable Diffusion WebUI API (/sdapi/v1/txt2img)
   * and optional U2Net / Rembg endpoint.
   */
  private static async queryStableDiffusion(
    prompt: string,
    sdBaseUrl: string,
    u2netUrl: string,
    timeoutMs: number
  ): Promise<string> {
    const cleanSd = sdBaseUrl.replace(/\/+$/, "");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    // Strip "icon", "sticker", "die-cut", or legacy style suffixes so SDXL doesn't draw an app-icon square frame or cut-line
    const sanitizedPrompt = prompt
      .replace(
        /,\s*(2d\s*game\s*(sticker|icon|sprite)\s*(asset|prop)?|die-cut\s*game\s*sticker|flat\s*vector(\s*illustration)?|bold\s*(black\s*)?outline|solid\s*(pure\s*)?white\s*background|simple\s*circle\s*icon).*$/i,
        ""
      )
      .replace(/\b(die-cut|sticker|icon|frame|border)\b/gi, "")
      .replace(/\s+/g, " ")
      .replace(/,\s*$/, "")
      .trim();

    try {
      const res = await fetch(`${cleanSd}/sdapi/v1/txt2img`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          prompt: `(${sanitizedPrompt}:1.35), (one single isolated object only:1.4), solo object, 2d game sprite prop, flat vector illustration, clean contour silhouette, full object centered with margin, (unframed on solid pure white background:1.5), plain white background, no border, no frame, no shadow`,
          negative_prompt:
            "(multiple objects, multiple items, pattern, seamless pattern, wallpaper, collage, assortment, collection, set, sprite sheet, grid, scattered, many, group, multiple slices:1.5), (app icon, game icon, icon frame, square frame, rounded square, box border, black border, card, badge, emblem, UI slot, frame, border, outline frame:1.5), sticker border, die-cut border, white rim, outline around white background, (shadow, drop shadow, cast shadow, floor shadow, ground shadow, oval shadow:1.4), pedestal, ground, gray background, gradient background, studio lighting, 3d render, photo, cropped, touching edge, scenery, text, watermark",
          steps: 5,
          width: 448,
          height: 448,
          cfg_scale: 2.0,
          sampler_name: "DPM++ SDE",
          scheduler: "Karras",
        }),
      });

      if (!res.ok) {
        throw new Error(`SD HTTP ${res.status}`);
      }

      const data = await res.json();
      const rawBase64: string | undefined = data?.images?.[0];
      if (!rawBase64) {
        throw new Error("SD 응답에 이미지가 없습니다.");
      }

      // If optional U2Net / Rembg endpoint is configured, strip background there;
      // otherwise PolygonPhysicsBuilder's built-in flood-fill remover handles it!
      if (u2netUrl && u2netUrl.trim() !== "") {
        try {
          const cleanU2 = u2netUrl.replace(/\/+$/, "");
          const remRes = await fetch(cleanU2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              input_image: rawBase64,
              image: rawBase64,
              model: "u2net",
            }),
          });
          if (remRes.ok) {
            const remData = await remRes.json();
            if (remData.image) return remData.image;
          }
        } catch (remErr) {
          console.warn(
            "외부 U2Net 호출 생략 (내장 크로마키 배경 제거 사용):",
            remErr
          );
        }
      }

      return rawBase64;
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Tests connectivity to Windows PC Ollama and Stable Diffusion servers.
   */
  static async testConnection(
    ollamaUrl: string,
    sdUrl: string
  ): Promise<ServerConnectionStatus> {
    let ollamaOk = false;
    let ollamaMessage = "미연결";
    let sdOk = false;
    let sdMessage = "미연결";
    let detectedModel: string | undefined;

    try {
      const cleanOllama = ollamaUrl.replace(/\/+$/, "");
      const res = await fetch(`${cleanOllama}/api/tags`, {
        method: "GET",
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        const allModels: string[] = (data.models || []).map((m: any) => m.name);
        const models = allModels.slice(0, 3);
        const preferred =
          allModels.find((m) => m.includes("gemma4")) ||
          allModels.find((m) => m.includes("gemma")) ||
          allModels[0];
        if (preferred) {
          detectedModel = preferred;
        }
        ollamaOk = true;
        ollamaMessage =
          models.length > 0
            ? `연결됨 (${models.join(", ")})`
            : "연결됨 (설치된 모델 확인 필요)";
      } else {
        ollamaMessage = `HTTP ${res.status}`;
      }
    } catch {
      ollamaMessage = "연결 실패 (IP/포트 및 OLLAMA_ORIGINS=* 확인)";
    }

    const cleanSd = sdUrl.replace(/\/+$/, "");
    try {
      const res = await fetch(`${cleanSd}/sdapi/v1/options`, {
        method: "GET",
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        sdOk = true;
        sdMessage = "연결됨 (SD API 활성)";
      } else {
        sdMessage = `HTTP ${res.status}`;
      }
    } catch {
      sdMessage = "연결 실패 (--api --cors-allow-origins=* 옵션 확인)";
    }

    if (cleanSd) {
      this.sdHealthCache = {
        url: cleanSd,
        ok: sdOk,
        timestamp: Date.now(),
      };
    }

    return { ollamaOk, ollamaMessage, sdOk, sdMessage, detectedModel };
  }

  private static loadImageFromUrl(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = url;
    });
  }
}

