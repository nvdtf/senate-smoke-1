# Research: Tic-Tac-Toe

**Feature**: 001-tic-tac-toe | **Date**: 2026-06-10

## Research Tasks

### 1. Win Detection Algorithm

**Decision**: Array-based lookup of 8 winning lines against board state.

**Rationale**: Tic-tac-toe has exactly 8 winning combinations (3 rows, 3 columns, 2 diagonals). A precomputed array of index-triples checked after each move is the simplest, most readable approach. The board is represented as a flat 9-element array (indices 0-8), and each winning line is a triple of indices. After every move, iterate the 8 triples and check if all three cells match the current player's mark.

**Alternatives considered**:
- Bitboard with bitmask checks — overkill for a 3x3 board, harder to read, no performance benefit at this scale.
- Dynamic row/column/diagonal counters — slightly more code, more state to manage, same O(1) check but less transparent.

### 2. Responsive Board Layout

**Decision**: CSS Grid for the 3x3 board with `vmin`-based sizing and `max-width` constraint.

**Rationale**: CSS Grid maps naturally to a 3x3 layout (`grid-template-columns: repeat(3, 1fr)`). Using `vmin` units or a `max-width` with percentage-based sizing ensures the board scales to the viewport on both mobile and desktop without horizontal scrolling (FR-011). No media queries needed for the core layout.

**Alternatives considered**:
- Flexbox with wrapping — requires explicit width calculations and is less semantic for a grid.
- HTML table — semantically incorrect for an interactive game board; harder to style responsively.
- Fixed pixel sizing — fails the responsive requirement on small screens.

### 3. Keyboard Navigation & Accessibility (FR-012)

**Decision**: Grid cells as `<button>` elements inside a container with `role="grid"`, using `aria-label` for cell position/state and `aria-live` region for game status.

**Rationale**: Native `<button>` elements provide built-in keyboard focus, Enter/Space activation, and screen reader announceability. Arrow key navigation within the grid follows the WAI-ARIA grid pattern. An `aria-live="polite"` region for the status message ensures screen readers announce turn changes and game results without interrupting the user.

**Alternatives considered**:
- `<div>` with `role="button"` and `tabindex` — requires manual keyboard event handling that `<button>` provides for free; more code, more fragile.
- Flat `tabindex` ordering without arrow keys — accessible via Tab but poor UX for a spatial grid; arrow keys are expected.

### 4. Game State Management

**Decision**: Single state object in module scope with board array, current player, and game-over flag. Pure functions for state transitions; DOM updates via targeted mutations.

**Rationale**: The game state is trivially small (9 cells, 1 turn indicator, 1 status flag). A single object with functional updates keeps logic testable and avoids unnecessary abstraction. No state management library or pattern beyond a plain object is warranted.

**Alternatives considered**:
- Class-based GameEngine — adds ceremony without benefit for this scope.
- Event-driven architecture with pub/sub — over-engineered for a single-page game with synchronous turns.

### 5. Project File Structure

**Decision**: Single `index.html` with inline `<style>` and `<script>` blocks, or at most three files (`index.html`, `style.css`, `game.js`) in the repository root.

**Rationale**: The constitution mandates static simplicity and no build step. A single HTML file (or a minimal trio of files) is the simplest structure that satisfies "open one file in a browser and play" (SC-004). Separating CSS and JS into their own files improves readability without adding complexity. Files live at the repo root for zero-configuration serving.

**Alternatives considered**:
- ES module split across multiple JS files — adds complexity without meaningful benefit for ~100-200 lines of game logic.
- `src/` directory structure — unnecessary indirection for 2-3 files.
