export type AIMode = "auto" | "lan" | "offline";

export type ObjectTrait =
  | "normal"
  | "heavy"
  | "bouncy"
  | "float"
  | "slippery"
  | "sticky";

export interface WordPhysicsSpec {
  word: string;
  englishPrompt: string;
  scale: number; // 0.4 ~ 2.5
  density: number; // 0.0005 ~ 0.05
  friction: number; // 0.001 ~ 1.0
  restitution: number; // 0.0 ~ 1.3
  gravityScale: number; // -0.15 ~ 1.5
  trait: ObjectTrait;
  badgeText: string;
  colorAccent: string;
}

export interface GameSettings {
  aiMode: AIMode;
  ollamaUrl: string;
  ollamaModel: string;
  sdUrl: string;
  u2netUrl: string;
  useCache: boolean;
  debugPhysics: boolean;
  requestTimeoutMs: number;
}

const STORAGE_KEY = "somethings_drop_settings_v3";
const STARS_STORAGE_KEY = "somethings_drop_stage_stars_v1";

const VALID_AI_MODES: readonly AIMode[] = ["auto", "lan", "offline"];

/**
 * Validates that a server URL uses strictly http:// or https:// protocol,
 * strips embedded credentials and trailing slashes, and falls back safely.
 */
export function sanitizeHttpUrl(
  rawUrl: unknown,
  fallback: string,
  allowEmpty = false
): string {
  if (typeof rawUrl !== "string") return fallback;
  const trimmed = rawUrl.trim();
  if (!trimmed) return allowEmpty ? "" : fallback;
  if (trimmed.length > 300) return fallback;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return fallback;
    }
    parsed.username = "";
    parsed.password = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/+$/, "");
  } catch {
    return fallback;
  }
}

function sanitizeModelName(rawModel: unknown, fallback: string): string {
  if (typeof rawModel !== "string") return fallback;
  const cleaned = rawModel.replace(/[\u0000-\u001F\u007F<>'"`]/g, "").trim();
  if (!cleaned || cleaned.length > 80) return fallback;
  return cleaned;
}

const metaEnv = (import.meta as any).env || {};

const DEFAULT_SETTINGS: GameSettings = {
  aiMode: "auto",
  ollamaUrl: sanitizeHttpUrl(
    metaEnv.VITE_OLLAMA_URL,
    "http://127.0.0.1:11434"
  ),
  ollamaModel: sanitizeModelName(metaEnv.VITE_OLLAMA_MODEL, "gemma4:e4b"),
  sdUrl: sanitizeHttpUrl(metaEnv.VITE_SD_URL, "http://127.0.0.1:7860"),
  u2netUrl: "",
  useCache: true,
  debugPhysics: false,
  requestTimeoutMs: 25000,
};

function sanitizeSettingsObject(raw: unknown): GameSettings {
  if (!raw || typeof raw !== "object") {
    return { ...DEFAULT_SETTINGS };
  }
  const obj = raw as Record<string, unknown>;
  const aiMode: AIMode = VALID_AI_MODES.includes(obj.aiMode as AIMode)
    ? (obj.aiMode as AIMode)
    : DEFAULT_SETTINGS.aiMode;

  const timeoutNum = Number(obj.requestTimeoutMs);
  const requestTimeoutMs = Number.isFinite(timeoutNum)
    ? Math.max(2000, Math.min(60000, Math.round(timeoutNum)))
    : DEFAULT_SETTINGS.requestTimeoutMs;

  return {
    aiMode,
    ollamaUrl: sanitizeHttpUrl(obj.ollamaUrl, DEFAULT_SETTINGS.ollamaUrl),
    ollamaModel: sanitizeModelName(
      obj.ollamaModel,
      DEFAULT_SETTINGS.ollamaModel
    ),
    sdUrl: sanitizeHttpUrl(obj.sdUrl, DEFAULT_SETTINGS.sdUrl),
    u2netUrl: sanitizeHttpUrl(obj.u2netUrl, "", true),
    useCache:
      typeof obj.useCache === "boolean"
        ? obj.useCache
        : DEFAULT_SETTINGS.useCache,
    debugPhysics:
      typeof obj.debugPhysics === "boolean"
        ? obj.debugPhysics
        : DEFAULT_SETTINGS.debugPhysics,
    requestTimeoutMs,
  };
}

class SettingsManager {
  private current: GameSettings;
  private stageStars: Record<number, number>;
  private listeners: Array<(s: GameSettings) => void> = [];

  constructor() {
    this.current = this.load();
    this.stageStars = this.loadStars();
  }

  private loadStars(): Record<number, number> {
    const safeStars: Record<number, number> = {};
    try {
      const raw = localStorage.getItem(STARS_STORAGE_KEY);
      if (!raw) return safeStars;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return safeStars;
      for (const [k, v] of Object.entries(parsed)) {
        const id = Number(k);
        const stars = Number(v);
        if (
          Number.isInteger(id) &&
          id >= 1 &&
          id <= 200 &&
          Number.isInteger(stars) &&
          stars >= 1 &&
          stars <= 3
        ) {
          safeStars[id] = stars;
        }
      }
      return safeStars;
    } catch {
      return safeStars;
    }
  }

  getStageStars(stageId: number): number {
    return this.stageStars[stageId] ?? 0;
  }

  getAllStageStars(): Record<number, number> {
    return { ...this.stageStars };
  }

  recordStageClear(stageId: number, stars: number): void {
    if (!Number.isInteger(stageId) || stageId < 1 || stageId > 200) return;
    const clamped = Math.max(1, Math.min(3, Math.round(stars)));
    const prev = this.stageStars[stageId] ?? 0;
    if (clamped > prev) {
      this.stageStars[stageId] = clamped;
      try {
        localStorage.setItem(
          STARS_STORAGE_KEY,
          JSON.stringify(this.stageStars)
        );
      } catch {
        // Ignore storage quota errors
      }
    }
  }

  private load(): GameSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_SETTINGS };
      return sanitizeSettingsObject(JSON.parse(raw));
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  get(): GameSettings {
    return { ...this.current };
  }

  update(patch: Partial<GameSettings>): GameSettings {
    this.current = sanitizeSettingsObject({ ...this.current, ...patch });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.current));
    } catch {
      // Ignore storage quota errors
    }
    this.listeners.forEach((cb) => cb(this.get()));
    return this.get();
  }

  onChange(cb: (s: GameSettings) => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }
}

export const settingsStore = new SettingsManager();

