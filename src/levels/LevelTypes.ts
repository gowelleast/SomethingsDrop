import { StageTheme } from "../art/GameArtGenerator";

export interface PlatformDef {
  x: number;
  y: number;
  width: number;
  height?: number;
  /** Optional rotation angle in degrees (positive = clockwise slope down-right, negative = slope up-right) */
  angle?: number;
}

export interface SwitchGateDef {
  switchX: number;
  switchY: number;
  gateX: number;
  gateY: number;
  gateH?: number;
}

export interface SlotButtonDef {
  buttonX: number;
  buttonY: number;
  facing?: "left" | "right" | "up";
  barrierX: number;
  barrierY: number;
  barrierW: number;
  barrierH: number;
  isCage?: boolean;
}

export interface WindZoneDef {
  x: number;
  y: number;
  width: number;
  height: number;
  forceX?: number;
  forceY?: number;
}

export interface LaserBeamDef {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /**
   * "hazard" = red laser that respawns player unless blocked by a summoned object.
   * "sensor" = cyan power beam that locks a barrier/cage UNTIL blocked by a summoned object.
   */
  mode?: "hazard" | "sensor";
  barrierX?: number;
  barrierY?: number;
  barrierW?: number;
  barrierH?: number;
  isCage?: boolean;
}

export interface SeesawDef {
  pivotX: number;
  pivotY: number;
  width?: number;
}

export interface CrackedBlockDef {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpikeDef {
  x: number;
  y: number;
  width: number;
}

export interface HintTextDef {
  x: number;
  y: number;
  text: string;
}

export interface StageConfig {
  id: number;
  chapter: number;
  stageNumber: number;
  title: string;
  subtitle: string;
  theme: StageTheme;
  worldWidth: number;
  worldHeight: number;
  spawn: { x: number; y: number };
  goal: { x: number; y: number };
  threeStarLimit: number;
  recommendedWords: string[];
  platforms: PlatformDef[];
  switches?: SwitchGateDef[];
  slotButtons?: SlotButtonDef[];
  windZones?: WindZoneDef[];
  lasers?: LaserBeamDef[];
  seesaws?: SeesawDef[];
  crackedBlocks?: CrackedBlockDef[];
  spikes?: SpikeDef[];
  hints?: HintTextDef[];
}
