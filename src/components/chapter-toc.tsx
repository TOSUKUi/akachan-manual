import type { FactSection } from '@/lib/fact-model'

interface ChapterTocProps {
  order: number
  sections: readonly FactSection[]
  activeId?: string
}

/**
 * In-chapter table of contents for the desktop sidebar (lg and up only).
 * Pure presentational: `activeId` comes from the caller's `useScrollSpy` —
 * no observer inside this component. Level-1 (intro) sections have no
 * heading and are not listed.
 */
export default function ChapterToc({ order, sections, activeId }: ChapterTocProps) {
  const rows = sections.filter((s) => s.level >= 2)
  return (
    <nav aria-label="この章の目次" className="hidden lg:block">
      <div className="sticky top-[var(--header-h,180px)] max-h-[calc(100dvh-var(--header-h,180px)-2rem)] overflow-y-auto rounded-lg border border-border bg-card/70 p-3">
        <p className="font-heading text-xs font-bold text-muted-foreground">第{order}章 目次</p>
        <ul className="mt-2 space-y-0.5">
          {rows.map((s) => {
            const active = activeId === s.anchor
            const indent = s.level === 3 ? 'pl-6 text-[13px]' : 'pl-2 text-sm'
            return (
              <li key={s.anchor}>
                <a
                  href={`#${s.anchor}`}
                  aria-current={active ? 'location' : undefined}
                  className={`block rounded border-l-2 py-1.5 pr-2 leading-snug transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-ring ${indent} ${
                    active
                      ? 'border-primary bg-primary/10 font-medium text-foreground'
                      : 'border-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {s.heading}
                </a>
              </li>
            )
          })}
        </ul>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo(0, 0)
          }}
          className="mt-3 block px-2 text-xs text-muted-foreground underline hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          ページの先頭へ
        </a>
      </div>
    </nav>
  )
}
