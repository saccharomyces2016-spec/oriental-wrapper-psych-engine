#!/usr/bin/env python3
"""
清理 placeholder 文字腳本

目的：清理 narratives 的 explain 欄位中的 placeholder 文字
"""

import json
import re
from pathlib import Path

WORKSPACE = Path(__file__).parent

def clean_placeholders():
    """清理 narratives 的 explain 欄位中的 placeholder 文字"""
    print("=== 清理 Placeholder 文字 ===")
    
    narratives_dir = WORKSPACE / "narratives"
    cleaned_count = 0
    
    for file in narratives_dir.glob("*.json"):
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        modified = False
        for level in ['low', 'mid', 'high']:
            if level not in data:
                continue
            
            explain = data[level].get('explain', '')
            if explain and ('待從' in explain or '提取' in explain or 'placeholder' in explain.lower()):
                # 清理 placeholder 文字
                data[level]['explain'] = ""
                modified = True
        
        if modified:
            with open(file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f"✅ 已清理: {file.name}")
            cleaned_count += 1
    
    print(f"\n✅ 共清理 {cleaned_count} 個 narratives")

if __name__ == "__main__":
    clean_placeholders()
