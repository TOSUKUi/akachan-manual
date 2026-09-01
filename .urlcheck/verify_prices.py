#!/usr/bin/env python3
"""items/*.md の価格出典HTMLに low/high の数字が実在するか検証（一時ツール）"""
import os
import re
import subprocess
import sys
import time

import glob
import hashlib
import html as htmllib
import subprocess


def fetch(url: str) -> str:
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest() + ".html")
    if not os.path.exists(path) or os.path.getsize(path) < 100:
        code = ""
        for attempt in range(3):
            code = subprocess.run(
                ["curl", "-sSL", "--fail-with-body", "-A", "Mozilla/5.0", "--max-time", "60",
                 "-o", path, "-w", "%{http_code}", url],
                capture_output=True, text=True,
            ).stdout.strip()
            if code == "200":
                break
            time.sleep(2 + attempt * 2)
        if code != "200":
            raise RuntimeError(f"HTTP {code}")
        time.sleep(0.6)
    body = open(path, encoding="utf-8", errors="ignore").read()
    return htmllib.unescape(body).replace("\u3000", " ").replace("\u00a5", "￥").replace("&yen;", "￥")


CACHE = ".urlcheck/html"


def main() -> int:
    unverified = []
    total = 0
    for p in sorted(glob.glob("items/*.md")):
        for name, lo, hi, urls in re.findall(
            r"- id: (\S+)\n(?:.*\n)*?\s+price:\n\s+low: (\d+)\n\s+high: (\d+)\n(?:.*?\n)*?\s+sources:\n((?:\s+- http.*\n)+)",
            open(p).read(),
        ):
            total += 1
            ok = False
            for u in [x.strip().lstrip("-").strip() for x in urls.strip().split("\n")]:
                try:
                    htmltext = fetch(u)
                except Exception:  # 取得不能は検証対象外
                    continue
                lo_s, hi_s = f"{int(lo):,}", f"{int(hi):,}"
                if (
                    str(lo) in htmltext
                    or lo_s in htmltext
                    or f"￥{lo_s}" in htmltext
                    or str(hi) in htmltext
                    or hi_s in htmltext
                    or f"￥{hi_s}" in htmltext
                ):
                    ok = True
                    break
            if not ok:
                unverified.append(f"{p}: {name} {lo}-{hi}")
    print(f"検証対象 {total} 件 / 裏取り失敗 {len(unverified)} 件")
    for u in unverified:
        print("  NG", u)
    return 1 if unverified else 0


sys.exit(main())
