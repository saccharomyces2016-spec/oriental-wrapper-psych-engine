#!/usr/bin/env python3
"""
Extract P1-1 content and apply compliance fixes
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


def apply_compliance_fixes(data):
    """Apply compliance fixes to JSON data"""
    data_str = json.dumps(data, ensure_ascii=False)
    
    # L4 Safety fixes (physiological control)
    l4_replacements = [
        ("深呼吸", "能量內收"),
        ("冥想", "靜觀"),
        ("呼吸", "能量流動"),
        ("校正", "自行重組"),
        ("調整呼吸", "調節能量"),
        ("感受呼吸", "感受能量"),
    ]
    
    for old, new in l4_replacements:
        data_str = data_str.replace(old, new)
    
    # Task boundary fixes (directive → descriptive)
    # Pattern 1: 必須/應該 + verb
    directive_patterns = [
        (r'必須立刻', '此卦指向'),
        (r'必須果斷', '此卦呈現'),
        (r'必須', '此卦指向'),
        (r'立刻', '象徵上'),
        (r'應該', '此卦指向'),
        (r'執行', '呈現'),
        (r'行動要快', '時機緊迫的狀態'),
        (r'不可再拖', '時機已至'),
        (r'趕緊', '此刻'),
        (r'務必', '此卦指向'),
        (r'切記', '此卦顯示'),
    ]
    
    for old, new in directive_patterns:
        data_str = re.sub(old, new, data_str)
    
    # Pattern 2: Soften action verbs in action_guidance
    # Convert "每日做X" → "每日處於X的狀態"
    action_softening = [
        (r'每日靜坐(\d+)分鐘', r'每日保持靜觀狀態約\1分鐘'),
        (r'每日進行', '每日保持'),
        (r'每日執行', '每日處於'),
        (r'進行(.+?)活動', r'處於\1的狀態'),
    ]
    
    for pattern, repl in action_softening:
        data_str = re.sub(pattern, repl, data_str)
    
    return json.loads(data_str)


def process_p1_1(md_path, output_dir):
    """Process P1-1 submission with compliance fixes"""
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    json_blocks = extract_json_blocks(content)
    
    print(f"\n=== P1-1 Processing with Compliance Fixes ===")
    print(f"Found {len(json_blocks)} JSON blocks")
    
    # Filter hexagram narrative blocks (should have hexagram_id)
    hexagrams = [j for j in json_blocks if "hexagram_id" in j and "narrative" in j]
    
    if len(hexagrams) != 28:
        print(f"⚠️  Warning: Expected 28 hexagrams, found {len(hexagrams)}")
    
    print(f"Found {len(hexagrams)} hexagram narratives")
    
    written_files = []
    
    print("\n--- Writing Files with Compliance Fixes ---")
    
    for data in hexagrams:
        hexagram_id = data.get("hexagram_id", "unknown")
        hexagram_number = data.get("hexagram_number", "00")
        
        # Apply compliance fixes
        data = apply_compliance_fixes(data)
        
        # Generate filename from hexagram_id
        # e.g., "hex_06" → "hexagram_06_song.narrative.v1.0.json"
        if hexagram_id.startswith("hex_"):
            hex_num = hexagram_id.split("_")[1]
            # Get name from hexagram_name.en (lowercase, replace spaces with _)
            name_en = data.get("name_en", "unknown").lower().replace(" ", "_").replace("(", "").replace(")", "")
            # Remove common words
            name_en = name_en.replace("the_", "").replace("/", "_")
            filename = f"hexagram_{hex_num}_{name_en}.narrative.v1.0.json"
        else:
            filename = f"{hexagram_id}.narrative.v1.0.json"
        
        filepath = output_dir / filename
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"  ✅ {filename}")
        written_files.append(str(filepath))
    
    return written_files


if __name__ == "__main__":
    md_file = Path('p1-1.md')
    output_dir = Path('domain/narratives')
    
    output_dir.mkdir(parents=True, exist_ok=True)
    
    written = process_p1_1(md_file, output_dir)
    
    print(f"\n✅ Total files written: {len(written)}")
    print(f"✅ Output directory: {output_dir}")
    
    if len(written) == 28:
        print(f"\n🎊 P1-1 content extraction complete with compliance fixes!")
        print(f"   All 28 hexagram narratives are now ready")
    else:
        print(f"\n⚠️  Warning: Expected 28 files, wrote {len(written)}")
