#!/usr/bin/env python3
"""
全面資料夾重組分析腳本
目的：盤點所有 P0 檔案，識別衝突，確定基準檔案，設計新的資料夾結構
"""

import json
import os
from pathlib import Path
from datetime import datetime
from collections import defaultdict

PROJECT_ROOT = Path(__file__).parent.parent
OUTPUT_DIR = Path(__file__).parent

def find_all_p0_files():
    """找出所有 P0 開頭的檔案"""
    p0_files = []
    for root, dirs, files in os.walk(PROJECT_ROOT):
        # 跳過某些目錄
        if any(skip in root for skip in ['node_modules', '.git', '__pycache__', 'GATE4_BACKUP', 'EXTRACTION_WORKSPACE']):
            continue
        for file in files:
            if file.startswith('P0') and (file.endswith('.md') or file.endswith('.json')):
                full_path = Path(root) / file
                rel_path = full_path.relative_to(PROJECT_ROOT)
                stat = full_path.stat()
                p0_files.append({
                    'path': str(rel_path),
                    'full_path': str(full_path),
                    'name': file,
                    'size': stat.st_size,
                    'mtime': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                    'dir': str(Path(root).relative_to(PROJECT_ROOT))
                })
    return sorted(p0_files, key=lambda x: x['mtime'], reverse=True)

def categorize_p0_folders():
    """分類 P0 資料夾"""
    p0_dirs = []
    for item in PROJECT_ROOT.iterdir():
        if item.is_dir() and item.name.startswith('P0'):
            p0_dirs.append(item.name)
    return sorted(p0_dirs)

def identify_key_specs():
    """識別關鍵規格檔案"""
    key_specs = {
        'ui_architecture': [],
        'workflow': [],
        'worldview': [],
        'ultimate_goals': [],
        'core_engine': [],
        'metaphysical_engine': [],
    }
    
    # UI 架構相關
    ui_keywords = ['UI_ARCHITECTURE', 'UI_INTEGRATION', 'UMIP', 'FUNNEL_SYSTEM', 'HANDOFF']
    # 流程相關
    workflow_keywords = ['FUNNEL', 'STAGE', 'WORKFLOW', 'FLOW']
    # 世界觀相關
    worldview_keywords = ['WORLDVIEW', 'DESIGN_DOC_FINAL', 'VISUAL']
    # 終極目標相關
    goals_keywords = ['CHARTER', 'NORTH_STAR', 'ULTIMATE', 'GOAL']
    # 底層引擎相關
    core_keywords = ['SCIENTIFIC_ENGINE', 'SCORING', 'CALCULATION', 'SCORE_FACET']
    # 表層引擎相關
    meta_keywords = ['METAPHYSICAL_ENGINE', 'HEXAGRAM', 'BAGUA', 'WUXING', 'ICHING']
    
    p0_files = find_all_p0_files()
    
    for file in p0_files:
        name_upper = file['name'].upper()
        path_upper = file['path'].upper()
        
        if any(kw in name_upper or kw in path_upper for kw in ui_keywords):
            key_specs['ui_architecture'].append(file)
        if any(kw in name_upper or kw in path_upper for kw in workflow_keywords):
            key_specs['workflow'].append(file)
        if any(kw in name_upper or kw in path_upper for kw in worldview_keywords):
            key_specs['worldview'].append(file)
        if any(kw in name_upper or kw in path_upper for kw in goals_keywords):
            key_specs['ultimate_goals'].append(file)
        if any(kw in name_upper or kw in path_upper for kw in core_keywords):
            key_specs['core_engine'].append(file)
        if any(kw in name_upper or kw in path_upper for kw in meta_keywords):
            key_specs['metaphysical_engine'].append(file)
    
    return key_specs

def identify_conflicts():
    """識別衝突檔案"""
    conflicts = {
        'stage_design': [],
        'ui_architecture': [],
        'workflow': [],
        'worldview': [],
    }
    
    # Stage 設計衝突（已識別）
    conflicts['stage_design'] = [
        {
            'topic': 'Stage 2 設計',
            'baseline': 'P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md',
            'conflicts': [
                'P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md',
                'P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md',
                'P0-5/P0-5_HANDOFF_SUMMARY.md',
                'domain/knowledge_base/question_design_guidelines.v1.0.md'
            ]
        }
    ]
    
    return conflicts

def main():
    """主函數"""
    print("=" * 80)
    print("全面資料夾重組分析")
    print("=" * 80)
    print()
    
    # 1. 找出所有 P0 檔案
    print("1. 盤點所有 P0 檔案...")
    p0_files = find_all_p0_files()
    print(f"   找到 {len(p0_files)} 個 P0 檔案")
    
    # 2. 分類 P0 資料夾
    print("\n2. 分類 P0 資料夾...")
    p0_dirs = categorize_p0_folders()
    print(f"   找到 {len(p0_dirs)} 個 P0 資料夾")
    for dir_name in p0_dirs:
        print(f"   - {dir_name}")
    
    # 3. 識別關鍵規格檔案
    print("\n3. 識別關鍵規格檔案...")
    key_specs = identify_key_specs()
    for category, files in key_specs.items():
        print(f"   {category}: {len(files)} 個檔案")
        for f in files[:3]:  # 只顯示前 3 個
            print(f"     - {f['path']}")
    
    # 4. 識別衝突
    print("\n4. 識別衝突...")
    conflicts = identify_conflicts()
    for category, conflict_list in conflicts.items():
        print(f"   {category}: {len(conflict_list)} 個衝突主題")
    
    # 5. 生成報告
    report = {
        'generated_at': datetime.now().isoformat(),
        'total_p0_files': len(p0_files),
        'total_p0_dirs': len(p0_dirs),
        'p0_dirs': p0_dirs,
        'key_specs': {k: [f['path'] for f in v] for k, v in key_specs.items()},
        'conflicts': conflicts,
        'p0_files_sample': [f['path'] for f in p0_files[:50]]
    }
    
    report_file = OUTPUT_DIR / "REORGANIZATION_ANALYSIS.json"
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ 分析報告已儲存: {report_file}")
    
    return report

if __name__ == '__main__':
    main()
