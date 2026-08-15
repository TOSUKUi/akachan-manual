# Merge / Integration Report — akachan-manual UI 最適化

**Date:** 2026-08-15 · **Base:** `4c0d671` (chore: add ui-ux-pro-max skill family + UI/UX specs)
**Final:** `ac581fc` on `feat/baby-guide-site`

## 0. Recovery note (important)

The parallel step did not produce two branches as planned:

- **Mobile worker: STOPPED, zero work.** Per its own brief's isolation guard, it detected
  `pwd == main checkout` (the chain's per-item `worktree: true` did not materialize an
  isolated worktree despite a clean git state) and correctly refused to write.
- **Desktop worker: partial (supervisor-approved).** Same isolation failure; escalated and
  received approval to commit ONLY new files on `feat/desktop-ux` (`1b49248`:
  `src/components/chapter-toc.tsx`, `src/lib/use-scroll-spy.ts`,
  `docs/uiux/wiring-desktop.md`), deferring all shared-file hunks to this step.

**Recovery executed by this merge worker (single writer, no race):** the mobile
implementation was completed directly in the main checkout on branch `feat/mobile-ux`
(`daee820`), following `docs/uiux/spec-mobile.md` §2.1–2.10 and the mobile worker brief's
ownership/gate requirements exactly. Both branches were then merged into
`feat/baby-guide-site`, and the desktop worker's deferred wiring
(`docs/uiux/wiring-desktop.md` A1–B4) was applied as the integration commit `44529a6`,
followed by a11y micro-fixes `ac581fc`. Because one writer applied both feature sets,
no merge conflicts could occur (and none did).

## 1. Branches merged

| Branch | Commit | Merged as | Content |
|---|---|---|---|
| `feat/mobile-ux` | `daee820` | `cf0022c` (--no-ff) | 9 files, +380/−36: responsive header, chapter sheet, sub-bar, back-to-top, search ergonomics + `/`, fact-view offsets, page hunks, CSS vars |
| `feat/desktop-ux` | `1b49248` | `902d5a1` (--no-ff) | 3 files, +338: chapter-toc.tsx, use-scroll-spy.ts, wiring-desktop.md |
| (integration) | `44529a6` | direct commit | wiring A/B applied to `[chapter].tsx` / `index.tsx` |
| (integration) | `ac581fc` | direct commit | a11y micro-fixes (aria-controls when closed; ChapterNav `display:contents` removed) |

## 2. Conflicts + resolutions

None. `git merge --no-ff` of both branches: clean (desktop branch was new-files-only;
mobile branch was authored after the base with full knowledge of the desktop files).

## 3. Integration checks (brief step 3)

| # | Check | Result |
|---|---|---|
| a | layout.tsx: 「章」button (h-11, aria-expanded/aria-controls) + MobileChapterSheet + lg-only wrapping chip nav; `/` shortcut in search-box.tsx (`e.key === '/'` guarded against form fields) | ✅ verified by grep, lines 77/83/95 (layout), line 36 (search-box) |
| b | [chapter].tsx: ChapterSubBar mounted after `<header>` (component is `lg:hidden`), BackToTopButton (mounted in Layout per spec §2.6 "spec: Layout" decision), prev/next responsive cards (min-h-14 mobile / sm compact), lg 2-col grid `minmax(0,1fr)_16rem` + ChapterToc + useScrollSpy(ids, 180) with memoized level≥2 ids | ✅ lines 22/73/116 + card markup |
| c | index.tsx: checklist rows `min-h-11 items-center` (Must + Dob), hero H1 `text-2xl sm:text-[28px] lg:text-3xl`, ChapterGrid `sm:grid-cols-2`, start-here card (`hidden lg:block`, href `#must-checklist`), `id="must-checklist"` on Card | ✅ lines 12/24/69/88/112/125 |
| d | index.css: `--header-h`/`--subbar-h` (128/48 mobile, 180/0 lg), `scroll-padding-top: calc(var(--header-h) + var(--subbar-h) + 12px)`, `touch-action: manipulation` — each present once; no existing `:root` token values touched | ✅ lines 116–142 |
| e | fact-section-view.tsx: all three `scroll-mt-28` removed (global scroll-padding owns the offset); H2 `mt-8 lg:mt-6`; body `text-[15px] leading-7` kept | ✅ grep: `scroll-mt-28` survives only in a CSS comment |

## 4. Gate results (authoritative, run serially in main checkout)

| Gate | Result |
|---|---|
| `npm run gen` | ✅ pass (site-data + search-index regenerated) |
| `npx tsc -b` | ✅ exit 0 (strict, no `any`) |
| `npx eslint .` | ✅ 0 errors, 1 pre-existing warning (ui/badge.tsx react-refresh — not from this work) |
| `npx vitest run` | ✅ 3 files / 19 tests, all passed (no test changes needed) |
| `npm run build` | ✅ vite-react-ssg, 10 static HTML pages |

