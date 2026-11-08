import Phaser from "phaser";

export class SpikeHazard {
  public sensorBody: MatterJS.BodyType;
  private graphic: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height = 24
  ) {
    // Physical sensor slightly smaller than visual spikes so covering it with a plank shields the player!
    this.sensorBody = scene.matter.add.rectangle(
      x + width / 2,
      y - height / 2 + 4,
      width - 8,
      height - 6,
      {
        isStatic: true,
        isSensor: true,
      }
    );
    (this.sensorBody as any).isSpikeHazard = true;

    this.graphic = scene.add.graphics().setDepth(2);
    this.graphic.fillStyle(0xf43f5e, 1);
    this.graphic.lineStyle(2, 0x881337, 1);

    const spikeWidth = 20;
    const count = Math.max(1, Math.floor(width / spikeWidth));
    for (let i = 0; i < count; i++) {
      const sx = x + i * spikeWidth;
      this.graphic.beginPath();
      this.graphic.moveTo(sx, y);
      this.graphic.lineTo(sx + spikeWidth / 2, y - height);
      this.graphic.lineTo(sx + spikeWidth, y);
      this.graphic.closePath();
      this.graphic.fillPath();
      this.graphic.strokePath();
    }
  }
}

