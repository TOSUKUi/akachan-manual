# DESKTOP (>=1024px) Implementation Spec — akachan-manual

Scope: desktop/PC reading pass (lg = >=1024px; tablet 768-1023px keeps the mobile pattern).
Guideline ids refer to `.agents/skills/ui-ux-pro-max/data/ux-guidelines.csv`:
No 21 container width (65-75ch measure), No 72 line height 1.5-1.75, No 2 sticky nav
(no overlap, offset compensation), No 9/99 reduced motion, No 11 hover vs tap (pointer
devices: hover is primary at lg), No 64 mobile-first (desktop = `lg:` overrides),
No 65 test at 768/1024/1280/1440, focus visibility (Quick Reference sections 1-3).
No `:root` token value changes. Light mode only (dark mode deferred). No new dependencies.

Cross-reference: `spec-mobile.md` (by the mobile scout) owns the header (both variants),
`--header-h`/`--subbar-h` CSS vars, `scroll-padding-top`, `touch-action`, search box,
chapter sub-bar, back-to-top, prev/next cards, and all touch-target fixes. This spec
adds ONLY the desktop delta. Where both specs touch the same file, keep edits in
separate hunks so the parallel branches merge cleanly.

## 1. Component inventory

| File | New/Changed | Responsibility |
|---|---|---|
| `src/components/chapter-toc.tsx` | NEW | Sticky in-chapter TOC (lg only): H2/H3 list, scroll-spy active highlight, back-to-top link |
| `src/lib/use-scroll-spy.ts` | NEW | Pure hook: IntersectionObserver + bottom-edge fallback, returns active section id |
| `src/pages/[chapter].tsx` | CHANGED (desktop hunks only) | lg 2-column grid (article + TOC), measure-limited article |
| `src/pages/index.tsx` | CHANGED (desktop hunks only) | 2-part hero at lg (intro + start-here card), chapter grid 2 columns at sm+ |
## 2. Per-file change list

### 2.1 `src/lib/use-scroll-spy.ts` (NEW)

```ts
import { useEffect, useState } from 'react'

/** Track which section id is "current" under a sticky-header reading position. */
export function useScrollSpy(ids: readonly string[], topOffset: number): string | undefined
```

- `useEffect` only (SSG-safe: no SSR execution); returns `undefined` until first hit.
- `IntersectionObserver` with `rootMargin: \`${-topOffset - 8}px 0px -66% 0px\`` and
  `threshold: 0`. On each callback, among `isIntersecting` entries pick the one whose
  `boundingClientRect.top` is closest to `topOffset` (resolves multi-section crossings in
  one frame). Keep a ref of the last announced id; only `setState` when it actually
  changes (hysteresis, no re-render storms).
- Bottom-edge fallback: passive `scroll` listener — if
  `window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8`,
  activate `ids[ids.length - 1]` (the last sections are short and never cross the spy line).
- Cleanup: disconnect observer + remove listener on unmount and when `ids` changes.
- `ids` must be stable: the caller memoizes `chapter.sections.map(s => s.anchor)` with
  `useMemo` (sections are static per page).

### 2.2 `src/components/chapter-toc.tsx` (NEW)

Props: `{ order: number; sections: readonly FactSection[]; activeId?: string }`
(`FactSection` from `@/lib/fact-model`; import type only).

- Root: `<nav aria-label="この章の目次" className="hidden lg:block">`.
- Inner: `<div className="sticky top-[var(--header-h,180px)] max-h-[calc(100dvh-var(--header-h,180px)-2rem)] overflow-y-auto rounded-lg border border-border bg-card/70 p-3">`
  (fallback 180px keeps it safe if the mobile spec's `--header-h` var is not present on
  this branch — the merge integrates both; verify the real offset at 1024px in browser).
- Header row: `<p className="font-heading text-xs font-bold text-muted-foreground">第{order}章 目次</p>`.
- List `<ul className="mt-2 space-y-0.5">`, one `<li>` per section:
  - H2: `<a href={'#'+s.anchor}>` with `block rounded border-l-2 px-2 py-1.5 text-sm leading-snug transition-colors`
    + (active ? `border-primary bg-primary/10 font-medium text-foreground` +
    `aria-current="location"` : `border-transparent text-muted-foreground hover:bg-accent hover:text-foreground`)
    + `focus-visible:outline-2 focus-visible:outline-ring`.
  - H3 (level 3): same but `pl-6 text-[13px]`.
  - Content: `{s.heading}` verbatim.
