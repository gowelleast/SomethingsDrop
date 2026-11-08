declare module "marchingsquares" {
  export function isoContours(
    data: number[][],
    threshold: number | number[],
    options?: Record<string, unknown>
  ): number[][][];
}

declare module "simplify-js" {
  export interface Point {
    x: number;
    y: number;
  }
  export default function simplify(
    points: Point[],
    tolerance?: number,
    highestQuality?: boolean
  ): Point[];
}

