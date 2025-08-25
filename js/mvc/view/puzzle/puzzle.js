import canvasUI from "../../../canvas-user-interface/index.esm.js";
import { config } from "../../../config.js";

export class PuzzleView {
  id = "puzzle";

  constructor() {
    this.puzzleElement = this._build();
  }

  _build() {
    const puzzle = canvasUI.composite.new(this.id, "puzzle");
    puzzle.set("dimensions", config.dimensions);
    puzzle.set("block", {
      size: config.styles.block.size,
      border: config.styles.block.border,
      corner: config.styles.block.corner,
    });
    puzzle.set("gap", {
      size: config.styles.block.gap,
      color: "rgba(0,0,0,0)",
    });
    puzzle.set("background", config.styles.area.background);
    puzzle.set("border", config.styles.area.border);
    puzzle.set("corner", config.styles.area.corner);
    return puzzle;
  }

  insert(position, pieceModel) {
    this.puzzleElement.call("insert", position, pieceModel);
  }

  removeAll() {
    this.puzzleElement.call("removeAll");
  }

  handlerPieceMouseDown(handler) {
    this.puzzleElement.listeners.add(
      "pieceMouseDown",
      function (element, data) {
        const { piece, coords, mouse } = data;
        const offset = { x: mouse.x - coords.x, y: mouse.y - coords.y };
        handler(piece.id, mouse, offset);
      }
    );
  }

  areCoordsInside(coords) {
    return this.puzzleElement.call("areCoordsInside", coords);
  }

  getPositionFromCoords(coords) {
    return this.puzzleElement.call("getPositionFromCoords", coords);
  }
}
