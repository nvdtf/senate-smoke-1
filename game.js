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

document.addEventListener('DOMContentLoaded', function () {
  // Entry point — wired up by subsequent tasks
});
