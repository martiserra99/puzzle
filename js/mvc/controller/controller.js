export class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this._bind();
    this.model.start();
  }

  _bind() {
    this._bindPlay();
    this._bindRotatePiece();
    this._bindSelectFromPieces();
    this._bindSelectFromPuzzle();
    this._bindMovePiece();
    this._bindDropPiecePuzzle();
    this._bindDropPiece();
    this._bindUpdate();
  }

  _bindPlay() {
    this.view.handlerPlay(() => this.model.start());
  }

  _bindRotatePiece() {
    this.view.handlerRotatePiece((id) => this.model.rotatePiece(id));
  }

  _bindSelectFromPieces() {
    this.view.handlerSelectFromPieces((id, coords, offset) =>
      this.model.selectFromPieces(id, coords, offset)
    );
  }

  _bindSelectFromPuzzle() {
    this.view.handlerSelectFromPuzzle((id, coords, offset) =>
      this.model.selectFromPuzzle(id, coords, offset)
    );
  }

  _bindMovePiece() {
    this.view.handlerMovePiece((coords) =>
      this.model.moveSelectedPiece(coords)
    );
  }

  _bindDropPiecePuzzle() {
    this.view.handlerDropPieceInPuzzle((position) => {
      const inserted = this.model.insertSelectedToPuzzle(position);
      if (!inserted) this.model.insertSelectedToPieces();
    });
  }

  _bindDropPiece() {
    this.view.handlerDropPiece(() => this.model.insertSelectedToPieces());
  }

  _bindUpdate() {
    this.model.handlerUpdate(() => this.view.update(this.model));
  }
}
