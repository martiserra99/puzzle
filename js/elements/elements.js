import { newCompositePiece } from "./piece/piece.js";
import { newCompositePuzzle } from "./puzzle/puzzle.js";

export const setupNewElements = function () {
  newCompositePiece();
  newCompositePuzzle();
};
