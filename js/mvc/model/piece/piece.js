export class PieceModel {
  constructor(id, positions, background, border) {
    this.id = id;
    this.positions = positions;
    this.background = background;
    this.border = border;
  }

  get span() {
    return { columns: this.numColumns, rows: this.numRows };
  }

  get numColumns() {
    return (
      this.positions.reduce((acc, pos) => (acc < pos.x ? pos.x : acc), 0) + 1
    );
  }

  get numRows() {
    return (
      this.positions.reduce((acc, pos) => (acc < pos.y ? pos.y : acc), 0) + 1
    );
  }

  rotate() {
    const oldPositions = this.positions;
    const maxX = this.numColumns - 1;
    const newPositions = [];
    for (const { x, y } of oldPositions)
      newPositions.push({ x: y, y: maxX - x });
    this.positions = newPositions;
  }

  convertToSelectedPieceModel(coords, offset) {
    return new SelectedPieceModel(
      this.id,
      this.positions,
      this.background,
      this.border,
      coords,
      offset
    );
  }
}

export class SelectedPieceModel extends PieceModel {
  constructor(id, positions, background, border, coords, offset) {
    super(id, positions, background, border);
    this.coords = coords;
    this.offset = offset;
  }

  convertToPieceModel() {
    return new PieceModel(
      this.id,
      this.positions,
      this.background,
      this.border
    );
  }
}
