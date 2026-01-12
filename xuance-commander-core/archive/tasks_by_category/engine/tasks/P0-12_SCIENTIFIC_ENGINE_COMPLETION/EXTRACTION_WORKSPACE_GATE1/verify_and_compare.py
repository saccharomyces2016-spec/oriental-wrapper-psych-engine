#!/usr/bin/env python3
"""
雙向核對腳本

目的：核對 EXTRACTION_WORKSPACE、domain/ 和 legacy/ 之間的資料，識別重複和差異
"""

import json
import os
from pathlib import Path
from collections import defaultdict

# 工作區路徑
WORKSPACE = Path(__file__).parent
ROOT = WORKSPACE.parent.parent
DOMAIN_DIR = ROOT / "domain"
LEGACY_DIR = ROOT / "docs" / "legacy" / "115_1_3_my-first-app_failed"

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

def compare_questions():
    """核對 questions"""
    print("=== 核對 Questions ===")
    
    extraction_questions = WORKSPACE / "questions"
    domain_questions = DOMAIN_DIR / "questions"
    
    comparison = defaultdict(dict)
    
    for theme_id in THEMES:
        extraction_file = extraction_questions / f"{theme_id}.questions.v1.0.json"
        domain_file = domain_questions / f"{theme_id}.questions.v1.0.json"
        
        extraction_exists = extraction_file.exists()
        domain_exists = domain_file.exists()
        
        comparison[theme_id] = {
            "extraction_exists": extraction_exists,
            "domain_exists": domain_exists,
            "same": False
        }
        
        if extraction_exists and domain_exists:
            try:
                with open(extraction_file, 'r', encoding='utf-8') as f:
                    extraction_data = json.load(f)
                with open(domain_file, 'r', encoding='utf-8') as f:
                    domain_data = json.load(f)
                
                # 簡單比較（可以改進）
                extraction_str = json.dumps(extraction_data, sort_keys=True)
                domain_str = json.dumps(domain_data, sort_keys=True)
                comparison[theme_id]["same"] = (extraction_str == domain_str)
            except Exception as e:
                comparison[theme_id]["error"] = str(e)
    
    return comparison

def compare_narratives():
    """核對 narratives"""
    print("\n=== 核對 Narratives ===")
    
    extraction_narratives = WORKSPACE / "narratives"
    domain_narratives = DOMAIN_DIR / "narratives"
    
    comparison = defaultdict(dict)
    
    for theme_id in THEMES:
        extraction_file = extraction_narratives / f"{theme_id}.narr.v1.0.json"
        domain_file = domain_narratives / f"{theme_id}.narr.v1.0.json"
        
        extraction_exists = extraction_file.exists()
        domain_exists = domain_file.exists()
        
        comparison[theme_id] = {
            "extraction_exists": extraction_exists,
            "domain_exists": domain_exists,
            "same": False
        }
        
        if extraction_exists and domain_exists:
            try:
                with open(extraction_file, 'r', encoding='utf-8') as f:
                    extraction_data = json.load(f)
                with open(domain_file, 'r', encoding='utf-8') as f:
                    domain_data = json.load(f)
                
                # 簡單比較
                extraction_str = json.dumps(extraction_data, sort_keys=True)
                domain_str = json.dumps(domain_data, sort_keys=True)
                comparison[theme_id]["same"] = (extraction_str == domain_str)
            except Exception as e:
                comparison[theme_id]["error"] = str(e)
    
    return comparison

def compare_riskchains():
    """核對 riskchains"""
    print("\n=== 核對 Riskchains ===")
    
    extraction_riskchains = WORKSPACE / "riskchains"
    domain_riskchains = DOMAIN_DIR / "riskchains"
    
    comparison = defaultdict(dict)
    
    for theme_id in THEMES:
        extraction_file = extraction_riskchains / f"{theme_id}.risk.v1.0.json"
        domain_file = domain_riskchains / f"{theme_id}.risk.v1.0.json"
        
        extraction_exists = extraction_file.exists()
        domain_exists = domain_file.exists()
        
        comparison[theme_id] = {
            "extraction_exists": extraction_exists,
            "domain_exists": domain_exists,
            "same": False
        }
        
        if extraction_exists and domain_exists:
            try:
                with open(extraction_file, 'r', encoding='utf-8') as f:
                    extraction_data = json.load(f)
                with open(domain_file, 'r', encoding='utf-8') as f:
                    domain_data = json.load(f)
                
                # 簡單比較
                extraction_str = json.dumps(extraction_data, sort_keys=True)
                domain_str = json.dumps(domain_data, sort_keys=True)
                comparison[theme_id]["same"] = (extraction_str == domain_str)
            except Exception as e:
                comparison[theme_id]["error"] = str(e)
    
    return comparison

