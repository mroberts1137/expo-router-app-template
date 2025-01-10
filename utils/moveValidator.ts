import { BoardState, Coordinate } from '@/types/board';

export class MoveValidator {
  private boardState: BoardState;
  private size: number;
  private lastMove?: Coordinate;

  constructor(size: number) {
    this.size = size;
    this.boardState = new Array(size * size).fill(0);
  }

  public isValidMove(x: number, y: number, player: 1 | 2): boolean {
    // Basic empty intersection check
    if (this.boardState[y * this.size + x] !== 0) {
      return false;
    }

    // TODO: Implement additional checks
    // - Ko rule
    // - Self-atari check
    // - Suicide rule

    return true;
  }

  public updateBoard(boardState: BoardState, lastMove?: Coordinate) {
    this.boardState = boardState;
    this.lastMove = lastMove;
  }

  private checkKo(x: number, y: number): boolean {
    // TODO: Implement ko rule checking
    return true;
  }

  private checkSelfAtari(x: number, y: number, player: 1 | 2): boolean {
    // TODO: Implement self-atari checking
    return true;
  }

  private checkSuicide(x: number, y: number, player: 1 | 2): boolean {
    // TODO: Implement suicide rule checking
    return true;
  }
}
