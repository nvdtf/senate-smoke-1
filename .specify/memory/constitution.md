<!--
Sync Impact Report
===================
- Version change: 0.0.0 (template) -> 1.0.0
- Modified principles: N/A (initial creation)
- Added sections:
    - Core Principles (6 principles: Human Spec Authority,
      Bounded Escalation, Probe-First Delivery, Static Simplicity,
      Requirement Provenance, Spec-Bound Review)
    - Technology Constraints
    - Development Workflow
    - Governance
- Removed sections: None
- Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no updates needed
      (Constitution Check section is generic; principles applied
      at plan-creation time)
    - .specify/templates/spec-template.md ✅ no updates needed
      (provenance tracking applied at spec-creation time, not in
      template structure)
    - .specify/templates/tasks-template.md ✅ no updates needed
      (probe-first aligns with existing MVP-first strategy)
    - .specify/templates/commands/*.md ✅ no command files exist
- Follow-up TODOs: None
-->

# Senate Smoke Constitution

## Core Principles

### I. Human Spec Authority

Humans decide WHAT to build and WHY at specification altitude.
Agents own HOW to implement.

- The specification is the single authoritative source for scope,
  intent, and acceptance criteria.
- Agents MUST NOT invent, expand, or reinterpret requirements
  beyond what the spec states.
- Humans MAY delegate research and technical design to agents,
  but final WHAT/WHY decisions remain human-held.
- Rationale: separating decision authority from execution
  authority prevents scope drift and preserves accountability.

### II. Bounded Escalation

Worker agents escalate to a human ONLY when one of the
following conditions is met — and nothing else:

1. **Spec ambiguity forcing a decision** — the spec is silent or
   contradictory on a point that blocks implementation, and the
   worker cannot resolve it without choosing between materially
   different outcomes.
2. **Constitutional conflict** — the worker detects that
   fulfilling a spec requirement would violate another principle
   in this constitution.
3. **Unachievable acceptance criteria** — the worker has
   evidence (not speculation) that an acceptance criterion cannot
   be met within the current constraints.

- All other obstacles (tooling issues, library selection,
  refactoring decisions, style choices) MUST be resolved by the
  worker autonomously.
- Rationale: unnecessary escalation wastes human attention;
  under-escalation risks silent divergence. This exhaustive list
  makes the boundary testable.

### III. Probe-First Delivery

The first milestone of every feature MUST be a deployable probe.

- A "deployable probe" is the smallest increment that can be
  served to a real user (or reviewer) and exercised end-to-end.
- The probe validates assumptions about structure, deployment,
  and integration before deeper investment.
- Task planning MUST sequence the probe as the earliest
  deliverable checkpoint.
- Rationale: deploying early exposes environment and integration
  risks that design documents cannot surface.

### IV. Static Simplicity

The project is a static site built with vanilla JavaScript.

- No build step (no bundlers, transpilers, or compile-time
  tooling).
- No backend (no server-side runtime, database, or API layer
  owned by this project).
- All assets MUST be servable by any static file host without
  transformation.
- Third-party scripts loaded via `<script>` tags are permitted
  only when they require no build integration.
- Rationale: zero build tooling eliminates an entire failure
  class and keeps the contribution barrier near zero.

### V. Requirement Provenance

Every requirement MUST carry provenance: who decided it and at
what weighted percentage of confidence or authority.

- Provenance is recorded in the spec alongside each requirement
  (e.g., `[Human 80% / Agent-inferred 20%]`).
- Requirements with 100% agent-inferred provenance MUST be
  flagged for human review before implementation begins.
- Provenance enables downstream reviewers to distinguish
  mandated requirements from agent assumptions.
- Rationale: traceability prevents "requirement laundering"
  where agent guesses silently become treated as human intent.

### VI. Spec-Bound Review

The reviewer arbitrates against the specification only.

- Review verdicts (pass/fail) MUST reference specific spec
  requirements or acceptance criteria.
- Decisions on matters where the spec is silent (code style,
  internal naming, file organization, algorithm choice) are the
  worker's call and MUST NOT be grounds for rejection.
- If a reviewer identifies a gap in the spec, the correct action
  is to flag it for a spec amendment — not to block the worker.
- Rationale: binding review to the spec prevents subjective
  style wars and keeps the spec as the single source of truth.

## Technology Constraints

- **Language**: Vanilla JavaScript (ES modules permitted via
  `<script type="module">`).
- **Markup**: HTML5, hand-authored.
- **Styling**: CSS3, no preprocessors.
- **Hosting**: Any static file server (GitHub Pages, Netlify
  static, S3, local `python -m http.server`, etc.).
- **External dependencies**: Permitted only as CDN-hosted scripts
  or vendored files committed to the repository. No package
  manager (npm, yarn, etc.) is required or used at runtime.
- **Testing**: Browser-based manual testing or lightweight
  test-runner scripts that run without a build step.

## Development Workflow

1. **Specify** — Human authors or approves a feature spec
   following the spec template. Every requirement includes
   provenance per Principle V.
2. **Plan** — Agent produces an implementation plan. The first
   checkpoint MUST be a deployable probe per Principle III.
3. **Implement** — Worker agent executes tasks autonomously,
   escalating only per Principle II.
4. **Review** — Reviewer evaluates deliverables against the spec
   per Principle VI. Spec-silent style decisions are not
   reviewable grounds for rejection.
5. **Amend** — If review surfaces a spec gap, the spec is
   amended (with provenance) before the worker is asked to
   change behavior.

## Governance

- This constitution supersedes all other process documents,
  templates, and ad-hoc guidance. In case of conflict, the
  constitution wins.
- **Amendments** require:
  1. A written proposal describing the change and its rationale.
  2. Approval by the project owner (human).
  3. A version bump following semantic versioning (see below).
  4. Propagation of the change to all dependent templates and
     guidance documents.
- **Versioning policy**:
  - MAJOR: Removal or redefinition of an existing principle.
  - MINOR: Addition of a new principle or material expansion of
    an existing one.
  - PATCH: Clarifications, typo fixes, non-semantic refinements.
- **Compliance**: All specs, plans, task lists, and reviews MUST
  be checked against this constitution. Agents MUST flag
  violations rather than silently working around them.

**Version**: 1.0.0 | **Ratified**: 2026-06-10 | **Last Amended**: 2026-06-10
