export function generatePiecesColors(numPieces) {
  const colors = [];
  const available = getAvailableColors();
  for (let i = 0; i < numPieces; i++) {
    const index = Math.floor(Math.random() * available.length);
    colors.push(available.splice(index, 1)[0]);
  }
  return colors;
}

function getAvailableColors() {
  return [
    { background: "#f94144", border: "#e03b3d" },
    { background: "#f3722c", border: "#db6728" },
    { background: "#f8961e", border: "#df871b" },
    { background: "#f9844a", border: "#e07743" },
    { background: "#f9c74f", border: "#e0b347" },
    { background: "#90be6d", border: "#82ab62" },
    { background: "#43aa8b", border: "#3c997d" },
    { background: "#4d908e", border: "#458280" },
    { background: "#577590", border: "#4e6982" },
    { background: "#277da1", border: "#237191" },
  ];
}
