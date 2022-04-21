export function generatePiecesPositions(rows, columns, numPieces) {
  const matrix = generateMatrix(rows, columns, numPieces);
  return getPiecesFromMatrix(matrix, numPieces);
}

function generateMatrix(rows, columns, numPieces) {
  const matrix = createMatrix(rows, columns);
  while (isValueInMatrix(matrix, 0)) {
    insertRandomValueInMatrix(matrix, numPieces);
    if (!isValueInMatrix(matrix, 0) && !isMatrixValid(matrix, numPieces))
      fillMatrix(matrix, 0);
  }
  return matrix;
}

function createMatrix(rows, columns) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push([]);
    for (let j = 0; j < columns; j++) matrix[i].push(0);
  }
  return matrix;
}

function isValueInMatrix(matrix, value) {
  for (const row of matrix) if (row.includes(value)) return true;
  return false;
}

function insertRandomValueInMatrix(matrix, numPieces) {
  let hasInserted = false;
  const emptyPositions = getPositionsValueInMatrix(matrix, 0);
  while (!hasInserted) {
    const value = randomNumber(1, numPieces);
    const position = randomFromArray(emptyPositions);
    if (canInsertValueInMatrix(matrix, numPieces, value, position)) {
      matrix[position.y][position.x] = value;
      hasInserted = true;
    }
  }
}

function getPositionsValueInMatrix(matrix, value) {
  const positions = [];
  for (let y = 0; y < matrix.length; y++)
    for (let x = 0; x < matrix[y].length; x++)
      if (matrix[y][x] === value) positions.push({ x, y });
  return positions;
}

function canInsertValueInMatrix(matrix, numPieces, value, position) {
  if (matrix[position.y][position.x] !== 0) return false;
  const positionsValue = getPositionsValueInMatrix(matrix, value);
  if (positionsValue.length === 0) return true;
  if (position.x > 0 && matrix[position.y][position.x - 1] === value)
    return true;
  if (position.y > 0 && matrix[position.y - 1][position.x] === value)
    return true;
  if (
    position.x < matrix[0].length - 1 &&
    matrix[position.y][position.x + 1] === value
  )
    return true;
  if (
    position.y < matrix.length - 1 &&
    matrix[position.y + 1][position.x] === value
  )
    return true;
  return false;
}

function isMatrixValid(matrix, numPieces) {
  if (isValueInMatrix(matrix, 0)) return false;
  const numPositions = matrix.length * matrix[0].length;
  let meanNumPiecePositions = numPositions / numPieces;
  if (meanNumPiecePositions % 2 !== 0) meanNumPiecePositions += 1;
  const min = meanNumPiecePositions - meanNumPiecePositions / 2;
  const max = meanNumPiecePositions + meanNumPiecePositions / 2;
  for (let i = 0; i < numPieces; i++) {
    const numPositionsValue = getPositionsValueInMatrix(matrix, i + 1).length;
    if (numPositionsValue < min || numPositionsValue > max) return false;
  }
  return true;
}

function fillMatrix(matrix, value) {
  for (let y = 0; y < matrix.length; y++)
    for (let x = 0; x < matrix[y].length; x++) matrix[y][x] = value;
}

function randomFromArray(array) {
  return array[randomNumber(0, array.length - 1)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getPiecesFromMatrix(matrix, numPieces) {
  const pieces = [];
  for (let i = 0; i < numPieces; i++) {
    const piece = getPieceFromMatrix(matrix, i + 1);
    pieces.push(piece);
  }
  return pieces;
}

function getPieceFromMatrix(matrix, value) {
  const positions = [];
  const substract = { x: null, y: null };
  const positionsInMatrix = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] !== value) continue;
      if (substract.y === null || y < substract.y) substract.y = y;
      if (substract.x === null || x < substract.x) substract.x = x;
      positionsInMatrix.push({ x, y });
    }
  }
  for (const { x, y } of positionsInMatrix) {
    positions.push({ x: x - substract.x, y: y - substract.y });
  }
  return positions;
}
