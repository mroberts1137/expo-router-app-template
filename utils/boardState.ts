import { BoardState, Stone } from '@/types/board';

export class BoardStateManager {
  private size: number;
  private state: BoardState;

  constructor(size: number = 19) {
    this.size = size;
    this.state = new Array(size * size).fill(0);
  }

  getIndex(x: number, y: number): number {
    return y * this.size + x;
  }

  getState(): BoardState {
    return [...this.state];
  }

  getStone(x: number, y: number): Stone {
    return this.state[this.getIndex(x, y)];
  }

  setStone(x: number, y: number, stone: Stone): void {
    this.state[this.getIndex(x, y)] = stone;
  }

  clear(): void {
    this.state.fill(0);
  }
}
