#!/usr/bin/env python3
"""価格レンジの厳密な裏取り監査: 引用元HTML内に「￥1,234 / 1,234円 / ¥1,234」形式で実在するか。
bare数字の一致はノイズが多いので別扱いで報告する。"""
import glob
import hashlib
import html as htmllib
import os
import re

CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PRICE_KEYS = ("low", "high")


def load(url: str) -> str | None:
    path = os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest() + ".html")
    if not os.path.exists(path):
        return None
    body = open(path, encoding="utf-8", errors="ignore").read()
    return htmllib.unescape(body).replace("\u3000", " ").replace("\u00a5", "￥").replace("&yen;", "￥")


def formatted_hits(text: str, n: int) -> int:
    s = f"{n:,}"
    pats = [rf"￥{s}", rf"¥{s}", rf"{s}円", rf"¥{s}\b".replace(r"\b", ""), rf"￥{s}（", rf"{s}（税込", rf"{s} 円"]
    return sum(len(re.findall(re.escape(p.replace("（税込", "").replace(" 円", "")), text)) for p in pats[:3])


def main() -> None:
    strict_ok, loose_only, uncached = [], [], []
    for path in sorted(glob.glob(os.path.join(ROOT, "items", "*.md"))):
        text = open(path, encoding="utf-8").read()
        for m in re.finditer(
            r"- id: (\S+)\n(?:.*\n)*?\s+price:\n\s+low: (\d+)\n\s+high: (\d+)\n(?:.*?\n)*?\s+sources:\n((?:\s+- http.*\n)+)",
            text,
        ):
            item_id, low, high, srcs = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4)
            urls = [x.strip().lstrip("-").strip() for x in srcs.strip().split("\n")]
            statuses = []
            for u in urls:
                body = load(u)
                if body is None:
                    statuses.append((u, "uncached"))
                    continue
                lo_hit, hi_hit = formatted_hits(body, low), formatted_hits(body, high)
                if lo_hit and hi_hit:
                    statuses.append((u, "strict"))
                else:
                    bare = all(str(n) in body for n in (low, high))
                    statuses.append((u, "bare" if bare else "missing"))
            kinds = {s for _, s in statuses}
            row = (item_id, low, high, statuses)
            if "strict" in kinds:
                strict_ok.append(row)
            elif "uncached" in kinds:
                uncached.append(row)
            else:
                loose_only.append(row)
    print(f"strict(記号付きで実在): {len(strict_ok)}")
    print(f"bare(素数字だけ=未確認疑い): {len(loose_only)}")
    print(f"uncached: {len(uncached)}")
    print("\n--- bare / missing の品目 ---")
    for item_id, low, high, statuses in loose_only:
        print(f"{item_id}: {low}-{high} " + "; ".join(f"{s}:{u[:70]}" for u, s in statuses))
    print("\n--- uncached ---")
    for item_id, low, high, statuses in uncached:
        print(f"{item_id}: {low}-{high} " + "; ".join(f"{s}:{u[:70]}" for u, s in statuses))


if __name__ == "__main__":
    main()