- Bottom: `<a href="#top" onClick={e => { e.preventDefault(); window.scrollTo(0, 0) }}
  className="mt-3 block px-2 text-xs text-muted-foreground underline hover:text-foreground">
  ページの先頭へ</a>` (no history push; smooth via existing CSS, reduced-motion aware).
- Pure presentational: receives `activeId` from the caller's `useScrollSpy` — no observer
  inside this component (easy to reason about, testable).
### 2.3 `src/pages/[chapter].tsx` (desktop hunks ONLY)

Keep every existing element/anchor/id. The mobile worker (parallel) edits this same file
for the sub-bar mount + prev/next cards — keep your hunks disjoint:

- Wrap the reading flow in a responsive grid. Replace the current outer
  `<div className="space-y-6">` with a layout that, at lg, places the article + sources in
  the left column and the TOC in a right sidebar:
  - Outer: `<div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-8 lg:items-start">`.
    (`minmax(0,1fr)` is required so long table rows / source URLs can shrink — No 112.)
  - Left column wraps the existing `<header>`, `<article>`, sources `<section>` and the
    prev/next `<nav>` unchanged (they keep their current spacing).
  - Article measure: give the `<article>` `max-w-2xl` (42rem ≈ 672px). Rationale (record it
    in a code comment): the 65-75ch guideline is for Latin text; Japanese full-width glyphs
    are ~1em, so 42rem at 15px body ≈ 44 chars/line — the equivalent comfortable CJK
    measure (No 21). Do NOT use `max-w-prose` (65ch ≈ 975px for CJK = too wide).
  - Right column: `<ChapterToc order={chapter.order} sections={chapter.sections}
    activeId={activeId} />` where `const ids = useMemo(() => chapter.sections.map(s => s.anchor), [chapter])`
    and `const activeId = useScrollSpy(ids, 180)` (180 ≈ lg header height; the sticky offset
    itself uses `var(--header-h,180px)` so a later measured var still works).
  - The chapter `<header>` (第N章 / h1 / 最終確認日) should sit ABOVE the grid (full width)
    so the h1 is not squished — i.e. only `<article>` + sources + prev/next go in the grid.
- Do NOT touch the `<header>` block, the `useHashScroll` behavior, anchor ids, the sources
  list markup, or the prev/next markup (owned by mobile spec §2.7).

### 2.4 `src/pages/index.tsx` (desktop hunks ONLY)

The mobile worker (parallel) edits hero H1 sizing + checklist row heights in this same
file — keep your hunks disjoint (you touch the ChapterGrid section + a new hero side-card):

- `ChapterGrid`: change the card list container from `mt-3 space-y-2` to
  `mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2` (2 columns at >=640px, so tablet and desktop
  both benefit). Each card `Link` keeps its classes; add `transition-colors` so the existing
  `hover:border-primary hover:bg-accent` animates smoothly (No 11 hover at pointer sizes).
  The mobile worker adds `active:bg-accent` to the same `Link` — different class list hunk,
  merge-safe.
- Hero: at lg only, add a compact "start here" affordance that deep-links into the page's
  own must-checklist (the primary job of the index). Add `id="must-checklist"` to the
  `MustChecklist` `<Card>` (1 attribute — the single shared-hunk risk; if it conflicts, the
  merge keeps the mobile version and re-adds the id). Then in the hero `<section>` append
  `<div className="mt-4 hidden lg:block">` with a small inline card/link:
  `<a href="#must-checklist" className="inline-flex items-center gap-2 rounded-lg border
  border-primary/40 bg-primary/5 px-4 py-3 text-sm font-medium text-primary
  transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-ring">
  やるべきこと（最重要）へ <ArrowRight className="size-4" aria-hidden /></a>` (lucide `ArrowRight`
  is available). `scroll-padding-top` (mobile spec §2.1) already handles the sticky-header
  offset for this in-page anchor.

### 2.5 `src/index.css` (desktop)

No additions required by this spec — the TOC offset reuses the mobile spec's `--header-h`
var (with a 180px fallback). If you find you must add a rule, append it at the very end as
a new `@layer` block and do NOT edit or reorder existing rules (the mobile worker owns the
§2.1 additions there).

