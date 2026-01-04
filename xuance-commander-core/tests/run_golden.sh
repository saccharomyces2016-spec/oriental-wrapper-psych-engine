#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"

MANIFEST="$ROOT/domain/manifests/stress_recovery.v1.0.json"
COMPILED="$ROOT/domain/compiled/stress_recovery.compiled.v1.0.json"

python3 "$ROOT/engine/compile_domain.py" "$MANIFEST" "$COMPILED" >/dev/null

low_out="$(python3 "$ROOT/engine/score_facet.py" "$COMPILED" "$ROOT/tests/fixtures/answers_low.json")"
high_out="$(python3 "$ROOT/engine/score_facet.py" "$COMPILED" "$ROOT/tests/fixtures/answers_high.json")"

low_band="$(echo "$low_out" | python3 -c 'import sys, json; print(json.load(sys.stdin)["band"])')"
high_band="$(echo "$high_out" | python3 -c 'import sys, json; print(json.load(sys.stdin)["band"])')"

test "$low_band" = "low"
test "$high_band" = "high"

echo "✅ Golden tests passed: low=$low_band, high=$high_band"
