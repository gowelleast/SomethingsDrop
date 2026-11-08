import Phaser from "phaser";
import { WindZoneDef } from "../../levels/LevelTypes";

export class WindZone {
  private scene: Phaser.Scene;
  private def: WindZoneDef;
  private graphic: Phaser.GameObjects.Graphics;
  private phase = 0;

  constructor(scene: Phaser.Scene, def: WindZoneDef) {
    this.scene = scene;
    this.def = def;
    this.graphic = scene.add.graphics().setDepth(1);
    this.draw();
  }

  update(spawnedBodies: MatterJS.BodyType[], playerBody: MatterJS.BodyType) {
    this.phase += 0.07;

    const { x, y, width, height, forceX = 0, forceY = -0.0022 } = this.def;
    const MatterBody = Phaser.Physics.Matter.Matter.Body;

    const applyWind = (b: MatterJS.BodyType, isPlayer: boolean) => {
      if (b.isStatic) return;
      const px = b.position.x;
      const py = b.position.y;
      if (px >= x && px <= x + width && py >= y && py <= y + height) {
        const go = (b as any).gameObject ?? (b.parent as any)?.gameObject;
        const trait = go?.getData?.("trait");

        // Heavy objects cut right through wind currents
        if (trait === "heavy") return;

        // Horizontal wind carries `float` platforms (clouds, balloons, planes) smoothly like a sailing raft!
        if (
          !isPlayer &&
          trait === "float" &&
          Math.abs(forceX) > Math.abs(forceY)
        ) {
          (b as any).windCarryVx = Math.sign(forceX) * 2.35;
          return;
        }

        const mult = trait === "float" ? 1.45 : isPlayer ? 1.15 : 1.0;
        MatterBody.applyForce(b, b.position, {
          x: forceX * b.mass * mult,
          y: forceY * b.mass * mult,
        });

        // Cap upward wind speed so player/objects don't rocket into orbit
        if (forceY < 0 && b.velocity.y < -8.5) {
          MatterBody.setVelocity(b, { x: b.velocity.x, y: -8.5 });
        }
      }
    };

    applyWind(playerBody, true);
    for (const b of spawnedBodies) {
      applyWind(b, false);
    }

    this.draw();
  }

  private draw() {
    const { x, y, width, height, forceX = 0, forceY = -0.0022 } = this.def;
    this.graphic.clear();

    // Subtle translucent wind column
    this.graphic.fillStyle(0x38bdf8, 0.08);
    this.graphic.lineStyle(1.5, 0x7dd3fc, 0.22);
    this.graphic.fillRoundedRect(x, y, width, height, 10);
    this.graphic.strokeRoundedRect(x, y, width, height, 10);

    // Animated wind streamlines
    const isHorizontal = Math.abs(forceX) > Math.abs(forceY);
    this.graphic.lineStyle(2, 0xbae6fd, 0.42);

    const streamCount = 5;
    for (let i = 0; i < streamCount; i++) {
      const t = ((this.phase + i * 1.3) % (Math.PI * 2)) / (Math.PI * 2);
      if (!isHorizontal) {
        const sx = x + ((i + 0.5) / streamCount) * width;
        const sy =
          forceY < 0 ? y + height - t * (height - 24) : y + t * (height - 24);
        const len = 26;
        this.graphic.beginPath();
        this.graphic.moveTo(sx, sy);
        this.graphic.lineTo(sx, sy + (forceY < 0 ? -len : len));
        this.graphic.strokePath();
      } else {
        const sy = y + ((i + 0.5) / streamCount) * height;
        const sx =
          forceX > 0 ? x + t * (width - 28) : x + width - t * (width - 28);
        const len = 28;
        this.graphic.beginPath();
        this.graphic.moveTo(sx, sy);
        this.graphic.lineTo(sx + (forceX > 0 ? len : -len), sy);
        this.graphic.strokePath();
      }
    }

    // Fan base nozzle at bottom (for updraft)
    if (!isHorizontal && forceY < 0) {
      this.graphic.fillStyle(0x1e293b, 0.95);
      this.graphic.lineStyle(2.5, 0x38bdf8, 0.9);
      this.graphic.fillRoundedRect(x + 8, y + height - 14, width - 16, 14, 5);
      this.graphic.strokeRoundedRect(x + 8, y + height - 14, width - 16, 14, 5);
    }
  }
}
