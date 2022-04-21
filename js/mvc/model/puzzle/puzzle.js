import { config } from "../../../config.js";

export class PuzzleModel {
  constructor() {
    this.positionedPieces = [];
  }

  insert(position, piece) {
    if (!this._canInsert(position, piece)) return false;
    this.positionedPieces.push({ position, piece });
    return true;
  }

  get(id) {
    return this.positionedPieces.find(({ piece }) => piece.id === id);
  }

  remove(id) {
    const index = this.positionedPieces.findIndex(
      ({ piece }) => piece.id === id
    );
    if (index === -1) return false;
    this.positionedPieces.splice(index, 1);
    return true;
  }

  getFromPosition(position) {
    for (const positionedPiece of this.positionedPieces)
      if (this._inPiece(position, positionedPiece)) return positionedPiece;
    return null;
  }

  removeFromPosition(position) {
    const index = this.positionedPieces.findIndex(
      ({ position: pos }) => pos.x !== position.x || pos.y !== position.y
    );
    if (index === -1) return false;
    this.positionedPieces.splice(index, 1);
    return true;
  }

  getAll() {
    return [...this.positionedPieces];
  }

  removeAll() {
    this.positionedPieces = [];
  }

  _canInsert(position, piece) {
    if (!this._inArea(position, piece)) return false;
    if (this._overlappingWithPieces(position, piece)) return false;
    return true;
  }

  _inArea(position, piece) {
    if (position.x < 0) return false;
    if (position.y < 0) return false;
    if (position.x + piece.numColumns > config.dimensions.columns) return false;
    if (position.y + piece.numRows > config.dimensions.rows) return false;
    return true;
  }

  _overlappingWithPieces(position, piece) {
    for (const positionedPiece of this.positionedPieces)
      if (this._overlappingWithPiece(position, piece, positionedPiece))
        return true;
    return false;
  }

  _overlappingWithPiece(position, piece, positionedPiece) {
    const piecePositions = piece.positions.map((pos) => ({
      x: position.x + pos.x,
      y: position.y + pos.y,
    }));
    const placedPositions = positionedPiece.piece.positions.map((pos) => ({
      x: positionedPiece.position.x + pos.x,
      y: positionedPiece.position.y + pos.y,
    }));
    for (const piecePosition of piecePositions) {
      for (const placedPosition of placedPositions) {
        if (
          piecePosition.x === placedPosition.x &&
          piecePosition.y === placedPosition.y
        )
          return true;
      }
    }
    return false;
  }

  _inPiece(position, positionedPiece) {
    for (const pos of positionedPiece.piece.positions) {
      if (
        position.x === pos.x + positionedPiece.position.x &&
        position.y === pos.y + positionedPiece.position.y
      )
        return true;
    }
    return false;
  }
}
