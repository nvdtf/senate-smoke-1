const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameState = {
  board: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 'X',
  gameOver: false,
  winner: null,
};

function checkWin() {
  for (const [a, b, c] of WINNING_LINES) {
    if (gameState.board[a] !== '' &&
        gameState.board[a] === gameState.board[b] &&
        gameState.board[a] === gameState.board[c]) {
      return gameState.board[a];
    }
  }
  return null;
}

function checkDraw() {
  return gameState.board.every(cell => cell !== '') && checkWin() === null;
}

function makeMove(cellIndex) {
  if (gameState.gameOver) return false;
  if (gameState.board[cellIndex] !== '') return false;

  gameState.board[cellIndex] = gameState.currentPlayer;

  const winner = checkWin();
  if (winner) {
    gameState.gameOver = true;
    gameState.winner = winner;
    return true;
  }

  if (checkDraw()) {
    gameState.gameOver = true;
    return true;
  }

  gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
  return true;
}

function renderBoard() {
  const cells = document.querySelectorAll('#board button[data-index]');
  cells.forEach(function (cell) {
    const index = Number(cell.getAttribute('data-index'));
    const value = gameState.board[index];
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;

    cell.textContent = value;
    cell.disabled = value !== '' || gameState.gameOver;
    cell.setAttribute('aria-label',
      'Row ' + row + ', Column ' + col + ': ' + (value || 'empty'));
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var board = document.getElementById('board');

  board.addEventListener('click', function (e) {
    var button = e.target.closest('button[data-index]');
    if (!button) return;
    var index = Number(button.getAttribute('data-index'));
    if (makeMove(index)) {
      renderBoard();
    }
  });
});
