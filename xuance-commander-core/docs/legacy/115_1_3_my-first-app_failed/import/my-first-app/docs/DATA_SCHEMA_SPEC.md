# DATA SCHEMA SPEC (v1)

## Canonical Choice (from `canonicalizeUserChoices.v1.js`)
```ts
{
  round: 1 | 2 | 3 | 4,
  source: "legacy" | "bank" | "anchors" | "round2",
  id: string,             // question/option id when available
  label_zh?: string,
  choice_key?: string,    // "A"/"B"/...
  weights?: { traits?: {}, axes?: {}, elements?: { wood, fire, earth, metal, water } },
  meta: {
    pattern_tags?: string[],    // motherTheme ids recommended
    behavior_facet?: string,    // Round3 required
    signal_key?: string,        // Round2 required, allow "unknown"
    confidence_weight?: number  // default 1 (Round2 default 0.4)
  }
}
```

## Required fields by round
- **Round2**: `meta.signal_key` required (use `"unknown"` if not mapped); `meta.confidence_weight` default 0.4; `meta.pattern_tags` recommended (motherTheme ids).
- **Round3 (questionBank)**: `meta.behavior_facet` required; `meta.pattern_tags` required (theme ids); `meta.confidence_weight` optional (default 1).
- **Round4**: `meta.confidence_weight` optional; `meta.pattern_tags` / `theme_boost` optional; keep `anchor_key` as-is in ontology.
- **pattern_tags**: snake_case only (`[a-z0-9_]+`), normalized/aliased via `src/core/ontology/patternTag.v1.js` (single owner).

## Allowed enums
- **motherTheme ids** (from motherThemes.v1.json):  
  `chronic_depletion`, `loss_of_agency`, `hyper_responsibility`, `fear_based_stability`, `identity_diffusion`, `suppressed_needs`, `chronic_alertness`, `unprocessed_loss`, `meaning_vacuum`, `self_erosion`
- **behavior_facet**:  
  `withdraw_and_protect`, `push_through`, `follow_momentum`, `observe_and_wait`, `seek_support`, `adjust_strategy`, `avoid_conflict`, `self_prioritize`
- **signal_key** (SIGNAL_THEME_MAP + unknown):  
  `stability`, `control`, `responsibility`, `overload`, `opportunity_grab`, `agency`, `avoidance`, `risk_aversion`, `reinvention`, `planning`, `negotiation`, `bridge_building`, `alignment`, `validation`, `resourcefulness`, `recovery`, `help_seeking`, `experiment`, `commitment`, `co_navigation`, `momentum`, `unknown`

## Governance
- Any new `signal_key` / theme id / behavior facet must update this spec **and** the validation scripts in the same PR.

## Metaphysics additions
- `birthElementVector`: `{ wood, fire, earth, metal, water }` normalized to sum=1 when available.
- `nameBias`: `{ stabilityNeed, control, pressureSensitivity }` optional; missing strokes -> null bias.
- Blending: `finalElementVector = alpha * userElements + (1-alpha) * birthElements`, with `alpha` clamped to [0.8, 0.95]; default alpha=0.85.
