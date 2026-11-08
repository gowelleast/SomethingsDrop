import Phaser from "phaser";
import { GameArtGenerator } from "../art/GameArtGenerator";

export class PortalCursor {
  private scene: Phaser.Scene;
  private portalSprite: Phaser.GameObjects.Sprite;
  private guideLine: Phaser.GameObjects.Graphics;
  private targetWorldX: number;
  private hasManualTarget = false;
  private lastPlayerX = Number.NaN;
  private readonly portalY = 82;

  constructor(scene: Phaser.Scene, initialX: number) {
    this.scene = scene;
    this.targetWorldX = initialX;

    GameArtGenerator.ensureCoreTextures(scene);

    if (!scene.anims.exists("portal_spin_v2")) {
      scene.anims.create({
        key: "portal_spin_v2",
        frames: scene.anims.generateFrameNumbers("portal_v2", {
          start: 0,
          end: 11,
        }),
        frameRate: 14,
        repeat: -1,
      });
    }

    this.guideLine = scene.add.graphics();
    this.guideLine.setDepth(3);

    this.portalSprite = scene.add.sprite(initialX, this.portalY, "portal_v2");
    this.portalSprite.setScale(0.92).setDepth(20);
    this.portalSprite.play("portal_spin_v2");

    const onPointerMove = (pointer: Phaser.Input.Pointer) => {
      if (pointer.y > 65 && scene.cameras?.main) {
        this.targetWorldX = Phaser.Math.Clamp(
          pointer.worldX,
          60,
          scene.cameras.main.getBounds().width - 60
        );
        this.hasManualTarget = true;
      }
    };
    scene.input.on("pointermove", onPointerMove);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      scene.input?.off("pointermove", onPointerMove);
    });
  }

  update(playerX: number, playerFlipX: boolean, autoTargetX?: number) {
    if (Number.isNaN(this.lastPlayerX)) {
      this.lastPlayerX = playerX;
    }

    const isTyping = document.activeElement?.id === "sd-word-input";
    const playerMoved = Math.abs(playerX - this.lastPlayerX) > 2.2;

    if (playerMoved) {
      this.lastPlayerX = playerX;
      if (!isTyping) {
        this.hasManualTarget = false;
      }
    }

    if (!this.hasManualTarget && !isTyping) {
      if (autoTargetX !== undefined) {
        this.targetWorldX = Phaser.Math.Clamp(
          autoTargetX,
          60,
          this.scene.cameras.main.getBounds().width - 60
        );
      } else {
        const offset = playerFlipX ? -90 : 90;
        this.targetWorldX = Phaser.Math.Clamp(
          playerX + offset,
          60,
          this.scene.cameras.main.getBounds().width - 60
        );
      }
    }

    this.portalSprite.x = Phaser.Math.Linear(
      this.portalSprite.x,
      this.targetWorldX,
      0.18
    );

    this.guideLine.clear();
    this.guideLine.lineStyle(1.5, 0x38bdf8, 0.25);
    const startY = this.portalY + 16;
    const endY = this.scene.scale.height - 60;
    for (let y = startY; y < endY; y += 16) {
      this.guideLine.lineBetween(
        this.portalSprite.x,
        y,
        this.portalSprite.x,
        Math.min(y + 8, endY)
      );
    }
  }

  getSpawnPoint(): { x: number; y: number } {
    return {
      x: this.portalSprite.x,
      y: this.portalY + 26,
    };
  }

  pulse() {
    this.scene.tweens.add({
      targets: this.portalSprite,
      scaleX: 1.18,
      scaleY: 1.18,
      duration: 160,
      yoyo: true,
      ease: "Quad.Out",
    });
  }
}
