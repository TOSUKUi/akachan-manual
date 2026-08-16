import { ChevronDown } from 'lucide-react'
import type { ChapterData } from '@/lib/fact-model'
import { SITE_DATA } from '@/generated/site-data'

interface ChapterSubBarProps {
  chapter: ChapterData
}

/**
 * 章ページのスティッキー・サブバー（spec-mobile.md §2.5、<lg のみ）。
 * 左: 章 select（現在の章を表示、開くと全章+トップへ即遷移）。
 * 右: セクション select（ネイティブ <select> でジャンプ、window.location.hash 経由）。
 */
export default function ChapterSubBar({ chapter }: ChapterSubBarProps) {
  const onChapterJump = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    if (!v) return
    window.location.href = v
  }
  const onSectionJump = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    if (v) window.location.hash = v
    e.target.value = ''
  }

  return (
    <div className="sticky top-[var(--header-h)] z-30 -mx-4 border-b border-border bg-card/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex h-12 w-full max-w-3xl items-center gap-2 px-4">
        <div className="relative min-w-0 flex-1">
          <select
            aria-label="章を選ぶ"
            value={`/${chapter.slug}`}
            onChange={onChapterJump}
            className="h-11 w-full appearance-none rounded-md border border-border bg-background pl-3 pr-8 text-sm font-bold focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="/">トップページ</option>
            {SITE_DATA.chapters.map((c) => (
              <option key={c.slug} value={`/${c.slug}`}>
                第{c.order}章 {c.title}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <div className="relative min-w-0 flex-1">
          <select
            aria-label="セクションへジャンプ"
            defaultValue=""
            onChange={onSectionJump}
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
