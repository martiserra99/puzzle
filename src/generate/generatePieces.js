import { generatePiecesPositions } from "./generatePiecesPositions.js";
import { generatePiecesColors } from "./generatePiecesColors.js";
import { PieceModel } from "../mvc/model/piece/piece.js";

export function generatePieces(rows, columns, numPieces) {
  const pieces = [];
  const piecesPositions = generatePiecesPositions(rows, columns, numPieces);
  const piecesColors = generatePiecesColors(numPieces);
  for (let i = 0; i < numPieces; i++) {
    const positions = piecesPositions[i];
    const color = piecesColors[i];
    const piece = new PieceModel(i, positions, color.background, color.border);
    pieces.push(piece);
  }
  return pieces;
}
