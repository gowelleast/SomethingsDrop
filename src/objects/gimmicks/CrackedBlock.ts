import Phaser from "phaser";

export class CrackedBlock {
  public body: MatterJS.BodyType;
  public isBroken = false;
  private scene: Phaser.Scene;
  private graphic: Phaser.GameObjects.Graphics;
  private x: number;
  private y: number;
  private w: number;
  private h: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.body = scene.matter.add.rectangle(x, y, w, h, {
      isStatic: true,
      friction: 0.6,
    });
    (this.body as any).crackedBlock = this;

    this.graphic = scene.add.graphics().setDepth(3);
    this.draw();
  }

  private draw() {
    this.graphic.clear();
    this.graphic.fillStyle(0x78350f, 0.95);
    this.graphic.lineStyle(3.5, 0x0f172a, 1);
    this.graphic.fillRoundedRect(
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h,
      6
    );
    this.graphic.strokeRoundedRect(
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h,
      6
    );

    // Visual crack lines (no text needed)
    this.graphic.lineStyle(2.5, 0xfef08a, 0.85);
    this.graphic.beginPath();
    this.graphic.moveTo(this.x - this.w * 0.25, this.y - this.h / 2);
    this.graphic.lineTo(this.x - 5, this.y);
    this.graphic.lineTo(this.x + this.w * 0.2, this.y + this.h / 2);
    this.graphic.moveTo(this.x + 15, this.y - this.h / 2);
    this.graphic.lineTo(this.x - 5, this.y);
    this.graphic.strokePath();
  }

  shatter() {
    if (this.isBroken) return;
    this.isBroken = true;

    this.scene.matter.world.remove(this.body);
    this.graphic.destroy();
    this.scene.cameras.main.shake(180, 0.008);

    for (let i = 0; i < 8; i++) {
      const p = this.scene.add.rectangle(
        this.x + Phaser.Math.Between(-this.w / 3, this.w / 3),
        this.y,
        12,
        12,
        0x92400e
      );
      this.scene.tweens.add({
        targets: p,
        x: p.x + Phaser.Math.Between(-60, 60),
        y: p.y + Phaser.Math.Between(30, 90),
        angle: Phaser.Math.Between(-180, 180),
        alpha: 0,
        duration: 450,
        onComplete: () => p.destroy(),
      });
    }
  }
}
