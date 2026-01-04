#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
OUTDIR="$ROOT/domain/compiled"

mkdir -p "$OUTDIR"

for m in "$ROOT"/domain/manifests/*.json; do
  base="$(basename "$m" .json)"
  out="$OUTDIR/${base}.compiled.json"
  python3 "$ROOT/engine/compile_domain.py" "$m" "$out" >/dev/null
done

echo "✅ Compiled all manifests into $OUTDIR"
