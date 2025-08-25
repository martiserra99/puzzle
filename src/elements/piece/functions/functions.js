export const setupFunctions = function (piece) {
  piece.fun("getSpan", function (piece) {
    return {
      columns: piece.call("getNumColumns"),
      rows: piece.call("getNumRows"),
    };
  });

  piece.fun("getNumColumns", function (piece) {
    const positions = piece.get("positions");
    return positions.reduce((acc, pos) => (acc < pos.x ? pos.x : acc), 0) + 1;
  });

  piece.fun("getNumRows", function (piece) {
    const positions = piece.get("positions");
    return positions.reduce((acc, pos) => (acc < pos.y ? pos.y : acc), 0) + 1;
  });

  piece.fun("rotate", function (piece) {
    const oldPositions = piece.get("positions");
    const maxX = piece.call("getNumColumns") - 1;
    const newPositions = [];
    for (const { x, y } of oldPositions)
      newPositions.push({ x: y, y: maxX - x });
    piece.set("positions", newPositions);
  });
};
