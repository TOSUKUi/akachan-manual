import { ChevronDown } from 'lucide-react'
import type { ChapterData } from '@/lib/fact-model'

interface ChapterSubBarProps {
  chapter: ChapterData
}

/**
 * 章ページのスティッキー・サブバー（spec-mobile.md §2.5、<lg のみ）。
 * タイトルタップ → 章先頭へ。セクションは native <select> でジャンプ
 * （window.location.hash 経由で既存 useHashScroll を再利用 → No 4 のバックボタンプレビューシブル）。
 */
export default function ChapterSubBar({ chapter }: ChapterSubBarProps) {
  const onJump = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    if (v) window.location.hash = v
    e.target.value = ''
  }

  return (
    <div className="sticky top-[var(--header-h)] z-30 border-b border-border bg-card/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex h-12 w-full max-w-3xl items-center gap-2 px-4">
        <button
          type="button"
          onClick={() => window.scrollTo(0, 0)}
          aria-label="章の先頭へ戻る"
          className="flex min-h-11 min-w-0 items-center gap-1.5 rounded-md px-1 font-heading text-sm font-bold active:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
        >
          <span className="shrink-0 text-xs font-normal text-muted-foreground">第{chapter.order}章</span>
          <span className="min-w-0 truncate">{chapter.title}</span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </button>
        <div className="relative min-w-0 flex-1">
          <select
            aria-label="セクションへジャンプ"
            defaultValue=""
            onChange={onJump}
            className="h-11 w-full appearance-none rounded-md border border-border bg-background pl-3 pr-8 text-sm focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="" disabled>
              セクション
            </option>
            {chapter.sections.map((s) => (
              <option key={s.anchor} value={s.anchor}>
                {s.level === 3 ? `  ${s.heading}` : s.heading}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}
