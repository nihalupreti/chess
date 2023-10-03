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

// convert indices to chess coordinates (e.g., 0,0 to "a8")
function convertToChessCoordinates(row, col) {
  const chessFile = String.fromCharCode('a'.charCodeAt(0) + col);
  const chessRank = 8 - row;
  return `${chessFile}${chessRank}`;
}

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

initializeChessboard();

function pawnMovement(fromX, fromY, toX, toY){
  const fromPosition = document.getElementById(`square-${fromX}-${fromY}`);
  const toPosition = document.getElementById(`square-${toX}-${toY}`);
  const initialPositionBlack = document.getElementById(`square-${6}-${fromY}`);
  const initialPositionWhite = document.getElementById(`square-${1}-${fromY}`);
  const initialStepRule =  ((initialPositionBlack.querySelector(".piece") || initialPositionWhite.querySelector(".piece")) && ((fromX == toX+2)||(fromX == toX-2)) && (toY == fromY))
  const generalMovementRule = (((fromX == toX+1) || (fromX == toX-1)) && (toY == fromY))
  // var currentPositionLog = {position:fromPosition}

  //check if the pawn move is legal
  if( generalMovementRule || initialStepRule){
    //check if the current square has pawn and the toposition is empty
    if(fromPosition.querySelector(".piece") && !toPosition.querySelector(".piece")){
      const piece = fromPosition.querySelector(".piece");
      toPosition.append(piece);
      fromPosition.innerHTML = "";
      // currentPositionLog["position"] = toPosition;
    } 
  }
  else{
    alert("not valid")
  }

}

// pawnMovement(6,1,4,1)

