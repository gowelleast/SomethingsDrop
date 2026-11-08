import Phaser from "phaser";

export class Seesaw {
  private scene: Phaser.Scene;
  private plankBody: MatterJS.BodyType;
  private graphic: Phaser.GameObjects.Graphics;
  private pivotX: number;
  private pivotY: number;
  private width: number;
  private height: number;
  private lastCatapultTime = 0;
  private ignorePlayerUntil = 0;
  private readonly maxAngle = 0.42; // ~24 degrees
  private readonly maxAngularSpeed = 0.042; // prevents the bar from whipping past the player in 1 frame

  constructor(
    scene: Phaser.Scene,
    pivotX: number,
    pivotY: number,
    width = 300,
    height = 20
  ) {
    this.scene = scene;
    this.pivotX = pivotX;
    this.pivotY = pivotY;
    this.width = width;
    this.height = height;

    const MatterLib = Phaser.Physics.Matter.Matter;
    const MatterBody = MatterLib.Body;

    this.plankBody = scene.matter.add.rectangle(pivotX, pivotY, width, height, {
      density: 0.045,
      friction: 0.85,
      restitution: 0.05,
    });

    // Pin the plank to the world at (pivotX, pivotY)
    const constraint = MatterLib.Constraint.create({
      pointA: { x: pivotX, y: pivotY },
      bodyB: this.plankBody,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0,
    });

    scene.matter.world.add(constraint);

    // Clamp angular velocity & angle inside Matter's physics step so a heavy rock
    // can NEVER snap the bar through the player's body in a single tick!
    const clampPlankStep = () => {
      if (!this.plankBody || !this.plankBody.position) return;
      MatterBody.setPosition(this.plankBody, {
        x: this.pivotX,
        y: this.pivotY,
      });
      MatterBody.setVelocity(this.plankBody, { x: 0, y: 0 });

      if (this.plankBody.angularVelocity > this.maxAngularSpeed) {
        MatterBody.setAngularVelocity(this.plankBody, this.maxAngularSpeed);
      } else if (this.plankBody.angularVelocity < -this.maxAngularSpeed) {
        MatterBody.setAngularVelocity(this.plankBody, -this.maxAngularSpeed);
      }

      if (this.plankBody.angle > this.maxAngle) {
        MatterBody.setAngle(this.plankBody, this.maxAngle);
        if (this.plankBody.angularVelocity > 0) {
          MatterBody.setAngularVelocity(this.plankBody, 0);
        }
      } else if (this.plankBody.angle < -this.maxAngle) {
        MatterBody.setAngle(this.plankBody, -this.maxAngle);
        if (this.plankBody.angularVelocity < 0) {
          MatterBody.setAngularVelocity(this.plankBody, 0);
        }
      }
    };

    scene.matter.world.on("beforeupdate", clampPlankStep);
    scene.matter.world.on("afterupdate", clampPlankStep);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      scene.matter?.world?.off("beforeupdate", clampPlankStep);
      scene.matter?.world?.off("afterupdate", clampPlankStep);
    });

    this.graphic = scene.add.graphics().setDepth(4);
  }

  update(
    spawnedBodies: MatterJS.BodyType[] = [],
    playerBody?: MatterJS.BodyType
  ) {
    const maxAngle = this.maxAngle;
    const MatterBody = Phaser.Physics.Matter.Matter.Body;
    const halfW = this.width / 2;

    // Restore player collision once the upward catapult pass-through window finishes
    if (this.scene.time.now < this.ignorePlayerUntil) {
      this.plankBody.collisionFilter.mask = ~0x0002;
    } else {
      this.plankBody.collisionFilter.mask = 0xffffffff;
    }

    // Detect heavy / falling object impact on either side of the seesaw to trigger a super catapult launch!
    if (this.scene.time.now - this.lastCatapultTime > 420) {
      for (const b of spawnedBodies) {
        const dx = b.position.x - this.pivotX;
        if (Math.abs(dx) < 12 || Math.abs(dx) > halfW + 35) continue;

        const plankSurfaceY =
          this.pivotY + Math.sin(this.plankBody.angle) * dx - this.height / 2;
        const distY = plankSurfaceY - b.bounds.max.y;

        const go = (b as any).gameObject ?? (b.parent as any)?.gameObject;
        const trait = go?.getData?.("trait");
        const isHeavyOrFast =
          (trait === "heavy" && b.velocity.y > 1.0) || b.velocity.y > 2.8;

        // Trigger right as the falling rock reaches the plank (before it pushes the bar through the player)
        if (distY >= -35 && distY <= 52 && isHeavyOrFast) {
          this.lastCatapultTime = this.scene.time.now;
          const impactSide: "left" | "right" = dx < 0 ? "left" : "right";

          // Smoothly rotate the plank (DO NOT teleport setAngle, which would jump the bar above the player's head!)
          MatterBody.setAngularVelocity(
            this.plankBody,
            impactSide === "left" ? -this.maxAngularSpeed : this.maxAngularSpeed
          );
          // Dampen the rock's downward slam so it doesn't impart a violent spike impulse
          MatterBody.setVelocity(b, {
            x: b.velocity.x * 0.4,
            y: Math.min(b.velocity.y, 1.8),
          });
          this.scene.cameras.main.shake(140, 0.006);

          // 1. Launch player if standing on the seesaw away from the falling rock!
          if (playerBody) {
            const pDx = playerBody.position.x - this.pivotX;
            const onSeesaw = Math.abs(pDx) < halfW + 45;
            const awayFromImpact =
              (impactSide === "left" && pDx > -20) ||
              (impactSide === "right" && pDx < 20) ||
              Math.abs(playerBody.position.x - b.position.x) > 32;
            const pDistY = Math.abs(playerBody.bounds.max.y - this.pivotY);

            if (onSeesaw && awayFromImpact && pDistY < 130) {
              // Make the seesaw bar completely non-blocking to the player during the launch
              // so the bar can NEVER hit the player's head or block their upward trajectory!
              this.ignorePlayerUntil = this.scene.time.now + 520;
              this.plankBody.collisionFilter.mask = ~0x0002;

              const plankYAtPlayer =
                this.pivotY +
                Math.sin(this.plankBody.angle) * pDx -
                this.height / 2;
              const playerHalfH =
                (playerBody.bounds.max.y - playerBody.bounds.min.y) / 2 || 28;
              const safePlayerY = Math.min(
                playerBody.position.y,
                plankYAtPlayer - playerHalfH - 12
              );

              // Place player cleanly above the plank surface before launching upward
              MatterBody.setPosition(playerBody, {
                x: playerBody.position.x,
                y: safePlayerY,
              });
              MatterBody.setVelocity(playerBody, {
                x: 4.3,
                y: -17.0,
              });
              (playerBody as any).catapultGraceUntil =
                this.scene.time.now + 550;
            }
          }

          // 2. Also launch any other spawned object resting on the opposite side (Trebuchet mechanic!)
          for (const other of spawnedBodies) {
            if (other === b || other.isStatic) continue;
            const oDx = other.position.x - this.pivotX;
            const onOppositeSide =
              (impactSide === "left" && oDx > 10 && oDx < halfW + 30) ||
              (impactSide === "right" && oDx < -10 && oDx > -(halfW + 30));
            const oDistY = Math.abs(other.bounds.max.y - this.pivotY);

            if (onOppositeSide && oDistY < 105) {
              const launchVx = impactSide === "left" ? 6.8 : -6.8;
              MatterBody.setVelocity(other, {
                x: launchVx,
                y: -15.4,
              });
            }
          }
          break;
        }
      }
    }

    if (this.plankBody.angle > maxAngle) {
      MatterBody.setAngle(this.plankBody, maxAngle);
      MatterBody.setAngularVelocity(this.plankBody, 0);
    } else if (this.plankBody.angle < -maxAngle) {
      MatterBody.setAngle(this.plankBody, -maxAngle);
      MatterBody.setAngularVelocity(this.plankBody, 0);
    }

    this.graphic.clear();

    // Draw fulcrum triangle
    this.graphic.fillStyle(0x475569, 1);
    this.graphic.lineStyle(2.5, 0x0f172a, 1);
    this.graphic.beginPath();
    this.graphic.moveTo(this.pivotX, this.pivotY);
    this.graphic.lineTo(this.pivotX - 26, this.pivotY + 40);
    this.graphic.lineTo(this.pivotX + 26, this.pivotY + 40);
    this.graphic.closePath();
    this.graphic.fillPath();
    this.graphic.strokePath();

    // Draw rotated plank with catapult target pads on both ends
    this.graphic.save();
    this.graphic.translateCanvas(
      this.plankBody.position.x,
      this.plankBody.position.y
    );
    this.graphic.rotateCanvas(this.plankBody.angle);
    this.graphic.fillStyle(0xf59e0b, 1);
    this.graphic.lineStyle(3, 0x78350f, 1);
    this.graphic.fillRoundedRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      6
    );
    this.graphic.strokeRoundedRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      6
    );

    // End launch pad markings
    this.graphic.fillStyle(0xfef08a, 0.9);
    this.graphic.fillRect(-this.width / 2 + 12, -this.height / 2 + 2, 54, 4);
    this.graphic.fillRect(this.width / 2 - 66, -this.height / 2 + 2, 54, 4);
    this.graphic.restore();

    // Pivot bolt
    this.graphic.fillStyle(0xfef08a, 1);
    this.graphic.fillCircle(this.pivotX, this.pivotY, 6);
  }
}
