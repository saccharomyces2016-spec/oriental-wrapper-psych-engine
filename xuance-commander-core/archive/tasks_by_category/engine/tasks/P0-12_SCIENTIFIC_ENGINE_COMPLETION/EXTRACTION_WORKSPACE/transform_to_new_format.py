#!/usr/bin/env python3
"""
轉化為新版架構格式腳本

目的：將 EXTRACTION_WORKSPACE 中的資料轉化為新版系統可直接載入的格式
"""

import json
import os
from pathlib import Path

# 工作區路徑
WORKSPACE = Path(__file__).parent
ROOT = WORKSPACE.parent.parent
DOMAIN_DIR = ROOT / "domain"

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

# LEGACY 欄位清單（必須排除）
LEGACY_FIELDS = [
    "_extracted_from",
    "_extraction_date",
    "_note",
    "_raw_anchors",
    "_contentdb_sources",
    "_updated_from",
    "_gate1_checked_sources",
    "_gate1_reason",
    "_gate1_marked_at"
]

def clean_legacy_fields(data):
    """移除所有 LEGACY 欄位（除了 _status: "MISSING"）"""
    if isinstance(data, dict):
        cleaned = {}
        for key, value in data.items():
            if key in LEGACY_FIELDS:
                continue
            if key == "_status" and value == "MISSING":
                cleaned[key] = value  # 保留 MISSING 標記
            elif not key.startswith("_"):
                cleaned[key] = clean_legacy_fields(value)
            elif key.startswith("_") and key != "_status":
                continue  # 排除其他 _ 開頭的欄位
            else:
                cleaned[key] = clean_legacy_fields(value)
        return cleaned
    elif isinstance(data, list):
        return [clean_legacy_fields(item) for item in data]
    else:
        return data

