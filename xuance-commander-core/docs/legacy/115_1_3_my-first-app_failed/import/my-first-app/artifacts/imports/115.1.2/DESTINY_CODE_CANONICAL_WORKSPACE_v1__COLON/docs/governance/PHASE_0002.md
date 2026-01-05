# PHASE 0002 — Core Rebuild & Monorepo Migration

Status: APPROVED  
Date: 2026-01-02  
Scope: Rebuild legacy `my-first-app` into Monorepo (`packages/*`) with preserved core logic

---

## 0. Phase Meta

This phase governs the physical migration and refactoring of the legacy project
`my-first-app` into a structured monorepo architecture.

This document is the **single source of truth** for:
- Architectural boundaries
- Dependency rules
- Execution steps
- Rollback conditions
- Historical decision context

---

## 1. Phase Goal & Definition of Done (DoD)

### Goal
- Extract and preserve core metaphysics / psychology logic
- Establish a stable monorepo foundation
- Enable further evolution without legacy coupling

### Phase 2 DoD
Phase 2 is considered complete when:

> All **Primary Core Assets** are relocated into `packages/core` or `packages/data`,
> all imports are rewired, and `SoulArchitect` can execute a basic flow in a mock
> environment via `smoke_reading.ts`.

Full UI rebuild, schema hardening, and snapshot tests are **explicitly out of scope**.

---

## 2. Final Architectural Decisions (DECISION_0002)

### 2.1 Dependency Rule (Hard Rule)

**UI → Core Interaction**
- UI MAY ONLY import from `packages/core/src/application`
- UI MAY import Types from `packages/core/src/ports` (types only)
- UI MUST NOT import `domain`, `adapters`, or `infra` directly

**Core Internal Rules**
- Domain MUST NOT depend on Adapters or Infra
- Adapters implement Ports
- Application orchestrates Domain

---

### 2.2 packages/data Strategy

- All static JSON assets live under `packages/data/src/**`
- Core is allowed to import JSON directly (build-time dependency)
- `resolveJsonModule` MUST be enabled

---

### 2.3 PromptBuilder Merge Strategy

- TypeScript version is the **final target**
- Legacy JS version is preserved temporarily as `PromptBuilder.legacy.js`
- Deletion only occurs after:
  - PromptBuilder tests pass
  - smoke_reading passes

Rollback rule:
> If TS implementation fails, SoulArchitect MUST fall back to legacy JS.

---

### 2.4 Ports Responsibility Split

- `IPromptBuilder`: builds prompt strings
- `ILlmProvider`: communicates with LLM service
- PromptBuilder ≠ LLM Provider

---

## 3. Execution Instructions (for Codex / Cursor)

### Step Order (Critical Path)

1. Create monorepo scaffold (`packages/core`, `data`, `ui`, `api`)
2. Move `packages/data/src/**/*.json`
3. Move tests into `packages/core/tests`
4. Move Domain Models & Engines
5. Move Adapters (PromptBuilder merge)
6. Move Application (`SoulArchitect`, flows)
7. Run `smoke_reading.ts`

---

## 4. Evidence & Rationale

Key decisions are based on:
- CORE_ASSET_INVENTORY v1.2 FULL
- Entry point graph from `main.js` and `SoulArchitect.js`
- Runtime truth over documentation claims

---

## 5. Transcript (Raw, Unedited)

This section preserves original reasoning and AI discussions verbatim
for future audit and context reconstruction.

[Gemini Phase 2 final execution spec and rulings pasted here verbatim]

---

## 6. Risks, Rollback & Backup

### Known Risks
- Premature deletion of legacy JS adapters
- Path alias misconfiguration
- Over-eager test fixing beyond Phase 2 scope

### Rollback Strategy
- Each step is revertible by restoring pre-move folder snapshot
- Legacy zip backups retained externally

---

## 7. Phase Closeout & Next Phase

### Phase 2 Output
- Stable monorepo
- Core logic preserved
- Minimal smoke path verified

### Phase 3 Preview
- Schema enforcement
- Snapshot tests
- Data versioning
- Narrative consistency

---

END OF PHASE 0002