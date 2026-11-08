import Phaser from "phaser";
import { LaserBeamDef } from "../../levels/LevelTypes";

export class LaserBeam {
  private scene: Phaser.Scene;
  private def: LaserBeamDef;
  private graphic: Phaser.GameObjects.Graphics;
  private barrierGraphic: Phaser.GameObjects.Graphics;
  private barrierBodies: MatterJS.BodyType[] = [];
  private barrierActive = true;
  private holdOpenUntil = 0;
  private phase = 0;

  constructor(scene: Phaser.Scene, def: LaserBeamDef) {
    this.scene = scene;
    this.def = def;
    this.graphic = scene.add.graphics().setDepth(7);
    this.barrierGraphic = scene.add.graphics().setDepth(4);

    if (def.mode === "sensor" && def.barrierX !== undefined) {
      this.createBarrierBodies();
    }
  }

  private createBarrierBodies() {
    const {
      barrierX = 0,
      barrierY = 0,
      barrierW = 240,
      barrierH = 150,
      isCage,
    } = this.def;
    const wallThick = 22;

    const registerBody = (b: MatterJS.BodyType) => {
      (b as any).origX = b.position.x;
      (b as any).origY = b.position.y;
      this.barrierBodies.push(b);
    };

    if (isCage) {
      const leftWall = this.scene.matter.add.rectangle(
        barrierX,
        barrierY + barrierH / 2,
        wallThick,
        barrierH,
        { isStatic: true, friction: 0.2 }
      );
      const rightWall = this.scene.matter.add.rectangle(
        barrierX + barrierW,
        barrierY + barrierH / 2,
        wallThick,
        barrierH,
        { isStatic: true, friction: 0.2 }
      );
      const topWall = this.scene.matter.add.rectangle(
        barrierX + barrierW / 2,
        barrierY,
        barrierW + wallThick,
        wallThick,
        { isStatic: true, friction: 0.2 }
      );
      registerBody(leftWall);
      registerBody(rightWall);
      registerBody(topWall);
    } else {
      const wall = this.scene.matter.add.rectangle(
        barrierX + barrierW / 2,
        barrierY + barrierH / 2,
        barrierW,
        barrierH,
        { isStatic: true, friction: 0.2 }
      );
      registerBody(wall);
    }
  }

  private setBarrierEnabled(enabled: boolean) {
    if (this.barrierActive === enabled) return;
    this.barrierActive = enabled;
    const MatterBody = Phaser.Physics.Matter.Matter.Body;
    for (const b of this.barrierBodies) {
      b.isSensor = !enabled;
      b.collisionFilter.mask = enabled ? 0xffffffff : 0;
      MatterBody.setPosition(b, {
        x: (b as any).origX ?? b.position.x,
        y: enabled ? ((b as any).origY ?? b.position.y) : -2000,
      });
    }
  }

  update(
    spawnedBodies: MatterJS.BodyType[],
    playerBody: MatterJS.BodyType,
    onPlayerZap: () => void
  ) {
    this.phase += 0.14;

    const { x1, y1, x2, y2, mode = "hazard" } = this.def;
    const steps = 48;
    let hitT = 1.0;

    // 1. Raycast against all spawned objects to find the closest blocking point
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const px = x1 + (x2 - x1) * t;
      const py = y1 + (y2 - y1) * t;

      let blockedHere = false;
      for (const b of spawnedBodies) {
        if (
          px >= b.bounds.min.x - 4 &&
          px <= b.bounds.max.x + 4 &&
          py >= b.bounds.min.y - 4 &&
          py <= b.bounds.max.y + 4
        ) {
          const parts = b.parts && b.parts.length > 1 ? b.parts.slice(1) : [b];
          for (const part of parts) {
            if (
              px >= part.bounds.min.x - 3 &&
              px <= part.bounds.max.x + 3 &&
              py >= part.bounds.min.y - 3 &&
              py <= part.bounds.max.y + 3
            ) {
              blockedHere = true;
              break;
            }
          }
        }
        if (blockedHere) break;
      }

      if (blockedHere) {
        hitT = t;
        break;
      }
    }

    const endX = x1 + (x2 - x1) * hitT;
    const endY = y1 + (y2 - y1) * hitT;
    const isBlocked = hitT < 0.97;

