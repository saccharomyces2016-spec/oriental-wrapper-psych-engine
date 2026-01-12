#!/usr/bin/env python3
"""
Legacy 剩餘資料提取腳本

目的：提取剩餘的 Narratives、Riskchains 和補充 Recommendations
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

def extract_riskchains():
    """從 consequence_chain_library 和 chains.json 提取 riskchains"""
    print("=== 提取 Riskchains ===")
    
    # 建立 riskchains 資料夾
    riskchains_dir = WORKSPACE / "riskchains"
    riskchains_dir.mkdir(exist_ok=True)
    
    # 讀取 consequence_chain_library
    chain_lib_path = WORKSPACE / "raw" / "consequence_chain_library.v1.json"
    if chain_lib_path.exists():
        with open(chain_lib_path, 'r', encoding='utf-8') as f:
            chain_lib = json.load(f)
        
        # 提取通用後果鏈
        print(f"✅ 已讀取 consequence_chain_library（{len(chain_lib.get('items', []))} 個後果鏈）")
    
    # 讀取 chains.json
    chains_path = WORKSPACE / "guidance_logic" / "chains.json"
    if chains_path.exists():
        with open(chains_path, 'r', encoding='utf-8') as f:
            chains_data = json.load(f)
        
        print(f"✅ 已讀取 chains.json（byTheme 結構）")
    
    # 為每個主題建立 riskchains 檔案（使用通用模板）
    extracted = 0
    for theme_id in THEMES:
        output_path = riskchains_dir / f"{theme_id}.risk.v1.0.json"
        
        # 建立基本結構（參考 chronic_depletion 的結構）
        riskchain_data = {
            "_extracted_from": "consequence_chain_library.v1.json, chains.json, buildGuidance.js",
            "_extraction_date": "2026-01-12",
            "_note": "此為提取的原始資料，需要顧問團隊整合刪減昇華",
            "mid": {
                "if_not_improve": [
                    "待從 consequence_chain_library 和 buildGuidance.js 提取"
                ]
            },
            "high": {
                "if_not_improve": [
                    "待從 consequence_chain_library 和 buildGuidance.js 提取"
                ]
            }
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(riskchain_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已建立: {theme_id}.risk.v1.0.json（待填充內容）")
        extracted += 1
    
    print(f"\n✅ 共建立 {extracted} 個主題的 riskchains 檔案（待填充內容）")

def extract_narratives():
    """從 ContentDB 和 anchor_statements 提取 narratives"""
    print("\n=== 提取 Narratives ===")
    
    # 建立 narratives 資料夾
    narratives_dir = WORKSPACE / "narratives"
    narratives_dir.mkdir(exist_ok=True)
    
    # 讀取 anchor_statements
    anchor_path = WORKSPACE / "raw" / "anchor_statements.v1.json"
    if anchor_path.exists():
        with open(anchor_path, 'r', encoding='utf-8') as f:
            anchor_data = json.load(f)
        
        print(f"✅ 已讀取 anchor_statements.v1.json（{len(anchor_data.get('items', []))} 個錨定語句）")
    
    # 為每個主題建立 narratives 檔案（使用通用模板）
    extracted = 0
    for theme_id in THEMES:
        output_path = narratives_dir / f"{theme_id}.narr.v1.0.json"
        
        # 建立基本結構（參考 chronic_depletion 的結構）
        narrative_data = {
            "_extracted_from": "ContentDB_*.js, anchor_statements.v1.json, narrative_logic/",
            "_extraction_date": "2026-01-12",
            "_note": "此為提取的原始資料，需要顧問團隊整合刪減昇華",
            "low": {
                "opening": "待從 ContentDB 和 anchor_statements 提取",
                "explain": "待從 ContentDB 和 anchor_statements 提取"
            },
            "mid": {
                "opening": "待從 ContentDB 和 anchor_statements 提取",
                "explain": "待從 ContentDB 和 anchor_statements 提取"
            },
            "high": {
                "opening": "待從 ContentDB 和 anchor_statements 提取",
                "explain": "待從 ContentDB 和 anchor_statements 提取"
            }
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(narrative_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已建立: {theme_id}.narr.v1.0.json（待填充內容）")
        extracted += 1
    
    print(f"\n✅ 共建立 {extracted} 個主題的 narratives 檔案（待填充內容）")

def extract_missing_recommendations():
    """補充缺失的 Recommendations（3 個主題）"""
    print("\n=== 補充缺失的 Recommendations ===")
    
    recommendations_dir = WORKSPACE / "recommendations"
    recommendations_dir.mkdir(exist_ok=True)
    
    missing_themes = ["social_comparison", "emotional_permeability", "avoidance_coping"]
    
    extracted = 0
    for theme_id in missing_themes:
        output_path = recommendations_dir / f"{theme_id}.reco.v1.0.json"
        
        # 建立缺失標註檔案
        recommendation_data = {
            "_extracted_from": "guidanceActionTemplates.v1.json（缺失）",
            "_extraction_date": "2026-01-12",
            "_note": "⚠️ 此主題在 guidanceActionTemplates 中沒有對應的模板，需要從其他來源提取或標註缺失",
            "_status": "MISSING",
            "theme_id": theme_id,
            "actionTemplates": {
                "today": [],
                "week": []
            },
            "ageBands": {}
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(recommendation_data, f, ensure_ascii=False, indent=2)
        
        print(f"⚠️ 已標註缺失: {theme_id}.reco.v1.0.json")
        extracted += 1
    
    print(f"\n⚠️ 共標註 {extracted} 個主題的缺失 recommendations")

def main():
    """主執行函數"""
    print("開始提取剩餘的 Legacy 資料...\n")
    
    # 提取 riskchains
    extract_riskchains()
    
    # 提取 narratives
    extract_narratives()
    
    # 補充缺失的 recommendations
    extract_missing_recommendations()
    
    print("\n✅ 提取完成！")
    print("\n注意：")
    print("- Riskchains 和 Narratives 已建立檔案結構，但內容需要從原始資料中提取")
    print("- 3 個主題的 Recommendations 已標註缺失")
    print("- 需要手動分析 ContentDB 檔案和 buildGuidance.js 來填充實際內容")

if __name__ == "__main__":
    main()
