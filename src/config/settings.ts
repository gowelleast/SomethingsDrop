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

const metaEnv = (import.meta as any).env || {};

const DEFAULT_SETTINGS: GameSettings = {
  aiMode: "auto",
  ollamaUrl: metaEnv.VITE_OLLAMA_URL || "http://127.0.0.1:11434",
  ollamaModel: metaEnv.VITE_OLLAMA_MODEL || "gemma4:e4b",
  sdUrl: metaEnv.VITE_SD_URL || "http://127.0.0.1:7860",
  u2netUrl: "",
  useCache: true,
  debugPhysics: false,
  requestTimeoutMs: 25000,
};

class SettingsManager {
  private current: GameSettings;
  private stageStars: Record<number, number>;
  private listeners: Array<(s: GameSettings) => void> = [];

  constructor() {
    this.current = this.load();
    this.stageStars = this.loadStars();
  }

  private loadStars(): Record<number, number> {
    try {
      const raw = localStorage.getItem(STARS_STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw) || {};
    } catch {
      return {};
    }
  }

  getStageStars(stageId: number): number {
    return this.stageStars[stageId] ?? 0;
  }

  getAllStageStars(): Record<number, number> {
    return { ...this.stageStars };
  }

  recordStageClear(stageId: number, stars: number): void {
    const clamped = Math.max(1, Math.min(3, stars));
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
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  get(): GameSettings {
    return { ...this.current };
  }

  update(patch: Partial<GameSettings>): GameSettings {
    this.current = { ...this.current, ...patch };
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