def transform_manifests():
    """轉化 Manifests"""
    print("=== 轉化 Manifests ===")
    
    output_dir = WORKSPACE / "domain_output" / "manifests"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    transformed = 0
    for theme_id in THEMES:
        output_path = output_dir / f"{theme_id}.v1.0.json"
        
        manifest = {
            "domainVersion": "1.0",
            "facetId": theme_id,
            "sources": {
                "questions": f"domain/questions/{theme_id}.questions.v1.0.json",
                "scoring": f"domain/facets/{theme_id}.scoring.v1.0.json",
                "recommendations": f"domain/recommendations/{theme_id}.reco.v1.0.json",
                "narratives": f"domain/narratives/{theme_id}.narr.v1.0.json",
                "riskchains": f"domain/riskchains/{theme_id}.risk.v1.0.json"
            }
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已轉化: {theme_id}.v1.0.json")
        transformed += 1
    
    print(f"\n✅ 共轉化 {transformed} 個 manifests")

def transform_questions():
    """轉化 Questions"""
    print("\n=== 轉化 Questions ===")
    
    input_dir = WORKSPACE / "questions"
    output_dir = WORKSPACE / "domain_output" / "questions"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    transformed = 0
    for theme_id in THEMES:
        input_path = input_dir / f"{theme_id}.questions.v1.0.json"
        output_path = output_dir / f"{theme_id}.questions.v1.0.json"
        
        if not input_path.exists():
            # 如果輸入檔案不存在，產出空陣列
            output_data = []
        else:
            with open(input_path, 'r', encoding='utf-8') as f:
                input_data = json.load(f)
            
            # 如果是陣列，直接使用
            if isinstance(input_data, list):
                output_data = input_data
            # 如果有 questions 欄位
            elif isinstance(input_data, dict) and "questions" in input_data:
                output_data = input_data["questions"]
            else:
                output_data = []
            
            # 清理 LEGACY 欄位
            output_data = clean_legacy_fields(output_data)
        
        # 如果狀態是 MISSING，產出空陣列
        if isinstance(output_data, dict) and output_data.get("_status") == "MISSING":
            output_data = []
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已轉化: {theme_id}.questions.v1.0.json")
        transformed += 1
    
    print(f"\n✅ 共轉化 {transformed} 個 questions")

def transform_narratives():
    """轉化 Narratives（保留有內容的部分）"""
    print("\n=== 轉化 Narratives ===")
    
    input_dir = WORKSPACE / "narratives"
    output_dir = WORKSPACE / "domain_output" / "narratives"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    transformed = 0
    for theme_id in THEMES:
        input_path = input_dir / f"{theme_id}.narr.v1.0.json"
        output_path = output_dir / f"{theme_id}.narr.v1.0.json"
        
        if not input_path.exists():
            # 如果輸入檔案不存在，產出空結構
            output_data = {
                "low": {"opening": "", "explain": ""},
                "mid": {"opening": "", "explain": ""},
                "high": {"opening": "", "explain": ""}
            }
            if True:  # 標註為 MISSING
                output_data["_status"] = "MISSING"
        else:
            with open(input_path, 'r', encoding='utf-8') as f:
                input_data = json.load(f)
            
            # 提取 low/mid/high 結構
            output_data = {
                "low": {
                    "opening": input_data.get("low", {}).get("opening", "").strip(),
                    "explain": input_data.get("low", {}).get("explain", "").strip()
                },
                "mid": {
                    "opening": input_data.get("mid", {}).get("opening", "").strip(),
                    "explain": input_data.get("mid", {}).get("explain", "").strip()
                },
                "high": {
                    "opening": input_data.get("high", {}).get("opening", "").strip(),
                    "explain": input_data.get("high", {}).get("explain", "").strip()
                }
            }
            
            # 檢查是否有內容
            has_content = bool(
                output_data["low"]["opening"] or
                output_data["mid"]["opening"] or
                output_data["high"]["opening"]
            )
            
            # 如果完全沒有內容，標註為 MISSING
            if not has_content:
                output_data["_status"] = "MISSING"
        
        # 清理 LEGACY 欄位（但保留 _status: "MISSING"）
        output_data = clean_legacy_fields(output_data)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已轉化: {theme_id}.narr.v1.0.json")
        transformed += 1
    
    print(f"\n✅ 共轉化 {transformed} 個 narratives")

def transform_recommendations():
    """轉化 Recommendations"""
    print("\n=== 轉化 Recommendations ===")
    
    input_dir = WORKSPACE / "recommendations"
    output_dir = WORKSPACE / "domain_output" / "recommendations"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    transformed = 0
    for theme_id in THEMES:
        input_path = input_dir / f"{theme_id}.reco.v1.0.json"
        output_path = output_dir / f"{theme_id}.reco.v1.0.json"
        
        if not input_path.exists():
            # 如果輸入檔案不存在，產出空結構
            output_data = {
                "low": [],
                "mid": [],
                "high": []
            }
            output_data["_status"] = "MISSING"
        else:
            with open(input_path, 'r', encoding='utf-8') as f:
                input_data = json.load(f)
            
            # 提取 low/mid/high 結構
            output_data = {
                "low": input_data.get("low", []) if isinstance(input_data.get("low"), list) else [],
                "mid": input_data.get("mid", []) if isinstance(input_data.get("mid"), list) else [],
                "high": input_data.get("high", []) if isinstance(input_data.get("high"), list) else []
            }
            
            # 如果狀態是 MISSING，標註
            if input_data.get("_status") == "MISSING":
                output_data["_status"] = "MISSING"
        
        # 清理 LEGACY 欄位（但保留 _status: "MISSING"）
        output_data = clean_legacy_fields(output_data)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已轉化: {theme_id}.reco.v1.0.json")
        transformed += 1
    
    print(f"\n✅ 共轉化 {transformed} 個 recommendations")

def transform_riskchains():
    """轉化 Riskchains"""
    print("\n=== 轉化 Riskchains ===")
    
    input_dir = WORKSPACE / "riskchains"
    output_dir = WORKSPACE / "domain_output" / "riskchains"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    transformed = 0
    for theme_id in THEMES:
        input_path = input_dir / f"{theme_id}.risk.v1.0.json"
        output_path = output_dir / f"{theme_id}.risk.v1.0.json"
        
        if not input_path.exists():
            # 如果輸入檔案不存在，產出空結構
            output_data = {
                "mid": {"if_not_improve": []},
                "high": {"if_not_improve": []}
            }
            output_data["_status"] = "MISSING"
        else:
            with open(input_path, 'r', encoding='utf-8') as f:
                input_data = json.load(f)
            
            # 提取 mid/high 結構
            output_data = {
                "mid": {
                    "if_not_improve": input_data.get("mid", {}).get("if_not_improve", [])
                },
                "high": {
                    "if_not_improve": input_data.get("high", {}).get("if_not_improve", [])
                }
            }
            
            # 如果狀態是 MISSING，標註
            if input_data.get("_status") == "MISSING":
                output_data["_status"] = "MISSING"
        
        # 清理 LEGACY 欄位（但保留 _status: "MISSING"）
        output_data = clean_legacy_fields(output_data)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 已轉化: {theme_id}.risk.v1.0.json")
        transformed += 1
    
    print(f"\n✅ 共轉化 {transformed} 個 riskchains")

def main():
    """主執行函數"""
    print("開始轉化為新版架構格式...\n")
    
    # 轉化 Manifests
    transform_manifests()
    
    # 轉化 Questions
    transform_questions()
    
    # 轉化 Narratives
    transform_narratives()
    
    # 轉化 Recommendations
    transform_recommendations()
    
    # 轉化 Riskchains
    transform_riskchains()
    
    print("\n✅ 轉化完成！")
    print(f"\n產出位置: {WORKSPACE / 'domain_output'}")
    print("\n下一步：")
    print("1. 檢查轉化後的檔案是否符合新版格式")
    print("2. 建立對照表")
    print("3. 產出最終資料包")

if __name__ == "__main__":
    main()
