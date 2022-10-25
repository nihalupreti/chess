let chessCanvas = document.getElementById("chesscanvas");

const chessPieces = {
  0: "♙",
  1: "♘",
  2: "♗",
  3: "♖",
  4: "♕",
  5: "♔",
};

const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

const TILE_SIZE = 75;
const WHITE_TILE_COLOR = "rgb(255, 228, 196)";
const BLACK_TILE_COLOR = "rgb(206, 162, 128)";
const HIGHLIGHT_COLOR = "rgb(75, 175, 75)";

let pawn = 0;
let knight = 1;
let bishop = 2;
let rook = 3;
let queen = 4;
let king = 5;

const black = 0;
const white = 1;

let empty = -1;

let chessCtx;
let board;

document.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  chessCtx = chessCanvas.getContext("2d");

  startGame();
}

function startGame() {
  board = new Board();
  createBoard();
}

function createBoard() {
  chessCtx.fillStyle = WHITE_TILE_COLOR;
  chessCtx.fillRect(0, 0, BOARD_WIDTH * TILE_SIZE, BOARD_HEIGHT * TILE_SIZE);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 1) {
        createTile(j, i);
      }
    }
  }
}

function createTile(i, j) {
  chessCtx.fillStyle = BLACK_TILE_COLOR;
  chessCtx.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

class Tile {
  constructor(pieceName, teamColor) {
    this.pieceName = pieceName;
    this.teamColor = teamColor;
  }
}

class Board {
  constructor() {
    this.tiles = [];

    this.tiles.push([
      new Tile(rook, white),
      new Tile(knight, white),
      new Tile(bishop, white),
      new Tile(queen, white),
      new Tile(king, white),
      new Tile(bishop, white),
      new Tile(knight, white),
      new Tile(rook, white),
    ]);

    this.tiles.push([
      new Tile(pawn, white),
      new Tile(pawn, white),
      new Tile(pawn, white),
      new Tile(pawn, white),
      new Tile(pawn, white),
      new Tile(pawn, white),
      new Tile(pawn, white),
      new Tile(pawn, white),
    ]);

    for (let i = 0; i < 4; i++) {
      this.tiles.push([
        new Tile(empty, empty),
        new Tile(empty, empty),
        new Tile(empty, empty),
        new Tile(empty, empty),
        new Tile(empty, empty),
        new Tile(empty, empty),
        new Tile(empty, empty),
        new Tile(empty, empty),
      ]);
    }

    this.tiles.push([
      new Tile(rook, black),
      new Tile(knight, black),
      new Tile(bishop, black),
      new Tile(queen, black),
      new Tile(king, black),
      new Tile(bishop, black),
      new Tile(knight, black),
      new Tile(rook, black),
    ]);

    this.tiles.push([
      new Tile(pawn, black),
      new Tile(pawn, black),
      new Tile(pawn, black),
      new Tile(pawn, black),
      new Tile(pawn, black),
      new Tile(pawn, black),
      new Tile(pawn, black),
      new Tile(pawn, black),
    ]);
  }
}
