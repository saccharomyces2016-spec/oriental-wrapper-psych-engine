"""
Narrative Guard
Very small whitelist/blacklist validator.
In production, this should be replaced by the project's canonical governance module.
"""
from __future__ import annotations
from typing import List, Dict, Any

def validate(text: str, whitelist: List[str], blacklist: List[str]) -> Dict[str, Any]:
    hits_black = [w for w in blacklist if w and w in text]
    if hits_black:
        return {"ok": False, "reason": "blacklist_hit", "hits": hits_black}
    # whitelist policy: if whitelist provided, require at least one keyword to appear
    if whitelist:
        if not any(w in text for w in whitelist if w):
            return {"ok": False, "reason": "whitelist_miss", "hits": []}
    return {"ok": True, "reason": "pass", "hits": []}
