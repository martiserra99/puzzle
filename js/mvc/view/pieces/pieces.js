import canvasUI from "../../../canvas-user-interface.js";
import { config } from "../../../config.js";

export class PiecesView {
  id = "pieces";
  pieceContainerId = "pieceContainer";
  pieceAreaId = "pieceArea";
  rotateButtonId = "rotateButton";
  pieceId = "piece";

  constructor() {
    this.piecesElement = this._build();
  }

  _build() {
    const pieces = canvasUI.layout.new(this.id, "linear");
    pieces.set("size", { width: "auto", height: "auto" });
    pieces.set("direction", "horizontal");
    pieces.set("gap", 20);
    for (let i = 0; i < config.numPieces; i++) {
      const pieceContainer = this._buildPieceContainer(i);
      this._insertPieceContainer(pieces, pieceContainer);
    }
    return pieces;
  }

  _buildPieceContainer(position) {
    const id = this.pieceContainerId + position;
    const pieceContainer = canvasUI.layout.new(id, "linear");
    pieceContainer.set("size", { width: "auto", height: "auto" });
    pieceContainer.set("direction", "vertical");
    pieceContainer.set("gap", 15);

    const pieceArea = this._buildPieceArea(position);
    this._insertPieceArea(pieceContainer, pieceArea);

    const rotateButton = this._buildRotateButton(position);
    this._insertRotateButton(pieceContainer, rotateButton);

    return pieceContainer;
  }

  _buildPieceArea(position) {
    const id = this.pieceAreaId + position;
    const pieceArea = canvasUI.layout.new(id, "frame");
    const width =
      config.dimensions.columns * config.styles.block.size +
      config.styles.area.border.size * 2 +
      config.styles.block.gap * (config.dimensions.columns - 1);
    const height =
      config.dimensions.rows * config.styles.block.size +
      config.styles.area.border.size * 2 +
      config.styles.block.gap * (config.dimensions.rows - 1);
    pieceArea.set("size", {
      width: { unit: "px", value: width },
      height: { unit: "px", value: height },
    });
    pieceArea.set("background", config.styles.area.background);
    pieceArea.set("border", config.styles.area.border);
    pieceArea.set("corner", config.styles.area.corner);
    return pieceArea;
  }

  _insertPieceArea(pieceContainer, pieceArea) {
    pieceContainer.insert(pieceArea);
    pieceArea.layoutParams.set("position", { column: 0, row: 0 });
  }

  _buildRotateButton(position) {
    const id = this.rotateButtonId + position;
    const rotateButton = canvasUI.composite.new(id, "imageArea");
    const width =
      config.dimensions.columns * config.styles.block.size +
      config.styles.area.border.size * 2;
    rotateButton.set("size", {
      width: { unit: "px", value: width },
      height: { unit: "px", value: 40 },
    });
    rotateButton.set("imageSrc", "img/rotate.svg");
    rotateButton.set("imageSize", { width: 20, height: 20 });
    rotateButton.set("color", config.styles.button.color);
    rotateButton.set("background", config.styles.button.background);
    rotateButton.set("border", config.styles.button.border);
    rotateButton.set("corner", config.styles.button.corner);
    return rotateButton;
  }

  _insertRotateButton(pieceContainer, rotateButton) {
    pieceContainer.insert(rotateButton);
    rotateButton.layoutParams.set("position", { column: 0, row: 1 });
  }

  _insertPieceContainer(pieces, pieceContainer, position) {
    pieces.insert(pieceContainer);
    pieceContainer.layoutParams.set("position", position);
  }

  insert(pieceModel) {
    const pieceArea = this.piecesElement.find(this.pieceAreaId + pieceModel.id);
    const piece = this._buildPiece(pieceModel);
    this._insertPiece(pieceArea, piece);
    this._setPieceMouseDownListener(piece, pieceModel);
  }

  _buildPiece(pieceModel) {
    const piece = canvasUI.composite.new(this.pieceId + pieceModel.id, "piece");
    piece.set("positions", pieceModel.positions);
    piece.set("block", {
      size: config.styles.block.size,
      background: pieceModel.background,
      border: {
        size: config.styles.block.border,
        color: pieceModel.border,
      },
      corner: { type: "round", size: config.styles.block.corner },
    });
    piece.set("gap", config.styles.block.gap);
    return piece;
  }

  _insertPiece(pieceArea, piece) {
    pieceArea.insert(piece);
    piece.layoutParams.set("align", {
      horizontal: "middle",
      vertical: "middle",
    });
  }

  _setPieceMouseDownListener(piece, pieceModel) {
    piece.listeners.add("blockMouseDown", (piece, coords) => {
      const offset = {
        x: coords.x - piece.coords.x,
        y: coords.y - piece.coords.y,
      };
      this.onPieceMouseDown(pieceModel.id, coords, offset);
    });
  }

  has(id) {
    return this.piecesElement.find(this.pieceId + id) !== null;
  }

  removeAll() {
    for (let i = 0; i < config.numPieces; i++) {
      const pieceArea = this.piecesElement.find(this.pieceAreaId + i);
      const piece = this.piecesElement.find(this.pieceId + i);
      piece?.listeners.removeAll("blockMouseDown");
      pieceArea.removeAll();
    }
  }

  handlerRotateClick(handler) {
    for (let i = 0; i < config.numPieces; i++) {
      const rotateButton = this.piecesElement.find(this.rotateButtonId + i);
      rotateButton.listeners.add("click", function (element) {
        handler(i);
      });
    }
  }

  handlerPieceMouseDown(handler) {
    this.onPieceMouseDown = handler;
  }
}
