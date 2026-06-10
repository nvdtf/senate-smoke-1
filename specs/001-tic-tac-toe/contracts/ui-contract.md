# UI Contract: Tic-Tac-Toe

**Feature**: 001-tic-tac-toe | **Date**: 2026-06-10

This document defines the DOM interface contract — the structure, attributes, and behaviors that the HTML page exposes to users, assistive technologies, and any future automated tests.

## Page Structure

```html
<body>
  <h1>Tic-Tac-Toe</h1>

  <!-- Game status: announces turn and outcome -->
  <div id="status" aria-live="polite">X's turn</div>

  <!-- Game board: 3x3 grid of interactive cells -->
  <div id="board" role="grid" aria-label="Tic-Tac-Toe board">
    <div role="row">
      <button role="gridcell" aria-label="Row 1, Column 1: empty" data-index="0"></button>
      <button role="gridcell" aria-label="Row 1, Column 2: empty" data-index="1"></button>
      <button role="gridcell" aria-label="Row 1, Column 3: empty" data-index="2"></button>
    </div>
    <div role="row">
      <button role="gridcell" aria-label="Row 2, Column 1: empty" data-index="3"></button>
      <!-- ... cells 4, 5 -->
    </div>
    <div role="row">
      <button role="gridcell" aria-label="Row 3, Column 1: empty" data-index="6"></button>
      <!-- ... cells 7, 8 -->
    </div>
  </div>

  <!-- Reset control: always visible (FR-013) -->
  <button id="new-game">New Game</button>
</body>
```

## Element Contracts

### `#status`

| Property       | Value                                                                 |
|----------------|-----------------------------------------------------------------------|
| Tag            | `<div>`                                                               |
| `id`           | `status`                                                              |
| `aria-live`    | `polite`                                                              |
| Text (in-progress) | `"X's turn"` or `"O's turn"`                                    |
| Text (win)     | `"X wins!"` or `"O wins!"`                                           |
| Text (draw)    | `"It's a draw!"`                                                      |

### `#board`

| Property       | Value                                                                 |
|----------------|-----------------------------------------------------------------------|
| Tag            | `<div>`                                                               |
| `id`           | `board`                                                               |
| `role`         | `grid`                                                                |
| `aria-label`   | `"Tic-Tac-Toe board"`                                                |
| Children       | 3 `<div role="row">` elements, each containing 3 gridcell buttons    |

### `.cell` (gridcell buttons)

| Property       | Value                                                                 |
|----------------|-----------------------------------------------------------------------|
| Tag            | `<button>`                                                            |
| `role`         | `gridcell`                                                            |
| `data-index`   | `0`-`8` (unique, row-major order)                                    |
| `aria-label`   | `"Row {r}, Column {c}: empty"` / `"Row {r}, Column {c}: X"` / `"Row {r}, Column {c}: O"` |
| `disabled`     | Set when cell is occupied OR game is over                             |
| Text content   | `""` (empty), `"X"`, or `"O"`                                        |

### `#new-game`

| Property       | Value                                                                 |
|----------------|-----------------------------------------------------------------------|
| Tag            | `<button>`                                                            |
| `id`           | `new-game`                                                            |
| Text           | `"New Game"`                                                          |
| Visibility     | Always visible (FR-013)                                               |
| Behavior       | Resets board to empty, status to "X's turn", all cells enabled        |

## Keyboard Navigation

| Key         | Context           | Behavior                                          |
|-------------|-------------------|---------------------------------------------------|
| Tab         | Page              | Moves focus between status, board cells, New Game button |
| Arrow keys  | Within `#board`   | Move focus between cells in the grid (wrap optional) |
| Enter/Space | Focused cell      | Places mark if cell is empty and game is in progress |
| Enter/Space | `#new-game`       | Resets the game                                    |

## Behavioral Invariants

1. Clicking an occupied cell produces no state change (FR-004).
2. Clicking any cell after game over produces no state change (FR-008).
3. After `#new-game` is clicked, board returns to initial state: all cells empty, status = "X's turn", `gameOver = false` (FR-009).
4. The status text always reflects the current game state (FR-007).
5. The board is responsive and fully usable without horizontal scrolling on viewports >= 320px wide (FR-011).
