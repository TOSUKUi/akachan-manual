#!/usr/bin/env python3
"""引用元ページから観測価格を再抽出し、掲載レンジの実在を判定・推奨値を出す（調査用）。"""
from __future__ import annotations

import glob
import hashlib
import html as htmllib
import os
import re
import subprocess
import sys
import time

import yaml

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
CACHE = os.path.join(HERE, "html")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"


def fetch(url: str) -> str | None:
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest() + ".html")
    if not os.path.exists(path) or os.path.getsize(path) < 100:
        code = ""
        for attempt in range(3):
            code = subprocess.run(
                ["curl", "-sSL", "--compressed", "--fail-with-body", "-A", UA, "--max-time", "60",
                 "-o", path, "-w", "%{http_code}", url],
                capture_output=True, text=True).stdout.strip()
            if code == "200":
                break
            time.sleep(2 + attempt * 3)
        if code != "200":
            return None
        time.sleep(1.0)
    body = open(path, encoding="utf-8", errors="ignore").read()
    return htmllib.unescape(body).replace("\u3000", " ").replace("\u00a5", "￥").replace("&yen;", "￥")


def observed(text: str) -> list[int]:
    vals = []
    for pat in (r'a-price-whole">([\d,]+)', r'([\d]{1,3}(?:,\d{3})+)円', r'[￥¥]\s*([\d,]{3,})'):
        for m in re.finditer(pat, text):
            n = int(m.group(1).replace(",", ""))
            if 100 <= n <= 500000:
                vals.append(n)
    return sorted(set(vals))


def pick(vals: list[int]):
    if not vals:
        return None
    lo = vals[max(0, int(len(vals) * 0.10))]
    hi = vals[min(len(vals) - 1, int(len(vals) * 0.90))]
    if lo == hi:
        lo, hi = vals[0], vals[-1]
    return lo, hi, len(vals)


def main() -> int:
    mode = sys.argv[1] if len(sys.argv) > 1 else "report"
    changed = 0
    for path in sorted(glob.glob(os.path.join(ROOT, "items", "*.md"))):
        raw = open(path, encoding="utf-8").read()
        fm = yaml.safe_load(raw.split("---", 2)[1])
        text = raw
        for it in fm.get("items") or []:
            price = it.get("price")
            if not price:
                continue
            low, high = int(price["low"]), int(price["high"])
            urls = list(price.get("sources") or [])
            all_vals: list[int] = []
            fetched = False
            for u in urls:
                body = fetch(u)
                if body is None:
                    print(f"FETCH-FAIL {it['id']} {u}")
                    continue
                fetched = True
                all_vals += observed(body)
            if not fetched:
                continue
            all_vals = sorted(set(all_vals))
            has_both = (low in all_vals) and (high in all_vals)
            sug = pick(all_vals)
            flag = "OK " if has_both else "FIX"
            print(f"{flag} {path.split('/')[-1]} {it['id']}: 掲載{low}-{high} 観測n={len(all_vals)} "
                  f"推奨{sug[0]}-{sug[1]}{'' if has_both else '  << 要修正'}")
            if mode == "fix" and not has_both and sug:
                lo_s, hi_s = sug[0], sug[1]
                # 該当アイテムの price ブロックだけを書き換える
                pat = re.compile(
                    r"(- id: " + re.escape(str(it["id"])) + r"\n(?:.*\n)*?\s+price:\n"
                    r"(\s+)low: )\d+(\n\s+high: )\d+",
                )
                new_text, n = pat.subn(rf"\g<1}{lo_s}\g<3>{hi_s}", text, count=1)
                if n == 1:
                    text = new_text
                    changed += 1
                else:
                    print(f"  !! 書き換え失敗 {it['id']}")
        if mode == "fix":
            open(path, "w", encoding="utf-8").write(text)
    if mode == "fix":
        print(f"updated {changed} items")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
