# MOBILE (<768px) Implementation Spec — akachan-manual

Scope: mobile-first responsive pass. Mobile pattern is the default (`<lg`); the desktop variant
(`lg:` = ≥1024px) is implemented in the same files by this (mobile) worker. 768–1023px uses the
mobile pattern. Guideline ids (No) refer to `.agents/skills/ui-ux-pro-max/data/ux-guidelines.csv`:
No 64 mobile-first, No 65 test at 320/375/414/768/1024, No 22/104 touch targets (44pt / 24px web),
No 25 tap delay, No 23 touch spacing, No 26 overscroll, No 4 back button, No 9/99 reduced motion,
No 2 sticky nav, No 72 line height, No 100 scroll-padding for sticky UI, No 112 text reflow.
app-interface.csv No 28: safe-area insets. No `:root` token values change. Light mode only
(dark mode deferred). Do not add dependencies.

## 1. Component inventory

| File | New/Changed | Responsibility |
|---|---|---|
| `src/components/layout/mobile-chapter-sheet.tsx` | NEW | Bottom-sheet dialog: 9 chapters + Home + prev/next; focus trap, Escape/backdrop close, body scroll lock |
| `src/components/layout/layout.tsx` | CHANGED | Responsive header: mobile [logo \| search \| 「章」button] + sheet; desktop (`lg:`) inline chip nav, wrap, no horizontal scroll; disclaimer strip kept (AC-6) |
| `src/components/layout/back-to-top-button.tsx` | NEW | Floating back-to-top FAB, visible after 600px scroll, reduced-motion aware |
| `src/components/search/search-box.tsx` | CHANGED | h-11 input, 44px result rows, viewport-clamped panel, Enter → first hit |
| `src/components/chapter/chapter-sub-bar.tsx` | NEW | Sticky sub-bar on chapter pages: title (tap → top) + sections `<select>` jump, 44px |
| `src/pages/[chapter].tsx` | CHANGED | Mounts sub-bar + FAB; bottom prev/next become 2 stacked ≥56px cards on mobile |
| `src/components/fact/fact-section-view.tsx` | CHANGED | Drop per-section `scroll-mt-28` (global `scroll-padding-top` covers it); body stays `text-[15px] leading-7` (No 72 ✓) |
| `src/pages/index.tsx` | CHANGED | Checklist rows `min-h-11`; hero H1 sizing; `active:` press feedback |
| `src/index.css` | CHANGED | Additions only: header/subbar height vars, `scroll-padding-top`, `touch-action: manipulation` |
| `index.html` | UNCHANGED (verified) | viewport meta already OK; `viewport-fit` NOT added (env() insets stay 0; safe-area classes below are future-proof) |

## 2. Per-file change list

### 2.1 `src/index.css` (additions only)

```css
:root { --header-h: 128px; --subbar-h: 48px; }
@media (min-width: 1024px) { :root { --header-h: 180px; --subbar-h: 0px; } }
@layer base {
  html { scroll-padding-top: calc(var(--header-h) + var(--subbar-h) + 12px); }
  body { touch-action: manipulation; }  /* No 25: remove 300ms tap delay */
}
```

Why: No 100's recommended `scroll-padding-top` for sticky UI; one source of truth for the
header offset. Also fixes `useHashScroll` and the index.html inline `scrollIntoView` jump,
which currently land under the sticky header (sections only have `scroll-mt-28` = 112px,
smaller than the real ~125px mobile header). `--header-h` values are estimates from the
compositions in §2.2 — the implementer MUST measure the rendered header at 375px and 1024px
in DevTools and correct the vars (Risks §4.1).
### 2.2 `src/components/layout/layout.tsx`

Mobile header (`<lg`) — replace the `ChapterNav` chip strip with a compact row:

