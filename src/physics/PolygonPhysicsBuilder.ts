import Phaser from "phaser";
import { isoContours } from "marchingsquares";
import simplify from "simplify-js";
import { WordPhysicsSpec } from "../config/settings";

export interface BuiltPhysicsObject {
  matterImage: Phaser.Physics.Matter.Image;
  body: MatterJS.BodyType;
  textureKey: string;
  vertexCount: number;
  partCount: number;
}

const BASE_MAX_DIMENSION = 115; // Base pixel size for scale = 1.0

export class PolygonPhysicsBuilder {
  /**
   * Takes an HTMLImageElement or HTMLCanvasElement, removes solid background if needed,
   * auto-crops transparent margins, scales to match WordPhysicsSpec, extracts the silhouette
   * polygon via Marching Squares + Douglas-Peucker simplification, and builds a concave-capable
   * Matter.js body with 1px-accurate texture alignment.
   */
  static buildFromImage(
    scene: Phaser.Scene,
    source: HTMLImageElement | HTMLCanvasElement,
    spawnX: number,
    spawnY: number,
    spec: WordPhysicsSpec
  ): BuiltPhysicsObject {
    // 1. Draw source to working canvas & strip solid background if opaque (only for external AI images)
    const rawCanvas = document.createElement("canvas");
    rawCanvas.width = source.width || 128;
    rawCanvas.height = source.height || 128;
    const rawCtx = rawCanvas.getContext("2d", { willReadFrequently: true })!;
    rawCtx.drawImage(source, 0, 0);

    const isProceduralCanvas = source instanceof HTMLCanvasElement;
    const rawPixels = isProceduralCanvas
      ? rawCtx.getImageData(0, 0, rawCanvas.width, rawCanvas.height).data
      : this.ensureTransparentBackground(
          rawCtx,
          rawCanvas.width,
          rawCanvas.height
        );

    // 2. Find tight bounding box of non-transparent pixels (reusing rawPixels without a 2nd getImageData call)
    const bounds = this.findOpaqueBounds(
      rawPixels,
      rawCanvas.width,
      rawCanvas.height
    );

    const cropW = Math.max(8, bounds.maxX - bounds.minX + 1);
    const cropH = Math.max(8, bounds.maxY - bounds.minY + 1);

    // 3. Calculate target dimensions based on spec.scale
    const clampedScale = Phaser.Math.Clamp(spec.scale, 0.32, 2.65);
    const targetMaxDim = Math.round(BASE_MAX_DIMENSION * clampedScale);
    const aspect = cropW / cropH;

    let finalInnerW: number;
    let finalInnerH: number;
    if (cropW >= cropH) {
      finalInnerW = targetMaxDim;
      finalInnerH = Math.max(12, Math.round(targetMaxDim / aspect));
    } else {
      finalInnerH = targetMaxDim;
      finalInnerW = Math.max(12, Math.round(targetMaxDim * aspect));
    }

    const PADDING = 2;
    const finalW = finalInnerW + PADDING * 2;
    const finalH = finalInnerH + PADDING * 2;

    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = finalW;
    croppedCanvas.height = finalH;
    const croppedCtx = croppedCanvas.getContext("2d", {
      willReadFrequently: true,
    })!;

    croppedCtx.drawImage(
      rawCanvas,
      bounds.minX,
      bounds.minY,
      cropW,
      cropH,
      PADDING,
      PADDING,
      finalInnerW,
      finalInnerH
    );

    // 4. Register cropped & scaled canvas as a Phaser texture
    const textureKey = `spawn_${spec.word}_${Date.now()}_${Math.floor(
      Math.random() * 1000
    )}`;
    scene.textures.addCanvas(textureKey, croppedCanvas);

    // 5. Build binary alpha grid for Marching Squares
    const imgData = croppedCtx.getImageData(0, 0, finalW, finalH).data;
    const binaryGrid: number[][] = [];

    for (let y = 0; y < finalH; y++) {
      const row: number[] = [];
      for (let x = 0; x < finalW; x++) {
        const isBorder =
          x === 0 || y === 0 || x === finalW - 1 || y === finalH - 1;
        if (isBorder) {
          row.push(0);
        } else {
          const alpha = imgData[(y * finalW + x) * 4 + 3];
          row.push(alpha > 32 ? 1 : 0);
        }
      }
      binaryGrid.push(row);
    }

    // 5.5. If the cropped image has slightly separated sub-parts, bridge them in binaryGrid
    // so Marching Squares produces a single unified contour enclosing all visible pixels.
    this.bridgeBinaryGridIslands(binaryGrid, finalW, finalH);

    // 6. Extract contour and simplify vertices
    const contours = isoContours(binaryGrid, 0.5);
    let simplifiedVerts: { x: number; y: number }[] = [];

    if (contours && contours.length > 0) {
      const largestContour = contours.reduce((prev, curr) =>
        curr.length > prev.length ? curr : prev
      );

      // Convert [x, y] pairs to { x, y }
      const rawPoints = largestContour.map(([x, y]) => ({ x, y }));

      // Remove duplicate closing point if present
      if (
        rawPoints.length > 2 &&
        Math.hypot(
          rawPoints[0].x - rawPoints[rawPoints.length - 1].x,
          rawPoints[0].y - rawPoints[rawPoints.length - 1].y
        ) < 1.0
      ) {
        rawPoints.pop();
      }

      const isRollingObject =
        spec.friction <= 0.08 &&
        spec.restitution >= 0.35 &&
        Math.abs(finalInnerW - finalInnerH) /
          Math.max(1, finalInnerW, finalInnerH) <
          0.28;
      simplifiedVerts = simplify(rawPoints, isRollingObject ? 0.75 : 1.75, true);
    }

    // 7. Create Matter.js body (concave decomposition via poly-decomp built into Phaser)
    const MatterLib = Phaser.Physics.Matter.Matter;
    const isBouncyPad = spec.trait === "bouncy";
    const isLowFrictionRoller =
      !isBouncyPad &&
      spec.friction <= 0.08 &&
      spec.restitution >= 0.35 &&
      Math.abs(finalInnerW - finalInnerH) /
        Math.max(1, finalInnerW, finalInnerH) <
        0.28;
    const bodyOptions: MatterJS.IBodyDefinition = {
      density: Phaser.Math.Clamp(spec.density, 0.0004, 0.06),
      friction: isBouncyPad
        ? Math.max(0.88, Phaser.Math.Clamp(spec.friction, 0.0005, 1.0))
        : Phaser.Math.Clamp(spec.friction, 0.0005, 1.0),
      frictionStatic:
        spec.trait === "slippery" || isLowFrictionRoller
          ? 0.002
          : isBouncyPad
            ? 0.95
            : 0.5,
      frictionAir:
        spec.trait === "float"
          ? 0.04
          : isBouncyPad
            ? 0.025
            : isLowFrictionRoller
              ? 0.002
              : 0.01,
      // Keep physical restitution low even for "bouncy" objects so they settle
      // stably on the ground when summoned (player bounce is handled via sensor impulse).
      restitution: isBouncyPad
        ? 0.12
        : Phaser.Math.Clamp(spec.restitution, 0.0, 0.45),
      isStatic: false,
    };

    let matterBody: MatterJS.BodyType | undefined;

    if (simplifiedVerts.length >= 3) {
      try {
        matterBody = MatterLib.Bodies.fromVertices(
          spawnX,
          spawnY,
          [simplifiedVerts],
          bodyOptions,
          true,
          0.01,
          6
        );
      } catch (err) {
        console.warn("fromVertices fallback triggered:", err);
      }
    }

    // Fallback to rectangle if contour decomposition fails
    const finalBody: MatterJS.BodyType =
      matterBody ??
      MatterLib.Bodies.rectangle(
        spawnX,
        spawnY,
        finalInnerW * 0.85,
        finalInnerH * 0.85,
        bodyOptions
      );

    // Apply custom gravity scale via Matter plugin/property
    (finalBody as any).gravityScale = spec.gravityScale;

    // 8. Compute exact center-of-mass origin in croppedCanvas coordinates (finalW x finalH)
    // so the visible texture and the Matter.js polygon align 1:1 without any drift.
    let originX = 0.5;
    let originY = 0.5;

    if (matterBody && simplifiedVerts.length >= 3) {
      let vMinX = Infinity;
      let vMinY = Infinity;
      for (const pt of simplifiedVerts) {
        if (pt.x < vMinX) vMinX = pt.x;
        if (pt.y < vMinY) vMinY = pt.y;
      }
      const bodyBounds = finalBody.bounds;
      const comCanvasX = vMinX + (finalBody.position.x - bodyBounds.min.x);
      const comCanvasY = vMinY + (finalBody.position.y - bodyBounds.min.y);
      originX = Phaser.Math.Clamp(comCanvasX / finalW, 0.05, 0.95);
      originY = Phaser.Math.Clamp(comCanvasY / finalH, 0.05, 0.95);
    }

    const matterImage = scene.matter.add.image(spawnX, spawnY, textureKey);
    matterImage.setExistingBody(finalBody);
    matterImage.setOrigin(originX, originY);

    return {
      matterImage,
      body: finalBody,
      textureKey,
      vertexCount: simplifiedVerts.length,
      partCount: Math.max(1, finalBody.parts.length - 1),
    };
  }

