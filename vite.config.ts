import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  envDir: "..",
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"],
          "sticker-art": [
            "./src/art/ProceduralStickerArtist.ts",
            "./src/art/GameArtGenerator.ts",
          ],
          "physics-dict": [
            "./src/services/WordPhysicsPredictor.ts",
            "./src/services/KoreanFuzzyMatcher.ts",
          ],
        },
      },
    },
  },
  server: {
    port: 5173
  },
  publicDir: "../public"
});
