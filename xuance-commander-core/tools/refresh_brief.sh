#!/usr/bin/env bash
set -euo pipefail
ROOT="${1:-.}"
python3 "$ROOT/tools/refresh_brief.py"
