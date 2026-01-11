#!/usr/bin/env python3
import json
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]

def read(p: Path) -> str:
  return p.read_text(encoding="utf-8") if p.exists() else ""

def newest_adr():
  adr_dir = ROOT / "docs" / "adr"
  if not adr_dir.exists():
    return None
  files = [p for p in adr_dir.glob("ADR_*.md") if p.is_file()]
  if not files:
    return None
  files.sort(key=lambda p: p.stat().st_mtime, reverse=True)
  return files[0]

def main():
  charter = ROOT / "charter" / "CHARTER.md"
  roadmap = ROOT / "roadmap" / "ROADMAP.md"
  current = ROOT / "memory" / "briefs" / "CURRENT.md"
  rules = ROOT / "docs" / "governance" / "TEXT_ONLY_EXECUTION_RULES.md"
  entry = ROOT / "memory" / "index" / "COMMANDER_ENTRYPOINTS.md"
  file_placement_rule = ROOT / "docs" / "governance" / "CURSOR_FILE_PLACEMENT_RULE.md"
  adr = newest_adr()

  brief_md = ROOT / "memory" / "briefs" / "COMMAND_BRIEF.md"
  brief_json = ROOT / "memory" / "briefs" / "COMMAND_BRIEF.json"

  payload = {
    "generatedAt": datetime.now().isoformat(timespec="seconds"),
    "mustRead": [
      "charter/CHARTER.md",
      "roadmap/ROADMAP.md",
      "memory/briefs/CURRENT.md",
      "docs/governance/TEXT_ONLY_EXECUTION_RULES.md",
      "memory/index/COMMANDER_ENTRYPOINTS.md",
      f"docs/adr/{adr.name}" if adr else None
    ]
  }
  payload["mustRead"] = [x for x in payload["mustRead"] if x]

  md = []
  md.append("# COMMAND BRIEF（指揮官每次必讀，否則不得開始工作）")
  md.append("")
  md.append(f"- generatedAt: {payload['generatedAt']}")
  md.append("")
  md.append("## 必讀清單（只以文本為準）")
  for p in payload["mustRead"]:
    md.append(f"- {p}")
  md.append("")
  md.append("## CHARTER（摘要）")
  md.append("（以下內容為原文節錄；若衝突，以 charter/CHARTER.md 為準）")
  md.append("")
  md.append(read(charter).strip())
  md.append("")
  md.append("## ROADMAP（摘要）")
  md.append("（以下內容為原文節錄；若衝突，以 roadmap/ROADMAP.md 為準）")
  md.append("")
  md.append(read(roadmap).strip())
  md.append("")
  md.append("## CURRENT（摘要）")
  md.append("（以下內容為原文節錄；若衝突，以 memory/briefs/CURRENT.md 為準）")
  md.append("")
  md.append(read(current).strip())
  md.append("")
  md.append("## TEXT-ONLY RULES（摘要）")
  md.append("（以下內容為原文節錄；若衝突，以 docs/governance/TEXT_ONLY_EXECUTION_RULES.md 為準）")
  md.append("")
  md.append(read(rules).strip())
  md.append("")
  md.append("## 文件放置規範（引用）")
  md.append("**重要**：每次寫入文件前，請參考 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`")
  md.append("")
  md.append("**文件放置規範引用**：")
  md.append("- 權威規範：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`")
  md.append("- 文件分類對照表、決策流程、重複文件清理規則均在此規範中")
  md.append("- 使用者說「請參考你的規範」時，即指此文件")
  md.append("")
  if adr:
    md.append("## LATEST ADR（參考）")
    md.append(str((ROOT / "docs" / "adr" / adr.name).relative_to(ROOT)))
  else:
    md.append("## LATEST ADR（參考）")
    md.append("- None")

  brief_md.write_text("\n".join(md) + "\n", encoding="utf-8")
  brief_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

  log_dir = ROOT / "logs" / "preflight"
  log_dir.mkdir(parents=True, exist_ok=True)
  stamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
  (log_dir / f"{stamp}.txt").write_text("preflight ok\n", encoding="utf-8")

  print("✅ Preflight generated:")
  print(f" - {brief_md.relative_to(ROOT)}")
  print(f" - {brief_json.relative_to(ROOT)}")

if __name__ == "__main__":
  main()
