import Phaser from "phaser";

export class PressureSwitch {
  private scene: Phaser.Scene;
  private switchX: number;
  private switchY: number;
  private gateBody: MatterJS.BodyType;
  private gateGraphic: Phaser.GameObjects.Graphics;
  private plateGraphic: Phaser.GameObjects.Graphics;
  private gateClosedY: number;
  private gateOpenY: number;
  private gateCurrentY: number;
  private gateX: number;
  private gateW: number;
  private gateH: number;
  private isPressed = false;

  constructor(
    scene: Phaser.Scene,
    switchX: number,
    switchY: number,
    gateX: number,
    gateY: number,
    gateH = 140
  ) {
    this.scene = scene;
    this.switchX = switchX;
    this.switchY = switchY;
    this.gateX = gateX;
    this.gateClosedY = gateY;
    this.gateOpenY = gateY - gateH - 10;
    this.gateCurrentY = gateY;
    this.gateW = 28;
    this.gateH = gateH;

    this.plateGraphic = scene.add.graphics().setDepth(3);
    this.gateGraphic = scene.add.graphics().setDepth(4);

    this.gateBody = scene.matter.add.rectangle(
      gateX,
      gateY,
      this.gateW,
      this.gateH,
      {
        isStatic: true,
        friction: 0.2,
      }
    );

    this.draw();
  }

  update(spawnedBodies: MatterJS.BodyType[], _playerBody: MatterJS.BodyType) {
    let totalWeightScore = 0;

    const checkBody = (b: MatterJS.BodyType) => {
      const dx = Math.abs(b.position.x - this.switchX);
      const dy = this.switchY - b.bounds.max.y;
      if (dx < 52 && dy >= -20 && dy <= 30) {
        const go = (b as any).gameObject ?? (b.parent as any)?.gameObject;
        const trait = go?.getData?.("trait");
        if (trait === "heavy") {
          totalWeightScore += 100;
        } else {
          totalWeightScore += Math.max(60, Math.min(95, b.mass * 22));
        }
      }
    };

    // Only summoned objects press the switch (not the player)
    for (const b of spawnedBodies) {
      checkBody(b);
    }

    this.isPressed = totalWeightScore >= 55;

    const targetY = this.isPressed ? this.gateOpenY : this.gateClosedY;
    this.gateCurrentY = Phaser.Math.Linear(this.gateCurrentY, targetY, 0.08);

    Phaser.Physics.Matter.Matter.Body.setPosition(this.gateBody, {
      x: this.gateX,
      y: this.gateCurrentY,
    });

    this.draw();
  }

  private draw() {
    this.plateGraphic.clear();
    this.plateGraphic.fillStyle(0x334155, 1);
    this.plateGraphic.lineStyle(2.5, 0x0f172a, 1);
    this.plateGraphic.fillRoundedRect(
      this.switchX - 42,
      this.switchY - 6,
      84,
      10,
      3
    );
    this.plateGraphic.strokeRoundedRect(
      this.switchX - 42,
      this.switchY - 6,
      84,
      10,
      3
    );

    const btnColor = this.isPressed ? 0x22c55e : 0xef4444;
    const offsetY = this.isPressed ? -9 : -15;
    this.plateGraphic.fillStyle(btnColor, 1);
    this.plateGraphic.fillRoundedRect(
      this.switchX - 34,
      this.switchY + offsetY,
      68,
      10,
      4
    );
    this.plateGraphic.strokeRoundedRect(
      this.switchX - 34,
      this.switchY + offsetY,
      68,
      10,
      4
    );

    this.gateGraphic.clear();
    this.gateGraphic.fillStyle(this.isPressed ? 0x22c55e : 0xdc2626, 0.92);
    this.gateGraphic.lineStyle(3.5, 0x0f172a, 1);
    this.gateGraphic.fillRoundedRect(
      this.gateX - this.gateW / 2,
      this.gateCurrentY - this.gateH / 2,
      this.gateW,
      this.gateH,
      6
    );
    this.gateGraphic.strokeRoundedRect(
      this.gateX - this.gateW / 2,
      this.gateCurrentY - this.gateH / 2,
      this.gateW,
      this.gateH,
      6
    );
  }
}
