#!/usr/bin/env python3
"""
全面盤點腳本

目的：盤點所有題庫相關內容
- 題型設計
- 題目設計
- 問答階段設計
- 分數計算方式
- 底層運算引擎
"""

import json
import os
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(__file__).parent.parent.parent
CORE_DIR = PROJECT_ROOT / "xuance-commander-core"
OUTPUT_DIR = PROJECT_ROOT / "xuance-commander-core" / "P0-12_SCIENTIFIC_ENGINE_COMPLETION"

def find_files(pattern, exclude_dirs=None):
    """尋找檔案"""
    exclude_dirs = exclude_dirs or ["node_modules", ".git", "__pycache__", ".DS_Store"]
    files = []
    for path in PROJECT_ROOT.rglob(pattern):
        if any(exclude in str(path) for exclude in exclude_dirs):
            continue
        if path.is_file():
            files.append(path)
    return files

def analyze_questions():
    """分析題目設計"""
    print("=== 分析題目設計 ===\n")
    
    question_files = find_files("**/questions/*.json")
    question_designs = []
    
    for q_file in question_files:
        try:
            with open(q_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if isinstance(data, list) and len(data) > 0:
                first_q = data[0]
                question_designs.append({
                    "file": str(q_file.relative_to(PROJECT_ROOT)),
                    "count": len(data),
                    "type": first_q.get("type", "unknown"),
                    "scale_length": len(first_q.get("scale", [])) if isinstance(first_q.get("scale"), list) else 0,
                    "sample_question": first_q.get("text", "")[:50] if first_q.get("text") else ""
                })
        except Exception as e:
            print(f"   ⚠️ 讀取錯誤: {q_file} - {e}")
    
    return question_designs

def analyze_scoring():
    """分析分數計算方式"""
    print("=== 分析分數計算方式 ===\n")
    
    scoring_files = find_files("**/facets/*.json")
    scoring_methods = []
    
    for s_file in scoring_files:
        try:
            with open(s_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            scoring_methods.append({
                "file": str(s_file.relative_to(PROJECT_ROOT)),
                "structure": list(data.keys()) if isinstance(data, dict) else "array",
                "has_thresholds": "thresholds" in str(data) if isinstance(data, dict) else False,
                "has_levels": "levels" in str(data) if isinstance(data, dict) else False
            })
        except Exception as e:
            print(f"   ⚠️ 讀取錯誤: {s_file} - {e}")
    
    return scoring_methods

def analyze_engine():
    """分析底層運算引擎"""
    print("=== 分析底層運算引擎 ===\n")
    
    engine_files = find_files("**/engine/*.py")
    engine_components = []
    
    for e_file in engine_files:
        try:
            with open(e_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 簡單分析
            has_question = "question" in content.lower()
            has_score = "score" in content.lower()
            has_calculate = "calculate" in content.lower()
            
            engine_components.append({
                "file": str(e_file.relative_to(PROJECT_ROOT)),
                "size": len(content),
                "has_question_logic": has_question,
                "has_scoring_logic": has_score,
                "has_calculation": has_calculate
            })
        except Exception as e:
            print(f"   ⚠️ 讀取錯誤: {e_file} - {e}")
    
    return engine_components

def analyze_stages():
    """分析問答階段設計"""
    print("=== 分析問答階段設計 ===\n")
    
    # 尋找可能包含階段設計的檔案
    stage_files = []
    
    # 檢查 narratives（可能有階段設計）
    narrative_files = find_files("**/narratives/*.json")
    for n_file in narrative_files:
        try:
            with open(n_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if isinstance(data, dict):
                has_stages = any(level in data for level in ["low", "mid", "high", "round1", "round2", "round3"])
                if has_stages:
                    stage_files.append({
                        "file": str(n_file.relative_to(PROJECT_ROOT)),
                        "stages": [k for k in data.keys() if k in ["low", "mid", "high", "round1", "round2", "round3"]]
                    })
        except:
            pass
    
    return stage_files

def main():
    """主執行函數"""
    print("=" * 80)
    print("全面盤點：題庫相關內容")
    print("=" * 80)
    print()
    
    # 分析各項
    questions = analyze_questions()
    scoring = analyze_scoring()
    engine = analyze_engine()
    stages = analyze_stages()
    
    # 產出報告
    report = {
        "generated_at": datetime.now().isoformat(),
        "questions": {
            "count": len(questions),
            "files": questions,
            "types": list(set(q["type"] for q in questions)),
            "total_questions": sum(q["count"] for q in questions)
        },
        "scoring": {
            "count": len(scoring),
            "files": scoring
        },
        "engine": {
            "count": len(engine),
            "files": engine
        },
        "stages": {
            "count": len(stages),
            "files": stages
        }
    }
    
    # 儲存報告
    report_file = OUTPUT_DIR / "COMPREHENSIVE_INVENTORY_REPORT.json"
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ 報告已儲存: {report_file}")
    
    return report

if __name__ == "__main__":
    main()