def generate_comparison_report(questions_comp, narratives_comp, riskchains_comp):
    """生成核對報告"""
    report_path = WORKSPACE / "VERIFICATION_COMPARISON_REPORT.md"
    
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# 雙向核對報告\n\n")
        f.write("**建立日期**：2026-01-12\n\n")
        f.write("## 一、Questions 核對結果\n\n")
        f.write("| 主題 | EXTRACTION_WORKSPACE | domain/ | 是否相同 |\n")
        f.write("|------|---------------------|---------|----------|\n")
        
        for theme_id in THEMES:
            comp = questions_comp.get(theme_id, {})
            extraction = "✅" if comp.get("extraction_exists") else "❌"
            domain = "✅" if comp.get("domain_exists") else "❌"
            same = "✅" if comp.get("same") else "❌"
            f.write(f"| {theme_id} | {extraction} | {domain} | {same} |\n")
        
        f.write("\n## 二、Narratives 核對結果\n\n")
        f.write("| 主題 | EXTRACTION_WORKSPACE | domain/ | 是否相同 |\n")
        f.write("|------|---------------------|---------|----------|\n")
        
        for theme_id in THEMES:
            comp = narratives_comp.get(theme_id, {})
            extraction = "✅" if comp.get("extraction_exists") else "❌"
            domain = "✅" if comp.get("domain_exists") else "❌"
            same = "✅" if comp.get("same") else "❌"
            f.write(f"| {theme_id} | {extraction} | {domain} | {same} |\n")
        
        f.write("\n## 三、Riskchains 核對結果\n\n")
        f.write("| 主題 | EXTRACTION_WORKSPACE | domain/ | 是否相同 |\n")
        f.write("|------|---------------------|---------|----------|\n")
        
        for theme_id in THEMES:
            comp = riskchains_comp.get(theme_id, {})
            extraction = "✅" if comp.get("extraction_exists") else "❌"
            domain = "✅" if comp.get("domain_exists") else "❌"
            same = "✅" if comp.get("same") else "❌"
            f.write(f"| {theme_id} | {extraction} | {domain} | {same} |\n")
        
        f.write("\n## 四、重複內容識別\n\n")
        f.write("### 4.1 完全相同的檔案\n\n")
        
        duplicates = []
        for theme_id in THEMES:
            q_comp = questions_comp.get(theme_id, {})
            n_comp = narratives_comp.get(theme_id, {})
            r_comp = riskchains_comp.get(theme_id, {})
            
            if q_comp.get("same"):
                duplicates.append(f"- `{theme_id}.questions.v1.0.json`")
            if n_comp.get("same"):
                duplicates.append(f"- `{theme_id}.narr.v1.0.json`")
            if r_comp.get("same"):
                duplicates.append(f"- `{theme_id}.risk.v1.0.json`")
        
        if duplicates:
            f.write("\n".join(duplicates))
        else:
            f.write("無完全相同的檔案\n")
        
        f.write("\n### 4.2 建議\n\n")
        f.write("1. 如果 EXTRACTION_WORKSPACE 和 domain/ 中的檔案完全相同，可以考慮刪除 domain/ 中的檔案\n")
        f.write("2. 如果檔案不同，需要進一步分析差異\n")
        f.write("3. 在刪除任何檔案前，請確保已備份\n")
    
    print(f"\n✅ 核對報告已生成: {report_path}")

def main():
    """主執行函數"""
    print("開始雙向核對...\n")
    
    # 核對 questions
    questions_comp = compare_questions()
    
    # 核對 narratives
    narratives_comp = compare_narratives()
    
    # 核對 riskchains
    riskchains_comp = compare_riskchains()
    
    # 生成核對報告
    generate_comparison_report(questions_comp, narratives_comp, riskchains_comp)
    
    print("\n✅ 核對完成！")

if __name__ == "__main__":
    main()
