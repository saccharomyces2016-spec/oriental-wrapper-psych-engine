# ELEMENT PRIOR SPEC
Status: DRAFT (Skeleton)
Authority: Under PRODUCT_ARCHITECTURE_CONSTITUTION_vNEXT.md

## 1. Purpose
Define prior rules mapping **structural signals** to **elemental weight distributions** using deterministic, testable logic. No narrative, psychology, advice, or interpretation.

## 2. Scope & Non-Scope
### In Scope
- Deterministic mapping from structural signals to elemental weights
- Pure logical / mathematical transformations
- Testable, auditable rule definitions

### Out of Scope (Strictly Forbidden)
- Narrative explanation
- Psychological interpretation
- Advice, recommendation, or value judgment
- User-facing language

## 3. Input Interface Definition
### 3.1 Structural Signal Tags (Controlled Vocabulary)
```
enum StructuralSignal {
  OPPOSITION,      // detected structural conflict
  STAGNATION,      // lack of directional change
  REPETITION,      // recurring pattern without resolution
  ESCALATION,      // increasing intensity over time
  DISSOLUTION      // loss of structure or boundary
}
```
No other input tokens are permitted. Any undefined signal MUST be rejected upstream.

## 4. Element Weight Model
### 4.1 Element Set
```
enum Element {
  WOOD,
  FIRE,
  EARTH,
  METAL,
  WATER
}
```

### 4.2 Weight Representation
- Integer-based weights
- Default baseline: 0
- Upper bound per element: implementation-defined
- No normalization implied unless explicitly stated

## 5. Mapping Rules (Logic-Only)
All rules MUST follow explicit conditional logic. No natural language interpretation is allowed.

### Rule Format (Mandatory)
```
IF <structural_condition>
THEN <element_weight_adjustment>
```

### Placeholder Examples (Syntax Only)
```
IF signal == OPPOSITION
THEN METAL += X
```
`X` MUST be a concrete integer when implemented.

## 6. Rule Evaluation Order
- Rules are evaluated sequentially
- Order is significant
- No recursive evaluation
- No probabilistic behavior

## 7. Output Contract
```
{
  "WOOD": <int>,
  "FIRE": <int>,
  "EARTH": <int>,
  "METAL": <int>,
  "WATER": <int>
}
```
- Output is descriptive only
- No dominant element inference at this stage

## 8. Golden Test Cases (Required)
These cases are normative and MUST pass in validation.

### Case 1
Input: [OPPOSITION]
Expected Output: { METAL: ?, others: ? }

### Case 2
Input: [STAGNATION, REPETITION]
Expected Output: { EARTH: ?, WATER: ?, others: ? }

### Case 3
Input: [ESCALATION]
Expected Output: { FIRE: ?, others: ? }

## 9. Compliance Notes
- This spec MUST NOT reference meaning, destiny, self, or outcome
- This spec is a computational layer only
- Any narrative binding MUST occur downstream in NARRATIVE_BINDING_SPEC.md
