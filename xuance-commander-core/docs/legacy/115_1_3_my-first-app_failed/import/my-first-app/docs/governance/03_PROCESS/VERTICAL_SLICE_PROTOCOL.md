  # Vertical Slice Protocol (Required)

  Purpose: Prevent “spec sprawl” by forcing every phase to ship in small, runnable end-to-end slices.

  ## Rules
  1) Only ONE active slice at a time.
  2) A slice MUST be runnable (locally or CI) via Golden Commands.
  3) A slice MUST define DoD before implementation.
  4) No “foundation refactors” unless they are required by the current slice DoD.

  ## Slice Switching Gate (Hard Rule)
  A new slice MAY start only if ONE of the following is true:
  1) The current slice meets its DoD (all checks GREEN and evidence recorded), OR
  2) A Decision Log entry explicitly aborts the slice, including:
    - reason for abort
    - rollback plan / safe stop
    - what is deferred to BACKLOG.md
  No parallel slices. No silent switching.

  ## Slice Template (Copy for each slice)
  - Slice ID:
  - Scope (included):
  - Explicit exclusions:
  - Owners (GPT / Codex / Gemini / User):
  - DoD checklist:
    - [ ] Typecheck PASS (Golden Commands)
    - [ ] Tests PASS (Golden Commands)
    - [ ] Build PASS (if applicable)
    - [ ] Smoke/Run PASS (if applicable)
    - [ ] No governance/canon/constitution violations
    - [ ] Evidence snapshot updated (real command outputs, not placeholders)
  - Verification commands (exact commands to run):
  - Evidence artifacts (paths):
    - Active Plan updated path:
    - Snapshot report path:
    - Decision Log entry line reference (date + summary):
    - Worklog appended entry (date + summary):
  - Rollback plan:
