VERDICT: FAIL

## Scope & method

Full-UI review of akachan-manual at HEAD `d015798` (10 SSG pages) against `docs/uiux/spec-mobile.md`, `docs/uiux/spec-desktop.md`, and `.agents/skills/ui-ux-pro-max` (ux-guidelines.csv citations below). Fresh `npm run build` (10 pages OK) served via `vite preview` on :4173; `playwright-cli -s=fullreview` at 375×812 (primary), 768×1024, 1280×800, 1440×900 with scripted measurements (`run-code`), 34 screenshots read by eye, console captured per load, plus static checks (git diff 4c0d671..HEAD, grep). Includes a dedicated TABLE AUDIT (user priority). Note: a parallel worker left **uncommitted WIP** in `src/components/fact/*` + `src/lib/*` (mtime 03:16, mid-review) that adds table styling; all findings below describe the committed HEAD build that was served and tested.

## Findings

1. **blocker — horizontal page overflow from non-wrapping 必須 badges (WCAG 1.4.10 Reflow AA + spec-mobile AC-1 + No 65/112).** Measured `scrollWidth-clientWidth` @375px: newborn-care **31px**, vaccines **25px**; @320px: newborn-care **86**, vaccines **80**, safety **20**, dos-and-donts **14** (@414px: 0 everywhere). Culprit: `Badge` carries `whitespace-nowrap … w-fit shrink-0` (`src/components/ui/badge.tsx:8`), so long canonical labels render as single 384–390px-wide chips inside `MustBadges` (`src/components/fact/fact-section-view.tsx:56-66`) — wider than the viewport, forcing two-dimensional scrolling on the site's most important content. Pre-existing (badge.tsx unchanged in 4c0d671..HEAD) but fails the shipped spec's own AC-1 ("no horizontal scrollbar anywhere on any page"). **Fix:** in `MustBadges` only, override with `whitespace-normal max-w-full h-auto` (keep `badge.tsx` chip usage elsewhere intact); re-verify overflow=0 at 320/375.

