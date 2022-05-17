import canvasUI from "../../../../canvasui-js.js";

export const setupStartLifecycleFunctions = function (puzzle) {
  puzzle.lifecycle.set("updateElement", function (puzzle, grid) {
    grid.removeAll();

    const size = puzzle.inner.call("getSize");
    grid.set("size", {
      width: { unit: "px", value: size.width },
      height: { unit: "px", value: size.height },
    });

    const dimensions = puzzle.get("dimensions");
    grid.set("dimensions", {
      columns: [{ count: dimensions.columns, unit: "fr", value: 1 }],
      rows: [{ count: dimensions.rows, unit: "fr", value: 1 }],
    });

    const gap = puzzle.get("gap");
    grid.set("gap", {
      size: { horizontal: gap.size, vertical: gap.size },
      color: gap.color,
    });

    const background = puzzle.get("background");
    grid.set("background", background);

    const border = puzzle.get("border");
    grid.set("border", border);

    const corner = puzzle.get("corner");
    grid.set("corner", corner);

    puzzle.inner.call("setupPieceElements", grid);
  });

  puzzle.inner.fun("setupPieceElements", function (puzzle, grid) {
    const pieces = puzzle.inner.get("pieces");
    for (const piece of pieces) {
      const pieceEl = puzzle.inner.call("buildPieceElement", piece.piece);
      puzzle.inner.call("insertPieceElement", grid, pieceEl, piece.position);
    }
  });

  puzzle.inner.fun("buildPieceElement", function (puzzle, piece) {
    const pieceEl = canvasUI.composite.new(`piece-${piece.id}`, "piece");

    const puzzleBlock = puzzle.get("block");
    const puzzleGap = puzzle.get("gap");

    pieceEl.set("positions", piece.positions);
    pieceEl.set("block", {
      size: puzzleBlock.size,
      background: piece.background,
      border: {
        size: puzzleBlock.border,
        color: piece.border,
      },
      corner: { type: "round", size: puzzleBlock.corner },
    });
    pieceEl.set("gap", puzzleGap.size);

    pieceEl.listeners.add("blockMouseDown", (pieceEl, coords) => {
      puzzle.signal({
        type: "pieceMouseDown",
        data: { piece, coords: pieceEl.coords, mouse: coords },
      });
    });

    return pieceEl;
  });

  puzzle.inner.fun(
    "insertPieceElement",
    function (puzzle, grid, pieceEl, position) {
      const { x, y } = position;
      const columns = pieceEl.call("getNumColumns");
      const rows = pieceEl.call("getNumRows");
      grid.insert(pieceEl);
      pieceEl.layoutParams.set("position", { column: x, row: y });
      pieceEl.layoutParams.set("span", { columns, rows });
    }
  );
};
