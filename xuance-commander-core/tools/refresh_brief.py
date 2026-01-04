#!/usr/bin/env python3
import os
import json
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]

MAX_LINES_HINT = 300  # soft limit

def read_text(path: Path):
  try:
    return path.read_text(encoding="utf-8")
  except Exception:
    return ""

def count_lines(s: str) -> int:
  return 0 if not s else s.count("\n") + 1

def newest_adr():
  adr_dir = ROOT / "docs" / "adr"
  if not adr_dir.exists():
    return None
  files = [p for p in adr_dir.glob("ADR_*.md") if p.is_file()]
  if not files:
    return None
  files.sort(key=lambda p: p.stat().st_mtime, reverse=True)
  return files[0]

def list_manifests():
  mdir = ROOT / "domain" / "manifests"
  if not mdir.exists():
    return []
  return sorted([p.name for p in mdir.glob("*.json")])

def list_compiled():
  cdir = ROOT / "domain" / "compiled"
  if not cdir.exists():
    return []
  return sorted([p.name for p in cdir.glob("*.json")])

def main():
  idx = ROOT / "memory" / "index" / "INDEX.md"
  entry = ROOT / "memory" / "index" / "COMMANDER_ENTRYPOINTS.md"
  current = ROOT / "memory" / "briefs" / "CURRENT.md"
  changelog = ROOT / "memory" / "changes" / "CHANGELOG.md"
  adr = newest_adr()

  out = {
    "generatedAt": datetime.now().isoformat(timespec="seconds"),
    "entrypoints": {
      "INDEX": str(idx.relative_to(ROOT)) if idx.exists() else None,
      "COMMANDER_ENTRYPOINTS": str(entry.relative_to(ROOT)) if entry.exists() else None,
      "CURRENT": str(current.relative_to(ROOT)) if current.exists() else None,
      "CHANGELOG": str(changelog.relative_to(ROOT)) if changelog.exists() else None,
      "LATEST_ADR": str(adr.relative_to(ROOT)) if adr else None
    },
    "domain": {
      "manifests": list_manifests(),
      "compiled": list_compiled()
    },
    "healthHints": []
  }

  for p in [idx, entry, current, changelog]:
    if p.exists():
      lines = count_lines(read_text(p))
      if lines > MAX_LINES_HINT:
        out["healthHints"].append({
          "type": "FILE_TOO_LONG",
          "path": str(p.relative_to(ROOT)),
          "lines": lines,
          "hint": f"Keep under ~{MAX_LINES_HINT} lines. Move details into domain/ or docs/adr/ and link from INDEX."
        })

  digest_json = ROOT / "memory" / "briefs" / "DIGEST.json"
  digest_md = ROOT / "memory" / "briefs" / "DIGEST.md"

  digest_json.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")

  md = []
  md.append("# DIGEST（給指揮官快速掌握用）")
  md.append("")
  md.append(f"- generatedAt: {out['generatedAt']}")
  md.append("")
  md.append("## 必讀入口")
  for k, v in out["entrypoints"].items():
    md.append(f"- {k}: {v}")
  md.append("")
  md.append("## Domain 概況")
  md.append(f"- manifests: {len(out['domain']['manifests'])}")
  md.append(f"- compiled: {len(out['domain']['compiled'])}")
  if out["domain"]["manifests"]:
    md.append("  - " + "\n  - ".join(out["domain"]["manifests"][:10]) + ("" if len(out["domain"]["manifests"])<=10 else "\n  - ..."))
  md.append("")
  if out["healthHints"]:
    md.append("## 健康提示（需要整理）")
    for h in out["healthHints"]:
      md.append(f"- {h['type']}: {h['path']} ({h.get('lines','?')} lines) -> {h['hint']}")
  else:
    md.append("## 健康提示")
    md.append("- OK")

  digest_md.write_text("\n".join(md) + "\n", encoding="utf-8")

  print("✅ Refreshed:")
  print(f" - {digest_json.relative_to(ROOT)}")
  print(f" - {digest_md.relative_to(ROOT)}")

if __name__ == "__main__":
  main()
