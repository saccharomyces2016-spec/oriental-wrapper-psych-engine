# Project State Synchronization Protocol (Hard Rule)

## A) Purpose
- Chat memory is non-authoritative and volatile.
- Repo state is the ONLY source of truth.
- All AI understanding must be derived from deterministic outputs.

## B) Authoritative Sync Inputs (MANDATORY)
The ONLY allowed inputs for state synchronization are:
1. `git status -sb`
2. `git log -1 --oneline --decorate`
3. `git show --stat --oneline --decorate HEAD`
4. `docs/governance/08_REPORTS/PROJECT_STATE.json`
5. `docs/governance/03_PROCESS/PROJECT_WORKLOG.md` (append-only; tail as needed)

If information is not visible through the above outputs, it is considered UNKNOWN.

## C) Prohibited Sync Methods (HARD BAN)
- Zip uploads as routine sync
- Chat-only descriptions of repo state
- Assumptions based on previous conversation
- Partial file pastes without git context

## D) Role Responsibilities
- User: provides sync outputs when requested.
- Commander (GPT): must request sync outputs before strategic decisions.
- Gemini (Deputy/Auditor): audits ONLY based on sync outputs.
- Codex: MUST produce these outputs after execution.

## E) Drift Detection Rule
If chat claims conflict with sync outputs:
- Sync outputs override chat.
- Drift must be logged as a risk.
