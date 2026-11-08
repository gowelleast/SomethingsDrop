import Phaser from "phaser";
import { GameArtGenerator } from "../art/GameArtGenerator";
import { STAGE_CHAPTERS, STAGES } from "../levels/stages";
import Player from "../objects/Player";
import { PolygonPhysicsBuilder } from "../physics/PolygonPhysicsBuilder";
import { WordPhysicsPredictor } from "../services/WordPhysicsPredictor";

export default class TitleScene extends Phaser.Scene {
  private spawnedBodies: Phaser.Physics.Matter.Image[] = [];
  private titlePortal!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: "TitleScene" });
  }

  preload() {
    this.load.audio("title_bgm", "assets/audio/title_bgm.mp3");
    this.load.audio("click", "assets/audio/click.mp3");
  }

  create() {
    document.getElementById("hud-overlay-root")?.remove();
    this.spawnedBodies = [];

    const W = this.scale.width;
    const H = this.scale.height;

    GameArtGenerator.ensureCoreTextures(this);
    Player.registerAnimations(this);

    try {
      this.sound.stopAll();
      const bgm = this.sound.add("title_bgm", { loop: true, volume: 0.18 });
      bgm.play();
    } catch {
      // Ignore autoplay block
    }

    this.matter.world.setBounds(
      0,
      -120,
      W,
      H + 200,
      32,
      false,
      false,
      false,
      false
    );

    // 1. Full-screen Backdrop & Floor
    GameArtGenerator.drawStageBackground(this, W, H, "meadow");

    const floorW = Math.min(960, W - 120);
    const floorX = (W - floorW) / 2;
    const floorY = H - 105;

    GameArtGenerator.drawPlatformBlock(
      this,
      floorX,
      floorY,
      floorW,
      44,
      "meadow"
    );
    this.matter.add.rectangle(W / 2, floorY + 22, floorW, 44, {
      isStatic: true,
      friction: 0.6,
      restitution: 0.25,
    });

    // Mascot character & Goal flag on the floor
    const mascot = this.add
      .sprite(floorX + 90, floorY - 30, "player_sheet_idle", 0)
      .setScale(1.25)
      .setDepth(8);
    mascot.play("player_idle");

    this.add
      .image(floorX + floorW - 90, floorY - 40, "goal_flag_v2")
      .setDepth(8);

    // Top Portal
    if (!this.anims.exists("portal_spin_v2")) {
      this.anims.create({
        key: "portal_spin_v2",
        frames: this.anims.generateFrameNumbers("portal_v2", {
          start: 0,
          end: 11,
        }),
        frameRate: 14,
        repeat: -1,
      });
    }
    this.titlePortal = this.add
      .sprite(W / 2, 56, "portal_v2")
      .setScale(1.0)
      .setDepth(12);
    this.titlePortal.play("portal_spin_v2");

    this.spawnTitleSticker();
    this.time.addEvent({
      delay: 1700,
      loop: true,
      callback: () => this.spawnTitleSticker(),
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      for (const body of this.spawnedBodies) {
        this.destroyDemoBody(body);
      }
      this.spawnedBodies = [];
    });

    // 2. Minimal, Crisp Title UI Centered in W x H
    this.buildMinimalTitleUI(W);
  }

  private buildMinimalTitleUI(W: number) {
    const cx = W / 2;
    const dpr = Math.min(window.devicePixelRatio || 2, 3);

    // Main Title Only (No clutter!)
    const logoText = this.add
      .text(cx, 195, "SOMETHING'S DROP", {
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: "64px",
        fontStyle: "900",
        color: "#f8fafc",
        stroke: "#0f172a",
        strokeThickness: 10,
        resolution: dpr,
      })
      .setOrigin(0.5)
      .setDepth(17);

    this.tweens.add({
      targets: logoText,
      y: 188,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });

    // Start Button
    const startBtnBg = this.add
      .rectangle(cx, 295, 220, 52, 0x0ea5e9, 1)
      .setStrokeStyle(3.5, 0x0f172a, 1)
      .setDepth(17)
      .setInteractive({ useHandCursor: true });

    const startBtnText = this.add
      .text(cx, 295, "시작하기", {
        fontFamily: "Pretendard, sans-serif",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ffffff",
        resolution: dpr,
      })
      .setOrigin(0.5)
      .setDepth(18);

    startBtnBg.on("pointerover", () => {
      startBtnBg.setFillStyle(0x38bdf8, 1);
      startBtnBg.setScale(1.04);
      startBtnText.setScale(1.04);
    });
    startBtnBg.on("pointerout", () => {
      startBtnBg.setFillStyle(0x0ea5e9, 1);
      startBtnBg.setScale(1);
      startBtnText.setScale(1);
    });
    startBtnBg.on("pointerdown", () => this.startStage(1));

    // Minimal Stage Chapter Select Pills (STAGE 1 ~ 4, 10 maps each)
    const stageY = 378;
    const spacing = 136;
    const startX = cx - ((STAGE_CHAPTERS.length - 1) * spacing) / 2;
    const themeAccents = [0x10b981, 0xf59e0b, 0x38bdf8, 0xa855f7];

    STAGE_CHAPTERS.forEach((ch, idx) => {
      const x = startX + idx * spacing;
      const accent = themeAccents[idx % themeAccents.length];

      const pill = this.add
        .rectangle(x, stageY, 122, 48, 0x0f172a, 0.88)
        .setStrokeStyle(2.5, accent, 0.92)
        .setDepth(16)
        .setInteractive({ useHandCursor: true });

      const label = this.add
        .text(x, stageY - 7, ch.name, {
          fontFamily: "Pretendard, sans-serif",
          fontSize: "13px",
          fontStyle: "bold",
          color: "#f8fafc",
          resolution: dpr,
        })
        .setOrigin(0.5)
        .setDepth(17);

      const mapCount = STAGES.filter((s) => s.chapter === ch.chapter).length;
      const subLabel = this.add
        .text(x, stageY + 10, `${ch.subtitle} (${mapCount}맵)`, {
          fontFamily: "Pretendard, sans-serif",
          fontSize: "10px",
          color: "#94a3b8",
          resolution: dpr,
        })
        .setOrigin(0.5)
        .setDepth(17);

      pill.on("pointerover", () => {
        pill.setFillStyle(0x1e293b, 0.98);
        pill.setScale(1.05);
        label.setColor("#ffffff");
        subLabel.setColor("#e2e8f0");
      });
      pill.on("pointerout", () => {
        pill.setFillStyle(0x0f172a, 0.88);
        pill.setScale(1);
        label.setColor("#f8fafc");
        subLabel.setColor("#94a3b8");
      });
      pill.on("pointerdown", () => this.startStage(ch.firstStageId));
    });
  }

  private destroyDemoBody(body: Phaser.Physics.Matter.Image) {
    const texKey = body.texture?.key;
    if (body.scene) {
      body.destroy();
    }
    if (texKey && texKey.startsWith("spawn_") && this.textures.exists(texKey)) {
      this.textures.remove(texKey);
    }
  }

  update() {
    const W = this.scale.width;
    const H = this.scale.height;
    const margin = 120;

    let writeIdx = 0;
    for (let i = 0; i < this.spawnedBodies.length; i++) {
      const body = this.spawnedBodies[i];
      if (!body.active) continue;
      if (body.y > H + margin || body.x < -margin || body.x > W + margin) {
        this.destroyDemoBody(body);
        continue;
      }
      this.spawnedBodies[writeIdx++] = body;
    }
    this.spawnedBodies.length = writeIdx;
  }

  private static readonly DEMO_WORDS = [
    "코끼리",
    "기린",
    "사자",
    "호랑이",
    "여우",
    "유니콘",
    "강아지",
    "고양이",
    "토끼",
    "판다",
    "오리",
    "펭귄",
    "공룡",
    "고래",
    "거북이",
    "부엉이",
    "자동차",
    "소방차",
    "구급차",
    "포크레인",
    "택시",
    "탱크",
    "UFO",
    "햄버거",
    "피자",
    "초밥",
    "라면",
    "치킨",
    "감자튀김",
    "사과",
    "케이크",
    "아이스크림",
    "게임기",
    "카메라",
    "보물상자",
    "선물상자",
    "트로피",
    "유령",
    "토성",
    "왕관",
    "선인장",
    "다이아몬드",
  ];

  private spawnTitleSticker() {
    if (document.hidden) return;
    while (this.spawnedBodies.length >= 14) {
      const oldest = this.spawnedBodies.shift();
      if (oldest) this.destroyDemoBody(oldest);
    }

    const word = Phaser.Utils.Array.GetRandom(TitleScene.DEMO_WORDS);
    const match = WordPhysicsPredictor.predictLocal(word);
    const stickerCanvas = WordPhysicsPredictor.renderProceduralSticker(
      match.shapeType,
      word,
      match.spec.colorAccent
    );

    const cx = this.scale.width / 2;
    const spawnX = Phaser.Math.Between(cx - 280, cx + 280);
    this.tweens.add({
      targets: this.titlePortal,
      x: spawnX,
      duration: 320,
      ease: "Sine.Out",
      onComplete: () => {
        if (!this.scene.isActive()) return;
        this.tweens.add({
          targets: this.titlePortal,
          scaleX: 1.18,
          scaleY: 1.18,
          duration: 140,
          yoyo: true,
          ease: "Quad.Out",
        });

        const built = PolygonPhysicsBuilder.buildFromImage(
          this,
          stickerCanvas,
          spawnX,
          82,
          {
            ...match.spec,
            scale: Phaser.Math.Clamp(match.spec.scale * 0.78, 0.55, 1.15),
          }
        );

        built.matterImage.setDepth(6);
        built.matterImage.setAngularVelocity(
          Phaser.Math.FloatBetween(-0.04, 0.04)
        );
        this.spawnedBodies.push(built.matterImage);
      },
    });
  }

  private startStage(stageId: number) {
    try {
      this.sound.stopAll();
      this.sound.play("click", { volume: 0.15 });
    } catch {
      // Ignore
    }
    this.scene.start("GameScene", { stageId });
  }
}
