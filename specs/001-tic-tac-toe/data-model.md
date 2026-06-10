# Data Model: Tic-Tac-Toe

**Feature**: 001-tic-tac-toe | **Date**: 2026-06-10

## Entities

### Board

A 3x3 grid represented as a flat array of 9 cells.

| Field   | Type                        | Description                              |
|---------|-----------------------------|------------------------------------------|
| `cells` | `Array<'' \| 'X' \| 'O'>` (length 9) | Board state, indexed 0-8 (row-major). Empty string = unoccupied. |

**Index layout**:
```
 0 | 1 | 2
-----------
 3 | 4 | 5
-----------
 6 | 7 | 8
```

**Validation rules**:
- Array length is always exactly 9.
- Each element is one of `''`, `'X'`, or `'O'`.
- The count of X marks is equal to or exactly one greater than the count of O marks (X always moves first).

### GameState

The overall game state combining board, turn, and outcome.

| Field          | Type                              | Description                                      |
|----------------|-----------------------------------|--------------------------------------------------|
| `board`        | `Array<'' \| 'X' \| 'O'>`       | The current board (see Board entity above).       |
| `currentPlayer`| `'X' \| 'O'`                     | Whose turn it is. Always starts as `'X'`.         |
| `gameOver`     | `boolean`                         | `true` when a win or draw has been detected.      |
| `winner`       | `'X' \| 'O' \| null`             | The winning player, or `null` if draw or in-progress. |

**State transitions**:

```
  [Initial]
      │
      ▼
  In Progress (currentPlayer = 'X', gameOver = false)
      │
      ├─ makeMove(cellIndex) ──► cell occupied? → no change (FR-004)
      │                       ──► game over?    → no change (FR-008)
      │                       ──► valid move:
      │                              1. Place mark in cells[cellIndex] (FR-003)
      │                              2. Check win → gameOver=true, winner set (FR-005)
      │                              3. Check draw → gameOver=true, winner=null (FR-006)
      │                              4. Switch currentPlayer (FR-002)
      │
      ├─ Win detected ──► Won (gameOver = true, winner = 'X' or 'O')
      │
      ├─ Draw detected ──► Drawn (gameOver = true, winner = null)
      │
      └─ resetGame() ──► [Initial] (FR-009)
```

### Winning Lines (constant)

8 winning combinations, each a triple of board indices:

| Line       | Indices   |
|------------|-----------|
| Row 0      | [0, 1, 2] |
| Row 1      | [3, 4, 5] |
| Row 2      | [6, 7, 8] |
| Column 0   | [0, 3, 6] |
| Column 1   | [1, 4, 7] |
| Column 2   | [2, 5, 8] |
| Diagonal ↘ | [0, 4, 8] |
| Diagonal ↗ | [2, 4, 6] |

## Relationships

- **GameState** contains exactly one **Board** (composition).
- **Winning Lines** is a constant array referenced during win detection; it is not mutable state.
- **Player** is represented as a string literal (`'X'` or `'O'`), not a separate entity. The `currentPlayer` field in GameState tracks whose turn it is.
