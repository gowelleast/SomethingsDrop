import Phaser from "phaser";
import { SlotButtonDef } from "../../levels/LevelTypes";

export class SlotButton {
  private scene: Phaser.Scene;
  private def: SlotButtonDef;
  private barrierBodies: MatterJS.BodyType[] = [];
  private buttonGraphic: Phaser.GameObjects.Graphics;
  private barrierGraphic: Phaser.GameObjects.Graphics;
  private isActivated = false;
  private pulsePhase = 0;

  constructor(scene: Phaser.Scene, def: SlotButtonDef) {
    this.scene = scene;
    this.def = def;

    this.buttonGraphic = scene.add.graphics().setDepth(4);
    this.barrierGraphic = scene.add.graphics().setDepth(4);

    const { barrierX, barrierY, barrierW, barrierH, isCage } = def;
    const wallThick = 22;

    if (isCage) {
      // 3-sided cage around the goal flag (Left wall, Top roof, Right wall)
      const leftWall = scene.matter.add.rectangle(
        barrierX,
        barrierY + barrierH / 2,
        wallThick,
        barrierH,
        { isStatic: true, friction: 0.2 }
      );
      const rightWall = scene.matter.add.rectangle(
        barrierX + barrierW,
        barrierY + barrierH / 2,
        wallThick,
        barrierH,
        { isStatic: true, friction: 0.2 }
      );
      const topWall = scene.matter.add.rectangle(
        barrierX + barrierW / 2,
        barrierY,
        barrierW + wallThick,
        wallThick,
        { isStatic: true, friction: 0.2 }
      );
      this.barrierBodies.push(leftWall, rightWall, topWall);
    } else {
      const wall = scene.matter.add.rectangle(
        barrierX + barrierW / 2,
        barrierY + barrierH / 2,
        barrierW,
        barrierH,
        { isStatic: true, friction: 0.2 }
      );
      this.barrierBodies.push(wall);
    }

    this.draw();
  }

  update(spawnedBodies: MatterJS.BodyType[], playerBody: MatterJS.BodyType) {
    this.pulsePhase += 0.08;
    const bx = this.def.buttonX;
    const by = this.def.buttonY;
    const facing = this.def.facing ?? "left";
    const MatterBody = Phaser.Physics.Matter.Matter.Body;

    // Prevent the player from squeezing into horizontal narrow slots
    if (facing === "left" || facing === "right") {
      const pDy = Math.abs(playerBody.position.y - by);
      if (pDy < 34) {
        if (
          facing === "left" &&
          playerBody.position.x > bx - 135 &&
          playerBody.position.x < bx + 15
        ) {
          MatterBody.setPosition(playerBody, {
            x: bx - 135,
            y: playerBody.position.y,
          });
          if (playerBody.velocity.x > 0) {
            MatterBody.setVelocity(playerBody, {
              x: 0,
              y: playerBody.velocity.y,
            });
          }
        } else if (
          facing === "right" &&
          playerBody.position.x < bx + 135 &&
          playerBody.position.x > bx - 15
        ) {
          MatterBody.setPosition(playerBody, {
            x: bx + 135,
            y: playerBody.position.y,
          });
          if (playerBody.velocity.x < 0) {
            MatterBody.setVelocity(playerBody, {
              x: 0,
              y: playerBody.velocity.y,
            });
          }
        }
      }
    }

    if (!this.isActivated) {
      const hitRadius = 36;

      const touchesButton = (b: MatterJS.BodyType) => {
        const minX = b.bounds.min.x - hitRadius;
        const maxX = b.bounds.max.x + hitRadius;
        const minY = b.bounds.min.y - hitRadius;
        const maxY = b.bounds.max.y + hitRadius;
        if (bx >= minX && bx <= maxX && by >= minY && by <= maxY) {
          const parts = b.parts && b.parts.length > 1 ? b.parts.slice(1) : [b];
          for (const part of parts) {
            if (
              bx >= part.bounds.min.x - 30 &&
              bx <= part.bounds.max.x + 30 &&
              by >= part.bounds.min.y - 30 &&
              by <= part.bounds.max.y + 30
            ) {
              return true;
            }
          }
        }
        return false;
      };

      // Only summoned objects can activate the button (never the player!)
      let triggered = false;
      for (const b of spawnedBodies) {
        // Smoothly guide slim/small objects and rolling balls inside the slot/catch-track so they never stall just before the button
        if (facing === "left" || facing === "right") {
          const objH = b.bounds.max.y - b.bounds.min.y;
          const objW = b.bounds.max.x - b.bounds.min.x;
          const dy = Math.abs(b.position.y - by);
          const dx = facing === "left" ? bx - b.position.x : b.position.x - bx;
          if (objH <= 118 && dy < 68 && dx > 0 && dx < 320) {
            // If it's a long rod (like a pencil/stick), keep it level so its tip enters the slot cleanly
            if (objW > objH * 1.6 && Math.abs(b.angle) < 0.45) {
              MatterBody.setAngle(b, b.angle * 0.8);
              MatterBody.setAngularVelocity(b, b.angularVelocity * 0.5);
            }
            const dir = facing === "left" ? 1 : -1;
            const isRoundish =
              Math.abs(objW - objH) <= Math.max(objW, objH) * 0.35 &&
              objH <= 115;
            // If nudged toward the button (or if a round ball landed on the catch floor near the button), carry it cleanly into the button
            if (
              b.velocity.x * dir > 0.12 ||
              (isRoundish && dx < 240 && b.velocity.x * dir >= -0.15)
            ) {
              MatterBody.setVelocity(b, {
                x: dir * Math.max(Math.abs(b.velocity.x), 2.5),
                y: b.velocity.y * 0.5,
              });
            }
          }
        }

        if (touchesButton(b)) {
          triggered = true;
          break;
        }
      }

      if (triggered) {
        this.activate();
      }
    }

    this.draw();
  }

