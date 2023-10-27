class Pawn {
  pawnMovementLogic(fromPosRow, fromPosCol, toPosRow, toPosCol) {
    const movementLogic =
      fromPosCol === toPosCol &&
      (fromPosRow === toPosRow + 1 ||
        (fromPosRow === toPosRow + 2 && fromPosRow === 6));

    return movementLogic;
  }

  pawnCapturingLogic(fromPosRow, fromPosCol, toPosRow, toPosCol, toSquareId) {
    const capturingLogic =
      document.querySelector(`.${toSquareId}`).hasChildNodes() &&
      fromPosRow === toPosRow + 1 &&
      (fromPosCol === toPosCol - 1 || fromPosCol === toPosCol + 1);
    return capturingLogic;
  }
}

class Rook {
  isMoveValid(fromPosRow, fromPosCol, toPosRow, toPosCol) {
    return fromPosRow === toPosRow || fromPosCol === toPosCol;
  }

  isPathClear(fromPosRow, fromPosCol, toPosRow, toPosCol, task) {
    if (fromPosRow === toPosRow) {
      let minY;
      let maxY;
      if (fromPosCol > toPosCol) {
        minY =
          task === "move"
            ? Math.min(fromPosCol, toPosCol)
            : Math.min(fromPosCol, toPosCol) + 1;
        maxY = Math.max(fromPosCol, toPosCol);
        for (let y = minY; y < maxY; y++) {
          if (
            document.querySelector(`.square-${fromPosRow}-${y}`).hasChildNodes()
          ) {
            return false;
          }
        }
      } else {
        minY =
          task === "move"
            ? Math.min(fromPosCol, toPosCol)
            : Math.min(fromPosCol, toPosCol);
        maxY = Math.max(fromPosCol, toPosCol) - 1;
        for (let y = maxY; y > minY; y--) {
          if (
            document.querySelector(`.square-${fromPosRow}-${y}`).hasChildNodes()
          ) {
            return false;
          }
        }
      }
    } else {
      let minX;
      let maxX;
      if (fromPosRow > toPosRow) {
        minX =
          task === "move"
            ? Math.min(fromPosRow, toPosRow)
            : Math.min(fromPosRow, toPosRow) + 1;
        maxX = Math.max(fromPosRow, toPosRow);
        for (let x = minX; x < maxX; x++) {
          if (
            document.querySelector(`.square-${x}-${fromPosCol}`).hasChildNodes()
          ) {
            return false;
          }
        }
      } else {
        minX =
          task === "move"
            ? Math.min(fromPosRow, toPosRow)
            : Math.min(fromPosRow, toPosRow);
        maxX = Math.max(fromPosRow, toPosRow) - 1;
        for (let x = maxX; x > minX; x--) {
          if (
            document.querySelector(`.square-${x}-${fromPosCol}`).hasChildNodes()
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  move(fromPosRow, fromPosCol, toPosRow, toPosCol) {
    const moveLogic =
      this.isMoveValid(fromPosRow, fromPosCol, toPosRow, toPosCol) &&
      this.isPathClear(fromPosRow, fromPosCol, toPosRow, toPosCol, "move");

    return moveLogic;
  }
  pieceCapturingLogic(fromPosRow, fromPosCol, toPosRow, toPosCol, toSquareId) {
    const moveLogic =
      this.isMoveValid(fromPosRow, fromPosCol, toPosRow, toPosCol) &&
      this.isPathClear(fromPosRow, fromPosCol, toPosRow, toPosCol, "capture");
    const capturingLogic =
      document.querySelector(`.${toSquareId}`).hasChildNodes() && moveLogic;
    return capturingLogic;
  }
}
