export const setupEvents = function (piece) {
  piece.events.set("blockMouseDown", function (piece, signal, state) {
    if (signal.type !== "blockMouseDown") return { event: false };
    return { event: true, data: signal.data };
  });
};
