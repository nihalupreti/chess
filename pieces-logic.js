// const movementLogic =
//   fromPos[1] === toPos[1] &&
//   (fromPos[0] === toPos[0] + 1 ||
//     (fromPos[0] === toPos[0] + 2 && fromPos[0] === 6));
// const capturingLogic =
//   document.querySelector(`.${toSquareId}`).hasChildNodes() &&
//   fromPos[0] === toPos[0] + 1 &&
//   fromPos[1] === (toPos[1] - 1 || toPos[1] + 1);
// if (movementLogic || capturingLogic) {
//   return true;
// }

class Pawn {
  //   constructor(symbol) {
  //     this.symbol = symbol;
  //   }
  pawnMovementLogic(fromPosRow, fromPosCol, toPosRow, toPosCol, toSquareId) {
    const movementLogic =
      fromPosCol === toPosCol &&
      (fromPosRow === toPosRow + 1 ||
        (fromPosRow === toPosRow + 2 && fromPosRow === 6));
    const capturingLogic =
      document.querySelector(`.${toSquareId}`).hasChildNodes() &&
      fromPosRow === toPosRow + 1 &&
      (fromPosCol === toPosCol - 1 || fromPosCol === toPosCol + 1);
    if (movementLogic || capturingLogic) {
      return true;
    }
  }
}
