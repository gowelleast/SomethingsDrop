import { WordPhysicsSpec } from "../config/settings";

export interface CachedSpawnData {
  spec: WordPhysicsSpec;
  dataUrl: string;
  source: "lan-ai" | "preset" | "procedural";
}

const DB_NAME = "somethings_drop_cache_v6";
const STORE_NAME = "spawns";
const MAX_MEMORY_CACHE_ENTRIES = 60;

class SpawnCacheService {
  private memoryCache = new Map<string, CachedSpawnData>();
  private dbPromise: Promise<IDBDatabase> | null = null;

  private setMemoryCache(key: string, val: CachedSpawnData) {
    if (this.memoryCache.has(key)) {
      this.memoryCache.delete(key);
    } else if (this.memoryCache.size >= MAX_MEMORY_CACHE_ENTRIES) {
      const oldestKey = this.memoryCache.keys().next().value;
      if (oldestKey !== undefined) {
        this.memoryCache.delete(oldestKey);
      }
    }
    this.memoryCache.set(key, val);
  }

  private openDB(): Promise<IDBDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => {
          this.dbPromise = null;
          reject(req.error);
        };
      });
    }
    return this.dbPromise;
  }

  async get(word: string): Promise<CachedSpawnData | null> {
    const key = word.trim().toLowerCase();
    if (this.memoryCache.has(key)) {
      const hit = this.memoryCache.get(key)!;
      this.setMemoryCache(key, hit);
      return hit;
    }
    try {
      const db = await this.openDB();
      return await new Promise<CachedSpawnData | null>((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const req = tx.objectStore(STORE_NAME).get(key);
        req.onsuccess = () => {
          const val = req.result as CachedSpawnData | undefined;
          if (val) this.setMemoryCache(key, val);
          resolve(val ?? null);
        };
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  }

  async set(word: string, data: CachedSpawnData): Promise<void> {
    const key = word.trim().toLowerCase();
    this.setMemoryCache(key, data);
    try {
      const db = await this.openDB();
      await new Promise<void>((resolve) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put(data, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } catch {
      // Ignore IndexedDB errors
    }
  }

  async clear(): Promise<void> {
    this.memoryCache.clear();
    try {
      const db = await this.openDB();
      await new Promise<void>((resolve) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } catch {
      // Ignore
    }
  }
}

export const cacheService = new SpawnCacheService();

