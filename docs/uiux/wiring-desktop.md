# Desktop wiring notes (apply serially in the merge/integration step)

The desktop worker could not safely edit shared files in parallel (worktree
isolation did not materialize; both workers shared the main checkout). It
committed ONLY the two new files (`src/components/chapter-toc.tsx`,
`src/lib/use-scroll-spy.ts`) on branch `feat/desktop-ux`. Apply the hunks
below serially. All strings are exact — apply with the edit tool.

Base file state: the version on `feat/baby-guide-site` @ 4c0d671, AFTER the
mobile worker's changes have been merged (the mobile hunks in these same
files must already be present; your hunks are in disjoint regions).

## A. `src/pages/[chapter].tsx`

### A1. Imports — add after the existing imports (top of file):

```tsx
import { useMemo } from 'react'
import ChapterToc from '@/components/chapter-toc'
import { useScrollSpy } from '@/lib/use-scroll-spy'
```

### A2. Hooks — add inside `Component`, BEFORE the `if (!chapter)` early
return (hooks must run unconditionally):

```tsx
  const ids = useMemo(
    () => (chapter ? chapter.sections.filter((s) => s.level >= 2).map((s) => s.anchor) : []),
    [chapter],
  )
  const activeId = useScrollSpy(ids, 180)
```

Note: spec §2.3 suggested all section anchors; the level-1 intro section has
an empty heading and no TOC row, so it is excluded from the spy ids (the
spy set exactly matches the TOC rows). `180` is the lg header-height
approximation; the TOC's sticky offset itself uses `var(--header-h,180px)`
so the mobile spec's measured var still governs the visual offset.

### A3. Layout — replace the return block.

Current (base):

```tsx
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs text-muted-foreground">
          第 {chapter.order} 章 / 全 {SITE_DATA.chapters.length} 章
        </p>
        <h1 className="mt-1 font-heading text-2xl font-bold leading-snug">{chapter.title}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          この章の最終確認日: {chapter.lastVerified}
        </p>
      </header>

      <Separator />

      <article>
        {chapter.sections.map((s, i) => (
          <FactSectionView key={`${s.anchor}-${i}`} section={s} />
        ))}
      </article>

      <Separator />

      <section className="text-xs leading-relaxed text-muted-foreground">
        <h2 className="font-heading text-sm font-bold text-foreground">この章の出典</h2>
        <ul className="mt-2 space-y-1">
          {chapter.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="underline hover:text-primary">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="前後の章" className="flex items-center justify-between gap-3 pt-2 text-sm">
```

Target (header + first separator stay full width ABOVE the grid; article +
second separator + sources + prev/next go into the left grid column; TOC in
the right column). The prev/next `<nav>` block itself must remain EXACTLY as
the mobile worker left it (this hunk only moves it inside the left-column
div — do not touch its classes/content):

```tsx
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs text-muted-foreground">
          第 {chapter.order} 章 / 全 {SITE_DATA.chapters.length} 章
        </p>
        <h1 className="mt-1 font-heading text-2xl font-bold leading-snug">{chapter.title}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          この章の最終確認日: {chapter.lastVerified}
        </p>
      </header>

      <Separator />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-8 lg:items-start">
        <div className="min-w-0 space-y-6">
          {/* CJK measure: 65-75ch is a Latin guideline; at 15px body,
              42rem ≈ 44 full-width chars/line — the equivalent CJK measure
              (ux-guidelines No 21). Do not use max-w-prose (≈975px for CJK). */}
          <article className="max-w-2xl">
            {chapter.sections.map((s, i) => (
              <FactSectionView key={`${s.anchor}-${i}`} section={s} />
            ))}
          </article>

          <Separator />

          <section className="text-xs leading-relaxed text-muted-foreground">
            <h2 className="font-heading text-sm font-bold text-foreground">この章の出典</h2>
            <ul className="mt-2 space-y-1">
              {chapter.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="underline hover:text-primary">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="前後の章" className="flex items-center justify-between gap-3 pt-2 text-sm">
            {/* …prev/next links exactly as the mobile worker left them… */}
          </nav>
        </div>

        <ChapterToc order={chapter.order} sections={chapter.sections} activeId={activeId} />
      </div>
    </div>
  )
```

(`minmax(0,1fr)` is required so long table rows / source URLs can shrink —
No 112. `min-w-0` on the left column for the same reason.)

## B. `src/pages/index.tsx`

### B1. Import — add at top of file:

```tsx
import { ArrowRight } from 'lucide-react'
```

### B2. `MustChecklist` — add `id="must-checklist"` to the `<Card>` element:

Current: `<Card>`
Target: `<Card id="must-checklist">`

### B3. Hero start-here card — inside the hero `<section>`, append AFTER the
`最終確認日` `<p>` (still inside the `<section>`, before `</section>`):

```tsx
        <div className="mt-4 hidden lg:block">
          <a
            href="#must-checklist"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-ring"
          >
            やるべきこと（最重要）へ <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
```

The in-page `#must-checklist` jump relies on the mobile spec's
`scroll-padding-top` (spec-mobile.md §2.1) for the sticky-header offset.

### B4. `ChapterGrid` — change the card list container:

Current: `<div className="mt-3 space-y-2">`
Target: `<div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">`

No other change needed in ChapterGrid: the card `Link` already carries
`transition-colors hover:border-primary hover:bg-accent` in the base; the
mobile worker adds `active:bg-accent` (disjoint hunk, merge keeps both).

## C. `src/index.css`

No additions required from the desktop side (spec-desktop.md §2.5). The TOC
offset reuses the mobile spec's `--header-h` var with a 180px fallback.

## D. Post-wiring verification checklist (merge worker)

1. `npx tsc -b && npx eslint . && npx vitest run && npm run build` green.
2. Browser @1024/1280/1440: chapter page = article left + sticky TOC right;
   TOC top edge stays below the sticky header while scrolling; scroll-spy
   moves `aria-current="location"` with no jitter; last section activates at
   page bottom; no horizontal overflow at 768/1024/1280/1440.
3. Browser @1024: measure the real rendered header height; if it differs
   from 180px by more than ~8px, correct the mobile spec's `--header-h` value
   in index.css (the var drives the TOC offset via the fallback chain).
4. Index @sm+: 2-column chapter grid; start-here card visible at lg, hidden
   below; clicking it scrolls to the must checklist fully below the header.
5. TOC hidden below lg (no mobile change, no CLS); `/` shortcut unaffected.
