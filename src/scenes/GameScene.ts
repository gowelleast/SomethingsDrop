import Phaser from "phaser";
import { GameArtGenerator } from "../art/GameArtGenerator";
import { settingsStore } from "../config/settings";
import { StageConfig } from "../levels/LevelTypes";
import { STAGES } from "../levels/stages";
import { CrackedBlock } from "../objects/gimmicks/CrackedBlock";
import { LaserBeam } from "../objects/gimmicks/LaserBeam";
import { PressureSwitch } from "../objects/gimmicks/PressureSwitch";
import { Seesaw } from "../objects/gimmicks/Seesaw";
import { SlotButton } from "../objects/gimmicks/SlotButton";
import { SpikeHazard } from "../objects/gimmicks/SpikeHazard";
import { WindZone } from "../objects/gimmicks/WindZone";
import Player from "../objects/Player";
import { PortalCursor } from "../objects/PortalCursor";
import { PolygonPhysicsBuilder } from "../physics/PolygonPhysicsBuilder";
import { SpawnedObject } from "../physics/SpawnedObject";
import { AIService } from "../services/AIService";
import { HudOverlay } from "../ui/HudOverlay";

export default class GameScene extends Phaser.Scene {
  private currentStageIndex = 0;
  private currentStage!: StageConfig;
  private player!: Player;
  private portalCursor!: PortalCursor;
  private hud?: HudOverlay;

  private spawnedObjects: SpawnedObject[] = [];
  private activeBodiesBuffer: MatterJS.BodyType[] = [];
  private switches: PressureSwitch[] = [];
  private slotButtons: SlotButton[] = [];
  private windZones: WindZone[] = [];
  private seesaws: Seesaw[] = [];
  private crackedBlocks: CrackedBlock[] = [];
  private spikes: SpikeHazard[] = [];
  private lasers: LaserBeam[] = [];

  private totalSpawnsInStage = 0;
  private isStageCleared = false;
  private readonly handleLaserPlayerHit = () => {
    this.player.respawn(this.currentStage.spawn.x, this.currentStage.spawn.y);
  };

  constructor() {
    super({ key: "GameScene" });
  }

  init(data?: { stageId?: number }) {
    if (data?.stageId) {
      const idx = STAGES.findIndex((s) => s.id === data.stageId);
      if (idx >= 0) this.currentStageIndex = idx;
    }
    this.currentStage = STAGES[this.currentStageIndex] || STAGES[0];
    this.spawnedObjects = [];
    this.switches = [];
    this.slotButtons = [];
    this.windZones = [];
    this.seesaws = [];
    this.crackedBlocks = [];
    this.spikes = [];
    this.lasers = [];
    this.totalSpawnsInStage = 0;
    this.isStageCleared = false;
  }

  preload() {
    this.load.audio("spawn", "assets/audio/image_spawn.mp3");
    this.load.audio("main_bgm", "assets/audio/main_bgm.mp3");
    this.load.audio("click", "assets/audio/click.mp3");
  }