  /**
   * Flood-fills from the four corners if the image has an opaque solid background
   * (e.g. Stable Diffusion output without U2Net), unwraps any enclosed icon frame,
   * and isolates the main object cluster if SD drew multiple scattered objects.
   */
  private static ensureTransparentBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): Uint8ClampedArray {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const corners = [
      0,
      (width - 1) * 4,
      (height - 1) * width * 4,
      ((height - 1) * width + (width - 1)) * 4,
    ];

    const opaqueCorners = corners.filter((idx) => data[idx + 3] > 220);
    if (opaqueCorners.length >= 2) {
      // Reference background color from top-left opaque corner
      const refIdx = opaqueCorners[0];
      const refR = data[refIdx];
      const refG = data[refIdx + 1];
      const refB = data[refIdx + 2];

      const totalPixels = width * height;
      const visited = new Uint8Array(totalPixels);
      const queue = new Int32Array(totalPixels);
      let tail = 0;
      const maxDistSq = 52 * 52; // 2704 — avoids Math.sqrt per pixel

      const pushIfBg = (x: number, y: number) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return;
        const pIdx = y * width + x;
        if (visited[pIdx]) return;
        const dIdx = pIdx * 4;
        const dr = data[dIdx] - refR;
        const dg = data[dIdx + 1] - refG;
        const db = data[dIdx + 2] - refB;

        if (dr * dr + dg * dg + db * db <= maxDistSq) {
          visited[pIdx] = 1;
          data[dIdx + 3] = 0;
          queue[tail++] = pIdx;
        }
      };

      // Seed border pixels
      for (let x = 0; x < width; x++) {
        pushIfBg(x, 0);
        pushIfBg(x, height - 1);
      }
      for (let y = 0; y < height; y++) {
        pushIfBg(0, y);
        pushIfBg(width - 1, y);
      }

      let head = 0;
      while (head < tail) {
        const curr = queue[head++];
        const cx = curr % width;
        const cy = (curr / width) | 0;
        pushIfBg(cx + 1, cy);
        pushIfBg(cx - 1, cy);
        pushIfBg(cx, cy + 1);
        pushIfBg(cx, cy - 1);
      }
    }

    // 1. If SD drew a closed rectangular / rounded-square icon frame around a white background,
    // unwrap the outer border and inner white background so only the central object remains.
    this.unwrapOuterFrameIfPresent(data, width, height);

    // 2. If SD drew multiple scattered objects (e.g. pizza pattern or fruit assortment),
    // keep only the primary central object cluster and remove disconnected secondary objects.
    this.isolatePrimaryObjectCluster(data, width, height);

    ctx.putImageData(imgData, 0, 0);
    return data;
  }

  /**
   * Detects and strips an enclosed square/rounded-square icon border frame and its trapped
   * white interior when Stable Diffusion draws a card/icon box around the object.
   * Strictly checks that the outer silhouette is a solid rectangular box (>= 90% filled with straight edges)
   * so white-bodied characters or objects are never mistaken for frames.
   */
  private static unwrapOuterFrameIfPresent(
    data: Uint8ClampedArray,
    width: number,
    height: number
  ): boolean {
    const bounds = this.findOpaqueBounds(data, width, height);
    const bw = bounds.maxX - bounds.minX + 1;
    const bh = bounds.maxY - bounds.minY + 1;
    if (bw < width * 0.72 || bh < height * 0.72) {
      return false;
    }

    const boxArea = bw * bh;
    const totalPixels = width * height;
    let totalOpaque = 0;
    for (let y = bounds.minY; y <= bounds.maxY; y++) {
      const rowOffset = y * width;
      for (let x = bounds.minX; x <= bounds.maxX; x++) {
        if (data[(rowOffset + x) * 4 + 3] > 25) totalOpaque++;
      }
    }

    // A square/rounded-square card with trapped white interior fills >= 90% of its bounding box
    if (totalOpaque < boxArea * 0.9) {
      return false;
    }

    // Verify all 4 sides of bounds form straight rectangular box edges (>= 68% opaque within 4px of each edge)
    let topEdge = 0;
    let bottomEdge = 0;
    for (let x = bounds.minX; x <= bounds.maxX; x++) {
      for (let dy = 0; dy <= 4; dy++) {
        if (data[((bounds.minY + dy) * width + x) * 4 + 3] > 80) {
          topEdge++;
          break;
        }
      }
      for (let dy = 0; dy <= 4; dy++) {
        if (data[((bounds.maxY - dy) * width + x) * 4 + 3] > 80) {
          bottomEdge++;
          break;
        }
      }
    }
    let leftEdge = 0;
    let rightEdge = 0;
    for (let y = bounds.minY; y <= bounds.maxY; y++) {
      for (let dx = 0; dx <= 4; dx++) {
        if (data[(y * width + (bounds.minX + dx)) * 4 + 3] > 80) {
          leftEdge++;
          break;
        }
      }
      for (let dx = 0; dx <= 4; dx++) {
        if (data[(y * width + (bounds.maxX - dx)) * 4 + 3] > 80) {
          rightEdge++;
          break;
        }
      }
    }
    if (
      topEdge < bw * 0.68 ||
      bottomEdge < bw * 0.68 ||
      leftEdge < bh * 0.68 ||
      rightEdge < bh * 0.68
    ) {
      return false;
    }

    const maxInset = Math.floor(Math.min(bw, bh) * 0.22);
    const cornerDirs = [
      { sx: bounds.minX, sy: bounds.minY, dx: 1, dy: 1 },
      { sx: bounds.maxX, sy: bounds.minY, dx: -1, dy: 1 },
      { sx: bounds.minX, sy: bounds.maxY, dx: 1, dy: -1 },
      { sx: bounds.maxX, sy: bounds.maxY, dx: -1, dy: -1 },
    ];

    const innerWhiteSeeds: number[] = [];
    const outerFrameSeeds: number[] = [];

    for (const dir of cornerDirs) {
      let sawFrame = false;
      for (let step = 0; step <= maxInset; step++) {
        const x = dir.sx + dir.dx * step;
        const y = dir.sy + dir.dy * step;
        if (x < 0 || x >= width || y < 0 || y >= height) break;
        const pIdx = y * width + x;
        const dIdx = pIdx * 4;
        const a = data[dIdx + 3];
        if (a <= 80) continue;

        const r = data[dIdx];
        const g = data[dIdx + 1];
        const b = data[dIdx + 2];
        const isWhite = r >= 232 && g >= 232 && b >= 232;

        if (!sawFrame && !isWhite) {
          sawFrame = true;
          outerFrameSeeds.push(pIdx);
        } else if (sawFrame && isWhite) {
          innerWhiteSeeds.push(pIdx);
          break;
        }
      }
    }

    if (innerWhiteSeeds.length < 3) {
      return false;
    }

    const innerWhiteMask = new Uint8Array(totalPixels);
    const queue = new Int32Array(totalPixels);
    let head = 0;
    let tail = 0;
    let whiteCount = 0;

    const pushWhite = (x: number, y: number) => {
      if (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY) return;
      const pIdx = y * width + x;
      if (innerWhiteMask[pIdx]) return;
      const dIdx = pIdx * 4;
      if (data[dIdx + 3] <= 80) return;
      const r = data[dIdx];
      const g = data[dIdx + 1];
      const b = data[dIdx + 2];
      if (r >= 224 && g >= 224 && b >= 224) {
        innerWhiteMask[pIdx] = 1;
        whiteCount++;
        queue[tail++] = pIdx;
      }
    };

    for (const seed of innerWhiteSeeds) {
      pushWhite(seed % width, (seed / width) | 0);
    }

    while (head < tail) {
      const curr = queue[head++];
      const cx = curr % width;
      const cy = (curr / width) | 0;
      pushWhite(cx + 1, cy);
      pushWhite(cx - 1, cy);
      pushWhite(cx, cy + 1);
      pushWhite(cx, cy - 1);
    }

    if (whiteCount < boxArea * 0.15 || whiteCount > boxArea * 0.86) {
      return false;
    }

    const frameMask = new Uint8Array(totalPixels);
    head = 0;
    tail = 0;
    let frameCount = 0;

    const pushFrame = (x: number, y: number) => {
      if (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY) return;
      const pIdx = y * width + x;
      if (frameMask[pIdx] || innerWhiteMask[pIdx]) return;
      if (data[pIdx * 4 + 3] <= 25) return;
      frameMask[pIdx] = 1;
      frameCount++;
      queue[tail++] = pIdx;
    };

    for (const seed of outerFrameSeeds) {
      pushFrame(seed % width, (seed / width) | 0);
    }
    for (let x = bounds.minX; x <= bounds.maxX; x++) {
      pushFrame(x, bounds.minY);
      pushFrame(x, bounds.maxY);
    }
    for (let y = bounds.minY; y <= bounds.maxY; y++) {
      pushFrame(bounds.minX, y);
      pushFrame(bounds.maxX, y);
    }

    while (head < tail) {
      const curr = queue[head++];
      const cx = curr % width;
      const cy = (curr / width) | 0;
      pushFrame(cx + 1, cy);
      pushFrame(cx - 1, cy);
      pushFrame(cx, cy + 1);
      pushFrame(cx, cy - 1);
    }

    const remainingObjectPixels = totalOpaque - whiteCount - frameCount;
    if (frameCount <= boxArea * 0.22 && remainingObjectPixels >= boxArea * 0.06) {
      for (let i = 0; i < totalPixels; i++) {
        if (innerWhiteMask[i] || frameMask[i]) {
          data[i * 4 + 3] = 0;
        }
      }
      return true;
    }

    return false;
  }

  /**
   * Groups opaque pixels using a 3px bridge radius (so close sub-parts of one object stay together)
   * and removes disconnected secondary objects (e.g. extra scattered pizza slices or fruit assortment items)
   * so that only the primary central object remains on the canvas.
   */
  private static isolatePrimaryObjectCluster(
    data: Uint8ClampedArray,
    width: number,
    height: number
  ): void {
    const totalPixels = width * height;
    const opaque = new Uint8Array(totalPixels);
    let totalOpaque = 0;

    for (let i = 0; i < totalPixels; i++) {
      if (data[i * 4 + 3] > 32) {
        opaque[i] = 1;
        totalOpaque++;
      }
    }

    if (totalOpaque < 64) return;

    // Dilate by 3px horizontally & vertically so parts within ~6px of each other merge into one cluster
    const R = 3;
    const horiz = new Uint8Array(totalPixels);
    for (let y = 0; y < height; y++) {
      const rowOffset = y * width;
      let lastSeen = -999;
      for (let x = 0; x < width; x++) {
        if (opaque[rowOffset + x]) lastSeen = x;
        if (x - lastSeen <= R) horiz[rowOffset + x] = 1;
      }
      lastSeen = 999999;
      for (let x = width - 1; x >= 0; x--) {
        if (opaque[rowOffset + x]) lastSeen = x;
        if (lastSeen - x <= R) horiz[rowOffset + x] = 1;
      }
    }

    const dilated = new Uint8Array(totalPixels);
    for (let x = 0; x < width; x++) {
      let lastSeen = -999;
      for (let y = 0; y < height; y++) {
        if (horiz[y * width + x]) lastSeen = y;
        if (y - lastSeen <= R) dilated[y * width + x] = 1;
      }
      lastSeen = 999999;
      for (let y = height - 1; y >= 0; y--) {
        if (horiz[y * width + x]) lastSeen = y;
        if (lastSeen - y <= R) dilated[y * width + x] = 1;
      }
    }

    const labels = new Int32Array(totalPixels);
    const queue = new Int32Array(totalPixels);
    let nextLabel = 0;

    interface ClusterInfo {
      label: number;
      pixelCount: number;
      sumX: number;
      sumY: number;
      edgeTouchCount: number;
    }

    const clusters: ClusterInfo[] = [];

    for (let i = 0; i < totalPixels; i++) {
      if (!dilated[i] || labels[i] !== 0) continue;
      const label = ++nextLabel;
      let head = 0;
      let tail = 0;
      labels[i] = label;
      queue[tail++] = i;

      let pixelCount = 0;
      let sumX = 0;
      let sumY = 0;
      let edgeTouchCount = 0;

      while (head < tail) {
        const curr = queue[head++];
        const cx = curr % width;
        const cy = (curr / width) | 0;

        if (opaque[curr]) {
          pixelCount++;
          sumX += cx;
          sumY += cy;
          if (cx <= 2 || cx >= width - 3 || cy <= 2 || cy >= height - 3) {
            edgeTouchCount++;
          }
        }

        if (cx + 1 < width) {
          const n = curr + 1;
          if (dilated[n] && labels[n] === 0) {
            labels[n] = label;
            queue[tail++] = n;
          }
        }
        if (cx - 1 >= 0) {
          const n = curr - 1;
          if (dilated[n] && labels[n] === 0) {
            labels[n] = label;
            queue[tail++] = n;
          }
        }
        if (cy + 1 < height) {
          const n = curr + width;
          if (dilated[n] && labels[n] === 0) {
            labels[n] = label;
            queue[tail++] = n;
          }
        }
        if (cy - 1 >= 0) {
          const n = curr - width;
          if (dilated[n] && labels[n] === 0) {
            labels[n] = label;
            queue[tail++] = n;
          }
        }
      }

      if (pixelCount > 0) {
        clusters.push({ label, pixelCount, sumX, sumY, edgeTouchCount });
      }
    }

    if (clusters.length <= 1) return;

    const halfW = width * 0.5;
    const halfH = height * 0.5;
    let bestLabel = clusters[0].label;
    let bestScore = -1;

    for (const c of clusters) {
      const cx = c.sumX / c.pixelCount;
      const cy = c.sumY / c.pixelCount;
      const distNorm = Math.hypot((cx - halfW) / halfW, (cy - halfH) / halfH);
      const centrality = Math.max(0.25, 1.15 - distNorm * 0.55);
      // Penalize slices/items cut off along the outer canvas border when a central whole object exists
      const edgePenalty = c.edgeTouchCount > 20 ? 0.32 : 1.0;
      const score = c.pixelCount * centrality * edgePenalty;
      if (score > bestScore) {
        bestScore = score;
        bestLabel = c.label;
      }
    }

    // Clear all disconnected secondary clusters
    for (let i = 0; i < totalPixels; i++) {
      if (opaque[i] && labels[i] !== bestLabel) {
        data[i * 4 + 3] = 0;
      }
    }
  }

  /**
   * Connects any separated islands in `binaryGrid` with a thin 2px bridge so `isoContours`
   * always traces a single closed outer silhouette wrapping 100% of visible pixels.
   */
  private static bridgeBinaryGridIslands(
    binaryGrid: number[][],
    width: number,
    height: number
  ): void {
    const total = width * height;
    const labels = new Int32Array(total);
    const queue = new Int32Array(total);
    let compCount = 0;
    const compBoundary: Array<Array<{ x: number; y: number }>> = [];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        if (binaryGrid[y][x] === 0 || labels[idx] !== 0) continue;

        const label = ++compCount;
        const boundary: Array<{ x: number; y: number }> = [];
        let head = 0;
        let tail = 0;
        labels[idx] = label;
        queue[tail++] = idx;

        while (head < tail) {
          const curr = queue[head++];
          const cx = curr % width;
          const cy = (curr / width) | 0;

          let isEdge = false;
          const neighbors = [
            [cx + 1, cy],
            [cx - 1, cy],
            [cx, cy + 1],
            [cx, cy - 1],
          ];
          for (const [nx, ny] of neighbors) {
            if (nx <= 0 || nx >= width - 1 || ny <= 0 || ny >= height - 1) continue;
            if (binaryGrid[ny][nx] === 0) {
              isEdge = true;
            } else {
              const nIdx = ny * width + nx;
              if (labels[nIdx] === 0) {
                labels[nIdx] = label;
                queue[tail++] = nIdx;
              }
            }
          }
          if (isEdge) {
            boundary.push({ x: cx, y: cy });
          }
        }
        compBoundary.push(boundary);
      }
    }

    if (compCount <= 1) return;

    // Find the main component (largest boundary) and bridge all other components to it
    let mainIdx = 0;
    for (let i = 1; i < compBoundary.length; i++) {
      if (compBoundary[i].length > compBoundary[mainIdx].length) {
        mainIdx = i;
      }
    }

    const mainPts = compBoundary[mainIdx];
    for (let i = 0; i < compBoundary.length; i++) {
      if (i === mainIdx) continue;
      const subPts = compBoundary[i];
      if (subPts.length === 0 || mainPts.length === 0) continue;

      let bestA = mainPts[0];
      let bestB = subPts[0];
      let bestDistSq = Infinity;

      const stepA = Math.max(1, Math.floor(mainPts.length / 60));
      const stepB = Math.max(1, Math.floor(subPts.length / 40));

      for (let a = 0; a < mainPts.length; a += stepA) {
        const pa = mainPts[a];
        for (let b = 0; b < subPts.length; b += stepB) {
          const pb = subPts[b];
          const dSq = (pa.x - pb.x) * (pa.x - pb.x) + (pa.y - pb.y) * (pa.y - pb.y);
          if (dSq < bestDistSq) {
            bestDistSq = dSq;
            bestA = pa;
            bestB = pb;
          }
        }
      }

      // Draw a 2px-thick bridge of 1s between bestA and bestB
      const steps = Math.max(1, Math.ceil(Math.sqrt(bestDistSq)));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const bx = Math.round(bestA.x + (bestB.x - bestA.x) * t);
        const by = Math.round(bestA.y + (bestB.y - bestA.y) * t);
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = bx + dx;
            const ny = by + dy;
            if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1) {
              binaryGrid[ny][nx] = 1;
            }
          }
        }
      }
    }
  }

  private static findOpaqueBounds(
    data: Uint8ClampedArray,
    width: number,
    height: number
  ) {
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let found = false;

    for (let y = 0; y < height; y++) {
      const rowOffset = y * width;
      for (let x = 0; x < width; x++) {
        const alpha = data[(rowOffset + x) * 4 + 3];
        if (alpha > 25) {
          found = true;
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!found) {
      return { minX: 0, minY: 0, maxX: width - 1, maxY: height - 1 };
    }
    return { minX, minY, maxX, maxY };
  }
}
