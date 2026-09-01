#!/usr/bin/env python3
"""URLを取得して実売価格らしき数字を抽出する調査用補助ツール（一時）。"""
from __future__ import annotations

import hashlib
import html as htmllib
import json
import os
import re
import subprocess
import sys
import time

CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"


def fetch(url: str) -> str:
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest() + ".html")
    if not os.path.exists(path) or os.path.getsize(path) < 100:
        code = ""
        for attempt in range(3):
            code = subprocess.run(
                ["curl", "-sSL", "--compressed", "--fail-with-body", "-A", UA, "--max-time", "60",
                 "-o", path, "-w", "%{http_code}", url],
                capture_output=True, text=True,
            ).stdout.strip()
            if code == "200":
                break
            time.sleep(2 + attempt * 3)
        if code != "200":
            raise RuntimeError(f"HTTP {code}")
        time.sleep(1.0)
    body = open(path, encoding="utf-8", errors="ignore").read()
    return htmllib.unescape(body).replace("\u3000", " ").replace("\u00a5", "￥").replace("&yen;", "￥")


def prices(text: str) -> list[int]:
    found: list[int] = []
    # Amazon 検索結果: a-price-whole / a-offscreen の両方から拾う
    for m in re.finditer(r'a-price-whole">([\d,]+)', text):
        found.append(int(m.group(1).replace(",", "")))
    for m in re.finditer(r'>([￥¥])([\d,]+)<', text):
        found.append(int(m.group(2).replace(",", "")))
    for m in re.finditer(r'"(?:price|DSP_PRICE|itemPrice|salePrice|sale_price)"\s*:\s*"?([\d,\.]+)"?', text):
        v = float(m.group(1).replace(",", ""))
        if v >= 50:
            found.append(int(v))
    return sorted({p for p in found if 50 <= p <= 500000})


def main() -> int:
    for url in sys.argv[1:]:
        try:
            body = fetch(url)
        except Exception as exc:
            print(f"ERR {url} {exc}")
            continue
        p = prices(body)
        print(f"\n### {url}\nlen={len(body)} n={len(p)}")
        print("prices:", p[:60])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
