import canvasUI from "../../canvas-user-interface.js";
import { RootView } from "./root/root.js";

export class View {
  constructor() {
    this.ui = canvasUI.ui.new("#ui");
    this.root = new RootView();
    this.ui.start(this.root.rootElement);
  }

  handlerPlay(handler) {
    this.root.playButton.handlerClick(function () {
      handler();
    });
  }

  handlerRotatePiece(handler) {
    this.root.pieces.handlerRotateClick(
      function (id) {
        if (this.root.pieces.has(id)) handler(id);
      }.bind(this)
    );
  }

  handlerSelectFromPieces(handler) {
    this.root.pieces.handlerPieceMouseDown(function (id, coords, offset) {
      handler(id, coords, offset);
    });
  }

  handlerSelectFromPuzzle(handler) {
    this.root.puzzle.handlerPieceMouseDown(function (id, coords, offset) {
      handler(id, coords, offset);
    });
  }

  handlerMovePiece(handler) {
    this.root.handlerMouseMove(
      function (coords) {
        if (this.root.hasSelectedPiece()) handler(coords);
      }.bind(this)
    );
  }

  handlerDropPieceInPuzzle(handler) {
    this.root.handlerMouseUp(
      function () {
        if (!this.root.hasSelectedPiece()) return;

        const coords = this.root.getSelectedPieceCoords();
        if (!this.root.puzzle.areCoordsInside(coords)) return;

        const position = this.root.puzzle.getPositionFromCoords(coords);
        handler(position);
      }.bind(this)
    );
  }

  handlerDropPiece(handler) {
    this.root.handlerMouseUp(
      function () {
        if (!this.root.hasSelectedPiece()) return;

        const coords = this.root.getSelectedPieceCoords();
        if (this.root.puzzle.areCoordsInside(coords)) return;

        handler();
      }.bind(this)
    );
  }

  update(model) {
    this._updatePuzzle(model.puzzle);
    this._updatePieces(model.pieces);
    this._updateSelectedPiece(model.selectedPiece);
  }

  _updatePuzzle(puzzleModel) {
    this.root.puzzle.removeAll();
    const positionedPieces = puzzleModel.getAll();
    for (const { position, piece } of positionedPieces)
      this.root.puzzle.insert(position, piece);
  }

  _updatePieces(piecesModel) {
    this.root.pieces.removeAll();
    const pieces = piecesModel.getAll();
    for (const piece of pieces) this.root.pieces.insert(piece);
  }

  _updateSelectedPiece(selectedPieceModel) {
    this.root.removeSelectedPiece();
    if (selectedPieceModel) this.root.insertSelectedPiece(selectedPieceModel);
  }
}