  private activate() {
    if (this.isActivated) return;
    this.isActivated = true;

    for (const body of this.barrierBodies) {
      this.scene.matter.world.remove(body);
    }
    this.barrierBodies = [];

    this.scene.cameras.main.shake(150, 0.005);
    this.scene.tweens.add({
      targets: this.barrierGraphic,
      alpha: 0,
      duration: 380,
      ease: "Cubic.Out",
    });
  }

  private draw() {
    const {
      buttonX,
      buttonY,
      facing = "left",
      barrierX,
      barrierY,
      barrierW,
      barrierH,
      isCage,
    } = this.def;

    this.buttonGraphic.clear();

    // Soft sensor glow halo (like the yellow highlight in Screenshot 2)
    const haloRadius = 24 + Math.sin(this.pulsePhase) * 3;
    this.buttonGraphic.fillStyle(
      this.isActivated ? 0x22c55e : 0xfacc15,
      this.isActivated ? 0.22 : 0.28
    );
    this.buttonGraphic.fillCircle(buttonX, buttonY, haloRadius);

    // Base mount plate & plunger
    const btnColor = this.isActivated ? 0x22c55e : 0x10b981;
    const rimColor = this.isActivated ? 0x86efac : 0xfef08a;
    const depress = this.isActivated ? 5 : 0;

    if (facing === "left") {
      // Mounted on right wall, facing left
      this.buttonGraphic.fillStyle(0x334155, 1);
      this.buttonGraphic.lineStyle(2.5, 0x0f172a, 1);
      this.buttonGraphic.fillRoundedRect(buttonX + 4, buttonY - 18, 10, 36, 3);
      this.buttonGraphic.strokeRoundedRect(buttonX + 4, buttonY - 18, 10, 36, 3);

      this.buttonGraphic.fillStyle(btnColor, 1);
      this.buttonGraphic.lineStyle(2.5, rimColor, 1);
      this.buttonGraphic.fillCircle(buttonX - 4 + depress, buttonY, 12);
      this.buttonGraphic.strokeCircle(buttonX - 4 + depress, buttonY, 12);
    } else if (facing === "right") {
      // Mounted on left wall, facing right
      this.buttonGraphic.fillStyle(0x334155, 1);
      this.buttonGraphic.lineStyle(2.5, 0x0f172a, 1);
      this.buttonGraphic.fillRoundedRect(buttonX - 14, buttonY - 18, 10, 36, 3);
      this.buttonGraphic.strokeRoundedRect(buttonX - 14, buttonY - 18, 10, 36, 3);

      this.buttonGraphic.fillStyle(btnColor, 1);
      this.buttonGraphic.lineStyle(2.5, rimColor, 1);
      this.buttonGraphic.fillCircle(buttonX + 4 - depress, buttonY, 12);
      this.buttonGraphic.strokeCircle(buttonX + 4 - depress, buttonY, 12);
    } else {
      // Facing up
      this.buttonGraphic.fillStyle(0x334155, 1);
      this.buttonGraphic.lineStyle(2.5, 0x0f172a, 1);
      this.buttonGraphic.fillRoundedRect(buttonX - 18, buttonY + 4, 36, 10, 3);
      this.buttonGraphic.strokeRoundedRect(buttonX - 18, buttonY + 4, 36, 10, 3);

      this.buttonGraphic.fillStyle(btnColor, 1);
      this.buttonGraphic.lineStyle(2.5, rimColor, 1);
      this.buttonGraphic.fillCircle(buttonX, buttonY - 4 + depress, 12);
      this.buttonGraphic.strokeCircle(buttonX, buttonY - 4 + depress, 12);
    }

    if (!this.isActivated) {
      this.barrierGraphic.clear();
      const wallThick = 20;
      if (isCage) {
        // Green energy cage around goal flag (matching user's Screenshot 2)
        this.barrierGraphic.fillStyle(0x10b981, 0.35);
        this.barrierGraphic.lineStyle(4, 0x34d399, 0.95);

        // Left pillar
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

        // Right pillar
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

        // Top arch
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
        this.barrierGraphic.fillStyle(0x10b981, 0.4);
        this.barrierGraphic.lineStyle(3.5, 0x34d399, 0.95);
        this.barrierGraphic.fillRoundedRect(
          barrierX,
          barrierY,
          barrierW,
          barrierH,
          6
        );
        this.barrierGraphic.strokeRoundedRect(
          barrierX,
          barrierY,
          barrierW,
          barrierH,
          6
        );
      }
    }
  }
}

