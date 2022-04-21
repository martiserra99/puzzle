import { config } from "../../../config.js";
import { generatePieces } from "../../../generate/generatePieces.js";

export class PiecesModel {
  constructor() {
    this.pieces = [];
  }

  insert(piece) {
    this.pieces.splice(piece.id, 0, piece);
  }

  get(id) {
    return this.pieces.find((piece) => piece.id === id);
  }

  remove(id) {
    const index = this.pieces.findIndex((piece) => piece.id === id);
    if (index === -1) return false;
    this.pieces.splice(index, 1);
    return true;
  }

  rotate(id) {
    const piece = this.pieces.find((piece) => piece.id === id);
    if (piece === null) return false;
    piece.rotate();
    return true;
  }

  getAll() {
    return [...this.pieces];
  }

  removeAll() {
    this.pieces = [];
  }

  generate() {
    const pieces = generatePieces(
      config.dimensions.rows,
      config.dimensions.columns,
      config.numPieces
    );
    for (const piece of pieces) this.insert(piece);
  }
}
