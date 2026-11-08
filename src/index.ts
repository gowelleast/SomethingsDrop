import Phaser from "phaser";
import TitleScene from "./scenes/TitleScene";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "game-container",
  backgroundColor: "#0f172a",
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false,
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { x: 0, y: 1 },
      debug: false,
    },
  },
  scene: [TitleScene, GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.NO_CENTER,
  },
};

new Phaser.Game(config);