    // 2. Handle mode logic
    if (mode === "hazard") {
      // Check if player touches the active segment (x1,y1) -> (endX,endY)
      const pMinX = playerBody.bounds.min.x + 4;
      const pMaxX = playerBody.bounds.max.x - 4;
      const pMinY = playerBody.bounds.min.y + 4;
      const pMaxY = playerBody.bounds.max.y - 4;

      const checkSteps = Math.max(8, Math.ceil(steps * hitT));
      for (let i = 1; i < checkSteps; i++) {
        const t = (i / checkSteps) * hitT;
        const lx = x1 + (x2 - x1) * t;
        const ly = y1 + (y2 - y1) * t;
        if (lx >= pMinX && lx <= pMaxX && ly >= pMinY && ly <= pMaxY) {
          onPlayerZap();
          break;
        }
      }
    } else if (mode === "sensor") {
      // Sensor mode: when blocked by a summoned object, immediately unlock the cage
      // and keep it open for at least 2.8s even if a falling object only cuts the beam briefly!
      if (isBlocked) {
        this.holdOpenUntil = this.scene.time.now + 2800;
      }
      const shouldBeOpen =
        isBlocked || this.scene.time.now < this.holdOpenUntil;
      this.setBarrierEnabled(!shouldBeOpen);
    }

    const sensorUnlocked =
      mode === "sensor" &&
      (isBlocked || this.scene.time.now < this.holdOpenUntil);
    this.draw(endX, endY, isBlocked || sensorUnlocked);
  }

  private draw(endX: number, endY: number, isBlocked: boolean) {
    const {
      x1,
      y1,
      x2,
      y2,
      mode = "hazard",
      barrierX,
      barrierY,
      barrierW = 240,
      barrierH = 150,
      isCage,
    } = this.def;

    this.graphic.clear();

    const mainColor = mode === "hazard" ? 0xf43f5e : 0x06b6d4;
    const coreColor = mode === "hazard" ? 0xfecdd3 : 0xcffafe;
    const pulseW = 7 + Math.sin(this.phase) * 2;

    // Outer laser glow + inner white-hot core
    this.graphic.lineStyle(pulseW + 5, mainColor, 0.28);
    this.graphic.lineBetween(x1, y1, endX, endY);

    this.graphic.lineStyle(pulseW, mainColor, 0.88);
    this.graphic.lineBetween(x1, y1, endX, endY);

    this.graphic.lineStyle(2.5, coreColor, 1);
    this.graphic.lineBetween(x1, y1, endX, endY);

    // Emitter nozzle at (x1, y1)
    this.graphic.fillStyle(0x1e293b, 1);
    this.graphic.lineStyle(2.5, mainColor, 1);
    this.graphic.fillCircle(x1, y1, 11);
    this.graphic.strokeCircle(x1, y1, 11);

    // Impact spark at (endX, endY)
    this.graphic.fillStyle(coreColor, 0.95);
    this.graphic.fillCircle(endX, endY, 6 + Math.sin(this.phase * 2) * 2);

    // Receiver node at (x2, y2) for sensor mode
    if (mode === "sensor") {
      const recColor = isBlocked ? 0x22c55e : 0x06b6d4;
      this.graphic.fillStyle(0x0f172a, 1);
      this.graphic.lineStyle(3, recColor, 1);
      this.graphic.fillCircle(x2, y2, 13);
      this.graphic.strokeCircle(x2, y2, 13);
      this.graphic.fillStyle(recColor, 0.9);
      this.graphic.fillCircle(x2, y2, 6);
    }

    // Draw barrier if sensor mode
    this.barrierGraphic.clear();
    if (mode === "sensor" && barrierX !== undefined && barrierY !== undefined && this.barrierActive) {
      const wallThick = 20;
      this.barrierGraphic.fillStyle(0x06b6d4, 0.32);
      this.barrierGraphic.lineStyle(3.5, 0x22d3ee, 0.95);

      if (isCage) {
        this.barrierGraphic.fillRoundedRect(
          barrierX - wallThick / 2,
          barrierY,
          wallThick,
          barrierH,
          6
        );
        this.barrierGraphic.strokeRoundedRect(
          barrierX - wallThick / 2,
          barrierY,
          wallThick,
          barrierH,
          6
        );

        this.barrierGraphic.fillRoundedRect(
          barrierX + barrierW - wallThick / 2,
          barrierY,
          wallThick,
          barrierH,
          6
        );
        this.barrierGraphic.strokeRoundedRect(
          barrierX + barrierW - wallThick / 2,
          barrierY,
          wallThick,
          barrierH,
          6
        );

        this.barrierGraphic.fillRoundedRect(
          barrierX - wallThick / 2,
          barrierY - wallThick / 2,
          barrierW + wallThick,
          wallThick,
          6
        );
        this.barrierGraphic.strokeRoundedRect(
          barrierX - wallThick / 2,
          barrierY - wallThick / 2,
          barrierW + wallThick,
          wallThick,
          6
        );
      } else {
        this.barrierGraphic.fillRoundedRect(barrierX, barrierY, barrierW, barrierH, 6);
        this.barrierGraphic.strokeRoundedRect(barrierX, barrierY, barrierW, barrierH, 6);
      }
    }
  }
}