## 3. Acceptance criteria

1. @1024 / 1280 / 1440: chapter page renders a 2-column grid — article (left, ~672px
   measure) + sticky TOC (right, 16rem). No horizontal overflow at 768/1024/1280/1440
   (No 65). The TOC is `hidden` below lg (no mobile change, no CLS).
2. TOC is sticky below the sticky header: its top edge stays at the header's bottom edge
   while scrolling (No 2). Measure the real header height at 1024px in DevTools and confirm
   the `--header-h` / 180px fallback is close (record the measured value in the commit body).
3. Scroll-spy: as you scroll, the active TOC row gains `aria-current="location"` + the
   primary tint; it updates with no jitter (only on actual section change); the last section
   becomes active at page bottom (bottom-edge fallback).
4. TOC links: `focus-visible` ring visible; clicking a TOC link scrolls to the section and
   leaves it fully below header+sub-bar (relies on mobile spec `scroll-padding-top`); back
   button returns predictably (hash link, same as every other anchor on the site).
5. Index @sm+: chapter grid is 2 columns; the "start here" card is visible at lg and
   deep-links to `#must-checklist` (in-page, works with sticky header offset). Must/Dob
   checklists remain single column.
6. All new/changed links have a hover state (No 11) that changes color/opacity/border within
   150-250ms and does not shift layout; `focus-visible` outline is present on every new
   focusable element.
7. `prefers-reduced-motion: reduce`: no new transitions/opacity animations (the TOC active
   tint is a color change only — acceptable; any `transition-colors` should carry
   `motion-reduce:transition-none`).
8. `npm run gen && npx tsc -b && npx eslint . && npx vitest run && npm run build` all pass
   in the worktree. TypeScript strict, no `any`. No `:root` token value changed.

## 4. Risks / open questions (max 5)

1. **Header height is owned by the mobile spec.** The TOC sticky offset uses
   `var(--header-h,180px)`. If the mobile worker measures a different lg header height,
   the fallback 180px is a close approximation; the merge worker should confirm the var
   exists and the offset is correct at 1024px. One-line fix if off.
2. **Shared-file merge risk (`[chapter].tsx`, `index.tsx`).** Both workers edit these files
   in parallel against the same base. Hunk separation is specified (§2.3/§2.4); if git
   reports a conflict, the merge worker resolves by keeping BOTH the mobile changes
   (sub-bar mount, prev/next cards, H1 sizing, checklist rows) and the desktop changes
   (grid wrap, TOC mount, 2-col ChapterGrid, start-here card, `id="must-checklist"`).
3. **TOC 16rem column + `max-w-3xl` main.** The grid lives inside `main` (max-w-3xl =
   768px). Article 672px + gap 32px + TOC 256px = 960px > 768px, so at lg the left column
   will be squeezed below 672px until the viewport is wide enough. Decision: keep the
   existing `max-w-3xl` (article ≈ 480px at 1024px, still a fine CJK measure) rather than
   widening `main` (which the mobile spec does not change). Accept the narrower article at
   1024-1100px; it relaxes to ~672px by ~1200px. (If the team prefers a wider `main`, that
   is a mobile-spec change, out of scope here.)
4. **`useScrollSpy` ids stability.** `chapter.sections` is a stable array per page, but the
   hook must still `useMemo` the id list to avoid re-creating the observer on every render.
5. **Dark mode deferred** (per design system) — all new classes are light-only, consistent
   with the rest of the site.

## 5. NEEDS-FROM-MOBILE-WORKER (implemented by the mobile worker, who owns these files)

1. `src/components/search/search-box.tsx`: add a global keyboard shortcut — `window`
   `keydown` listener: when `e.key === '/'` AND the event target is NOT an
   `input`/`textarea`/`select` and not `contentEditable` → `e.preventDefault()` and
   `focus()` the `#site-search` input. Add/remove listener with the component's other
   effect (same cleanup site as the existing Escape handler). No new state needed.
2. `src/index.css`: the `--header-h`/`--subbar-h` vars + `scroll-padding-top` +
   `touch-action: manipulation` from spec-mobile.md §2.1 are the single source for the
   TOC sticky offset (§2.2 here) and all anchor jumps. Measure the rendered header at
   375px and 1024px after implementation and correct the var values if off (Risk 1).
