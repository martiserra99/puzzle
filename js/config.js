export const config = {
  dimensions: { columns: 5, rows: 5 },
  numPieces: 4,
  styles: {
    area: {
      background: "#e0e2db",
      border: { size: 5, color: "#d2d4c8" },
      corner: { type: "round", size: 3 },
    },
    block: {
      size: 25,
      border: 5,
      corner: 5,
      gap: 0,
    },
    button: {
      color: "#5f7470",
      background: "#e0e2db",
      border: { size: 5, color: "#d2d4c8" },
      corner: { type: "round", size: 5 },
      font: {
        family: "Raleway, sans-serif",
        size: 16,
        weight: 600,
      },
      hover: { background: "#d2d4c8" },
    },
  },
};