Post-build curl sanity: `GET /` 200; index.html contains `must-checklist` + `touch-action`
(CSS) + desktop chip nav; safety.html contains chapter TOC nav, section-jump select,
`grid-cols-[minmax(0,1fr)_16rem]`. Sheet markup is client-only (renders on open) — as designed.

## 5. git log

```
ac581fc fix: a11y 微修正（閉じたシートの aria-controls、ChapterNav の display:contents 除去）
44529a6 feat: デスクトップUI統合（章内TOC 2カラム・スクロールスパイ・インデックス2列グリッド・start-hereカード）
902d5a1 merge: feat/desktop-ux（TOC・スクロールスパイ）
cf0022c merge: feat/mobile-ux（モバイルUI）
daee820 feat: モバイルUI最適化（章メニューシート・44pxタッチターゲット・セクションジャンプ・トップへボタン・/ショートカット）
1b49248 feat: デスクトップUIコンポーネント（章内TOC・スクロールスパイ）+ ウイリングノート
4c0d671 chore: add ui-ux-pro-max skill family + UI/UX specs (docs/uiux)
ce6dcd0 fix: 第三ラウンドファクトチェック修正（…）
```

## 6. Combined diff stat (4c0d671..HEAD)

```
 docs/uiux/wiring-desktop.md                    | 200 +++++++++++++
 src/components/chapter-toc.tsx                 |  55 ++++
 src/components/chapter/chapter-sub-bar.tsx     |  57 ++++
 src/components/fact/fact-section-view.tsx      |   9 +-
 src/components/layout/back-to-top-button.tsx   |  32 ++
 src/components/layout/layout.tsx               |  39 +--
 src/components/layout/mobile-chapter-sheet.tsx | 152 ++++++++++
 src/components/search/search-box.tsx           |  34 ++-
 src/index.css                                  |  22 ++
 src/lib/use-scroll-spy.ts                      |  83 ++++++
 src/pages/[chapter].tsx                        | 117 +++++---
 src/pages/index.tsx                            |  21 +-
 12 files changed, 765 insertions(+), 56 deletions(-)
```

## 7. Worktree cleanup

`git worktree list` → only the main worktree (the chain's worktree isolation never
materialized, so there was nothing to remove). Branches `feat/mobile-ux` /
`feat/desktop-ux` retained (merged, no force needed). Untracked chain artifacts at repo
root (branch-*.txt, worker-*-result.md) left for the reviewer per brief.

## 8. Spec deviations (documented)

1. **Sheet exit animation omitted** (spec §2.3 offered "plain" as acceptable): sheet is
   conditionally rendered; entry uses `tw-animate-css` (`fade-in` / `slide-in-from-bottom`,
   both `motion-reduce:animate-none`). Closing is instant — no focusable hidden DOM.
2. **BackToTopButton mounted in Layout, not [chapter].tsx** — per spec §2.6's own final
   call ("spec: mount in Layout after <main> so all pages benefit"); brief mentioned both.
3. **Spy ids exclude level-1 intro sections** — per desktop worker's wiring note A2 (TOC
   rows and spy set must match; intro has no heading/row).
4. **`--header-h` values are the spec's estimates** (128px @375 / 180px @1024), not
   browser-measured: this step has no browser tool. Estimated from the composed header
   (disclaimer wraps to ~4 lines @375 → ~125px; @1024 → ~185px). Reviewer checklist
   wiring-desktop.md §D3 mandates measuring and correcting if off by >8px.
5. **Sheet rendered outside `<header>`** (spec said "after the row"): header uses
   `backdrop-blur` (backdrop-filter), which makes it a containing block for `position:
   fixed` descendants — a sheet inside it would be positioned/clipped relative to the
   header. Rendering immediately after `</header>` preserves identical visuals + tab order.
6. **Search results panel `top-12`** (was `top-11`): input grew h-9→h-11, panel keeps a
   4px gap.

## 9. Residual risks (for reviewer)

- **Header height unmeasured** (see 8.4) — the single highest-value browser check:
  measure sticky header at 375px and 1024px; if `--header-h` is off by >8px, correct in
  `src/index.css` (one line each). Anchor-landing AC-4 depends on it.
- **Scroll-spy behavior** (no jitter, bottom-edge fallback, `aria-current` movement) is
  logic-reviewed only — needs the reviewer's browser scroll test at 1280px.
- **Sheet focus trap / scroll lock / focus return** verified by code review only —
  reviewer browser test at 375px (AC-2/AC-3).
- **`/` shortcut** verified by code review only (guard covers input/textarea/select/
  contentEditable) — reviewer keydown test.
- Preview server on :4173 serves the fresh build; reviewer should still rebuild first
  per its brief.
