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
let playersTurn = true; //true represents white's turn to play and false represents black's
let currentPositionLog = {
  whitePosition:"",
  blackPosition:""
}

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
      square.classList.add('board-square');
      square.id = `square-${row}-${col}`;
      const piece = chessboard[row][col];

      if (piece !== 0) {
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('piece');
        pieceElement.textContent = piece;
        square.appendChild(pieceElement);

        const isWhitePiece = '♖♘♗♕♔♙'.includes(piece);
        square.classList.add(isWhitePiece ? 'white-piece' : 'black-piece');
      }else{
        square.classList.add('square');
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

  //check if the pawn move is legal
  if( generalMovementRule || initialStepRule){
    //check if the current square has pawn and the toposition is empty
    if(fromPosition.querySelector(".piece") && !toPosition.querySelector(".piece")){
      const piece = fromPosition.querySelector(".piece");
      toPosition.append(piece);
      fromPosition.innerHTML = "";
    } 
  }
  else{
    console.log("not valid move")
  }

}

// pawnMovement(6,1,4,1)

const pieceElement = document.querySelectorAll(".piece");
const squareElement = document.querySelectorAll(".square");
let fromPos = [];
let toPos = [];
let whichPiece = "";

const PosReg = /\d+/g;


let isPieceSelected = false;

const chessboardElement = document.querySelector('.chessboard');

chessboardElement.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('piece')) {
    const pieceId = target.parentNode.id;
    const isItWhitePiece = target.parentNode.classList.contains('white-piece');

    if (!isPieceSelected && ((playersTurn && isItWhitePiece) || (!playersTurn && !isItWhitePiece))) {
      fromPos = pieceId.match(PosReg).map(Number);
      whichPiece = target.textContent;
      console.log('Clicked piece: ' + pieceId);

      isPieceSelected = true;
    } else {
      console.log("Invalid move. It's not your turn or not your piece.");
    }
  } else if (target.classList.contains('square')) {
    if (isPieceSelected) {
      const squareId = target.id;
      toPos = squareId.match(PosReg).map(Number);
      console.log('Clicked square: ' + squareId);
      console.log('from square: ' + fromPos);
      console.log('to square: ' + toPos);

      if (whichPiece === "♟" || whichPiece === "♙") {
        pawnMovement(fromPos[0], fromPos[1], toPos[0], toPos[1]);
        playersTurn = !playersTurn;
        console.log(playersTurn);
      }

      isPieceSelected = false;
    } else {
      console.log("Please select a piece first.");
    }
  }
});
