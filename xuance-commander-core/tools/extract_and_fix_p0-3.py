#!/usr/bin/env python3
"""
Extract P0-3 content and apply L4 Safety fixes
"""
import re
import json
from pathlib import Path


def extract_json_blocks(md_content):
    """Extract all JSON blocks from markdown content"""
    pattern = r'```json\s*\n(.*?)\n```'
    matches = re.findall(pattern, md_content, re.DOTALL)
    
    json_blocks = []
    for match in matches:
        try:
            data = json.loads(match)
            json_blocks.append(data)
        except json.JSONDecodeError as e:
            print(f"Warning: Invalid JSON block skipped: {str(e)[:100]}")
            continue
    
    return json_blocks


def apply_l4_safety_fixes(data, facet_id, file_type):
    """Apply L4 Safety fixes to JSON data"""
    data_str = json.dumps(data, ensure_ascii=False)
    
    # Global replacements
    replacements = [
        ("焦慮", "不安"),
        ("Burnout", "全面耗竭"),
        ("神經衰弱", "精神負荷過重"),
        ("血壓", "壓力負荷"),
        ("記憶力與認知能力", "思緒整合度"),
        ("身體機能", "日常運作狀態"),
        ("身體出現莫名疼痛", "內在負擔外顯"),
    ]
    
    for old, new in replacements:
        data_str = data_str.replace(old, new)
    
    # Facet-specific fixes
    if facet_id == "sleep_rhythm_chaos" and file_type == "recommendations":
        data_str = data_str.replace(
            "晚上用熱水泡腳或洗熱水澡，引導氣血下行",
            "睡前安排固定的低刺激收尾流程，讓夜晚自然沉靜下來"
        )
        data_str = data_str.replace(
            "睡不著就離開床鋪，直到有睡意再回去",
            "若夜晚節奏混亂，暫時轉換環境，等內在節奏放緩再回到休息狀態"
        )
    
    if facet_id == "anger_dysregulation" and file_type == "recommendations":
        data_str = data_str.replace(
            "去洗手間潑冷水臉",
            "暫時轉換空間，用環境變化中斷當下的衝動節奏"
        )
        data_str = data_str.replace(
            "用力握緊拳頭再放開",
            "透過重複的簡單動作，將注意力從衝突中抽離"
        )
        data_str = data_str.replace(
            "進行發洩性的拍打",
            "用安全且不傷害任何人的方式釋放累積的能量"
        )
    
    if facet_id == "resentment_buildup" and file_type == "recommendations":
        data_str = data_str.replace(
            "進行高強度的體能活動，將體內鬱氣排出",
            "安排能大量消耗精力的日常活動，讓積壓的能量自然散去"
        )
    
    if facet_id == "guilt_accumulation" and file_type == "riskchains":
        data_str = data_str.replace(
            "氣機阻滯 → 身體出現莫名疼痛",
            "氣機阻滯 → 內在壓力持續堆積並外顯"
        )
    
    if facet_id == "anger_dysregulation" and file_type == "riskchains":
        data_str = data_str.replace(
            "血壓長期波動 → 身體負擔加重",
            "壓力長期起伏 → 整體承載負荷持續上升"
        )
    
    if facet_id == "perfectionism_paralysis" and file_type == "riskchains":
        data_str = data_str.replace(
            "全面崩潰（Burnout） → 強制停機",
            "全面耗竭 → 被迫全面停擺（惡性循環）"
        )
    
    if facet_id == "impostor_syndrome" and file_type == "riskchains":
        data_str = data_str.replace(
            "神經衰弱 → 表現失常",
            "長期精神負荷過重 → 發揮穩定度下降"
        )
    
    if facet_id == "digital_dissociation" and file_type == "recommendations":
        data_str = data_str.replace(
            "赤腳踩踏地板或草地，感受觸覺",
            "刻意留意與現實環境的接觸細節，強化當下感"
        )
        data_str = data_str.replace(
            "進行冷熱水交替的洗澡或洗臉",
            "透過明顯的環境節奏變化，喚回對現實的感知"
        )
    
    if facet_id == "digital_dissociation" and file_type == "riskchains":
        data_str = data_str.replace(
            "記憶力與認知能力衰退 → 生活功能受損",
            "思緒整合度下降 → 日常運作變得斷裂"
        )
    
    if facet_id == "grief_stagnation" and file_type == "riskchains":
        data_str = data_str.replace(
            "身體機能衰退",
            "整體生活節奏逐漸失去支撐"
        )
    
    return json.loads(data_str)


