export const setupEvents = function (puzzle) {
  puzzle.events.set("pieceMouseDown", function (puzzle, signal, state) {
    if (signal.type !== "pieceMouseDown") return { event: false };
    return { event: true, data: signal.data };
  });
};
