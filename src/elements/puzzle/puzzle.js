import canvasUI from "canvas-user-interface";
import { setupLifecycleFunctions } from "./lifecycle/lifecycle.js";
import { setupFunctions } from "./functions/functions.js";
import { setupEvents } from "./events/events.js";

export const newCompositePuzzle = function () {
  const puzzle = canvasUI.composite.newType("puzzle");

  puzzle.set("dimensions", { columns: 10, rows: 10 });
  puzzle.set("block", { size: 35, border: 0, corner: 0 });
  puzzle.set("gap", { size: 1, color: "#fff" });
  puzzle.set("background", "#f0f0f0");
  puzzle.set("border", { color: "#000", size: 0 });
  puzzle.set("corner", { type: "cut", size: 0 });

  puzzle.inner.set("pieces", []);

  setupLifecycleFunctions(puzzle);
  setupFunctions(puzzle);
  setupEvents(puzzle);
};
