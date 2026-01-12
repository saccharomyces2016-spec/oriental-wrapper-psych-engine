# Gate 1 — Missing Content Report


- generated_at: 2026-01-12T15:00:00+08:00

- scope: placeholder → MISSING marking (questions/recommendations/narratives/riskchains)

- rule: any artifact still containing placeholder directives (e.g., '待從 ... 提取', 'MISSING_PLACEHOLDER') is forced to `_status: "MISSING"` and placeholder text is blanked to avoid accidental runtime use.


## Missing artifacts


- **self_erosion** / `questions` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/questions/self_erosion.questions.v1.0.json`  
  - reason: No concrete question items found for this facet in available raw sources; blueprint is placeholder only.

- **unprocessed_loss** / `questions` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/questions/unprocessed_loss.questions.v1.0.json`  
  - reason: No concrete question items found for this facet in available raw sources; blueprint is placeholder only.

- **social_comparison** / `recommendations` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/recommendations/social_comparison.reco.v1.0.json`  
  - reason: No recommendation blocks found in available raw sources for this facet.

- **emotional_permeability** / `recommendations` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/recommendations/emotional_permeability.reco.v1.0.json`  
  - reason: No recommendation blocks found in available raw sources for this facet.

- **avoidance_coping** / `recommendations` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/recommendations/avoidance_coping.reco.v1.0.json`  
  - reason: No recommendation blocks found in available raw sources for this facet.

- **self_erosion** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/self_erosion.narr.v1.0.json`  
  - reason: Narrative text placeholders present; no ContentDB in package; anchor_statements mother_theme mapping does not provide facet-specific low/mid/high narratives.

- **unprocessed_loss** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/unprocessed_loss.narr.v1.0.json`  
  - reason: Narrative text placeholders present; no ContentDB in package; anchor_statements mother_theme mapping does not provide facet-specific low/mid/high narratives.

- **suppressed_needs** / `riskchains` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/riskchains/suppressed_needs.risk.v1.0.json`  
  - reason: Riskchain placeholders present; buildGuidance.js does not contain concrete chain mapping for this facet; consequence_chain_library does not provide facet-level chains.

- **identity_diffusion** / `riskchains` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/riskchains/identity_diffusion.risk.v1.0.json`  
  - reason: Riskchain placeholders present; buildGuidance.js does not contain concrete chain mapping for this facet; consequence_chain_library does not provide facet-level chains.

- **meaning_vacuum** / `riskchains` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/riskchains/meaning_vacuum.risk.v1.0.json`  
  - reason: Riskchain placeholders present; buildGuidance.js does not contain concrete chain mapping for this facet; consequence_chain_library does not provide facet-level chains.

- **self_erosion** / `riskchains` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/riskchains/self_erosion.risk.v1.0.json`  
  - reason: Riskchain placeholders present; buildGuidance.js does not contain concrete chain mapping for this facet; consequence_chain_library does not provide facet-level chains.

- **unprocessed_loss** / `riskchains` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/riskchains/unprocessed_loss.risk.v1.0.json`  
  - reason: Riskchain placeholders present; buildGuidance.js does not contain concrete chain mapping for this facet; consequence_chain_library does not provide facet-level chains.

- **social_comparison** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/social_comparison.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **suppressed_needs** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/suppressed_needs.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **avoidance_coping** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/avoidance_coping.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **meaning_vacuum** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/meaning_vacuum.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **chronic_depletion** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/chronic_depletion.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **fear_based_stability** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/fear_based_stability.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **emotional_permeability** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/emotional_permeability.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **chronic_alertness** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/chronic_alertness.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **hyper_responsibility** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/hyper_responsibility.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **loss_of_agency** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/loss_of_agency.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.

- **identity_diffusion** / `narratives` → `MISSING`  
  - path: `EXTRACTION_WORKSPACE/narratives/identity_diffusion.narr.v1.0.json`  
  - reason: Narrative contains placeholder segments ('待從 ... 提取'); no fill source present in package.
