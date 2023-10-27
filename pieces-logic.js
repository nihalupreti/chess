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

class Bishop {
  isMoveValid(fromPosRow, fromPosCol, toPosRow, toPosCol) {
    const rowDiff = Math.abs(toPosRow - fromPosRow);
    const colDiff = Math.abs(toPosCol - fromPosCol);

    return rowDiff === colDiff;
  }

  isPathClear(fromPosRow, fromPosCol, toPosRow, toPosCol) {
    const rowIncrement = toPosRow > fromPosRow ? 1 : -1;
    const colIncrement = toPosCol > fromPosCol ? 1 : -1;

    let currentRow = fromPosRow + rowIncrement;
    let currentCol = fromPosCol + colIncrement;

    while (currentRow !== toPosRow && currentCol !== toPosCol) {
      const squareElement = document.querySelector(
        `.square-${currentRow}-${currentCol}`
      );

      if (squareElement && squareElement.hasChildNodes()) {
        return false;
      }

      currentRow += rowIncrement;
      currentCol += colIncrement;
    }

    return true;
  }

  move(fromPosRow, fromPosCol, toPosRow, toPosCol) {
    const moveLogic =
      this.isMoveValid(fromPosRow, fromPosCol, toPosRow, toPosCol) &&
      this.isPathClear(fromPosRow, fromPosCol, toPosRow, toPosCol);

    return moveLogic;
  }

  canCaptureSquare(squareElement) {
    return document.querySelector(`.${squareElement}`).hasChildNodes();
  }
}

class Queen {
  constructor() {
    this.bishopFeature = new Bishop();
    this.rookFeature = new Rook();
  }

  queenMove(fromPosRow, fromPosCol, toPosRow, toPosCol) {
    const moveLogic =
      this.bishopFeature.move(fromPosRow, fromPosCol, toPosRow, toPosCol) ||
      this.rookFeature.move(fromPosRow, fromPosCol, toPosRow, toPosCol);
    return moveLogic;
  }

  queenCapturingLogic(fromPosRow, fromPosCol, toPosRow, toPosCol, toSquareId) {
    const capturingLogic =
      this.bishopFeature.canCaptureSquare(toSquareId) ||
      this.rookFeature.pieceCapturingLogic(
        fromPosRow,
        fromPosCol,
        toPosRow,
        toPosCol,
        toSquareId
      );
    return capturingLogic;
  }
}
