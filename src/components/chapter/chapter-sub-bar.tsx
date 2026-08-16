import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ChapterData } from '@/lib/fact-model'

interface ChapterSubBarProps {
  chapter: ChapterData
  /** 現在読んでいるセクションの anchor（useScrollSpy の activeId）。 */
  activeId?: string
  /** 親レイアウトとの余白調整用（例: -mt-6 で章ヘッダーとの隙間を相殺）。 */
  className?: string
}

/**
 * 章ページのスティッキー・サブバー（spec-mobile.md §2.5、<lg のみ）。
 * 上段: 章タイトル（モバイルの唯一の視覚タイトル。本物の h1 は本文側 sr-only）。
 * 下段: 現在のセクション名 + ▾。タップでセクション一覧がサブバー直下に
 * 上から落ちる（章メニューと同系のデザイン言語）。現在セクションを
 * ハイライトし、選択でハッシュジャンプ + 自動クローズ。
 * 外側タップ（トリガー自身を除く）/ Escape / スクロールで閉じる。
 */
export default function ChapterSubBar({ chapter, activeId, className }: ChapterSubBarProps) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const current =
    chapter.sections.find((s) => s.anchor === activeId)?.heading ?? chapter.sections[0]?.heading
  const currentAnchor = activeId ?? chapter.sections[0]?.anchor
  // 先頭（intro・heading 空）のときは空表示にしない
  const currentLabel = current !== '' ? current : 'この章の先頭'

  // 開いている間: 外側タップ / Escape / スクロールで閉じる。
  // トリガー自身のタップは除外（トグルとして機能させる）。
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return
      if (triggerRef.current?.contains(e.target as Node)) return
      setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onScroll = () => setOpen(false)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  const onSectionJump = (anchor: string) => {
    setOpen(false)
    // 次フレームでハッシュ変更（メニューが閉じてからスクロール先に進む）
    requestAnimationFrame(() => {
      window.location.hash = anchor
    })
  }

  return (
    <div
      className={`sticky top-[var(--header-h)] z-30 -mx-4 border-b border-border bg-card/95 backdrop-blur lg:hidden ${className ?? ''}`}
    >
      <div className="mx-auto w-full max-w-3xl px-4">
        {/* 章タイトル（視覚表示用。h1 は本文側 sr-only にあるので aria-hidden） */}
        <p
          aria-hidden="true"
          className="truncate pt-2 font-heading text-base font-bold leading-tight"
        >
          {chapter.title}
        </p>
        <div className="relative">
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? 'section-menu' : undefined}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-full items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span className="truncate text-xs text-muted-foreground">{currentLabel}</span>
            <ChevronDown
              className={`size-3.5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* セクション一覧（サブバー直下から上から落ちる）。サブバーと同じ全幅。 */}
      {open && (
        <div
          ref={panelRef}
          id="section-menu"
          role="listbox"
          aria-label="セクション一覧"
          className="absolute inset-x-0 top-full max-h-[60dvh] overflow-y-auto border-b border-border bg-card shadow-lg animate-in slide-in-from-top duration-150 motion-reduce:animate-none"
        >
          <ul className="mx-auto w-full max-w-3xl px-4 py-2">
            <li>
              <button
                type="button"
                role="option"
                aria-selected={currentAnchor === 'top'}
                onClick={() => onSectionJump('top')}
                className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm active:bg-accent focus-visible:outline-2 focus-visible:outline-ring ${
                  currentAnchor === 'top' ? 'bg-primary/10 font-bold' : ''
                }`}
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${currentAnchor === 'top' ? 'bg-primary' : 'bg-transparent'}`}
                  aria-hidden="true"
                />
                <span className="min-w-0 truncate">この章の先頭へ</span>
              </button>
            </li>
            {chapter.sections
              .filter((s) => s.heading !== '')
              .map((s) => {
                const isCurrent = s.anchor === currentAnchor
                return (
                  <li key={s.anchor}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isCurrent}
                      onClick={() => onSectionJump(s.anchor)}
                      className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm active:bg-accent focus-visible:outline-2 focus-visible:outline-ring ${
                        isCurrent ? 'bg-primary/10 font-bold' : ''
                      }`}
                    >
                      <span
                        className={`size-1.5 shrink-0 rounded-full ${isCurrent ? 'bg-primary' : 'bg-transparent'}`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 truncate">{s.heading}</span>
                    </button>
                  </li>
                )
              })}
          </ul>
        </div>
      )}
    </div>
  )
}
