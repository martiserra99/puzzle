export const setupFunctions = function (puzzle) {
  puzzle.fun("insert", function (puzzle, position, piece) {
    puzzle.inner.get("pieces").push({ position, piece });
  });

  puzzle.fun("remove", function (puzzle, position) {
    const pieces = puzzle.inner
      .get("pieces")
      .filter(
        ({ position: pos }) => pos.x !== position.x || pos.y !== position.y
      );
    puzzle.inner.set("pieces", pieces);
  });

  puzzle.fun("getAll", function (puzzle) {
    return puzzle.inner.get("pieces");
  });

  puzzle.fun("removeAll", function (puzzle) {
    puzzle.inner.set("pieces", []);
  });

  puzzle.fun("areCoordsInside", function (puzzle, coords) {
    function coordsInArea(coords, areaCoords, areaSize) {
      return (
        coords.x >= areaCoords.x &&
        coords.y >= areaCoords.y &&
        coords.x <= areaCoords.x + areaSize.width &&
        coords.y <= areaCoords.y + areaSize.height
      );
    }

    const contentCoords = puzzle.call("getContentCoords");
    const contentSize = puzzle.call("getContentSize");

    return coordsInArea(coords, contentCoords, contentSize);
  });

  puzzle.fun("getPositionFromCoords", function (puzzle, coords) {
    const contentCoords = puzzle.call("getContentCoords");
    const contentSize = puzzle.call("getContentSize");
    const dimensions = puzzle.get("dimensions");
    const blockSize = {
      width: contentSize.width / dimensions.columns,
      height: contentSize.height / dimensions.rows,
    };
    const relativeCoords = {
      x: coords.x - contentCoords.x,
      y: coords.y - contentCoords.y,
    };

    return {
      x: Math.floor(relativeCoords.x / blockSize.width),
      y: Math.floor(relativeCoords.y / blockSize.height),
    };
  });

  puzzle.fun("getContentCoords", function (puzzle) {
    const border = puzzle.get("border").size;
    return { x: puzzle.coords.x + border, y: puzzle.coords.y + border };
  });

  puzzle.fun("getContentSize", function (puzzle) {
    const border = puzzle.get("border").size;
    return {
      width: puzzle.size.width - border * 2,
      height: puzzle.size.height - border * 2,
    };
  });
};