  create() {
    GameArtGenerator.ensureCoreTextures(this);
    this.playBgm();

    const st = this.currentStage;

    this.matter.world.setBounds(
      0,
      -120,
      st.worldWidth,
      st.worldHeight + 220,
      32,
      true,
      true,
      false,
      false
    );

    this.cameras.main.fadeIn(350, 0, 0, 0);

    GameArtGenerator.drawStageBackground(
      this,
      st.worldWidth,
      st.worldHeight,
      st.theme
    );
    this.buildPlatforms(st);
    this.buildGimmicks(st);
    this.buildGoalFlag(st);

    this.player = new Player(this, st.spawn.x, st.spawn.y);
    this.player.sprite.setDepth(10);

    this.portalCursor = new PortalCursor(this, st.spawn.x + 120);

    this.cameras.main.setBounds(0, 0, st.worldWidth, st.worldHeight);
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

    this.setupPhysicsCollisions();

    const debugOn = settingsStore.get().debugPhysics;
    this.configureMatterDebug(debugOn);
    this.matter.world.on("beforeadd", (event: any) => {
      const objs: any[] = [].concat(event.object);
      for (const obj of objs) {
        if (obj && obj.type === "body") {
          this.matter.world.setBodyRenderStyle(obj);
        } else if (obj && obj.type === "constraint") {
          this.matter.world.setConstraintRenderStyle(obj);
        }
      }
    });

    this.setupHud();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      for (const obj of this.spawnedObjects) {
        obj.destroyImmediate();
      }
      this.spawnedObjects = [];
      this.activeBodiesBuffer.length = 0;
      this.hud?.destroy();
      this.hud = undefined;
    });
  }

  update() {
    if (!this.player || this.isStageCleared) return;

    this.player.update();
    this.portalCursor.update(
      this.player.sprite.x,
      this.player.sprite.flipX,
      this.getSeesawAutoTargetX(this.player.sprite.x, this.player.sprite.y)
    );

    if (this.player.sprite.y > this.currentStage.worldHeight + 80) {
      this.player.respawn(
        this.currentStage.spawn.x,
        this.currentStage.spawn.y
      );
    }

    const activeBodies = this.activeBodiesBuffer;
    activeBodies.length = 0;
    for (let i = 0; i < this.spawnedObjects.length; i++) {
      const obj = this.spawnedObjects[i];
      if (!obj.isDestroyed) {
        obj.update();
        activeBodies.push(obj.body);
      }
    }
    const playerBody = this.player.sprite.body as MatterJS.BodyType;

    for (const sw of this.switches) {
      sw.update(activeBodies, playerBody);
    }
    for (const sb of this.slotButtons) {
      sb.update(activeBodies, playerBody);
    }
    for (const wz of this.windZones) {
      wz.update(activeBodies, playerBody);
    }
    for (const ss of this.seesaws) {
      ss.update(activeBodies, playerBody);
    }
    for (const lz of this.lasers) {
      lz.update(activeBodies, playerBody, this.handleLaserPlayerHit);
    }
  }

  private getSeesawAutoTargetX(
    playerX: number,
    playerY: number
  ): number | undefined {
    if (!this.currentStage.seesaws) return undefined;
    for (const ss of this.currentStage.seesaws) {
      const w = ss.width ?? 300;
      const dx = playerX - ss.pivotX;
      const dy = Math.abs(playerY - ss.pivotY);
      if (Math.abs(dx) <= w / 2 + 24 && dy < 120) {
        return dx <= 0 ? ss.pivotX + w * 0.34 : ss.pivotX - w * 0.34;
      }
    }
    return undefined;
  }

  private setupHud() {
    this.hud?.destroy();
    this.hud = new HudOverlay({
      onSummonWord: (word) => this.summonWord(word),
      onSelectStage: (stageId) => {
        this.scene.restart({ stageId });
      },
      onRestartStage: () => {
        this.scene.restart({ stageId: this.currentStage.id });
      },
      onClearObjects: () => {
        const copy = [...this.spawnedObjects];
        copy.forEach((o) => o.despawn());
        this.spawnedObjects = [];
      },
      onToggleDebug: (enabled) => {
        this.configureMatterDebug(enabled);
      },
      onBackToTitle: () => {
        this.hud?.destroy();
        this.hud = undefined;
        this.scene.start("TitleScene");
      },
    });

    this.hud.setStageInfo(this.currentStage, this.totalSpawnsInStage);
  }

  private configureMatterDebug(enabled: boolean) {
    const existingGraphic = this.matter.world.debugGraphic as any;
    if (
      !existingGraphic ||
      !existingGraphic.scene ||
      !existingGraphic.commandBuffer
    ) {
      this.matter.world.createDebugGraphic();
    }
    this.matter.world.debugConfig = {
      ...this.matter.world.debugConfig,
      showBody: true,
      showStaticBody: true,
      showInternalEdges: true,
      showVelocity: true,
      showSensors: true,
      showJoint: true,
      renderFill: true,
      renderLine: true,
      lineThickness: 2.5,
      lineOpacity: 1,
      lineColor: 0x00ff88,
      staticLineColor: 0x38bdf8,
      sensorLineColor: 0xfbbf24,
      velocityColor: 0xfacc15,
      fillOpacity: 0.28,
      fillColor: 0x00ff88,
      staticFillColor: 0x38bdf8,
      sensorFillColor: 0xfbbf24,
    };

    // Phaser only populates body.render and constraint.render if debug was enabled at World creation.
    // Explicitly apply the render style to the entire localWorld composite (bodies + constraints)!
    this.matter.world.setCompositeRenderStyle(
      this.matter.world.localWorld as any
    );
    const allBodies = this.matter.world.getAllBodies();
    for (const b of allBodies) {
      this.matter.world.setBodyRenderStyle(b);
    }

    this.matter.world.drawDebug = enabled;
    this.matter.world.debugGraphic.setDepth(100);
    if (!enabled) {
      this.matter.world.debugGraphic.clear();
    }
    this.matter.world.debugGraphic.setVisible(enabled);
  }

  /**
   * Computes an ergonomic hover Y for `float` objects (clouds, balloons, etc.)
   * so they settle right at stepping-stone height between platforms or near the player's level.
   */
  public getIdealFloatY(spawnX: number, objHalfHeight: number): number {
    // 1. If a horizontal sensor laser passes across spawnX, align right onto the beam so it blocks cleanly!
    const horizSensorLaser = this.currentStage.lasers?.find(
      (l) =>
        l.mode === "sensor" &&
        Math.abs(l.x2 - l.x1) > Math.abs(l.y2 - l.y1) &&
        spawnX >= Math.min(l.x1, l.x2) - 20 &&
        spawnX <= Math.max(l.x1, l.x2) + 20
    );
    if (horizSensorLaser) {
      return Phaser.Math.Clamp(horizSensorLaser.y1, 170, 560);
    }

    // 2. If a vertical ceiling laser shoots down near spawnX, hover high enough to act as an overhead umbrella!
    const vertLaser = this.currentStage.lasers?.find(
      (l) =>
        Math.abs(l.y2 - l.y1) > Math.abs(l.x2 - l.x1) &&
        Math.abs(l.x1 - spawnX) < 110
    );

    const flatPlatforms = this.currentStage.platforms.filter(
      (p) => !(p.height && p.height > 40) && !p.angle
    );

    // Check if spawnX is directly above a platform
    const directlyBelow = flatPlatforms
      .filter((p) => spawnX >= p.x - 20 && spawnX <= p.x + p.width + 20)
      .sort((a, b) => a.y - b.y)[0];

    if (vertLaser && directlyBelow) {
      return Phaser.Math.Clamp(directlyBelow.y - 125, 180, 520);
    }

    // Find nearest platform on the left and right of spawnX (for gap bridging)
    const leftPlat = flatPlatforms
      .filter((p) => p.x + p.width <= spawnX + 30)
      .sort((a, b) => b.x + b.width - (a.x + a.width))[0];
    const rightPlat = flatPlatforms
      .filter((p) => p.x >= spawnX - 30)
      .sort((a, b) => a.x - b.x)[0];

    let targetTopSurfaceY: number;
    if (leftPlat && rightPlat && leftPlat !== rightPlat) {
      const span = Math.max(1, rightPlat.x - (leftPlat.x + leftPlat.width));
      const t = Phaser.Math.Clamp(
        (spawnX - (leftPlat.x + leftPlat.width)) / span,
        0,
        1
      );
      const interpY = Phaser.Math.Linear(leftPlat.y, rightPlat.y, t);
      targetTopSurfaceY = interpY - 12;
    } else if (directlyBelow) {
      targetTopSurfaceY = directlyBelow.y - 68;
    } else if (this.player) {
      targetTopSurfaceY = this.player.sprite.y + 8;
    } else {
      targetTopSurfaceY = 390;
    }

    return Phaser.Math.Clamp(
      targetTopSurfaceY + objHalfHeight * 0.65,
      190,
      540
    );
  }

  private async summonWord(word: string) {
    if (!this.hud) return;

    this.hud.setLoading(true);
    this.portalCursor.pulse();

    try {
      const result = await AIService.generateForWord(word);

      const spawnPt = this.portalCursor.getSpawnPoint();
      const built = PolygonPhysicsBuilder.buildFromImage(
        this,
        result.imageSource,
        spawnPt.x,
        spawnPt.y,
        result.spec
      );
      this.matter.world.setBodyRenderStyle(built.body);

      try {
        this.sound.play("spawn", { volume: 0.7 });
      } catch {
        // Ignore audio errors
      }

      const spawned = new SpawnedObject(
        this,
        built,
        result.spec,
        (removed) => {
          this.spawnedObjects = this.spawnedObjects.filter(
            (o) => o !== removed
          );
        }
      );

      this.spawnedObjects.push(spawned);
      this.totalSpawnsInStage++;
      this.hud.updateSpawnCount(
        this.totalSpawnsInStage,
        this.currentStage.threeStarLimit
      );

      this.hud.setLoading(false);
    } catch {
      this.hud.setLoading(false);
    }
  }

  private buildPlatforms(st: StageConfig) {
    for (const p of st.platforms) {
      const isWall = Boolean(p.height && p.height > 40);
      const h = p.height ?? 38;
      const angleDeg = p.angle ?? 0;

      GameArtGenerator.drawPlatformBlock(
        this,
        p.x,
        p.y,
        p.width,
        h,
        st.theme,
        isWall,
        angleDeg
      );

      this.matter.add.rectangle(
        p.x + p.width / 2,
        p.y + h / 2,
        p.width,
        h,
        {
          isStatic: true,
          angle: Phaser.Math.DegToRad(angleDeg),
          friction: isWall ? 0.15 : angleDeg !== 0 ? 0.08 : 0.65,
          restitution: 0.05,
        }
      );
    }
  }

  private buildGimmicks(st: StageConfig) {
    st.switches?.forEach((s) => {
      this.switches.push(
        new PressureSwitch(
          this,
          s.switchX,
          s.switchY,
          s.gateX,
          s.gateY,
          s.gateH
        )
      );
    });

    st.slotButtons?.forEach((sb) => {
      this.slotButtons.push(new SlotButton(this, sb));
    });

    st.windZones?.forEach((wz) => {
      this.windZones.push(new WindZone(this, wz));
    });

    st.seesaws?.forEach((s) => {
      this.seesaws.push(new Seesaw(this, s.pivotX, s.pivotY, s.width));
    });

    st.crackedBlocks?.forEach((c) => {
      this.crackedBlocks.push(
        new CrackedBlock(this, c.x, c.y, c.width, c.height)
      );
    });

    st.spikes?.forEach((sp) => {
      this.spikes.push(new SpikeHazard(this, sp.x, sp.y, sp.width));
    });

    st.lasers?.forEach((lz) => {
      this.lasers.push(new LaserBeam(this, lz));
    });

    const dpr = Math.min(window.devicePixelRatio || 2, 3);
    st.hints?.forEach((h) => {
      const label = this.add
        .text(0, 0, h.text, {
          fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "13px",
          fontStyle: "600",
          color: "#e2e8f0",
          resolution: dpr,
        })
        .setOrigin(0.5);

      const padX = 14;
      const padY = 8;
      const bg = this.add.graphics();
      const w = label.width + padX * 2;
      const boxH = label.height + padY * 2;
      bg.fillStyle(0x0f172a, 0.78);
      bg.lineStyle(1.5, 0x38bdf8, 0.45);
      bg.fillRoundedRect(-w / 2, -boxH / 2, w, boxH, 10);
      bg.strokeRoundedRect(-w / 2, -boxH / 2, w, boxH, 10);

      const container = this.add
        .container(h.x, h.y, [bg, label])
        .setDepth(4);

      this.tweens.add({
        targets: container,
        y: h.y - 5,
        duration: 1600,
        yoyo: true,
        repeat: -1,
        ease: "Sine.InOut",
      });
    });
  }

  private buildGoalFlag(st: StageConfig) {
    const flag = this.matter.add.image(st.goal.x, st.goal.y, "goal_flag_v2");
    flag.setOrigin(0.5, 0.5).setDepth(6);
    flag.setData("type", "flag");
    flag.setStatic(true);
    flag.setSensor(true);

    const aura = this.add
      .circle(st.goal.x, st.goal.y + 8, 34, 0xfacc15, 0.16)
      .setDepth(5);

    this.tweens.add({
      targets: aura,
      scaleX: 1.25,
      scaleY: 1.25,
      alpha: 0.04,
      duration: 1100,
      yoyo: true,
      repeat: -1,
    });
  }

  private setupPhysicsCollisions() {
    this.matter.world.on("collisionstart", (event: any) => {
      for (const pair of event.pairs) {
        const bodyA = pair.bodyA as MatterJS.BodyType;
        const bodyB = pair.bodyB as MatterJS.BodyType;

        const rootA = bodyA.parent || bodyA;
        const rootB = bodyB.parent || bodyB;

        const goA = (rootA as any).gameObject || (bodyA as any).gameObject;
        const goB = (rootB as any).gameObject || (bodyB as any).gameObject;

        const isPlayerA = goA?.getData?.("type") === "player";
        const isPlayerB = goB?.getData?.("type") === "player";
        const isFlagA = goA?.getData?.("type") === "flag";
        const isFlagB = goB?.getData?.("type") === "flag";

        if ((isPlayerA && isFlagB) || (isPlayerB && isFlagA)) {
          this.handleStageClear();
          return;
        }

        const isSpikeA =
          (bodyA as any).isSpikeHazard || (rootA as any).isSpikeHazard;
        const isSpikeB =
          (bodyB as any).isSpikeHazard || (rootB as any).isSpikeHazard;

        if ((isPlayerA && isSpikeB) || (isPlayerB && isSpikeA)) {
          this.player.respawn(
            this.currentStage.spawn.x,
            this.currentStage.spawn.y
          );
          continue;
        }

        const spawnedA = goA?.getData?.("spawnedObject") as
          | SpawnedObject
          | undefined;
        const spawnedB = goB?.getData?.("spawnedObject") as
          | SpawnedObject
          | undefined;

        const speed = Math.hypot(
          rootA.velocity.x - rootB.velocity.x,
          rootA.velocity.y - rootB.velocity.y
        );

        if (spawnedA) {
          spawnedA.handleCollision(rootB, speed);
        }
        if (spawnedB) {
          spawnedB.handleCollision(rootA, speed);
        }

        const crackedA =
          (bodyA as any).crackedBlock || (rootA as any).crackedBlock;
        const crackedB =
          (bodyB as any).crackedBlock || (rootB as any).crackedBlock;

        if (crackedA && spawnedB) {
          if (
            spawnedB.spec.trait === "heavy" ||
            (rootB.mass > 4 && speed > 2.5)
          ) {
            (crackedA as CrackedBlock).shatter();
          }
        } else if (crackedB && spawnedA) {
          if (
            spawnedA.spec.trait === "heavy" ||
            (rootA.mass > 4 && speed > 2.5)
          ) {
            (crackedB as CrackedBlock).shatter();
          }
        }
      }
    });
  }

  private handleStageClear() {
    if (this.isStageCleared) return;
    this.isStageCleared = true;

    try {
      this.sound.play("click", { volume: 0.4 });
    } catch {
      // Ignore
    }

    const nextStageIdx = (this.currentStageIndex + 1) % STAGES.length;
    const nextStage = STAGES[nextStageIdx];

    this.hud?.showStageClear(
      this.currentStage,
      this.totalSpawnsInStage,
      () => {
        this.scene.restart({ stageId: this.currentStage.id });
      },
      () => {
        this.scene.restart({ stageId: nextStage.id });
      }
    );
  }

  private playBgm() {
    try {
      let bgm = this.sound.get("main_bgm");
      if (!bgm) {
        bgm = this.sound.add("main_bgm", { loop: true, volume: 0.05 });
        bgm.play();
      } else if (!bgm.isPlaying) {
        bgm.play();
      }
    } catch {
      // Ignore audio autoplay block
    }
  }
}
