const chessboard = [
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
];

// Function to convert indices to chess coordinates (e.g., 0,0 to "a8")
function convertToChessCoordinates(row, col) {
  const chessFile = String.fromCharCode('a'.charCodeAt(0) + col);
  const chessRank = 8 - row;
  return `${chessFile}${chessRank}`;
}

// Function to initialize the chessboard
function initializeChessboard() {
  const chessboardElement = document.querySelector('.chessboard');

  for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
          const square = document.createElement('div');
          square.classList.add('square');
          square.id = `square-${row}-${col}`;


          const piece = chessboard[row][col];
          if (piece !== 0) {
              const pieceElement = document.createElement('div');
              pieceElement.classList.add('piece');
              pieceElement.textContent = piece;
              square.appendChild(pieceElement);
          }

          // Add the chess coordinate as a data attribute
          square.dataset.coordinate = convertToChessCoordinates(row, col);

          chessboardElement.appendChild(square);
      }
  }
}

// Call the initialization function
initializeChessboard();
