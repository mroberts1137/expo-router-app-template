export type Stone = 0 | 1 | 2; // 0 = empty, 1 = black, 2 = white
export type BoardState = Stone[];
export type Coordinate = { x: number; y: number };
export type BoardRange = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};