- Container: `mx-auto w-full max-w-3xl px-4 pt-2` (was `pt-3`).
- Row: `flex items-center gap-2`:
  - Logo: `Link to="/"` — `shrink-0 font-heading text-base font-bold`. At 320px the full name
    「あかちゃんマニュアル」(9 chars) + h-11 search + button is tight: render short label
    「あかちゃん」 via `<span className="sm:hidden">あかちゃん</span><span className="hidden sm:inline">あかちゃんマニュアル</span>`.
  - SearchBox wrapper: `min-w-0 flex-1` (unchanged).
  - Chapter button (NEW): `shrink-0 inline-flex h-11 min-w-11 items-center gap-1.5 rounded-full
    border border-border bg-card px-3 font-heading text-sm font-bold text-foreground
    active:bg-accent lg:hidden` with `lucide-react` `<Menu className="size-4" aria-hidden />`
    + label「章」. Props: `onClick` opens the sheet; state on Layout: `open: boolean`.
    ARIA: `aria-expanded={open}` `aria-controls="chapter-sheet"`.
- Sheet: `<MobileChapterSheet open={open} onClose={() => setOpen(false)} />` rendered after
  the row (fixed positioning, so DOM order = tab order).
- `ChapterNav` (chip strip): keep the component, render it only at `lg` — move the
  `<div className="py-2.5"><ChapterNav/></div>` into `hidden lg:block`, and change the nav
  element from `-mx-4 overflow-x-auto px-4` + `whitespace-nowrap` to
  `lg:flex lg:flex-wrap lg:gap-1.5` (no `ul` horizontal scroll; wraps instead — all 9 chapters
  visible without scrolling per desktop requirement; at 1024px it wraps to 2 rows, one row at
  ≥~1300px viewport). Chip classes: `rounded-full border px-2.5 py-1 text-xs` (≈30px tall —
  ≥24px web pointer minimum No 104; fine on pointer devices).
- Disclaimer strip: unchanged (AC-6 fixed wording must stay visible at top). It renders
  2–4 lines depending on width — that drives the measured `--header-h`.
- Header stays `sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur`.

Estimated mobile header height @375px: pt-2 (8) + row (44) + border (1) + disclaimer
(12 + 4×~15 ≈ 72) ≈ 125px → `--header-h: 128px`.
Estimated desktop height @1024px: pt-3 (12) + row h-11 (44) + py-2.5 (20) + 2 chip rows
(2×30+4 = 64) + border (1) + disclaimer (12 + 2×15 = 42) ≈ 183px → `--header-h: 180px`.

### 2.3 `src/components/layout/mobile-chapter-sheet.tsx` (NEW)

Bottom sheet (thumb-reachable; a stressed one-handed user at night reaches the bottom, not the
top-right corner). Right slide-over is an acceptable alternative; all a11y behavior below is
identical either way.

- Markup (no new dependency — hand-rolled; no `<dialog>` to keep SSG hydration trivial):
  - Backdrop: `fixed inset-0 z-50 bg-foreground/40` (`motion-safe:animate-in fade-in` is fine,
    or plain opacity transition 150ms; `motion-reduce:transition-none` No 9/99). `onClick` →
    close. `aria-hidden="true"`.
  - Panel: `role="dialog" aria-modal="true" aria-label="章一覧" id="chapter-sheet"`,
    `fixed inset-x-0 bottom-0 z-50 max-h-[80dvh] overflow-y-auto rounded-t-2xl border-t
    border-border bg-card pb-[env(safe-area-inset-bottom)]` (No 28) with
    `transition-transform duration-150 motion-reduce:transition-none`
    (`translate-y-full` ↔ `translate-y-0`).
  - Inside, `mx-auto max-w-md px-4 pt-3`:
    1. Grab handle: `mx-auto h-1 w-10 rounded-full bg-border` (visual only).
    2. Header row: `flex items-center justify-between` — `<h2 class="font-heading text-base
       font-bold">章一覧</h2>` + close button `<button aria-label="閉じる" class="flex size-11
       items-center justify-center rounded-full active:bg-accent"><X class="size-5"/></button>`.
    3. Home row: `Link to="/"` `flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm
       active:bg-accent` — `<Home class="size-4"/>` +「トップページ」.
    4. Prev/next quick links (only if present): two `min-h-11` rows, `ChevronLeft`/
       `ChevronRight` icon + `第{order}章 {title}` + `text-xs text-muted-foreground`
       「前の章」/「次の章」suffix.
    5. `<nav aria-label="章一覧">` `<ul class="divide-y divide-border">` — 9 rows:
       `Link` `flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm active:bg-accent`
       with `<span class="font-heading font-bold text-primary w-5 shrink-0">{order}</span>`
       + `<span class="min-w-0 truncate font-medium">{title}</span>`.
       Current chapter: `aria-current="page"` + `bg-primary/10 font-bold` (bold + tint, not
       color-only — WCAG 1.4.1).
       Rows are 44px with a 1px divider (No 23's 8px gap satisfied by divider separation +
       full-width rows; documented deviation).
