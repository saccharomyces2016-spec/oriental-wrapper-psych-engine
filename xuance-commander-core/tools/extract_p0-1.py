#!/usr/bin/env python3
"""
Extract P0-1 approved Facets and write to individual files
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


def process_p0_1(md_path, questions_dir):
    """Process P0-1 submission and write approved Facets"""
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    json_blocks = extract_json_blocks(content)
    
    # Filter for question files (has "questionSet" field)
    questions = [j for j in json_blocks if "questionSet" in j]
    
    print(f"\n=== P0-1 Processing ===")
    print(f"Found {len(questions)} question files")
    
    # Approved Facets (11 out of 14)
    approved = [
        "anger_dysregulation",
        "grief_stagnation",
        "shame_spiral",
        "guilt_accumulation",
        "attachment_rupture",
        "resentment_buildup",
        "perfectionism_paralysis",
        "betrayal_wound",
        "apathy_stagnation",
        "purpose_drift",
        "digital_dissociation"
    ]
    
    # Track seen facets to avoid duplicates
    seen = set()
    written_files = []
    
    print("\n--- Writing Approved Facets ---")
    for data in questions:
        facet_id = data.get("facetId", "unknown")
        
        # Skip if not approved
        if facet_id not in approved:
            print(f"  ⏸️  {facet_id} - Not in approved list (will be fixed)")
            continue
        
        # Skip duplicates (keep first occurrence)
        if facet_id in seen:
            print(f"  ⏭️  {facet_id} - Duplicate (skipped)")
            continue
        
        seen.add(facet_id)
        
        filename = f"{facet_id}.questions.v1.0.json"
        filepath = questions_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"  ✅ {filename}")
        written_files.append(str(filepath))
    
    return written_files


if __name__ == "__main__":
    md_file = Path('p0-1.md')
    questions_dir = Path('domain/questions')
    
    questions_dir.mkdir(parents=True, exist_ok=True)
    
    written = process_p0_1(md_file, questions_dir)
    
    print(f"\n✅ Total files written: {len(written)}")
    print(f"✅ Output directory: {questions_dir}")
    print(f"\n⏸️  3 Facets pending fix (see 追問包):")
    print(f"  - trust_erosion (1 處焦慮)")
    print(f"  - impostor_syndrome (1 處焦慮)")
    print(f"  - sleep_rhythm_chaos (2 處焦慮)")
