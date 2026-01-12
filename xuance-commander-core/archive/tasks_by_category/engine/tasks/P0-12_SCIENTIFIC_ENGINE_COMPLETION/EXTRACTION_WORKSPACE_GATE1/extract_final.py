#!/usr/bin/env python3
"""
Legacy 最終內容提取腳本

目的：從 chains.json 和 ContentDB 提取剩餘的 narratives 和 riskchains 內容
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

# Legacy 主題 key → 13 個主題的對應關係
LEGACY_THEME_MAPPING = {
    "control_need": ["fear_based_stability", "loss_of_agency"],
    "attachment_insecurity": ["emotional_permeability", "social_comparison"],
    "avoidance_procrastination": ["avoidance_coping", "fear_based_stability"],
    "commitment_anxiety": ["fear_based_stability", "loss_of_agency"],
    "burnout_overload": ["chronic_depletion", "hyper_responsibility"]
}

# ContentDB 領域 → 主題對應
CONTENTDB_THEME_MAPPING = {
    "self": ["chronic_depletion", "hyper_responsibility", "suppressed_needs", "identity_diffusion"],
    "health": ["chronic_depletion", "chronic_alertness"],
    "relationship": ["emotional_permeability", "social_comparison"],
    "family": ["hyper_responsibility", "suppressed_needs"],
    "career": ["chronic_depletion", "loss_of_agency", "fear_based_stability"],
    "money": ["fear_based_stability", "loss_of_agency"],
    "finance": ["fear_based_stability", "loss_of_agency"],
    "social": ["social_comparison", "emotional_permeability"],
    "study": ["loss_of_agency", "fear_based_stability", "meaning_vacuum"],
    "love": ["emotional_permeability", "social_comparison"]
}

def update_riskchains_from_chains():
    """從 chains.json 更新 riskchains"""
    print("=== 從 chains.json 更新 Riskchains ===")
    
    chains_path = WORKSPACE / "guidance_logic" / "chains.json"
    if not chains_path.exists():
        print(f"❌ 找不到檔案: {chains_path}")
        return
    
    with open(chains_path, 'r', encoding='utf-8') as f:
        chains_data = json.load(f)
    
    by_theme = chains_data.get("byTheme", {})
    
    updated = 0
    for legacy_key, theme_ids in LEGACY_THEME_MAPPING.items():
        if legacy_key not in by_theme:
            continue
        
        chain_data = by_theme[legacy_key]
        
        for theme_id in theme_ids:
            riskchain_path = WORKSPACE / "riskchains" / f"{theme_id}.risk.v1.0.json"
            if not riskchain_path.exists():
                continue
            
            with open(riskchain_path, 'r', encoding='utf-8') as f:
                riskchain = json.load(f)
            
            # 更新 mid 和 high 的 if_not_improve
            mid_chains = chain_data.get("mid", [])
            high_chains = chain_data.get("long", [])  # long 對應 high
            
            if mid_chains or high_chains:
                riskchain["mid"]["if_not_improve"] = mid_chains if mid_chains else riskchain["mid"]["if_not_improve"]
                riskchain["high"]["if_not_improve"] = high_chains if high_chains else riskchain["high"]["if_not_improve"]
                riskchain["_updated_from"] = f"chains.json (byTheme.{legacy_key})"
                
                with open(riskchain_path, 'w', encoding='utf-8') as f:
                    json.dump(riskchain, f, ensure_ascii=False, indent=2)
                
                print(f"✅ 已更新: {theme_id}.risk.v1.0.json（從 {legacy_key}）")
                updated += 1
    
    print(f"\n✅ 共更新 {updated} 個主題的 riskchains")

def update_narratives_from_contentdb():
    """從 ContentDB 更新 narratives"""
    print("\n=== 從 ContentDB 更新 Narratives ===")
    
    contentdb_dir = WORKSPACE / "contentdb"
    
    # 讀取所有 ContentDB 檔案
    contentdb_files = {
        "self": contentdb_dir / "ContentDB_self.js",
        "health": contentdb_dir / "ContentDB_health.js",
        "relationship": contentdb_dir / "ContentDB_relationship.js",
        "family": contentdb_dir / "ContentDB_family.js",
        "career": contentdb_dir / "ContentDB_career.js",
        "money": contentdb_dir / "ContentDB_money.js",
        "finance": contentdb_dir / "ContentDB_finance.js",
        "social": contentdb_dir / "ContentDB_social.js",
        "study": contentdb_dir / "ContentDB_study.js",
        "love": contentdb_dir / "ContentDB_love.js"
    }
    
    # 按主題分組 ContentDB 內容
    theme_contentdb = defaultdict(list)
    
    for domain, file_path in contentdb_files.items():
        if not file_path.exists():
            continue
        
        if domain in CONTENTDB_THEME_MAPPING:
            for theme_id in CONTENTDB_THEME_MAPPING[domain]:
                theme_contentdb[theme_id].append({
                    "domain": domain,
                    "file": file_path.name
                })
    
    updated = 0
    for theme_id in THEMES:
        narratives_path = WORKSPACE / "narratives" / f"{theme_id}.narr.v1.0.json"
        if not narratives_path.exists():
            continue
        
        with open(narratives_path, 'r', encoding='utf-8') as f:
            narrative = json.load(f)
        
        # 如果已經有內容，跳過
        if narrative.get("low", {}).get("opening") != "待從 ContentDB 和 anchor_statements 提取":
            continue
        
        contentdb_refs = theme_contentdb.get(theme_id, [])
        if contentdb_refs:
            narrative["_contentdb_sources"] = contentdb_refs
            narrative["_note"] = "此為提取的原始資料，需要顧問團隊整合刪減昇華。ContentDB 內容需要手動分析提取。"
            
            with open(narratives_path, 'w', encoding='utf-8') as f:
                json.dump(narrative, f, ensure_ascii=False, indent=2)
            
            print(f"✅ 已標註 ContentDB 來源: {theme_id}.narr.v1.0.json（{len(contentdb_refs)} 個來源）")
            updated += 1
    
    print(f"\n✅ 共標註 {updated} 個主題的 ContentDB 來源")

def main():
    """主執行函數"""
    print("開始最終內容提取...\n")
    
    # 從 chains.json 更新 riskchains
    update_riskchains_from_chains()
    
    # 從 ContentDB 標註 narratives 來源
    update_narratives_from_contentdb()
    
    print("\n✅ 提取完成！")
    print("\n注意：")
    print("- Riskchains 已從 chains.json 更新部分內容")
    print("- Narratives 已標註 ContentDB 來源，需要手動分析提取")
    print("- 剩餘內容需要手動分析 ContentDB 檔案和 buildGuidance.js")

if __name__ == "__main__":
    from collections import defaultdict
    main()