- Behavior:
  - On open: save `document.activeElement`, `document.body.style.overflow='hidden'`,
    `document.body.style.overscrollBehavior='contain'` (No 26), focus the close button.
  - Focus trap: `keydown` — Tab/Shift+Tab cycle within panel (query focusable
    `a[href], button:not([disabled])`); `Escape` → close (native expectation).
  - On close: restore focus to the 「章」button, clear body styles.
  - No `history.pushState` — opening/closing must not pollute back-button behavior (No 4).

### 2.4 `src/components/search/search-box.tsx`

- `Input`: `h-9` → `h-11` (44px target, No 22); keep `rounded-full bg-background`.
  Placeholder unchanged. `lg:max-w-xl lg:ml-auto` handled by the Layout wrapper, not here.
- Results panel: `max-h-96` → `max-h-[min(24rem,60dvh)]` (short landscape phones), keep
  `overflow-auto rounded-lg border border-border bg-card shadow-md`; panel stays `left-0
  right-0` (full width on mobile, naturally clamped by the wider wrapper on desktop).
- Result rows: add `min-h-11` (already ~52px with 2 lines, but guarantee it for 1-line
  snippets); add `active:bg-accent` alongside `hover:bg-accent` (No 11: tap is the primary
  interaction). Empty-state row unchanged.
- `onKeyDown`: `Enter` and `hits.length > 0` → navigate to `hits[0]` (same `href` as the row)
  and close. One-handed win: type → Enter, no second tap. `Escape` already closes.
