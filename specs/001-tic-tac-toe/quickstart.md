# Quickstart Validation Guide: Tic-Tac-Toe

**Feature**: 001-tic-tac-toe | **Date**: 2026-06-10

## Prerequisites

- A modern browser (Chrome, Firefox, Safari, or Edge — last 2 major versions)
- No server, build tools, or dependencies required

## Setup

Open `index.html` directly in a browser:

```bash
# Option A: direct file open
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# Option B: local static server (optional, for ES module support)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Validation Scenarios

### Scenario 1: Complete Game — X Wins (User Stories 1 & 2)

**Maps to**: FR-001, FR-002, FR-003, FR-005, FR-007, FR-008

1. Open `index.html`. Verify a 3x3 grid is displayed and status reads **"X's turn"**.
2. Click cell (0,0) — top-left. Verify **X** appears and status reads **"O's turn"**.
3. Click cell (1,0). Verify **O** appears and status reads **"X's turn"**.
4. Click cell (0,1). Verify **X** appears.
5. Click cell (1,1). Verify **O** appears.
6. Click cell (0,2) — top-right, completing the top row. Verify status reads **"X wins!"**.
7. Click any empty cell. Verify **nothing happens** — no mark placed, status unchanged.

**Expected outcome**: Game correctly detects X winning with top row, blocks further moves.

### Scenario 2: Complete Game — Draw (User Story 1)

**Maps to**: FR-006, FR-007, FR-008

1. Click "New Game" to reset.
2. Play moves in this order (cell indices): 0, 1, 2, 4, 3, 5, 7, 6, 8.
   - This produces: X O X / O X O / O X X — a draw.
3. Verify status reads **"It's a draw!"**.
4. Click any cell. Verify nothing happens.

**Expected outcome**: Draw correctly detected when all 9 cells filled with no winner.

### Scenario 3: Occupied Cell Rejection (Edge Case)

**Maps to**: FR-004

1. Click "New Game". Click cell (0,0) to place X.
2. Click cell (0,0) again. Verify nothing changes — still X, still O's turn.

**Expected outcome**: Occupied cells ignore clicks.

### Scenario 4: New Game Reset (User Story 3)

**Maps to**: FR-009, FR-013

1. Play several moves.
2. Verify "New Game" button is visible during play (not just after game end).
3. Click "New Game". Verify all cells are empty, status reads **"X's turn"**, and cells are clickable.

**Expected outcome**: Full reset to initial state at any point.

### Scenario 5: Keyboard Navigation (Accessibility)

**Maps to**: FR-012

1. Press Tab to move focus to the first board cell.
2. Use arrow keys to navigate between cells. Verify focus moves within the grid.
3. Press Enter or Space on an empty cell. Verify mark is placed.
4. Use a screen reader (VoiceOver on macOS, NVDA on Windows). Verify cell position, state, and game status are announced.

**Expected outcome**: Full keyboard and screen reader operability.

### Scenario 6: Responsive Layout (Mobile)

**Maps to**: FR-011

1. Open browser DevTools and toggle device emulation (e.g., iPhone SE, 375px wide).
2. Verify the board scales to fit without horizontal scrolling.
3. Tap cells to play. Verify taps register correctly.

**Expected outcome**: Board is usable on mobile viewports.

## Success Criteria Checklist

| Criterion | How to verify |
|-----------|---------------|
| SC-001: Game completes in < 60s | Time a full game (Scenario 1 or 2) |
| SC-002: All 8 win lines detected | Play games winning on each line, or verify in code |
| SC-003: Page interactive in < 2s | Open file; board should render near-instantly |
| SC-004: Single HTML file, no setup | Double-click `index.html` in file explorer |
| SC-005: Turn/result always visible | Check status element throughout Scenarios 1-4 |
