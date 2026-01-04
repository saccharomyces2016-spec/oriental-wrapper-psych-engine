#!/usr/bin/env python3
import json
import sys
from pathlib import Path

def main():
  if len(sys.argv) != 3:
    print("Usage: score_facet.py <compiled_facet.json> <answers.json>", file=sys.stderr)
    sys.exit(2)

  compiled = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
  answers = json.loads(Path(sys.argv[2]).read_text(encoding="utf-8"))

  scoring = compiled["scoring"]
  model = scoring["model"]
  if model != "weighted_sum":
    raise ValueError(f"Unsupported model: {model}")

  total = 0.0
  total_w = 0.0
  for inp in scoring["inputs"]:
    qid = inp["questionId"]
    w = float(inp["weight"])
    v = float(answers.get(qid, 0))
    direction = inp["direction"]
    if direction == "higher_is_worse":
      score = v / 4.0
    elif direction == "higher_is_worse_reversed":
      score = (4.0 - v) / 4.0
    else:
      raise ValueError(f"Unknown direction: {direction}")
    total += score * w
    total_w += w

  avg = total / total_w if total_w else 0.0

  band = "low"
  for b in scoring["bands"]:
    if avg >= b["min"] and avg < b["max"]:
      band = b["band"]
      break

  output = {
    "facetId": compiled["facetId"],
    "domainVersion": compiled["domainVersion"],
    "score": round(avg, 4),
    "band": band,
    "narrative": compiled["narratives"].get(band, {}),
    "recommendations": compiled["recommendations"].get(band, []),
    "riskchains": compiled["riskchains"].get(band, {})
  }

  print(json.dumps(output, ensure_ascii=False, indent=2))

if __name__ == "__main__":
  main()
