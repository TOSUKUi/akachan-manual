import { ChevronDown } from 'lucide-react'
import type { ChapterData } from '@/lib/fact-model'

interface ChapterSubBarProps {
  chapter: ChapterData
  /** 現在読んでいるセクションの anchor（useScrollSpy の activeId）。 */
  activeId?: string
}

/**
 * 章ページのスティッキー・サブバー（spec-mobile.md §2.5、<lg のみ）。
 * 左: 章タイトル（控えめ）。右: 現在のセクション名（タップでネイティブの
 * セクション選択が開く）。select は絶対配置 + opacity-0 で全領域を覆い、
 * 見た目は「現在地テキスト + ▾」の自然な表示にしている。
 */
export default function ChapterSubBar({ chapter, activeId }: ChapterSubBarProps) {
  const onSectionJump = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    if (v) window.location.hash = v
  }

  return (
    <div className="sticky top-[var(--header-h)] z-30 -mx-4 border-b border-border bg-card/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex h-12 w-full max-w-3xl items-center gap-3 px-4">
        <span className="w-24 min-w-0 shrink truncate text-xs font-medium text-muted-foreground">
          {chapter.title}
        </span>
        <div className="relative min-w-0 flex-1">
          <span className="flex h-11 w-full cursor-pointer items-center gap-1.5 text-sm font-medium text-foreground">
            <span className="truncate">
              {chapter.sections.find((s) => s.anchor === activeId)?.heading ??
                chapter.sections[0]?.heading}
            </span>
            <ChevronDown
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
          </span>
          <select
            aria-label="セクションへジャンプ"
            value={activeId ?? ''}
            onChange={onSectionJump}
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0 focus-visible:outline-2 focus-visible:outline-ring"
          >
            {chapter.sections.map((s) => (
              <option key={s.anchor} value={s.anchor}>
                {s.heading}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
