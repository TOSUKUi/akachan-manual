import { ChevronDown } from 'lucide-react'
import type { ChapterData } from '@/lib/fact-model'

interface ChapterSubBarProps {
  chapter: ChapterData
  /** 現在読んでいるセクションの anchor（useScrollSpy の activeId）。undefined は未到達。 */
  activeId?: string
}

/**
 * 章ページのスティッキー・サブバー（spec-mobile.md §2.5、<lg のみ）。
 * セクション select だけを持つ（章の選択はトップ・ヘッダーの章ナビ・
 * 章ボタン（bottom-sheet）で行えるため、ここには置かない）。
 * select は現在のセクション名を表示し、選ぶとハッシュジャンプする。
 */
export default function ChapterSubBar({ chapter, activeId }: ChapterSubBarProps) {
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
            aria-label="セクションへジャンプ"
            value={activeId ?? ''}
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
