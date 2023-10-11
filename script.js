//prettier-ignore
const chessBoard = [
  [r,n,b,q,k,b,n,r],
  [p,p,p,p,p,p,p,p],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [p,p,p,p,p,p,p,p],
  [r,n,b,q,k,b,n,r]
  
];
const chessboardElement = document.querySelector(".chessboard");
let playersTurn = "white";

// convert indices to chess coordinates (e.g., 0,0 to "a8")
function convertToChessCoordinates(row, col) {
  const chessFile = String.fromCharCode("a".charCodeAt(0) + col);
  const chessRank = 8 - row;
  return `${chessFile}${chessRank}`;
}

function initializeChessboard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("board-square");
      square.id = `square-${row}-${col}`;
      const piece = chessBoard[row][col];

      const isWhiteSquare = (row + col) % 2 === 0;
      square.classList.add(isWhiteSquare ? "white-square" : "black-square");

      if (piece !== 0) {
        square.innerHTML = piece;
        square.firstChild && square.firstChild.setAttribute("draggable", true); //ternery

        if (row === 6 || row === 7) {
          square.firstChild.firstChild.classList.add("white");
        } else {
          square.firstChild.firstChild.classList.add("black");
        }
      }
      // Add the chess coordinate as a data attribute
      square.dataset.coordinate = convertToChessCoordinates(row, col);

      chessboardElement.appendChild(square);
    }
  }
}

initializeChessboard();

const allSquare = document.querySelectorAll(".board-square");

allSquare.forEach((sq) => {
  sq.addEventListener("dragstart", dragPiece);
  sq.addEventListener("dragover", dropPiece);
  sq.addEventListener("drop", dragDrop);
});

let fromSquareId;
let fromSquareElement;
let fromChessCoordinate;

function dragPiece(e) {
  fromSquareElement = e.target.parentElement;
  fromSquareId = fromSquareElement.getAttribute("id");
  fromChessCoordinate = e.target.parentElement.getAttribute("data-coordinate");
}

function dropPiece(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.stopPropagation();
  const correctPlayer =
    fromSquareElement.firstChild.firstChild.classList.contains(playersTurn);
  const opponentPlayer = playersTurn === "white" ? "black" : "white";
  const takenByOpponentPlayer =
    e.target.firstchild?.classList.contains(opponentPlayer);
  const valid = isTheMoveValid(e.target);
  if (correctPlayer) {
    if (takenByOpponentPlayer && valid) {
      e.target.append(fromSquareElement.firstChild);
      e.target.remove();
      changePlayerTurn();
      return;
    }
    if (valid) {
      e.target.append(fromSquareElement.firstChild);
      changePlayerTurn();
      return;
    }
    if (takenByOpponentPlayer) {
      console.log("not a valid move");
    }
  }
}

function changePlayerTurn() {
  if (playersTurn === "black") {
    playersTurn = "white";
  } else {
    playersTurn = "black";
  }
}

function isTheMoveValid(toSquare) {
  console.log(toSquare);
  const toSquareId = toSquare.getAttribute("id");
  console.log(toSquareId);
}

// function pawnMovement(fromX, fromY, toX, toY, pieceColor) {
//   const fromPosition = document.getElementById(`square-${fromX}-${fromY}`);
//   const toPosition = document.getElementById(`square-${toX}-${toY}`);
//   const initialPositionBlack = document.getElementById(`square-${6}-${fromY}`);
//   const initialPositionWhite = document.getElementById(`square-${1}-${fromY}`);
//   const initialStepRule =
//     (initialPositionBlack.querySelector(".piece") ||
//       initialPositionWhite.querySelector(".piece")) &&
//     (fromX == toX + 2 || fromX == toX - 2) &&
//     toY == fromY;
//   const generalMovementRule =
//     (fromX == toX + 1 || fromX == toX - 1) && toY == fromY;

//   //check if the pawn move is legal
//   if (generalMovementRule || initialStepRule) {
//     //check if the current square has pawn and the toposition is empty
//     if (
//       fromPosition.querySelector(".piece") &&
//       !toPosition.querySelector(".piece")
//     ) {
//       const piece = fromPosition.querySelector(".piece");
//       toPosition.append(piece);
//       toPosition.classList.add(`${pieceColor}-piece`);
//       toPosition.classList.remove("square");
//       fromPosition.classList.remove(`${pieceColor}-piece`);
//       fromPosition.innerHTML = "";
//     }
//   } else {
//     console.log("not valid move");
//   }
// }

