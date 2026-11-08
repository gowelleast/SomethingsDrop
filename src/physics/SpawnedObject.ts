import Phaser from "phaser";
import { WordPhysicsSpec } from "../config/settings";
import { BuiltPhysicsObject } from "./PolygonPhysicsBuilder";

export class SpawnedObject {
  public readonly sprite: Phaser.Physics.Matter.Image;
  public readonly body: MatterJS.BodyType;
  public readonly spec: WordPhysicsSpec;
  public isDestroyed = false;

  private scene: Phaser.Scene;
  private badge: Phaser.GameObjects.Container;
  private isLockedSticky = false;
  private spawnTimestamp: number;
  private targetFloatY: number | null = null;
  private baseScaleX = 1;
  private baseScaleY = 1;
  private onDespawnCallback?: (obj: SpawnedObject) => void;

  constructor(
    scene: Phaser.Scene,
    built: BuiltPhysicsObject,
    spec: WordPhysicsSpec,
    onDespawn?: (obj: SpawnedObject) => void
  ) {
    this.scene = scene;
    this.sprite = built.matterImage;
    this.body = built.body;
    this.spec = spec;
    this.onDespawnCallback = onDespawn;
    this.spawnTimestamp = scene.time.now;

    this.sprite.setDepth(5);
    this.baseScaleX = this.sprite.scaleX;
    this.baseScaleY = this.sprite.scaleY;
    this.sprite.setData("spawnedObject", this);
    this.sprite.setData("trait", spec.trait);
    this.sprite.setData("spec", spec);

    // Spawn flash effect
    this.sprite.setTintFill(0xffffff);
    scene.time.delayedCall(220, () => {
      if (!this.isDestroyed && this.sprite.active) {
        this.sprite.clearTint();
      }
    });

    // Floating badge above the spawned object
    const badgeBg = scene.add.graphics();
    const label = scene.add
      .text(0, 0, `${spec.badgeText}`, {
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: "12px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const padX = 14;
    const padY = 8;
    const w = label.width + padX;
    const h = label.height + padY;
    badgeBg.fillStyle(0x0f172a, 0.82);
    badgeBg.lineStyle(1.5, Phaser.Display.Color.HexStringToColor(spec.colorAccent).color, 0.95);
    badgeBg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
    badgeBg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);

    this.badge = scene.add.container(this.sprite.x, this.sprite.y - 45, [
      badgeBg,
      label,
    ]);
    this.badge.setDepth(25);

    // Fade badge slightly after 3.5 seconds, show full on hover
    scene.time.delayedCall(3500, () => {
      if (!this.isDestroyed && this.badge.active) {
        scene.tweens.add({
          targets: this.badge,
          alpha: 0.35,
          duration: 600,
        });
      }
    });

    // Interactive click-to-remove & hover highlight
    this.sprite.setInteractive({ useHandCursor: true });
    this.sprite.on("pointerover", () => {
      if (this.isDestroyed) return;
      this.badge.setAlpha(1);
      this.sprite.setTint(0xfef08a);
    });
    this.sprite.on("pointerout", () => {
      if (this.isDestroyed) return;
      this.badge.setAlpha(0.35);
      this.sprite.clearTint();
    });
    this.sprite.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      // Right-click or left-click directly on object despawns it
      if (pointer.button === 0 || pointer.button === 2) {
        this.despawn();
      }
    });
  }

  update() {
    if (this.isDestroyed || !this.sprite.active) return;

    // Update badge position above the bounding box top
    const topY = this.body.bounds.min.y;
    this.badge.setPosition(this.body.position.x, topY - 16);

    const MatterBody = Phaser.Physics.Matter.Matter.Body;

    // Trait: FLOAT (counteract gravity so it hovers at an ergonomic stepping-stone height)
    if (this.spec.trait === "float" && !this.body.isStatic) {
      const worldGravityY = 0.001; // Standard Matter.js gravity scale * y(1)
      const cancelForceY = -this.body.mass * worldGravityY;

      if (this.targetFloatY === null) {
        const halfH = Math.max(
          20,
          (this.body.bounds.max.y - this.body.bounds.min.y) * 0.5
        );
        const sceneAny = this.scene as any;
        if (typeof sceneAny.getIdealFloatY === "function") {
          this.targetFloatY = sceneAny.getIdealFloatY(
            this.body.position.x,
            halfH
          );
        } else {
          this.targetFloatY = 380;
        }
      }

      if (this.targetFloatY !== null) {
        const dy = this.targetFloatY - this.body.position.y;
        // Let it descend quickly from the portal until near targetFloatY, then lock into a firm hover
        if (dy > 28 && this.scene.time.now - this.spawnTimestamp < 900) {
          MatterBody.setVelocity(this.body, {
            x: this.body.velocity.x * 0.9,
            y: Math.min(4.2, Math.max(2.2, dy * 0.06)),
          });
        } else {
          const springForce = dy * 0.00036 * this.body.mass;
          MatterBody.applyForce(this.body, this.body.position, {
            x: 0,
            y: cancelForceY + springForce,
          });
          const windVx = (this.body as any).windCarryVx;
          if (typeof windVx === "number" && Math.abs(windVx) > 0.05) {
            MatterBody.setVelocity(this.body, {
              x: windVx,
              y: this.body.velocity.y * 0.78,
            });
            (this.body as any).windCarryVx = 0;
          } else {
            // Dampen velocity & keep horizontal level so player can stand and jump on it comfortably
            MatterBody.setVelocity(this.body, {
              x: this.body.velocity.x * 0.84,
              y: this.body.velocity.y * 0.78,
            });
          }
        }
        MatterBody.setAngle(this.body, this.body.angle * 0.85);
        MatterBody.setAngularVelocity(this.body, this.body.angularVelocity * 0.5);
      }
    }

    // Trait: BOUNCY (settle quickly on the ground without jittering or hopping)
    if (this.spec.trait === "bouncy" && !this.body.isStatic) {
      if (this.scene.time.now - this.spawnTimestamp > 500) {
        const vx = this.body.velocity.x;
        const vy = this.body.velocity.y;
        if (vy < 0 && vy > -2.5) {
          MatterBody.setVelocity(this.body, { x: vx * 0.85, y: 0 });
        } else if (Math.abs(vx) < 0.35 && Math.abs(vy) < 0.45) {
          MatterBody.setVelocity(this.body, { x: 0, y: 0 });
        }
        if (Math.abs(this.body.angularVelocity) < 0.05) {
          MatterBody.setAngularVelocity(this.body, 0);
        } else {
          MatterBody.setAngularVelocity(this.body, this.body.angularVelocity * 0.85);
        }
      }
    }
  }

  /**
   * Visual squash-and-stretch feedback when the player bounces off this object.
   */
  triggerBouncePadEffect() {
    if (this.isDestroyed || !this.sprite.active) return;
    const MatterBody = Phaser.Physics.Matter.Matter.Body;
    if (!this.body.isStatic) {
      MatterBody.setVelocity(this.body, {
        x: this.body.velocity.x * 0.2,
        y: Math.max(0, this.body.velocity.y * 0.2),
      });
      MatterBody.setAngularVelocity(this.body, 0);
    }

    this.scene.tweens.killTweensOf(this.sprite);
    this.sprite.setScale(this.baseScaleX, this.baseScaleY);
    this.scene.tweens.add({
      targets: this.sprite,
      scaleX: this.baseScaleX * 1.18,
      scaleY: this.baseScaleY * 0.78,
      duration: 85,
      yoyo: true,
      ease: "Quad.Out",
    });
  }

  /**
   * Called when this object collides with another body in the world.
   */
  handleCollision(otherBody: MatterJS.BodyType, impactSpeed: number) {
    if (this.isDestroyed) return;
    const MatterBody = Phaser.Physics.Matter.Matter.Body;

    // Trait: STICKY — locks in place when touching terrain or another object
    if (
      this.spec.trait === "sticky" &&
      !this.isLockedSticky &&
      this.scene.time.now - this.spawnTimestamp > 200
    ) {
      const otherObj = (otherBody as any).gameObject;
      const isPlayer = otherObj?.getData?.("type") === "player";
      if (!isPlayer) {
        this.isLockedSticky = true;
        MatterBody.setVelocity(this.body, { x: 0, y: 0 });
        MatterBody.setAngularVelocity(this.body, 0);
        MatterBody.setStatic(this.body, true);

        // Visual feedback for magnetic/sticky lock
        this.scene.cameras.main.shake(90, 0.003);
        this.sprite.setTint(0xf472b6);
        this.scene.time.delayedCall(250, () => {
          if (!this.isDestroyed && this.sprite.active) this.sprite.clearTint();
        });
      }
    }

    // Trait: HEAVY — camera thud when landing hard
    if (this.spec.trait === "heavy" && impactSpeed > 3.5) {
      this.scene.cameras.main.shake(140, 0.006);
    }
  }

  despawn() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;

    this.scene.tweens.add({
      targets: [this.sprite, this.badge],
      alpha: 0,
      scaleX: 0.4,
      scaleY: 0.4,
      duration: 240,
      ease: "Back.In",
      onComplete: () => {
        this.destroyImmediate();
      },
    });
  }

  destroyImmediate() {
    this.isDestroyed = true;
    this.badge?.destroy();
    const texKey = this.sprite?.texture?.key;
    if (this.sprite && this.sprite.scene) {
      this.sprite.destroy();
    }
    if (
      texKey &&
      texKey.startsWith("spawn_") &&
      this.scene.textures?.exists(texKey)
    ) {
      this.scene.textures.remove(texKey);
    }
    this.onDespawnCallback?.(this);
  }
}

