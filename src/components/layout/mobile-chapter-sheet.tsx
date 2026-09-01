import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Home, ShoppingBasket, X } from 'lucide-react'
import { chapterHref, useClientSlug } from '@/lib/nav'
import { SITE_DATA } from '@/generated/site-data'

interface MobileChapterSheetProps {
  open: boolean
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled])'

/**
 * 章メニューのボトームシート（spec-mobile.md §2.3）。
 * 親ヘッダーの 44px 「章」ボタンから開閉する。開閉時は body スクロールロック +
 * フォーカストラップ、閉じたら元フォーカスへ復帰。history を汚さない（No 4）。
 */
export default function MobileChapterSheet({ open, onClose }: MobileChapterSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const currentSlug = useClientSlug()
  const idx = SITE_DATA.chapters.findIndex((c) => c.slug === currentSlug)
  const current = idx >= 0 ? SITE_DATA.chapters[idx] : null
  const prev = idx > 0 ? SITE_DATA.chapters[idx - 1] : null
  const next = idx < SITE_DATA.chapters.length - 1 ? SITE_DATA.chapters[idx + 1] : null

  // 開閉時の副作用: body スクロールロック、フォーカス移動、閉じたら元フォーカスへ復帰
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'contain'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      document.body.style.overscrollBehavior = ''
      previouslyFocused?.focus()
    }
  }, [open])

  if (!open) return null

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab' || !panelRef.current) return
    // フォーカストラップ: パネル内のフォーカス可能要素を循環させる
    const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const rowClass = 'flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm active:bg-accent'

  return (
    <div onKeyDown={onKeyDown}>
      <div
        className="fixed inset-0 z-50 bg-foreground/40 animate-in fade-in duration-150 motion-reduce:animate-none"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id="chapter-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="章一覧"
        className="fixed inset-x-0 top-[var(--header-h)] z-50 max-h-[70dvh] overflow-y-auto rounded-b-2xl border-b border-border bg-card shadow-lg pb-[env(safe-area-inset-bottom)] animate-in slide-in-from-top duration-200 motion-reduce:animate-none"
      >
        <div className="mx-auto max-w-md px-4 pt-3">
          <div className="mt-1 flex items-center justify-between">
            <h2 className="font-heading text-base font-bold">章一覧</h2>
            <button
              ref={closeRef}
              type="button"
              aria-label="閉じる"
              onClick={onClose}
              className="flex size-11 items-center justify-center rounded-full active:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-2 pb-2">
            <a href="./index.html" onClick={onClose} className={rowClass}>
              <Home className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="font-medium">トップページ</span>
            </a>
            <a
              href="./timeline.html"
              onClick={onClose}
              aria-current={currentSlug === 'timeline' ? 'page' : undefined}
              className={`${rowClass} ${currentSlug === 'timeline' ? 'bg-primary/10 font-bold' : ''}`}
            >
              <ShoppingBasket className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="font-medium">月齢別・買うものタイムライン</span>
            </a>
            {(prev || next) && (
              <div className="mt-1 grid grid-cols-2 gap-1">
                {prev && (
                  <a href={chapterHref(prev.slug)} onClick={onClose} className={rowClass}>
                    <ChevronLeft className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        第{prev.order}章 {prev.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">前の章</span>
                    </span>
                  </a>
                )}
                {next && (
                  <a href={chapterHref(next.slug)} onClick={onClose} className={rowClass}>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        第{next.order}章 {next.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">次の章</span>
                    </span>
                  </a>
                )}
              </div>
            )}
            <nav aria-label="章一覧" className="mt-1">
              <ul className="divide-y divide-border">
                {SITE_DATA.chapters.map((c) => (
                  <li key={c.slug}>
                    <a
                      href={chapterHref(c.slug)}
                      onClick={onClose}
                      aria-current={current?.slug === c.slug ? 'page' : undefined}
                      className={`${rowClass} w-full ${
                        current?.slug === c.slug ? 'bg-primary/10 font-bold' : ''
                      }`}
                    >
                      <span className="w-5 shrink-0 font-heading font-bold text-primary">{c.order}</span>
                      <span className="min-w-0 truncate font-medium">{c.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