// let fromPos = [];
// let toPos = [];
// let whichPiece = "";

// const PosReg = /\d+/g;

// let isPieceSelected = false;

// const chessboardElement = document.querySelector(".chessboard");

// chessboardElement.addEventListener("click", (event) => {
//   const target = event.target;
//   if (target.classList.contains("piece")) {
//     const pieceId = target.parentNode.id;
//     const isItWhitePiece = target.parentNode.classList.contains("white-piece");

//     if (
//       !isPieceSelected &&
//       ((playersTurn && isItWhitePiece) || (!playersTurn && !isItWhitePiece))
//     ) {
//       fromPos = pieceId.match(PosReg).map(Number);
//       whichPiece = target.textContent;
//       console.log(whichPiece);
//       console.log("Clicked piece: " + pieceId);

//       isPieceSelected = true;
//     } else {
//       console.log("Invalid move. It's not your turn or not your piece.");
//     }
//   } else if (target.classList.contains("square")) {
//     if (isPieceSelected) {
//       const squareId = target.id;
//       toPos = squareId.match(PosReg).map(Number);
//       console.log("from square: " + fromPos);
//       console.log("to square: " + toPos);
//       //pawnlogic
//       if (whichPiece === "♟" || whichPiece === "♙") {
//         if (whichPiece === "♟") {
//           pawnMovement(fromPos[0], fromPos[1], toPos[0], toPos[1], "black");
//           playersTurn = !playersTurn;
//           document
//             .getElementById(`square-${fromPos[0]}-${fromPos[1]}`)
//             .classList.add("square");
//           console.log(playersTurn);
//         } else {
//           pawnMovement(fromPos[0], fromPos[1], toPos[0], toPos[1], "white");
//           playersTurn = !playersTurn;
//           document
//             .getElementById(`square-${fromPos[0]}-${fromPos[1]}`)
//             .classList.add("square");
//           console.log(playersTurn);
//         }
//         //rooklogic
//       } else if (whichPiece === "♜" || whichPiece === "♖") {
//         if (whichPiece === "♜") {
//           rookMovement(fromPos[0], fromPos[1], toPos[0], toPos[1], "black");
//           playersTurn = !playersTurn;
//           console.log(playersTurn);
//         } else {
//           rookMovement(fromPos[0], fromPos[1], toPos[0], toPos[1], "white");
//           playersTurn = !playersTurn;
//           console.log(playersTurn);
//         }
//       }

//       isPieceSelected = false;
//     } else {
//       console.log("Please select a piece first.");
//     }
//   }
// });

// function rookMovement(fromX, fromY, toX, toY, pieceColor) {
//   const fromPosition = document.getElementById(`square-${fromX}-${fromY}`);
//   const toPosition = document.getElementById(`square-${toX}-${toY}`);

//   if (fromX == toX || fromY == toY) {
//     if (fromX === toX) {
//       const min = Math.min(fromY, toY);
//       const max = Math.max(fromY, toY);
//       let y = min + 1;
//       for (y; y <= max; y++) {
//         const containPiece = document.getElementById(
//           `square-${toX}-${pieceColor === "white" ? y : max - num}`
//         );
//         if (containPiece) {
//           return false;
//         }
//       }
//       const piece = fromPosition.querySelector(".piece");
//       toPosition.append(piece);
//       toPosition.classList.add(`${pieceColor}-piece`);
//       fromPosition.classList.remove(`${pieceColor}-piece`);
//       fromPosition.innerHTML = "";
//     } else {
//       const min = Math.min(fromX, toX);
//       const max = Math.max(fromX, toX);
//       let y = min + 1;
//       let num = 1;
//       for (y; y <= max; y++) {
//         const containPiece = document.getElementById(
//           `square-${pieceColor === "white" ? y : max - num}-${toY}`
//         );
//         num++;
//         if (containPiece.firstChild) {
//           if (containPiece.firstChild.classList.contains("piece")) {
//             return false;
//           }
//         }
//       }
//       const piece = fromPosition.querySelector(".piece");
//       toPosition.append(piece);
//       toPosition.classList.add(`${pieceColor}-piece`);
//       fromPosition.classList.remove(`${pieceColor}-piece`);
//       fromPosition.innerHTML = "";
//     }
//   }
// }
