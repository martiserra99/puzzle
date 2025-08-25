export const setupUtilsFunctions = function (puzzle) {
  puzzle.inner.fun("getSize", function (puzzle) {
    const dimensions = puzzle.get("dimensions");
    const block = puzzle.get("block");
    const gap = puzzle.get("gap");
    const border = puzzle.get("border");

    const width =
      dimensions.columns * block.size +
      gap.size * (dimensions.columns - 1) +
      border.size * 2;

    const height =
      dimensions.rows * block.size +
      gap.size * (dimensions.rows - 1) +
      border.size * 2;

    return { width, height };
  });
};