2. **major — TABLE AUDIT (HEAD build): GFM tables render completely unstyled and are unreadable at 375px.** Tables exist on exactly 2 of 10 pages: `/vaccines` (1 table, 12 rows) and `/complementary-feeding` (1 table, 5 rows); the other 8 pages have none. Measured @375: vaccines table w=343 (fits vw 375) but **worst cell wraps 7 lines** ("生後2カ月" stacks vertically; 接種方法 column runs 5–8 lines per row); complementary-feeding **worst 5 lines** ("離乳初期" one char/line). Styling: `border-top 0px`, cell `padding 0px`, no header background, no row separators, **no overflow wrapper** (table's parent is the plain prose div `mt-2 space-y-3 …`). @1280: tables fill the 704px column, worst wrap 3/2 lines — readable but rows/columns have zero visual separation (screenshots: `.playwright-cli/page-2026-08-15T18-05-29-526Z.png`, `…18-05-30-725Z.png` @375; `…18-05-46-410Z.png`, `…18-05-47-647Z.png` @1280). Cause: `ReactMarkdown` had no `components` override at HEAD (`git show HEAD:…fact-section-view.tsx` → 0 matches) so Tailwind preflight strips all table chrome. Verdict: **unreadable at 375** (columns visually collide), acceptable-but-ugly at 1280. **Fix:** pass GFM `components` (bordered `overflow-x-auto` wrapper + `min-w` table, `th/td` padding + `border-b`, `thead` bg, zebra rows). *Status note:* uncommitted parallel WIP (fact-section-view.tsx mtime 03:16) implements exactly this — but currently imports `@/components/fact/vaccine-schedule-diagram`, a file that **does not exist on disk**, so the WIP does not compile yet; coordinate with that worker and re-verify tables after it lands.

3. **major — chapter sub-bar `<select>` squeezed to unusability at 375px on long-title chapters.** Measured select widths @375: safety 167px (OK) vs day-of-birth **84px**, vaccines **55px**, dos-and-donts **46px** — the placeholder「セクション」truncates to「セクシ」/「も」/chevron-only (screenshots `…18-00-28-858Z.png`, `…18-00-41-655Z.png`). The title button (`src/components/chapter/chapter-sub-bar.tsx:21-31`) has no width cap, so on 3 of 9 chapters the section-jump control is effectively invisible — a spec §2.5 affordance that fails its purpose (No 22/104 spirit: a 46px-wide select is not a usable target). **Fix:** cap the title (e.g. `max-w-[45%]` / `flex-[0_1_auto]` with truncate) and give the select `min-w-28` (112px) so the label always shows.

4. **minor — cold-load React hydration error #418 on every page (pre-existing).** A *fresh* browser's first navigation logs `Minified React error #418` ("server rendered HTML didn't match the client; tree regenerated on the client") on all 10 pages; every subsequent in-session navigation logs 0 errors. Consistent with `lazy: () => import(…)` routes (`src/App.tsx:12,16`) suspending during hydration on cold chunk fetch. App.tsx/main.tsx unchanged in 4c0d671..HEAD → not introduced by the UI work, but it defeats SSG's first-paint benefit for every real first-time visitor and pollutes the console. **Fix:** eager-import the two page modules (they are the whole site) or render an SSR-matching Suspense fallback.

5. **minor — `/index.html` renders「章が見つかりません。」in preview.** Route `:slug` (`src/App.tsx:16`) swallows the literal "index" (`cleanSlug` strips only `.html`). GitHub Pages 301-redirects `/index.html`→`/` so production is unaffected, but `vite preview` deep links show a broken page (screenshots `…18-00-25-199Z.png` @375, `…18-11-59-248Z.png` @1280). **Fix:** treat `slug === 'index'` as the index route (or redirect).

6. **minor — double horizontal rule + ~50px dead band at chapter top.** `<Separator />` (`src/pages/[chapter].tsx:75`) plus the first H2 section's own `border-t` (`src/components/fact/fact-section-view.tsx:108`) plus stacked `space-y-6` gaps render two rules with an empty band between (visible `…18-00-39-224Z.png` @375, `…18-11-43-266Z.png` @768, `…18-12-05-526Z.png` @1280). **Fix:** drop the Separator or skip `border-t` on the first section (`first:border-t-0`).

7. **minor — 1440px: header (~159px, chips on one row) is shorter than the shared `--header-h: 174px`** → TOC sticks 15px below the header's edge (safe gap, no overlap; pre-existing and previously documented in `docs/uiux/review-report.md`). Optional: per-breakpoint var or measured value at ≥1440.

## Verified OK

- **Build/tests/static:** `npm run build` 10 pages OK; `npm test` 19/19 pass; no `any` in changed src files; `package.json`/lock unchanged since 4c0d671; `:root` token values unchanged (only new `--header-h/--subbar-h` vars, `src/index.css`); `touch-action: manipulation` on body (`src/index.css` body rule, No 25).
- **Mobile sheet (375):** 「章」→ `aria-expanded=true`, body `overflow:hidden`, focus on 閉じる; 9 rows × **44px** each; current row bold+tint+`aria-current="page"`; Escape and backdrop both close and restore focus to the trigger (screenshot `.playwright-cli/sheet-open-375.png`).
- **Sub-bar jump (375):** selecting section 3 on /safety lands target top=**188px** vs sub-bar bottom=**177px** (fully below, ~11px clearance = the +12px padding).
- **Back-to-top:** opacity 0 at top; at scrollY 900 opacity 1, **44px**; click → scrollY 0 and hides again.
- **Search (375):** `/` focuses `#site-search`; 「はちみつ」→ **2 hits** (screenshot `.playwright-cli/search-375.png`); Enter opens first hit and lands below header+sub-bar (top 188 after settle). At 1280, typing `/` *inside* the input inserts the char (no re-trigger).
- **Deep links:** fresh `/safety.html#使用義務-道路交通法` @375 → top 188 ≥ 177 ✓; @1280 → top 186 ≥ headerBottom 174 ✓; index must-item → newborn-care#sids… top 188 ✓; index start-here card (visible @lg, 2-col grid confirmed `gridTemplateColumns` = 2) → #must-checklist top 186 ≥ 174 ✓.
- **Prev/next (375):** two stacked cards **62px** (≥56 spec); next-card navigates to /vaccines.
- **Desktop TOC (1280):** sticky top = **174px** at scrollY 800 *and* 3000; scroll-spy `aria-current` follows (装着のポイント → やけど → 誤飲); bottom-edge fallback activates the true last row (誤飲…110番 = last `ul a`); TOC link click lands top 186 ≥ 174 (screenshots `…18-12-29-621Z.png`, `…18-12-30-883Z.png`).
- **Hover (1280):** prev/next color ink `rgb(22,51,44)` → primary `rgb(14,122,99)`; chapter card bg white→accent + border→primary (No 11).
- **Reduced motion:** with `reducedMotion:'reduce'`, computed `transitionDuration` = **0s** for chips, TOC links, prev/next, FAB, cards, start-here; `scroll-behavior: auto` (No 9/99).
- **Focus visibility:** Tab order logo→search→chips shows visible ring (screenshot `.playwright-cli/focus-tab-1280.png`); all new focusables carry `focus-visible:outline-2 outline-ring` in code.
- **Overflow:** 0px on all 10 pages at 414/768/1280/1440 (No 65) — the only >0 values are the badge overflow listed in Finding 1.
- **Visual pass (by eye):** 375 top of all 10 pages + mid-scroll safety/vaccines; 768 index+newborn-care; 1280 top of all 10 + mid safety/vaccines; 1440 top+mid safety — header one-row @375, disclaimer intact, 2-col index grid, TOC alignment/widths consistent, no overlaps/truncation beyond documented ones (sub-bar title, sheet next-chapter).

## Screenshot index

| path | page | viewport | note |
|---|---|---|---|
| .playwright-cli/page-2026-08-15T18-01-26-720Z.png | / | 375 | index top OK |
| .playwright-cli/page-2026-08-15T18-00-25-199Z.png | /index.html | 375 | Finding 5 quirk |
| .playwright-cli/page-2026-08-15T18-00-26-404Z.png | day-of-birth | 375 | sub-bar OK-ish (select 84px) |
| .playwright-cli/page-2026-08-15T18-00-27-637Z.png | newborn-care | 375 | top OK |
| .playwright-cli/page-2026-08-15T18-00-28-858Z.png | vaccines | 375 | Finding 3 (select「も」) |
| .playwright-cli/page-2026-08-15T18-00-30-056Z.png | checkups | 375 | OK |
| .playwright-cli/page-2026-08-15T18-00-39-224Z.png | complementary-feeding | 375 | Finding 6 dead band |
| .playwright-cli/page-2026-08-15T18-00-40-454Z.png | safety | 375 | OK |
| .playwright-cli/page-2026-08-15T18-00-41-655Z.png | dos-and-donts | 375 | Finding 3 (select chevron-only) |
| .playwright-cli/page-2026-08-15T18-00-42-872Z.png | dads-mindset | 375 | OK |
| .playwright-cli/page-2026-08-15T18-00-44-120Z.png | procedures | 375 | OK |
| .playwright-cli/page-2026-08-15T18-00-54-424Z.png | safety mid | 375 | header+sub-bar sticky |
| .playwright-cli/page-2026-08-15T18-00-55-653Z.png | vaccines mid | 375 | Finding 2 table |
| .playwright-cli/page-2026-08-15T18-05-29-526Z.png | vaccines table | 375 | Finding 2 (7-line wraps) |
| .playwright-cli/page-2026-08-15T18-05-30-725Z.png | complementary-feeding table | 375 | Finding 2 (vertical chars) |
| .playwright-cli/sheet-open-375.png | safety + sheet | 375 | sheet a11y OK |
| .playwright-cli/search-375.png | safety + search | 375 | はちみつ 2 hits |
| .playwright-cli/page-2026-08-15T18-11-42-688Z.png | / | 768 | mobile pattern at tablet |
| .playwright-cli/page-2026-08-15T18-11-43-266Z.png | newborn-care | 768 | Finding 6 band |
| .playwright-cli/page-2026-08-15T18-13-40-460Z.png | / | 1280 | start-here + grid |
| .playwright-cli/page-2026-08-15T18-11-59-248Z.png | /index.html | 1280 | Finding 5 quirk |
| .playwright-cli/page-2026-08-15T18-12-00-512Z.png | day-of-birth | 1280 | OK |
| .playwright-cli/page-2026-08-15T18-12-01-748Z.png | newborn-care | 1280 | OK |
| .playwright-cli/page-2026-08-15T18-12-03-025Z.png | vaccines | 1280 | Finding 2 (unstyled header) |
| .playwright-cli/page-2026-08-15T18-12-04-294Z.png | checkups | 1280 | OK |
| .playwright-cli/page-2026-08-15T18-12-05-526Z.png | complementary-feeding | 1280 | Finding 6 double rule |
| .playwright-cli/page-2026-08-15T18-12-06-779Z.png | safety | 1280 | OK |
| .playwright-cli/page-2026-08-15T18-12-08-012Z.png | dos-and-donts | 1280 | OK |
| .playwright-cli/page-2026-08-15T18-12-09-260Z.png | dads-mindset | 1280 | OK |
| .playwright-cli/page-2026-08-15T18-12-10-513Z.png | procedures | 1280 | OK |
| .playwright-cli/page-2026-08-15T18-05-46-410Z.png | vaccines table | 1280 | Finding 2 (no chrome) |
| .playwright-cli/page-2026-08-15T18-05-47-647Z.png | complementary-feeding table | 1280 | Finding 2 |
| .playwright-cli/page-2026-08-15T18-12-29-621Z.png | safety mid | 1280 | TOC sticky 174 + spy |
| .playwright-cli/page-2026-08-15T18-12-30-883Z.png | vaccines mid | 1280 | TOC + FAB |
| .playwright-cli/page-2026-08-15T18-12-31-655Z.png | safety | 1440 | Finding 7 gap |
| .playwright-cli/page-2026-08-15T18-12-32-757Z.png | safety mid | 1440 | spy follows |
| .playwright-cli/focus-tab-1280.png | / | 1280 | focus ring visible |
