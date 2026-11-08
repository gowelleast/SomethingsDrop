import Phaser from "phaser";
import { GameArtGenerator } from "../art/GameArtGenerator";
import { ObjectTrait } from "../config/settings";

export default class Player {
  public sprite: Phaser.Physics.Matter.Sprite;

  private scene: Phaser.Scene;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys: {
    A: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    W: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
  };
  private sensors: { bottom: MatterJS.BodyType };
  private lastBounceTime = 0;
  private lastJumpTime = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    GameArtGenerator.ensureCoreTextures(scene);
    Player.registerAnimations(scene);

    const kb = scene.input.keyboard!;
    this.cursors = kb.createCursorKeys();
    this.keys = {
      A: kb.addKey(Phaser.Input.Keyboard.KeyCodes.A, false),
      D: kb.addKey(Phaser.Input.Keyboard.KeyCodes.D, false),
      W: kb.addKey(Phaser.Input.Keyboard.KeyCodes.W, false),
      SPACE: kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, false),
    };

    this.sprite = scene.matter.add.sprite(
      x,
      y,
      "player_sheet_idle",
      0,
      {
        friction: 0.002,
        restitution: 0.0,
      }
    );

    const mainBody = scene.matter.bodies.rectangle(0, 4, 28, 34, {
      chamfer: { radius: 5 },
      density: 0.002,
      collisionFilter: { category: 0x0002, mask: 0xffffffff, group: 0 },
    }) as MatterJS.BodyType;

    this.sensors = {
      bottom: scene.matter.bodies.rectangle(0, 22, 14, 4, {
        isSensor: true,
        isStatic: false,
        collisionFilter: { category: 0x0002, mask: 0xffffffff, group: 0 },
      }) as MatterJS.BodyType,
    };

    const compoundBody = scene.matter.body.create({
      parts: [mainBody, this.sensors.bottom],
      friction: 0.002,
      restitution: 0,
      density: 0.002,
      collisionFilter: { category: 0x0002, mask: 0xffffffff, group: 0 },
    }) as MatterJS.BodyType;

    this.sprite.setExistingBody(compoundBody);
    this.sprite.setFixedRotation();
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setData("type", "player");
    this.sprite.anims.play("player_idle");
  }

  static preload(_scene: Phaser.Scene) {
    // Procedural textures are generated via GameArtGenerator.ensureCoreTextures()
  }

  static registerAnimations(scene: Phaser.Scene) {
    GameArtGenerator.ensureCoreTextures(scene);

    if (!scene.anims.exists("player_idle")) {
      scene.anims.create({
        key: "player_idle",
        frames: scene.anims.generateFrameNumbers("player_sheet_idle", {
          start: 0,
          end: 3,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!scene.anims.exists("player_run")) {
      scene.anims.create({
        key: "player_run",
        frames: scene.anims.generateFrameNumbers("player_sheet_run", {
          start: 0,
          end: 5,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!scene.anims.exists("player_jump")) {
      scene.anims.create({
        key: "player_jump",
        frames: scene.anims.generateFrameNumbers("player_sheet_jump", {
          start: 0,
          end: 3,
        }),
        frameRate: 8,
        repeat: 0,
      });
    }
  }

  private isTypingInInput(): boolean {
    const el = document.activeElement;
    return (
      !!el &&
      (el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT")
    );
  }

  update() {
    const contacts = (this.scene.matter as any).world.engine.pairs.list;
    let isOnGround = false;
    let groundTrait: ObjectTrait = "normal";
    let groundSpawnedObj: any = null;
    let groundVx = 0;

    for (const pair of contacts) {
      if (!pair.isActive) continue;
      let otherBody: MatterJS.BodyType | null = null;
      if (pair.bodyA === this.sensors.bottom) {
        otherBody = pair.bodyB;
      } else if (pair.bodyB === this.sensors.bottom) {
        otherBody = pair.bodyA;
      }

      if (otherBody && !otherBody.isSensor) {
        // Ignore purely side-wall contacts (must have horizontal overlap with foot center or normal pointing up/down)
        const sensorX = this.sensors.bottom.position.x;
        const sensorTopY = this.sensors.bottom.bounds.min.y;
        const horizontallyOverFoot =
          sensorX >= otherBody.bounds.min.x - 4 &&
          sensorX <= otherBody.bounds.max.x + 4;
        const isBelowFoot = otherBody.bounds.min.y >= sensorTopY - 8;
        const normalY = Math.abs(pair.collision?.normal?.y ?? 1);

        if ((horizontallyOverFoot && isBelowFoot) || normalY > 0.55) {
          isOnGround = true;
          const rootOther = otherBody.parent || otherBody;
          if (!rootOther.isStatic && Math.abs(rootOther.velocity.x) > 0.1) {
            groundVx = rootOther.velocity.x;
          }
          const go =
            (otherBody as any).gameObject ??
            (otherBody.parent as any)?.gameObject;
          const trait = go?.getData?.("trait") as ObjectTrait | undefined;
          if (trait && trait !== "normal") {
            groundTrait = trait;
            groundSpawnedObj = go?.getData?.("spawnedObject") ?? null;
          }
        }
      }
    }

    // Auto super-bounce if landing on a bouncy object
    if (
      isOnGround &&
      groundTrait === "bouncy" &&
      this.scene.time.now - this.lastBounceTime > 280
    ) {
      this.lastBounceTime = this.scene.time.now;
      this.sprite.setVelocityY(-12.2);
      this.sprite.anims.play("player_jump", true);
      groundSpawnedObj?.triggerBouncePadEffect?.();
      this.scene.tweens.add({
        targets: this.sprite,
        scaleX: 1.25,
        scaleY: 0.75,
        duration: 90,
        yoyo: true,
      });
      return;
    }

    const typing = this.isTypingInInput();
    const moveLeft =
      this.cursors.left?.isDown || (!typing && this.keys.A.isDown);
    const moveRight =
      this.cursors.right?.isDown || (!typing && this.keys.D.isDown);
    const moveJump =
      this.cursors.up?.isDown ||
      (!typing && (this.keys.W.isDown || this.keys.SPACE.isDown));

    const currentAnim = this.sprite.anims.currentAnim?.key;
    const isSlippery = isOnGround && groundTrait === "slippery";
    const baseSpeed = isSlippery ? 5.2 : 3.6;

    const currentVx = (this.sprite.body as MatterJS.BodyType).velocity.x;

    if (moveLeft) {
      const targetVx = isSlippery
        ? Phaser.Math.Linear(currentVx, -baseSpeed, 0.08)
        : -baseSpeed;
      this.sprite.setVelocityX(targetVx);
      this.sprite.setFlipX(true);
      if (isOnGround && currentAnim !== "player_run") {
        this.sprite.anims.play("player_run", true);
      }
    } else if (moveRight) {
      const targetVx = isSlippery
        ? Phaser.Math.Linear(currentVx, baseSpeed, 0.08)
        : baseSpeed;
      this.sprite.setVelocityX(targetVx);
      this.sprite.setFlipX(false);
      if (isOnGround && currentAnim !== "player_run") {
        this.sprite.anims.play("player_run", true);
      }
    } else {
      const pBody = this.sprite.body as any;
      const inCatapultArc =
        !isOnGround &&
        pBody.catapultGraceUntil &&
        this.scene.time.now < pBody.catapultGraceUntil;

      if (isSlippery || inCatapultArc) {
        this.sprite.setVelocityX(currentVx * 0.98);
      } else if (isOnGround && Math.abs(groundVx) > 0.1) {
        this.sprite.setVelocityX(groundVx);
      } else {
        this.sprite.setVelocityX(0);
      }
      if (isOnGround && currentAnim !== "player_idle") {
        this.sprite.anims.play("player_idle", true);
      }
    }

    if (
      moveJump &&
      isOnGround &&
      this.scene.time.now - this.lastJumpTime > 240
    ) {
      this.lastJumpTime = this.scene.time.now;
      const jumpPower = groundTrait === "bouncy" ? -12.2 : -8.5;
      this.sprite.setVelocityY(jumpPower);
      this.sprite.anims.play("player_jump", true);
    }

    if (!isOnGround && currentAnim !== "player_jump") {
      this.sprite.anims.play("player_jump", true);
    }
  }

  respawn(x: number, y: number) {
    this.sprite.setPosition(x, y);
    this.sprite.setVelocity(0, 0);
    const body = this.sprite.body as MatterJS.BodyType;
    if (body) {
      body.force.x = 0;
      body.force.y = 0;
      body.torque = 0;
      body.angle = 0;
      body.angularVelocity = 0;
    }
    this.sprite.setTint(0xfca5a5);
    this.scene.time.delayedCall(300, () => {
      if (this.sprite.active) this.sprite.clearTint();
    });
  }
}
