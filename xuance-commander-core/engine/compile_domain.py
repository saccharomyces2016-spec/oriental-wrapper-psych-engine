#!/usr/bin/env python3
import json
import sys
from pathlib import Path

def read_json(p: Path):
  return json.loads(p.read_text(encoding="utf-8"))

def main():
  if len(sys.argv) != 3:
    print("Usage: compile_domain.py <manifest.json> <out.json>", file=sys.stderr)
    sys.exit(2)

  manifest_path = Path(sys.argv[1])
  out_path = Path(sys.argv[2])

  manifest = read_json(manifest_path)
  project_root = manifest_path.parents[2]  # repo root

  def resolve(src: str) -> Path:
    path = Path(src)
    if path.is_absolute():
      return path
    if path.parts and path.parts[0] == "domain":
      return project_root / path
    return manifest_path.parent / path

  sources = manifest["sources"]
  compiled = {
    "domainVersion": manifest["domainVersion"],
    "facetId": manifest["facetId"],
    "questions": read_json(resolve(sources["questions"])),
    "scoring": read_json(resolve(sources["scoring"])),
    "recommendations": read_json(resolve(sources["recommendations"])),
    "narratives": read_json(resolve(sources["narratives"])),
    "riskchains": read_json(resolve(sources["riskchains"])),
  }

  out_path.parent.mkdir(parents=True, exist_ok=True)
  out_path.write_text(json.dumps(compiled, ensure_ascii=False, indent=2), encoding="utf-8")
  print(f"✅ Compiled: {manifest_path} -> {out_path}")

if __name__ == "__main__":
  main()
