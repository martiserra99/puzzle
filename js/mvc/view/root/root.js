import { config } from "../../../config.js";
import { canvasUI } from "../../../canvas-ui/canvas-ui.js";
import { PiecesView } from "../pieces/pieces.js";
import { PlayButtonView } from "../playButton/playButton.js";
import { PuzzleView } from "../puzzle/puzzle.js";

export class RootView {
  id = "root";
  selectedPieceId = "selectedPiece";

  constructor() {
    this.rootElement = this._build();

    this.puzzle = new PuzzleView();
    this._insertPuzzle();

    this.pieces = new PiecesView();
    this._insertPieces();

    this.playButton = new PlayButtonView();
    this._insertPlayButton();

    this._setupEffects();
  }

  _build() {
    return canvasUI.layout.new(this.id, "relative");
  }

  _insertPuzzle() {
    const puzzleElement = this.puzzle.puzzleElement;
    this.rootElement.insert(puzzleElement);
    puzzleElement.layoutParams.set("attachTo", {
      top: "parent",
      left: "parent",
      right: "parent",
      bottom: "parent",
    });
  }

  _insertPieces() {
    const piecesElement = this.pieces.piecesElement;
    this.rootElement.insert(piecesElement);
    piecesElement.layoutParams.get("attachTo").top = this.puzzle.puzzleElement;
    piecesElement.layoutParams.get("attachTo").left = "parent";
    piecesElement.layoutParams.get("attachTo").right = "parent";
    piecesElement.layoutParams.get("margin").top = 50;
  }

  _insertPlayButton() {
    const playButtonElement = this.playButton.playButtonElement;
    this.rootElement.insert(playButtonElement);
    playButtonElement.layoutParams.get("attachTo").top = "parent";
    playButtonElement.layoutParams.get("attachTo").bottom = "parent";
    playButtonElement.layoutParams.get("attachTo").right =
      this.puzzle.puzzleElement;
    playButtonElement.layoutParams.get("margin").right = 30;
  }

  _setupEffects() {
    this._setupRotateButtonEffects();
    this._setupPlayButtonEffects();
  }

  _setupRotateButtonEffects() {
    for (let i = 0; i < config.numPieces; i++) {
      const piecesElement = this.pieces.piecesElement;
      const rotateButtonId = this.pieces.rotateButtonId + i;
      const rotateButton = piecesElement.find(rotateButtonId);
      rotateButton.listeners.add("mousedown", function () {
        rotateButton.set("background", config.styles.button.hover.background);
      });
      this.rootElement.listeners.add("mouseup", function () {
        rotateButton.set("background", config.styles.button.background);
      });
    }
  }

  _setupPlayButtonEffects() {
    const playButton = this.playButton.playButtonElement;
    playButton.listeners.add("mousedown", function () {
      playButton.set("background", config.styles.button.hover.background);
    });
    this.rootElement.listeners.add("mouseup", function () {
      playButton.set("background", config.styles.button.background);
    });
  }

  insertSelectedPiece(selectedPieceModel) {
    const selectedPiece = this._buildSelectedPiece(selectedPieceModel);
    this.rootElement.insert(selectedPiece);
    const coords = {
      x: selectedPieceModel.coords.x - selectedPieceModel.offset.x,
      y: selectedPieceModel.coords.y - selectedPieceModel.offset.y,
    };
    selectedPiece.layoutParams.get("margin").left = coords.x;
    selectedPiece.layoutParams.get("margin").top = coords.y;
  }

  _buildSelectedPiece(selectedPieceModel) {
    const piece = canvasUI.composite.new(this.selectedPieceId, "piece");
    piece.set("positions", selectedPieceModel.positions);
    piece.set("block", {
      size: config.styles.block.size,
      background: selectedPieceModel.background,
      border: {
        size: config.styles.block.border,
        color: selectedPieceModel.border,
      },
      corner: { type: "round", size: config.styles.block.corner },
    });
    piece.set("gap", config.styles.block.gap);
    return piece;
  }

  removeSelectedPiece() {
    const piece = this.rootElement.find(this.selectedPieceId);
    this.rootElement.remove(piece);
  }

  handlerMouseMove(handler) {
    this.rootElement.listeners.add("mousemove", function (element, coords) {
      handler(coords);
    });
  }

  handlerMouseUp(handler) {
    this.rootElement.listeners.add("mouseup", function (element, coords) {
      handler(coords);
    });
  }

  hasSelectedPiece() {
    return this.rootElement.find(this.selectedPieceId) !== null;
  }

  getSelectedPieceCoords() {
    const selectedPiece = this.rootElement.find(this.selectedPieceId);
    const margin = selectedPiece.layoutParams.get("margin");
    const block = {
      width: selectedPiece.size.width / selectedPiece.call("getNumColumns"),
      height: selectedPiece.size.height / selectedPiece.call("getNumRows"),
    };
    const offset = { x: block.width / 2, y: block.height / 2 };
    return { x: margin.left + offset.x, y: margin.top + offset.y };
  }
}
