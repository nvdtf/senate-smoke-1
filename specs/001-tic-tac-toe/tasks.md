# Tasks: Tic-Tac-Toe

**Input**: Design documents from `specs/001-tic-tac-toe/`

**Prerequisites**: plan.md, spec.md, data-model.md, contracts/ui-contract.md, research.md, quickstart.md

**Tests**: Not requested — manual browser-based validation per quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Flat 3-file layout at repository root: `index.html`, `style.css`, `game.js`
- No `src/` directory — per plan.md and research.md decision

---

## Phase 1: Setup

**Purpose**: Create the three project files with foundational structure

- [x] T001 Create index.html with full HTML structure per UI contract (h1, #status with aria-live, #board grid with 3 rows of 3 gridcell buttons, #new-game button, link to style.css, script to game.js) in index.html

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: CSS layout and JS state model that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 [P] Create style.css with CSS Grid board layout (repeat(3, 1fr)), cell styling, responsive sizing (vmin-based with max-width), status display styling, and New Game button styling in style.css
- [x] T003 [P] Create game.js with WINNING_LINES constant (8 triples), initial GameState object (board array of 9 empty strings, currentPlayer 'X', gameOver false, winner null), and DOMContentLoaded entry point scaffold in game.js

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Play a Complete Game Against Another Local Player (Priority: P1) 🎯 MVP

**Goal**: Two players alternate placing X/O marks on the 3x3 board. Win and draw conditions are detected. Occupied cells and post-game clicks are rejected.

**Independent Test**: Open index.html, click cells alternately as X and O, verify winner or draw is detected and further moves are blocked.

### Implementation for User Story 1

- [x] T004 [US1] Implement makeMove function that places current player's mark in an empty cell, rejects occupied cells (FR-004), and switches currentPlayer in game.js
- [x] T005 [US1] Implement checkWin function that iterates WINNING_LINES and returns the winner ('X'/'O') or null in game.js
- [x] T006 [US1] Implement checkDraw function that returns true when all 9 cells are filled and no winner exists in game.js
- [x] T007 [US1] Integrate checkWin and checkDraw into makeMove so gameOver and winner are set after each move, blocking further moves (FR-008) in game.js
- [x] T008 [US1] Implement renderBoard function that updates each cell button's text content, disabled attribute, and aria-label ("Row r, Column c: X/O/empty") in game.js
- [x] T009 [US1] Wire click event delegation on #board to call makeMove and renderBoard for each cell button via data-index in game.js

**Checkpoint**: At this point, a full game of tic-tac-toe is playable (X wins, O wins, or draw). User Story 1 is independently functional.

---

## Phase 4: User Story 2 — See Current Game Status (Priority: P1)

**Goal**: A status indicator always shows whose turn it is or the game result (win/draw).

**Independent Test**: Observe #status text updates on each turn and at game end — "X's turn", "O's turn", "X wins!", "O wins!", "It's a draw!".

### Implementation for User Story 2

- [x] T010 [US2] Implement updateStatus function that sets #status textContent to turn indicator ("X's turn"/"O's turn"), win announcement ("X wins!"/"O wins!"), or draw ("It's a draw!") in game.js
- [x] T011 [US2] Integrate updateStatus into makeMove flow and DOMContentLoaded initialization so status reflects game state at all times (FR-007) in game.js

**Checkpoint**: Status display is always accurate. User Stories 1 AND 2 are independently functional.

---

## Phase 5: User Story 3 — Restart the Game (Priority: P2)

**Goal**: A "New Game" button (always visible per FR-013) resets the board and game state to initial state.

**Independent Test**: Play several moves (or complete a game), click "New Game", verify all cells are empty, status reads "X's turn", and cells are clickable.

### Implementation for User Story 3

- [x] T012 [US3] Implement resetGame function that restores GameState to initial values (empty board, currentPlayer 'X', gameOver false, winner null) and calls renderBoard + updateStatus in game.js
- [x] T013 [US3] Wire #new-game button click handler to resetGame in game.js

**Checkpoint**: All three user stories are independently functional. Core game is complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, keyboard navigation, and final validation

- [x] T014 [P] Implement arrow-key navigation between grid cells within #board (move focus on ArrowUp/Down/Left/Right, wrap optional) in game.js
- [x] T015 [P] Verify and refine ARIA attributes: ensure cell aria-labels update on state change, #status aria-live announces changes, and all cells disable on game over in game.js
- [x] T016 Run quickstart.md validation scenarios (Scenarios 1-6) in a browser to verify all acceptance criteria and success criteria (SC-001 through SC-005)

---

## Phase 7: Delta — Probe-Decided Visual Enhancements

**Purpose**: Implement requirements decided after probe deployment (R100 mark color differentiation, R101 placement animation)

**Prerequisites**: All prior phases complete (T001–T016)

- [x] T017 [P] Add distinct accessible color CSS rules for X and O marks (e.g., `.cell-x` and `.cell-o` classes with two contrasting, accessible colors) in style.css (R100)
- [x] T018 [P] Add CSS transition or keyframe animation for mark placement (fade-in or scale-up, max 200ms duration) in style.css (R101)
- [x] T019 Update renderBoard function in game.js to apply `.cell-x` / `.cell-o` CSS classes based on cell content for color differentiation, and add an animation trigger class on newly placed marks so the CSS transition fires (R100, R101)
- [ ] T020 Validate mark color differentiation and placement animation by opening index.html in a browser, placing marks, and confirming X and O render in distinct colors and each new mark animates in within 200ms

**Checkpoint**: All probe-decided visual enhancements are implemented and validated.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational (T002, T003)
- **US2 (Phase 4)**: Depends on US1 (T009) — status updates are meaningful only with a playable game
- **US3 (Phase 5)**: Depends on Foundational (T002, T003) — can start after Phase 2 if desired, but logically follows US1+US2
- **Polish (Phase 6)**: Depends on all user stories being complete (T013)
- **Delta (Phase 7)**: Depends on Polish (Phase 6) — visual enhancements layer on top of complete game

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — no dependencies on other stories
- **User Story 2 (P1)**: Lightweight dependency on US1 — updateStatus integrates into the game flow established by US1
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) — resets state established by US1/US2

