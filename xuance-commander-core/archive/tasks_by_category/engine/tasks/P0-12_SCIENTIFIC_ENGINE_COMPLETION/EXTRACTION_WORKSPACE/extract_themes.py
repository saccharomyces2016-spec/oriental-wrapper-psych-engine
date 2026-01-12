#!/usr/bin/env python3
"""
Legacy 主題資料提取腳本

目的：從已提取的 Legacy 檔案中系統性提取所有主題的完整資料
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

def extract_questions():
    """從 questionBank.v1.json 提取所有主題的 questions"""
    print("=== 提取 Questions ===")
    
    question_bank_path = WORKSPACE / "raw" / "questionBank.v1.json"
    if not question_bank_path.exists():
        print(f"❌ 找不到檔案: {question_bank_path}")
        return
    
    with open(question_bank_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    questions_dir = WORKSPACE / "questions"
    questions_dir.mkdir(exist_ok=True)
    
    extracted = 0
    for item in data.get("items", []):
        theme_id = item.get("theme_id")
        if theme_id in THEMES:
            output_path = questions_dir / f"{theme_id}.questions.v1.0.json"
            
            # 轉換為現有系統格式
            questions = []
            for q in item.get("questions", []):
                question = {
                    "id": f"{theme_id}_q{len(questions)+1}",
                    "text": q.get("question_text", ""),
                    "type": "likert_5",
                    "scale": q.get("choices", [])
                }
                questions.append(question)
            
            output_data = questions
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(output_data, f, ensure_ascii=False, indent=2)
            
            print(f"✅ 已提取: {theme_id} ({len(questions)} 題)")
            extracted += 1
    
    print(f"\n✅ 共提取 {extracted} 個主題的 questions")

def extract_manifests():
    """從 motherThemes.v1.json 建立所有主題的 manifests"""
    print("\n=== 建立 Manifests ===")
    
    # 讀取 motherThemes 定義（從之前讀取的內容）
    mother_themes = {
        "chronic_depletion": {"enLabel": "Chronic Depletion", "zhLabel": "長期耗竭"},
        "loss_of_agency": {"enLabel": "Loss of Agency", "zhLabel": "主控感流失"},
        "hyper_responsibility": {"enLabel": "Hyper-Responsibility", "zhLabel": "過度承擔"},
        "fear_based_stability": {"enLabel": "Fear-Based Stability", "zhLabel": "恐懼型求穩"},
        "identity_diffusion": {"enLabel": "Identity Diffusion", "zhLabel": "自我模糊"},
        "suppressed_needs": {"enLabel": "Suppressed Needs", "zhLabel": "需求壓抑"},
        "chronic_alertness": {"enLabel": "Chronic Alertness", "zhLabel": "長期警戒"},
        "unprocessed_loss": {"enLabel": "Unprocessed Loss", "zhLabel": "未處理的失落"},
        "meaning_vacuum": {"enLabel": "Meaning Vacuum", "zhLabel": "意義真空"},
        "self_erosion": {"enLabel": "Self-Erosion", "zhLabel": "自我耗損"},
        "emotional_permeability": {"enLabel": "Emotional Permeability", "zhLabel": "情緒滲透"},
        "avoidance_coping": {"enLabel": "Avoidance Coping", "zhLabel": "逃避型因應"},
        "social_comparison": {"enLabel": "Social Comparison", "zhLabel": "社會比較壓力"}
    }
    
    manifests_dir = WORKSPACE / "manifests"
    manifests_dir.mkdir(exist_ok=True)
    
    extracted = 0
    for theme_id in THEMES:
        if theme_id in mother_themes:
            output_path = manifests_dir / f"{theme_id}.v1.0.json"
            
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
            
            print(f"✅ 已建立: {theme_id}")
            extracted += 1
    
    print(f"\n✅ 共建立 {extracted} 個主題的 manifests")

def extract_recommendations():
    """從 guidanceActionTemplates.v1.json 提取所有主題的 recommendations"""
    print("\n=== 提取 Recommendations ===")
    
    templates_path = WORKSPACE / "templates" / "guidanceActionTemplates.v1.json"
    if not templates_path.exists():
        print(f"❌ 找不到檔案: {templates_path}")
        return
    
    with open(templates_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    recommendations_dir = WORKSPACE / "recommendations"
    recommendations_dir.mkdir(exist_ok=True)
    
    extracted = 0
    for item in data.get("items", []):
        theme_id = item.get("motherThemeId")
        if theme_id in THEMES:
            output_path = recommendations_dir / f"{theme_id}.reco.v1.0.json"
            
            # 保持原始結構，標註來源
            recommendation_data = {
                "_extracted_from": "guidanceActionTemplates.v1.json",
                "_extraction_date": "2026-01-12",
                "theme_id": theme_id,
                "actionTemplates": item.get("actionTemplates", {}),
                "ageBands": item.get("ageBands", {})
            }
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(recommendation_data, f, ensure_ascii=False, indent=2)
            
            print(f"✅ 已提取: {theme_id}")
            extracted += 1
    
    print(f"\n✅ 共提取 {extracted} 個主題的 recommendations")

def main():
    """主執行函數"""
    print("開始提取 Legacy 主題資料...\n")
    
    # 提取 questions
    extract_questions()
    
    # 建立 manifests
    extract_manifests()
    
    # 提取 recommendations
    extract_recommendations()
    
    print("\n✅ 提取完成！")
    print("\n注意：")
    print("- Narratives 和 Riskchains 需要手動從 ContentDB 和 consequence_chain_library 提取")
    print("- 部分主題的 questions 可能需要從 p1_question_blueprint_v1.json 補充")

if __name__ == "__main__":
    main()
