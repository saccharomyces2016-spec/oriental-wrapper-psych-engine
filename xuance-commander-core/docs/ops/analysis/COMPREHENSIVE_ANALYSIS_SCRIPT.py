#!/usr/bin/env python3
"""
全面資料夾分析腳本
目的：分析 xuance-commander-core 下的所有資料夾和檔案，識別重複、衝突、過時內容
"""

import json
import os
from pathlib import Path
from datetime import datetime
from collections import defaultdict, Counter

PROJECT_ROOT = Path(__file__).parent
OUTPUT_DIR = PROJECT_ROOT

def analyze_folder_structure():
    """分析資料夾結構"""
    folders = defaultdict(list)
    
    for root, dirs, files in os.walk(PROJECT_ROOT):
        # 跳過某些目錄
        if any(skip in root for skip in ['node_modules', '.git', '__pycache__', 'GATE4_BACKUP', 'EXTRACTION_WORKSPACE', 'dist']):
            continue
        
        rel_path = Path(root).relative_to(PROJECT_ROOT)
        depth = len(rel_path.parts)
        
        if depth <= 2:  # 只分析前兩層
            for file in files:
                if file.endswith(('.md', '.json', '.py', '.ts', '.tsx')):
                    folders[rel_path].append(file)
    
    return folders

def find_duplicate_files():
    """找出重複檔名"""
    file_names = defaultdict(list)
    
    for root, dirs, files in os.walk(PROJECT_ROOT):
        if any(skip in root for skip in ['node_modules', '.git', '__pycache__', 'GATE4_BACKUP', 'EXTRACTION_WORKSPACE', 'dist']):
            continue
        
        for file in files:
            if file.endswith(('.md', '.json')):
                rel_path = Path(root).relative_to(PROJECT_ROOT) / file
                file_names[file].append(str(rel_path))
    
    duplicates = {k: v for k, v in file_names.items() if len(v) > 1}
    return duplicates

def categorize_files():
    """按功能分類檔案"""
    categories = {
        'governance': [],
        'domain': [],
        'engine': [],
        'ui': [],
        'specs': [],
        'memory': [],
        'docs': [],
        'archive': [],
        'tasks': [],
        'other': []
    }
    
    for root, dirs, files in os.walk(PROJECT_ROOT):
        if any(skip in root for skip in ['node_modules', '.git', '__pycache__', 'GATE4_BACKUP', 'EXTRACTION_WORKSPACE', 'dist']):
            continue
        
        rel_path = Path(root).relative_to(PROJECT_ROOT)
        path_str = str(rel_path)
        
        for file in files:
            if file.endswith(('.md', '.json')):
                full_path = rel_path / file
                
                if 'governance' in path_str or 'rules' in path_str:
                    categories['governance'].append(str(full_path))
                elif 'domain' in path_str:
                    categories['domain'].append(str(full_path))
                elif 'engine' in path_str:
                    categories['engine'].append(str(full_path))
                elif 'ui' in path_str:
                    categories['ui'].append(str(full_path))
                elif 'specs' in path_str:
                    categories['specs'].append(str(full_path))
                elif 'memory' in path_str:
                    categories['memory'].append(str(full_path))
                elif 'docs' in path_str:
                    categories['docs'].append(str(full_path))
                elif 'archive' in path_str:
                    categories['archive'].append(str(full_path))
                elif path_str.startswith('P0-') or path_str.startswith('P1-') or path_str.startswith('P5-'):
                    categories['tasks'].append(str(full_path))
                else:
                    categories['other'].append(str(full_path))
    
    return categories

def find_summary_files():
    """找出所有 SUMMARY/COMPLETE/FINAL/AUDIT 檔案"""
    summary_files = []
    
    keywords = ['SUMMARY', 'COMPLETE', 'FINAL', 'AUDIT', 'REPORT', 'LOG']
    
    for root, dirs, files in os.walk(PROJECT_ROOT):
        if any(skip in root for skip in ['node_modules', '.git', '__pycache__', 'GATE4_BACKUP', 'EXTRACTION_WORKSPACE', 'dist']):
            continue
        
        for file in files:
            if any(kw in file.upper() for kw in keywords):
                rel_path = Path(root).relative_to(PROJECT_ROOT) / file
                summary_files.append(str(rel_path))
    
    return summary_files

def main():
    """主函數"""
    print("=" * 80)
    print("全面資料夾分析")
    print("=" * 80)
    print()
    
    # 1. 分析資料夾結構
    print("1. 分析資料夾結構...")
    folders = analyze_folder_structure()
    print(f"   找到 {len(folders)} 個主要資料夾")
    
    # 2. 找出重複檔名
    print("\n2. 找出重複檔名...")
    duplicates = find_duplicate_files()
    print(f"   找到 {len(duplicates)} 個重複檔名")
    for name, paths in list(duplicates.items())[:10]:
        print(f"   - {name}: {len(paths)} 個位置")
    
    # 3. 分類檔案
    print("\n3. 按功能分類檔案...")
    categories = categorize_files()
    for cat, files in categories.items():
        print(f"   {cat}: {len(files)} 個檔案")
    
    # 4. 找出摘要檔案
    print("\n4. 找出摘要檔案...")
    summary_files = find_summary_files()
    print(f"   找到 {len(summary_files)} 個摘要/報告檔案")
    
    # 5. 生成報告
    report = {
        'generated_at': datetime.now().isoformat(),
        'total_folders': len(folders),
        'duplicate_files': {k: len(v) for k, v in duplicates.items()},
        'categories': {k: len(v) for k, v in categories.items()},
        'summary_files_count': len(summary_files),
        'duplicate_files_detail': {k: v[:5] for k, v in list(duplicates.items())[:20]},
        'summary_files_sample': summary_files[:30]
    }
    
    report_file = OUTPUT_DIR / "COMPREHENSIVE_ANALYSIS_REPORT.json"
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ 分析報告已儲存: {report_file}")
    
    return report

if __name__ == '__main__':
    main()
