import Phaser from "phaser";

declare global {
  namespace MatterJS {
    interface Body {
      collision?: boolean;
    }
  }
}

declare module "phaser" {
  namespace Physics.Matter {
    const Matter: {
      Bodies: typeof MatterJS.Bodies;
      Body: typeof MatterJS.Body;
      Composite: typeof MatterJS.Composite;
      Constraint: typeof MatterJS.Constraint;
      Vector: typeof MatterJS.Vector;
      Vertices: typeof MatterJS.Vertices;
      Bounds: typeof MatterJS.Bounds;
    };
  }
}