### Within Each User Story

- State logic before DOM rendering
- DOM rendering before event wiring
- Core implementation before integration

### Parallel Opportunities

- T002 (style.css) and T003 (game.js) can run in parallel — different files, no dependencies
- T014 (keyboard nav) and T015 (ARIA refinement) can run in parallel — different concerns within game.js, non-overlapping code sections
- T017 (color CSS) and T018 (animation CSS) can run in parallel — independent CSS rules in style.css
- T019 depends on T017 and T018 — integrates both into game.js rendering

---

## Parallel Example: Foundational Phase

```bash
# Launch both foundational tasks together (different files):
Task: "Create style.css with CSS Grid board layout" (T002)
Task: "Create game.js with state model and constants" (T003)
```

## Parallel Example: Polish Phase

```bash
# Launch accessibility tasks together:
Task: "Implement arrow-key navigation in game.js" (T014)
Task: "Verify and refine ARIA attributes in game.js" (T015)
```

## Parallel Example: Delta Phase

```bash
# Launch both CSS tasks together (independent rules in same file):
Task: "Add distinct accessible color CSS rules for X and O marks" (T017)
Task: "Add CSS transition/animation for mark placement" (T018)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: Foundational (T002, T003)
3. Complete Phase 3: User Story 1 (T004–T009)
4. **STOP and VALIDATE**: Open index.html in a browser — play a full game to win and draw
5. Deploy/demo if ready — this is the deployable probe per constitution Principle III

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate → Deploy/Demo (**MVP / Deployable Probe**)
3. Add User Story 2 → Validate → Status display always accurate
4. Add User Story 3 → Validate → Restart works at any point
5. Polish → Keyboard nav, ARIA, final validation
6. Delta → Mark colors, placement animation → Validate visual enhancements
7. Each story/phase adds value without breaking previous work

### Single Developer (Sequential)

1. T001 → T002+T003 (parallel) → T004 → T005 → T006 → T007 → T008 → T009 → **validate MVP**
2. T010 → T011 → T012 → T013 → **validate all stories**
3. T014+T015 (parallel) → T016 → **validate polish**
4. T017+T018 (parallel) → T019 → T020 → **done**

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- No tests generated — spec specifies browser-based manual testing (quickstart.md)
- Constitution: Probe-First Delivery — US1 completion IS the deployable probe
- Constitution: Static Simplicity — no build step, no server required, open index.html directly
- Delta tasks (T017–T020) implement probe-decided requirements R100 and R101
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
