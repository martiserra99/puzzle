import { PiecesModel } from "./pieces/pieces.js";
import { PuzzleModel } from "./puzzle/puzzle.js";

export class Model {
  constructor() {
    this.puzzle = new PuzzleModel();
    this.pieces = new PiecesModel();
    this.selectedPiece = null;
  }

  start() {
    this.puzzle.removeAll();
    this.pieces.removeAll();
    this.pieces.generate();
    this.onUpdate(this);
  }

  selectFromPieces(id, coords, offset) {
    const piece = this.pieces.get(id);
    this.pieces.remove(id);
    this.selectedPiece = piece.convertToSelectedPieceModel(coords, offset);
    this.onUpdate(this);
  }

  selectFromPuzzle(id, coords, offset) {
    const { piece } = this.puzzle.get(id);
    this.puzzle.remove(id);
    this.selectedPiece = piece.convertToSelectedPieceModel(coords, offset);
    this.onUpdate(this);
  }

  insertSelectedToPieces() {
    const piece = this.selectedPiece.convertToPieceModel();
    this.pieces.insert(piece);
    this.selectedPiece = null;
    this.onUpdate(this);
  }

  insertSelectedToPuzzle(position) {
    const piece = this.selectedPiece.convertToPieceModel();
    const inserted = this.puzzle.insert(position, piece);
    if (!inserted) return false;
    this.selectedPiece = null;
    this.onUpdate(this);
    return true;
  }

  moveSelectedPiece(coords) {
    this.selectedPiece.coords = coords;
    this.onUpdate(this);
  }

  rotatePiece(id) {
    this.pieces.rotate(id);
    this.onUpdate(this);
  }

  handlerUpdate(handler) {
    this.onUpdate = handler;
  }
}