def process_p0_3(md_path, recommendations_dir, narratives_dir, riskchains_dir):
    """Process P0-3 submission with L4 Safety fixes"""
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    json_blocks = extract_json_blocks(content)
    
    print(f"\n=== P0-3 Processing with L4 Safety Fixes ===")
    print(f"Found {len(json_blocks)} JSON blocks")
    
    # Expected: 14 facets × 3 files = 42 JSON blocks
    # Order: recommendations, narratives, riskchains (repeat for each facet)
    
    facet_order = [
        "trust_erosion",
        "attachment_rupture",
        "betrayal_wound",
        "sleep_rhythm_chaos",
        "anger_dysregulation",
        "resentment_buildup",
        "shame_spiral",
        "guilt_accumulation",
        "perfectionism_paralysis",
        "impostor_syndrome",
        "grief_stagnation",
        "apathy_stagnation",
        "purpose_drift",
        "digital_dissociation"
    ]
    
    if len(json_blocks) < 42:
        print(f"❌ ERROR: Expected at least 42 JSON blocks, got {len(json_blocks)}")
        return []
    
    # Take only the first 42 JSON blocks (main content)
    # The rest might be examples or audit content
    json_blocks = json_blocks[:42]
    print(f"Using first 42 JSON blocks for main content")
    
    written_files = []
    
    print("\n--- Writing Files with L4 Safety Fixes ---")
    
    for i, facet_id in enumerate(facet_order):
        base_idx = i * 3
        
        # Recommendations
        reco_data = json_blocks[base_idx]
        reco_data = apply_l4_safety_fixes(reco_data, facet_id, "recommendations")
        reco_path = recommendations_dir / f"{facet_id}.reco.v1.0.json"
        with open(reco_path, 'w', encoding='utf-8') as f:
            json.dump(reco_data, f, ensure_ascii=False, indent=2)
        print(f"  ✅ {reco_path.name} (recommendations)")
        written_files.append(str(reco_path))
        
        # Narratives
        narr_data = json_blocks[base_idx + 1]
        narr_data = apply_l4_safety_fixes(narr_data, facet_id, "narratives")
        narr_path = narratives_dir / f"{facet_id}.narr.v1.0.json"
        with open(narr_path, 'w', encoding='utf-8') as f:
            json.dump(narr_data, f, ensure_ascii=False, indent=2)
        print(f"  ✅ {narr_path.name} (narratives)")
        written_files.append(str(narr_path))
        
        # Riskchains
        risk_data = json_blocks[base_idx + 2]
        risk_data = apply_l4_safety_fixes(risk_data, facet_id, "riskchains")
        risk_path = riskchains_dir / f"{facet_id}.risk.v1.0.json"
        with open(risk_path, 'w', encoding='utf-8') as f:
            json.dump(risk_data, f, ensure_ascii=False, indent=2)
        print(f"  ✅ {risk_path.name} (riskchains)")
        written_files.append(str(risk_path))
    
    return written_files


if __name__ == "__main__":
    md_file = Path('p0-3.md')
    recommendations_dir = Path('domain/recommendations')
    narratives_dir = Path('domain/narratives')
    riskchains_dir = Path('domain/riskchains')
    
    recommendations_dir.mkdir(parents=True, exist_ok=True)
    narratives_dir.mkdir(parents=True, exist_ok=True)
    riskchains_dir.mkdir(parents=True, exist_ok=True)
    
    written = process_p0_3(md_file, recommendations_dir, narratives_dir, riskchains_dir)
    
    print(f"\n✅ Total files written: {len(written)}")
    print(f"✅ Recommendations: {recommendations_dir}")
    print(f"✅ Narratives: {narratives_dir}")
    print(f"✅ Riskchains: {riskchains_dir}")
    
    if len(written) == 42:
        print(f"\n🎊 P0-3 content extraction complete with L4 Safety fixes!")
        print(f"   All 14 Facets now have complete user-facing content")
    else:
        print(f"\n⚠️  Warning: Expected 42 files, wrote {len(written)}")
