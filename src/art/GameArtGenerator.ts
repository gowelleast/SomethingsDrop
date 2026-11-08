import Phaser from "phaser";

export type StageTheme = "meadow" | "workshop" | "sky" | "cyberlab";

interface ThemePalette {
  skyTop: string;
  skyBottom: string;
  gridColor: string;
  hillBack: string;
  hillFront: string;
  blockFill: number;
  blockTop: number;
  blockTopHighlight: number;
  blockDetail: number;
}

export const THEME_PALETTES: Record<StageTheme, ThemePalette> = {
  meadow: {
    skyTop: "#0f172a",
    skyBottom: "#1e293b",
    gridColor: "rgba(56, 189, 248, 0.07)",
    hillBack: "#16243d",
    hillFront: "#1c3152",
    blockFill: 0x334155,
    blockTop: 0x10b981,
    blockTopHighlight: 0x34d399,
    blockDetail: 0x1e293b,
  },
  workshop: {
    skyTop: "#181226",
    skyBottom: "#2a1b3d",
    gridColor: "rgba(245, 158, 11, 0.07)",
    hillBack: "#241734",
    hillFront: "#322048",
    blockFill: 0x3f3f46,
    blockTop: 0xf59e0b,
    blockTopHighlight: 0xfbbf24,
    blockDetail: 0x27272a,
  },
  sky: {
    skyTop: "#09152b",
    skyBottom: "#17355c",
    gridColor: "rgba(125, 211, 252, 0.08)",
    hillBack: "#122a4d",
    hillFront: "#1b3d6e",
    blockFill: 0x334155,
    blockTop: 0x0ea5e9,
    blockTopHighlight: 0x38bdf8,
    blockDetail: 0x1e293b,
  },
  cyberlab: {
    skyTop: "#090d16",
    skyBottom: "#1a1635",
    gridColor: "rgba(168, 85, 247, 0.09)",
    hillBack: "#141229",
    hillFront: "#1f1b3d",
    blockFill: 0x2e2a4a,
    blockTop: 0xa855f7,
    blockTopHighlight: 0xc084fc,
    blockDetail: 0x1e1b33,
  },
};

export class GameArtGenerator {
  private static initialized = false;

  /**
   * Generates all core game textures (player animations, portal, goal flag, backgrounds)
   * in a unified "Crisp Sticker Lab" vector aesthetic.
   */
  static ensureCoreTextures(scene: Phaser.Scene) {
    if (!scene.textures.exists("player_sheet_idle")) {
      this.generatePlayerSpritesheets(scene);
    }
    if (!scene.textures.exists("portal_v2")) {
      this.generatePortalSpritesheet(scene);
    }
    if (!scene.textures.exists("goal_flag_v2")) {
      this.generateGoalFlagTexture(scene);
    }
    this.initialized = true;
  }

  /**
   * Generates the cute "Inkling Explorer" character spritesheets (idle, run, jump).
   */
  private static generatePlayerSpritesheets(scene: Phaser.Scene) {
    const fw = 56;
    const fh = 56;

    // 1. IDLE (4 frames)
    const idleCanvas = document.createElement("canvas");
    idleCanvas.width = fw * 4;
    idleCanvas.height = fh;
    const idleCtx = idleCanvas.getContext("2d")!;
    for (let i = 0; i < 4; i++) {
      const bobY = Math.sin((i / 4) * Math.PI * 2) * 2;
      const blink = i === 3;
      this.drawCharacterFrame(idleCtx, i * fw, 0, fw, fh, {
        bobY,
        blink,
        leftLegOffset: 0,
        rightLegOffset: 0,
        tilt: 0,
      });
    }
    scene.textures.addSpriteSheet(
      "player_sheet_idle",
      idleCanvas as unknown as HTMLImageElement,
      { frameWidth: fw, frameHeight: fh }
    );

    // 2. RUN (6 frames)
    const runCanvas = document.createElement("canvas");
    runCanvas.width = fw * 6;
    runCanvas.height = fh;
    const runCtx = runCanvas.getContext("2d")!;
    for (let i = 0; i < 6; i++) {
      const phase = (i / 6) * Math.PI * 2;
      const bobY = -Math.abs(Math.sin(phase)) * 3;
      const leftLegOffset = Math.sin(phase) * 6;
      const rightLegOffset = -Math.sin(phase) * 6;
      this.drawCharacterFrame(runCtx, i * fw, 0, fw, fh, {
        bobY,
        blink: false,
        leftLegOffset,
        rightLegOffset,
        tilt: 0.08,
      });
    }
    scene.textures.addSpriteSheet(
      "player_sheet_run",
      runCanvas as unknown as HTMLImageElement,
      { frameWidth: fw, frameHeight: fh }
    );

    // 3. JUMP (4 frames)
    const jumpCanvas = document.createElement("canvas");
    jumpCanvas.width = fw * 4;
    jumpCanvas.height = fh;
    const jumpCtx = jumpCanvas.getContext("2d")!;
    for (let i = 0; i < 4; i++) {
      this.drawCharacterFrame(jumpCtx, i * fw, 0, fw, fh, {
        bobY: -3,
        blink: false,
        leftLegOffset: -3,
        rightLegOffset: 3,
        tilt: -0.05,
        isJump: true,
      });
    }
    scene.textures.addSpriteSheet(
      "player_sheet_jump",
      jumpCanvas as unknown as HTMLImageElement,
      { frameWidth: fw, frameHeight: fh }
    );
  }

