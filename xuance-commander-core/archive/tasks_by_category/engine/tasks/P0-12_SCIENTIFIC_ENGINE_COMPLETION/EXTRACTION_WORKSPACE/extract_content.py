#!/usr/bin/env python3
"""
Legacy 內容提取腳本

目的：從 anchor_statements 和 consequence_chain_library 提取實際內容
"""

import json
import os
from pathlib import Path
from collections import defaultdict

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

# Legacy mother_theme → 13 個主題的對應關係
LEGACY_THEME_MAPPING = {
    "control_vs_exhaustion": ["chronic_depletion", "hyper_responsibility"],
    "avoidance_stagnation": ["avoidance_coping", "fear_based_stability"],
    "attachment_insecurity": ["emotional_permeability", "social_comparison"],
    "chronic_depletion": ["chronic_depletion"],
    "identity_diffusion": ["identity_diffusion"],
    # 其他對應關係待補充
}

def extract_narratives_from_anchors():
    """從 anchor_statements 提取 narratives"""
    print("=== 從 anchor_statements 提取 Narratives ===")
    
    anchor_path = WORKSPACE / "raw" / "anchor_statements.v1.json"
    if not anchor_path.exists():
        print(f"❌ 找不到檔案: {anchor_path}")
        return
    
    with open(anchor_path, 'r', encoding='utf-8') as f:
        anchor_data = json.load(f)
    
    narratives_dir = WORKSPACE / "narratives"
    narratives_dir.mkdir(exist_ok=True)
    
    # 按主題分組錨定語句
    theme_anchors = defaultdict(list)
    
    for item in anchor_data.get("items", []):
        legacy_theme = item.get("mother_theme", "")
        if legacy_theme in LEGACY_THEME_MAPPING:
            for theme_id in LEGACY_THEME_MAPPING[legacy_theme]:
                theme_anchors[theme_id].append(item)
        elif legacy_theme in THEMES:
            theme_anchors[legacy_theme].append(item)
    
    extracted = 0
    for theme_id in THEMES:
        output_path = narratives_dir / f"{theme_id}.narr.v1.0.json"
        
        anchors = theme_anchors.get(theme_id, [])
        
        # 提取 opening 和 explain（從 safe_tone_template）
        low_openings = []
        mid_openings = []
        high_openings = []
        low_explains = []
        mid_explains = []
        high_explains = []
        
        for anchor in anchors[:5]:  # 每個 band 最多 5 個
            template = anchor.get("safe_tone_template", {})
            acknowledge = template.get("acknowledge", "")
            
            # 根據 state_tags 判斷 band
            tags = anchor.get("state_tags", [])
            if "exhaustion" in tags or "high_arousal" in tags:
                high_openings.append(acknowledge)
            elif "procrastination" in tags or "low_arousal" in tags:
                low_openings.append(acknowledge)
            else:
                mid_openings.append(acknowledge)
        
        # 建立 narratives 結構
        narrative_data = {
            "_extracted_from": "anchor_statements.v1.json",
            "_extraction_date": "2026-01-12",
            "_note": "此為提取的原始資料，需要顧問團隊整合刪減昇華",
            "low": {
                "opening": low_openings[0] if low_openings else "待從 ContentDB 和 anchor_statements 提取",
                "explain": "待從 ContentDB 和 anchor_statements 提取"
            },
            "mid": {
                "opening": mid_openings[0] if mid_openings else "待從 ContentDB 和 anchor_statements 提取",
                "explain": "待從 ContentDB 和 anchor_statements 提取"
            },
            "high": {
                "opening": high_openings[0] if high_openings else "待從 ContentDB 和 anchor_statements 提取",
                "explain": "待從 ContentDB 和 anchor_statements 提取"
            },
            "_raw_anchors": anchors[:10]  # 保留原始資料供參考
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(narrative_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已提取: {theme_id}.narr.v1.0.json（{len(anchors)} 個錨定語句）")
        extracted += 1
    
    print(f"\n✅ 共提取 {extracted} 個主題的 narratives")

def extract_riskchains_from_library():
    """從 consequence_chain_library 提取 riskchains"""
    print("\n=== 從 consequence_chain_library 提取 Riskchains ===")
    
    chain_lib_path = WORKSPACE / "raw" / "consequence_chain_library.v1.json"
    if not chain_lib_path.exists():
        print(f"❌ 找不到檔案: {chain_lib_path}")
        return
    
    with open(chain_lib_path, 'r', encoding='utf-8') as f:
        chain_lib = json.load(f)
    
    riskchains_dir = WORKSPACE / "riskchains"
    riskchains_dir.mkdir(exist_ok=True)
    
    # 建立後果鏈 → 主題的對應關係
    chain_theme_mapping = {
        "chain_chronic_stress": ["chronic_depletion", "chronic_alertness"],
        "chain_avoidance_loop": ["avoidance_coping", "fear_based_stability"],
        "chain_relationship_pattern": ["social_comparison", "emotional_permeability"]
    }
    
    # 為每個主題建立 riskchains
    extracted = 0
    for theme_id in THEMES:
        output_path = riskchains_dir / f"{theme_id}.risk.v1.0.json"
        
        # 找到對應的後果鏈
        matched_chains = []
        for chain_id, themes in chain_theme_mapping.items():
            if theme_id in themes:
                for item in chain_lib.get("items", []):
                    if item.get("id") == chain_id:
                        matched_chains.append(item)
        
        # 建立 riskchains 結構
        mid_chains = []
        high_chains = []
        
        for chain in matched_chains:
            template = chain.get("safe_tone_template", {})
            action = template.get("action", "")
            if action:
                # 轉換為 if_not_improve 格式
                chain_text = f"待轉換：{action}"
                mid_chains.append(chain_text)
                high_chains.append(chain_text)
        
        riskchain_data = {
            "_extracted_from": "consequence_chain_library.v1.json",
            "_extraction_date": "2026-01-12",
            "_note": "此為提取的原始資料，需要顧問團隊整合刪減昇華",
            "mid": {
                "if_not_improve": mid_chains if mid_chains else ["待從 consequence_chain_library 和 buildGuidance.js 提取"]
            },
            "high": {
                "if_not_improve": high_chains if high_chains else ["待從 consequence_chain_library 和 buildGuidance.js 提取"]
            },
            "_raw_chains": matched_chains  # 保留原始資料供參考
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(riskchain_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已提取: {theme_id}.risk.v1.0.json（{len(matched_chains)} 個後果鏈）")
        extracted += 1
    
    print(f"\n✅ 共提取 {extracted} 個主題的 riskchains")

def main():
    """主執行函數"""
    print("開始提取 Legacy 內容...\n")
    
    # 從 anchor_statements 提取 narratives
    extract_narratives_from_anchors()
    
    # 從 consequence_chain_library 提取 riskchains
    extract_riskchains_from_library()
    
    print("\n✅ 提取完成！")
    print("\n注意：")
    print("- Narratives 和 Riskchains 已提取部分內容，但需要進一步分析和整理")
    print("- 需要從 ContentDB 檔案提取更多 narratives")
    print("- 需要從 buildGuidance.js 提取更多 riskchains 邏輯")

if __name__ == "__main__":
    main()