- No autofocus on mount (focus stealing on a stressed reader's page load is worse than helpful).

### 2.5 `src/components/chapter/chapter-sub-bar.tsx` (NEW)

Renders only on `[chapter]` pages, only below `lg` (`hidden lg:hidden` is a typo — use
`lg:hidden`): `sticky top-[var(--header-h)] z-30 border-b border-border bg-card/95
backdrop-blur`.

- Inner: `mx-auto flex h-12 w-full max-w-3xl items-center gap-2 px-4`.
  - Title button: `<button onClick={() => window.scrollTo(0, 0)}` —
    `flex min-h-11 min-w-0 items-center gap-1.5 rounded-md px-1 font-heading text-sm
    font-bold active:bg-accent` with `ChevronDown`-ish affordance: show
    `第{order}章` in `text-xs text-muted-foreground` + truncated title
    (`truncate min-w-0`). `aria-label="章の先頭へ戻る"`. (`window.scrollTo(0,0)` honors the
    existing `scroll-behavior: smooth` + reduced-motion override in index.css — no hash push,
    no history pollution.)
  - Sections jump: native `<select>` (permitted by brief; zero JS dependency, native keyboard
    support) — `h-11 min-w-0 flex-1 appearance-none rounded-md border border-border bg-background
    px-3 pr-8 text-sm` with a chevron drawn via a wrapper `relative` +
    `<ChevronDown class="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2
    text-muted-foreground" aria-hidden/>`. `aria-label="セクションへジャンプ"`.
    - `<option value="">セクション</option>` (placeholder, disabled), then
      `section.level === 2 ? heading : '  ' + heading` for level 3 (indent), key = anchor.
    - `onChange`: `const v = e.target.value; if (v) window.location.hash = v; e.target.value =
      ''` (re-uses existing `useHashScroll` → `scrollIntoView`; hash push is the same behavior
      as every other anchor link on the site, so back button behaves predictably — No 4).

### 2.6 `src/components/layout/back-to-top-button.tsx` (NEW)

- Mounted in `[chapter].tsx` (chapters are long; home is short — but mounting in Layout is
  also acceptable; spec: mount in Layout after `<main>` so all pages benefit).
- `const [visible, setVisible] = useState(false)`; `useEffect` scroll listener
  (`passive: true`) → `setVisible(window.scrollY > 600)`.
- Button: `fixed bottom-4 right-4 z-30 mb-[env(safe-area-inset-bottom)] flex size-11
  items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift
  active:bg-primary-deep` + `<ArrowUp class="size-5" aria-hidden/>`,
  `aria-label="ページの先頭へ戻る"`.
- Visibility: always rendered; when hidden → `pointer-events-none opacity-0` with
  `transition-opacity duration-150 motion-reduce:transition-none` (No 9/99: reduced motion
  gets instant show/hide, no transform animation).
- `onClick`: `window.scrollTo(0, 0)` (CSS handles smooth/reduced).
- All viewports (harmless on desktop; brief scopes it to in-chapter mobile nav, but a long
  chapter is long on desktop too — if the parent disagrees, gate with `lg:hidden`, one class).

### 2.7 `src/pages/[chapter].tsx`

- After the `<header>` block, render `<ChapterSubBar chapter={chapter} sections={chapter.sections} />`.
- Render `<BackToTopButton />` (or per §2.6 note in Layout — pick one; spec: Layout).
- Bottom prev/next nav: replace the bare text links with responsive cards:
  - Wrapper: `flex flex-col gap-3 pt-2 sm:flex-row sm:items-stretch sm:justify-between`
    (was `flex items-center justify-between gap-3 pt-2 text-sm`).
  - Each link (prev, and next when present; prev slot falls back to「トップページ」):
    `flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card p-3
    text-left active:bg-accent sm:min-h-0 sm:rounded-none sm:border-0 sm:bg-transparent
    sm:p-0` — content: `ChevronLeft`/`ChevronRight` `size-4 text-muted-foreground` +
    `<span class="min-w-0">` with `<span class="block text-xs text-muted-foreground">前の章 /
    次の章</span><span class="block truncate font-heading text-sm font-bold">{order}. {title}</span>`.
  - Mobile: two stacked cards ≥56px (min-h-14) — thumb-friendly. `sm:` restores compact
    inline links (keeps current desktop look; desktop scout may refine via HANDOFF).

### 2.8 `src/components/fact/fact-section-view.tsx`

- Remove `scroll-mt-28` from all three `<section id={...}>` (global `scroll-padding-top`
  §2.1 now owns the offset — combining both would double-offset).
- Body: keep `mt-2 space-y-3 text-[15px] leading-7` (≥15px, lh 1.87 within No 72's 1.5–1.75
  band-or-better; No 112: reflow-safe, no fixed heights).
- H2 rhythm: `mt-6` → `mt-8` on mobile, `lg:mt-6` (chapters are dense; more air between H2s
  on a small screen). H3 `mt-6` unchanged. `SourceLine`/`MustBadges` unchanged.

### 2.9 `src/pages/index.tsx`

- Hero H1: `text-2xl` → `text-2xl sm:text-[28px] lg:text-3xl` (keep `leading-snug`).
- `MustChecklist` rows: `px-2 py-1.5 items-baseline` → `min-h-11 items-center` (44px, No 22).
- `DobChecklist` rows: same change.
- `ChapterGrid` cards: already ~90px full-width (≥44px ✓); add `active:bg-accent` to the
  `Link` (press feedback, Common Rules "Stable Interaction States" — color only, no layout shift).
- Layout stays single column (No 64/73: 65–75ch measure, max-w-3xl is fine).

### 2.10 Touch-target audit (all tappable sites, target ≥44px No 22 / ≥24px No 104)

| Site | Current | Fix |
|---|---|---|
| Header chip strip (mobile) | ~30px, `py-1.5 text-xs` | Removed on mobile → sheet rows (44px) + 44px 「章」button |
| Header chip (desktop `lg`) | ~30px | Keep (pointer device, ≥24px No 104) |
| Search input | h-9 (36px) | h-11 (44px) |
| Search result rows | ~52px | `min-h-11` guarantee + `active:` |
| Must/Dob checklist rows | ~32px (`py-1.5`) | `min-h-11 items-center` |
| Chapter cards (home) | ~90px full-width | OK; add `active:bg-accent` |
| Chapter sub-bar title / select | — (new) | 44px / h-11 |
| Prev/next (chapter bottom) | ~20px bare text | 2× min-h-14 cards mobile; `sm:` compact inline (≥36px w/ padding) |
| 「この章の出典」source list rows | ~16px lines, `space-y-1` | `a` → `flex min-h-9 items-center` mobile (`sm:min-h-0 sm:block`) |
| Back-to-top FAB | — (new) | size-11 (44px) |
| Inline prose source links (`SourceLine`, footer) | text-sized inline | Documented No-104 exception (inline text links); no box added |

## 3. Acceptance criteria

1. @375px: header is one 44px row [logo|search|「章」]; no horizontal scrollbar anywhere on any page (No 65: also pass @320/414/768/1024).
2. Tapping 「章」: sheet opens, `aria-expanded="true"`, body scroll locked, close button focused; 9 chapter rows each ≥44px; current chapter bold + tinted + `aria-current="page"`; Home + prev/next rows ≥44px.
3. Escape, backdrop tap, or close button closes the sheet and restores focus to the 「章」button; back button never sees a sheet entry (No 4).
4. `scroll-padding-top` verified: deep-linking `/<chapter>.html#<anchor>` (fresh load, pre-hydration inline script AND post-hydration re-jump) leaves the target H2 fully below header+sub-bar.
5. Sub-bar: sticky below header on chapter pages only, `<lg` only; title tap scrolls to top (smooth unless reduced motion); `<select>` 44px, choosing a section jumps to it (and back button returns predictably).
6. Back-to-top: hidden at top, appears after 600px scroll, 44px circle, `aria-label` present, tap → top; with `prefers-reduced-motion: reduce` no opacity/transform transition (No 9/99).
7. All tappable elements measure ≥44px at 375px (audit §2.10), or carry a documented No-104 exception.
8. No first-tap 300ms lag: `touch-action: manipulation` present on body; tap feedback (`active:`) visible within one frame, no layout shift (No 25 + Stable Interaction States).
9. Search: input 44px; results panel ≤60dvh with internal scroll; rows ≥44px; Enter opens first hit; Escape closes.
10. Reading: body 15px / lh ≥1.75 on mobile; H2 spacing ≥32px above; no text truncation at 320px except chapter sub-bar title + sheet rows (truncation acceptable there, full text available via the target).
11. `npm run build` passes (SSG: 10 static pages), `npm test` passes; TypeScript strict, no `any`.
12. No `:root` token value changed; no dark-mode classes introduced.

## 4. Risks / open questions (max 5)

1. **Header height is estimated, not measured.** `--header-h` (128/180px) depends on the
   disclaimer's line-wrap at each width. Implementer must measure at 320/375/1024 and correct
   the vars; wrong values = anchors land slightly off (low severity, one-line fix).
2. **Bottom sheet vs right slide-over.** Spec chose bottom sheet (thumb reach). If the team
   prefers a slide-over, all a11y logic in §2.3 carries over unchanged; only position classes
   differ. Decision needed before implementation to avoid rework.
3. **`touch-action: manipulation` on body disables double-tap-to-zoom** site-wide. Site has no
   zoom-dependent content (no images/charts), so acceptable — flag if anyone expects pinch
   double-tap zoom.
4. **Select-based section jump shows only headings** (no H4+; facts use H2/H3 only — verified
   in `fact-model.ts`). Long Japanese headings truncate inside the native `<select>` on iOS;
   acceptable, but if ugly, fallback is the chapter sheet's section list (not built).
5. **Dark mode deferred** (per design system). `bg-card/95 backdrop-blur` header + `bg-foreground/40`
   backdrop were chosen to work in light mode only; revisit together when dark mode lands.
