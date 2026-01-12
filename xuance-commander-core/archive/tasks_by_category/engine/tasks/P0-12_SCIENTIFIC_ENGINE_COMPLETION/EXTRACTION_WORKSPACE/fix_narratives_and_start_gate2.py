#!/usr/bin/env python3
"""
修正 Narratives 並開始 Gate 2

目的：
1. 修正 Gate 1 中錯誤標註為 MISSING 的 narratives（保留有內容的部分）
2. 開始 Gate 2 轉化為新版架構格式
"""

import json
import os
from pathlib import Path

# 工作區路徑
WORKSPACE = Path(__file__).parent

# 13 個主題清單
THEMES = [
    "chronic_depletion",
    "hyper_responsibility",
    "fear_based_stability",
    "loss_of_agency",
    "social_comparison",
    "suppressed_needs",
    "identity_diffusion",
    "chronic_alertness",
    "meaning_vacuum",
    "self_erosion",
    "emotional_permeability",
    "avoidance_coping",
    "unprocessed_loss"
]

def fix_narratives():
    """修正 narratives：保留有內容的部分，移除錯誤的 MISSING 標記"""
    print("=== 修正 Narratives ===")
    
    narratives_dir = WORKSPACE / "narratives"
    fixed_count = 0
    
    for theme_id in THEMES:
        narrative_path = narratives_dir / f"{theme_id}.narr.v1.0.json"
        if not narrative_path.exists():
            continue
        
        with open(narrative_path, 'r', encoding='utf-8') as f:
            narrative = json.load(f)
        
        status = narrative.get('_status', 'OK')
        low_opening = narrative.get('low', {}).get('opening', '').strip()
        mid_opening = narrative.get('mid', {}).get('opening', '').strip()
        high_opening = narrative.get('high', {}).get('opening', '').strip()
        
        has_content = bool(low_opening or mid_opening or high_opening)
        
        # 如果有內容但被標註為 MISSING，移除錯誤的標記
        if status == 'MISSING' and has_content:
            # 移除 _status 標記
            if '_status' in narrative:
                del narrative['_status']
            
            # 移除其他 Gate 1 相關欄位
            for key in list(narrative.keys()):
                if key.startswith('_gate1_'):
                    del narrative[key]
            
            # 確保 explain 欄位存在（即使為空）
            for level in ['low', 'mid', 'high']:
                if level not in narrative:
                    narrative[level] = {}
                if 'explain' not in narrative[level]:
                    narrative[level]['explain'] = ""
            
            with open(narrative_path, 'w', encoding='utf-8') as f:
                json.dump(narrative, f, ensure_ascii=False, indent=2)
            
            print(f"✅ 已修正: {theme_id}.narr.v1.0.json（保留內容，移除錯誤的 MISSING 標記）")
            fixed_count += 1
    
    print(f"\n✅ 共修正 {fixed_count} 個 narratives")

def start_gate2():
    """開始 Gate 2：轉化為新版架構格式"""
    print("\n=== 開始 Gate 2：轉化為新版架構格式 ===")
    
    # 建立輸出目錄
    output_dir = WORKSPACE / "domain_output"
    output_dir.mkdir(exist_ok=True)
    
    for subdir in ['manifests', 'questions', 'narratives', 'recommendations', 'riskchains']:
        (output_dir / subdir).mkdir(exist_ok=True)
    
    print(f"✅ 已建立輸出目錄: {output_dir}")
    print("\n請參考 GATE2_EXECUTION_GUIDE.md 進行轉化")
    print("轉化步驟：")
    print("1. 轉化 Manifests")
    print("2. 轉化 Questions")
    print("3. 轉化 Narratives（保留有內容的部分）")
    print("4. 轉化 Recommendations")
    print("5. 轉化 Riskchains")
    print("6. 建立對照表")
    print("7. 產出最終資料包")

def main():
    """主執行函數"""
    print("開始修正 Narratives 並準備 Gate 2...\n")
    
    # 修正 narratives
    fix_narratives()
    
    # 開始 Gate 2
    start_gate2()
    
    print("\n✅ 準備完成！")
    print("\n下一步：")
    print("1. 閱讀 GATE2_EXECUTION_GUIDE.md")
    print("2. 開始轉化為新版架構格式")

if __name__ == "__main__":
    main()