  private static drawCharacterFrame(
    ctx: CanvasRenderingContext2D,
    ox: number,
    oy: number,
    w: number,
    h: number,
    pose: {
      bobY: number;
      blink: boolean;
      leftLegOffset: number;
      rightLegOffset: number;
      tilt: number;
      isJump?: boolean;
    }
  ) {
    ctx.save();
    ctx.translate(ox + w / 2, oy + h / 2 + 4 + pose.bobY);
    ctx.rotate(pose.tilt);

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Feet / Boots
    ctx.fillStyle = "#334155";
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3;

    const footY = pose.isJump ? 14 : 15;
    // Left foot
    ctx.beginPath();
    ctx.roundRect(-11 + pose.leftLegOffset * 0.5, footY + pose.leftLegOffset * 0.3, 9, 7, 3.5);
    ctx.fill();
    ctx.stroke();

    // Right foot
    ctx.beginPath();
    ctx.roundRect(2 + pose.rightLegOffset * 0.5, footY + pose.rightLegOffset * 0.3, 9, 7, 3.5);
    ctx.fill();
    ctx.stroke();

    // Magic Pencil/Antenna on top of head
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(0, -23);
    ctx.stroke();

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(0, -25, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Main Helmet/Body (Sticker style rounded capsule)
    ctx.fillStyle = "#f8fafc";
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.roundRect(-16, -16, 32, 32, 13);
    ctx.fill();
    ctx.stroke();

    // Cyan Scarf / Belt trim at bottom of body
    ctx.fillStyle = "#0ea5e9";
    ctx.beginPath();
    ctx.roundRect(-14, 7, 28, 7, 4);
    ctx.fill();
    ctx.stroke();

    // Dark Visor Face
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.roundRect(-10, -10, 22, 14, 6);
    ctx.fill();

    // Glowing Eyes inside Visor (looking slightly right by default)
    ctx.fillStyle = "#38bdf8";
    if (pose.blink) {
      ctx.fillRect(-5, -4, 5, 2);
      ctx.fillRect(4, -4, 5, 2);
    } else {
      ctx.beginPath();
      ctx.ellipse(-2.5, -3, 2.5, 3.5, 0, 0, Math.PI * 2);
      ctx.ellipse(6.5, -3, 2.5, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // White eye sparkles
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-1.8, -4.2, 1, 0, Math.PI * 2);
      ctx.arc(7.2, -4.2, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Generates a 12-frame high-resolution, luminous dimensional portal spritesheet.
   */
  private static generatePortalSpritesheet(scene: Phaser.Scene) {
    const frames = 12;
    const fw = 180;
    const fh = 80;
    const canvas = document.createElement("canvas");
    canvas.width = fw * frames;
    canvas.height = fh;
    const ctx = canvas.getContext("2d")!;

    for (let i = 0; i < frames; i++) {
      const cx = i * fw + fw / 2;
      const cy = fh / 2 - 2;
      const phase = (i / frames) * Math.PI * 2;
      const pulse = Math.sin(phase) * 0.04 + 1;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Subtle downward dimensional light veil (soft beam beneath the portal)
      const beamGrad = ctx.createLinearGradient(0, 0, 0, 34);
      beamGrad.addColorStop(0, "rgba(56, 189, 248, 0.28)");
      beamGrad.addColorStop(0.6, "rgba(129, 140, 248, 0.10)");
      beamGrad.addColorStop(1, "rgba(129, 140, 248, 0)");
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(-48 * pulse, 2);
      ctx.lineTo(48 * pulse, 2);
      ctx.lineTo(64 * pulse, 34);
      ctx.lineTo(-64 * pulse, 34);
      ctx.closePath();
      ctx.fill();

      // 2. Soft outer aurora halo (layered elliptical glow, no harsh black stroke)
      ctx.save();
      ctx.scale(1, 0.34);
      const outerHalo = ctx.createRadialGradient(0, 0, 18, 0, 0, 78 * pulse);
      outerHalo.addColorStop(0, "rgba(224, 242, 254, 0.95)");
      outerHalo.addColorStop(0.38, "rgba(56, 189, 248, 0.65)");
      outerHalo.addColorStop(0.68, "rgba(129, 140, 248, 0.32)");
      outerHalo.addColorStop(0.88, "rgba(168, 85, 247, 0.12)");
      outerHalo.addColorStop(1, "rgba(168, 85, 247, 0)");
      ctx.fillStyle = outerHalo;
      ctx.beginPath();
      ctx.arc(0, 0, 78 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Deep cosmic vortex interior with luminous cyan/indigo rim
      ctx.save();
      ctx.scale(1, 0.31);
      const coreGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 52 * pulse);
      coreGrad.addColorStop(0, "#ffffff");
      coreGrad.addColorStop(0.28, "#bae6fd");
      coreGrad.addColorStop(0.58, "#0284c7");
      coreGrad.addColorStop(0.82, "#1e1b4b");
      coreGrad.addColorStop(1, "#38bdf8");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 52 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Sleek glowing outer ring stroke
      ctx.lineWidth = 3.2;
      ctx.strokeStyle = "rgba(186, 230, 253, 0.85)";
      ctx.stroke();

      // 4. Graceful orbiting energy arcs inside the vortex plane
      ctx.lineCap = "round";
      for (let aIdx = 0; aIdx < 2; aIdx++) {
        const startA = phase + aIdx * Math.PI;
        ctx.strokeStyle =
          aIdx === 0
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(165, 243, 252, 0.65)";
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.arc(0, 0, 38 * pulse, startA, startA + Math.PI * 0.55);
        ctx.stroke();

        const innerA = -phase * 1.0 + aIdx * Math.PI + 0.6;
        ctx.strokeStyle = "rgba(196, 181, 253, 0.7)";
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.arc(0, 0, 24 * pulse, innerA, innerA + Math.PI * 0.45);
        ctx.stroke();
      }
      ctx.restore();

      // 5. Delicate 4-point starlight glints along the rim
      const drawStarGlint = (sx: number, sy: number, r: number, alpha: number) => {
        if (alpha <= 0.05) return;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.quadraticCurveTo(0, 0, 0, r);
        ctx.quadraticCurveTo(0, 0, -r, 0);
        ctx.quadraticCurveTo(0, 0, 0, -r);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };

      for (let s = 0; s < 3; s++) {
        const angle = phase + (s * Math.PI * 2) / 3;
        const sx = Math.cos(angle) * 46;
        const sy = Math.sin(angle) * 14;
        const twinkle = 0.45 + 0.55 * Math.sin(phase * 2 + s * 2.1);
        drawStarGlint(sx, sy, 3.5 + twinkle * 2.5, twinkle * 0.9);
      }

      ctx.restore();
    }

    scene.textures.addSpriteSheet(
      "portal_v2",
      canvas as unknown as HTMLImageElement,
      { frameWidth: fw, frameHeight: fh }
    );
  }

  /**
   * Generates a crisp vector Goal Flag & Pedestal texture.
   */
  private static generateGoalFlagTexture(scene: Phaser.Scene) {
    const w = 72;
    const h = 92;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Pedestal base
    ctx.fillStyle = "#475569";
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.roundRect(10, 74, 44, 14, 5);
    ctx.fill();
    ctx.stroke();

    // Flagpole
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.roundRect(28, 16, 8, 60, 3);
    ctx.fill();
    ctx.stroke();

    // Flag banner (vibrant gold/amber with star)
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(36, 18);
    ctx.lineTo(68, 28);
    ctx.lineTo(36, 42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Golden finial ball on top
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(32, 13, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    scene.textures.addCanvas("goal_flag_v2", canvas);
  }

  /**
   * Draws a cohesive multi-layer stage backdrop (sky gradient, blueprint grid, stylized hills/decor).
   */
  static drawStageBackground(
    scene: Phaser.Scene,
    worldWidth: number,
    worldHeight: number,
    theme: StageTheme
  ) {
    const palette = THEME_PALETTES[theme];
    const texKey = `bg_theme_${theme}_${worldWidth}`;

    if (!scene.textures.exists(texKey)) {
      const canvas = document.createElement("canvas");
      canvas.width = worldWidth;
      canvas.height = worldHeight;
      const ctx = canvas.getContext("2d")!;

      // 1. Sky Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, worldHeight);
      grad.addColorStop(0, palette.skyTop);
      grad.addColorStop(1, palette.skyBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, worldWidth, worldHeight);

      // 2. Blueprint Grid (gives the "Physics Sandbox Lab" vibe)
      ctx.strokeStyle = palette.gridColor;
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < worldWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, worldHeight);
        ctx.stroke();
      }
      for (let y = 0; y < worldHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(worldWidth, y);
        ctx.stroke();
      }

      // 3. Soft Geometric Hills / Lab Silhouette in distance
      ctx.fillStyle = palette.hillBack;
      ctx.beginPath();
      ctx.moveTo(0, worldHeight);
      for (let x = 0; x <= worldWidth; x += 200) {
        const y =
          worldHeight - 160 - Math.sin(x * 0.004) * 55 - Math.cos(x * 0.009) * 25;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(worldWidth, worldHeight);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = palette.hillFront;
      ctx.beginPath();
      ctx.moveTo(0, worldHeight);
      for (let x = 0; x <= worldWidth; x += 160) {
        const y =
          worldHeight - 95 - Math.cos(x * 0.005 + 1) * 40;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(worldWidth, worldHeight);
      ctx.closePath();
      ctx.fill();

      scene.textures.addCanvas(texKey, canvas);
    }

    const bg = scene.add.image(worldWidth / 2, worldHeight / 2, texKey);
    bg.setDepth(-10);
  }

  /**
   * Draws a cohesive Sticker-Lab styled terrain platform or wall block.
   */
  static drawPlatformBlock(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    theme: StageTheme,
    isWall = false,
    angleDeg = 0
  ) {
    const palette = THEME_PALETTES[theme];
    const cx = x + width / 2;
    const cy = y + height / 2;
    const ox = -width / 2;
    const oy = -height / 2;
    const g = scene.add.graphics({ x: cx, y: cy }).setDepth(2);
    if (angleDeg !== 0) {
      g.setRotation(Phaser.Math.DegToRad(angleDeg));
    }

    // Main block body
    g.fillStyle(palette.blockFill, 1);
    g.lineStyle(3.5, 0x0f172a, 1);
    g.fillRoundedRect(ox, oy, width, height, 8);

    if (!isWall) {
      // Top surface cap (grass / energy / metal plate)
      const capH = Math.min(12, height * 0.4);
      g.fillStyle(palette.blockTop, 1);
      g.fillRoundedRect(ox + 2, oy + 2, width - 4, capH, {
        tl: 6,
        tr: 6,
        bl: 2,
        br: 2,
      });

      // Specular highlight strip on top cap
      g.fillStyle(palette.blockTopHighlight, 0.7);
      g.fillRect(ox + 8, oy + 4, Math.max(0, width - 16), 3);
    }

    // Subtle panel seams & rivets every 100px
    g.fillStyle(palette.blockDetail, 0.65);
    for (let sx = ox + 100; sx < ox + width - 10; sx += 100) {
      g.fillRect(sx, oy + (isWall ? 4 : 14), 2, height - (isWall ? 8 : 18));
    }

    // Re-stroke outer dark border cleanly on top
    g.strokeRoundedRect(ox, oy, width, height, 8);
    return g;
  }
}

