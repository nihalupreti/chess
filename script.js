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
      square.classList.add(`square-${row}-${col}`);
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
  fromSquareId = getPositionClassName(fromSquareElement);
  console.log(fromSquareId);
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
    e.target.firstChild?.classList.contains(opponentPlayer);
  const valid = isTheMoveValid(e.target);
  if (correctPlayer) {
    if (takenByOpponentPlayer && valid) {
      e.target.parentNode.append(fromSquareElement.firstChild);
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

function getPositionClassName(elementName) {
  const classNamePattern = /^square-\d+-\d+$/;
  let foundClassName;
  elementName.classList.forEach((className) => {
    if (className.match(classNamePattern)) {
      foundClassName = className;
    }
  });
  return foundClassName;
}

function swapClassNames() {
  const divElements = document.querySelectorAll(".board-square");

  const numElements = divElements.length;
  const halfNumElements = Math.floor(numElements / 2);

  for (let i = 0; i < halfNumElements; i++) {
    const firstElement = divElements[i];
    const lastElement = divElements[numElements - 1 - i];

    let firstClassName;
    let lastClassName;

    firstClassName = getPositionClassName(firstElement);
    lastClassName = getPositionClassName(lastElement);

    if (firstClassName && lastClassName) {
      firstElement.classList.remove(firstClassName);
      firstElement.classList.add(lastClassName);
      lastElement.classList.remove(lastClassName);
      lastElement.classList.add(firstClassName);
    }
  }
}

function changePlayerTurn() {
  if (playersTurn === "black") {
    playersTurn = "white";
    swapClassNames();
  } else {
    playersTurn = "black";
    swapClassNames();
  }
}

function isTheMoveValid(toSquare) {
  console.log(`from square ${fromSquareId}`);
  const draggedPiece = fromSquareElement.firstChild.id;
  let toSquareId;
  if (!toSquare.hasChildNodes()) {
    toSquareId = getPositionClassName(toSquare);
  } else {
    toSquareId = getPositionClassName(toSquare.parentElement);
  }
  const position = /\d+/g;
  const fromPos = fromSquareId.match(position).map((i) => Number(i));
  const toPos = toSquareId.match(position).map((i) => Number(i));
  console.log(`to square${toSquareId}`);
  switch (draggedPiece) {
    case "p":
      const pawnObj = new Pawn();
      //prettier-ignore
      const isPawnMoveValid = pawnObj.pawnMovementLogic(fromPos[0], fromPos[1], toPos[0], toPos[1], toSquareId);
      return isPawnMoveValid;
  }
}
