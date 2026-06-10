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

document.addEventListener('DOMContentLoaded', function () {
  // Entry point — wired up by subsequent tasks
});
