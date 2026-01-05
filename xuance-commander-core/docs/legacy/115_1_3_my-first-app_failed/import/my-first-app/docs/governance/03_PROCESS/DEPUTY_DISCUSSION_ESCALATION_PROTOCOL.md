Deputy Discussion Escalation Protocol (Hard Rule)

Rule:
- If a topic is expected to require more than one interactive round (multi-turn negotiation), the Commander MUST involve Deputy (GEM) before proceeding.

Definition of “multi-turn negotiation topics” (any one triggers escalation):
- Ethics / harm prevention / addiction & dependence controls
- Long-term system direction / monetization framing / data usage boundaries
- Structural tradeoffs that affect architecture, governance, or worldview compliance
- Any change that may alter Frozen Laws interpretation, even if Frozen Laws are not edited

Escalation requirements (what Commander must provide to Deputy):
- Latest Assistant Sync Snapshot (preferred: output of `npm run sync:assistant`)
- Mission Brief (for the discussion): include current state, frozen laws, recent worklog/decisions/risks
- Explicit question(s) to audit
- Proposed options (if any) clearly labeled as proposals

Stop condition:
- No new assignments or spec changes until Deputy feedback is received OR Commander logs a reasoned override with risks in DECISION_LOG.md.
