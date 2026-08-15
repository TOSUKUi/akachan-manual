import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { loadSearchIndex, searchIndex } from '@/lib/search'
import type { SearchHit, SearchIndexChapter } from '@/lib/search'

/**
 * 共有ヘッダーの検索ボックス（AC-7）。
 * クライアント側で search-index.json を走査し、該当セクションへジャンプする。
 * モバイル仕様（spec-mobile.md §2.4）: 44px 入力・44px 行・60dvh クランプ・
 * Enter で先頭ヒットを開く。デスクトップ仕様（spec-desktop.md §5）: 「/」でフォーカス。
 */
export default function SearchBox() {
  const [index, setIndex] = useState<SearchIndexChapter[] | null>(null)
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<SearchHit[]>([])
  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let disposed = false
    loadSearchIndex().then((idx) => {
      if (!disposed) setIndex(idx)
    })
    return () => {
      disposed = true
    }
  }, [])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      // 「/」ショートカット（spec-desktop.md §5）: フォーム要素外から押すと検索へフォーカス
      if (e.key === '/') {
        const t = e.target as HTMLElement
        const inField =
          t instanceof HTMLInputElement ||
          t instanceof HTMLTextAreaElement ||
          t instanceof HTMLSelectElement ||
          t.isContentEditable
        if (!inField) {
          e.preventDefault()
          document.getElementById('site-search')?.focus()
        }
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (!index) return
    setHits(searchIndex(index, query))
  }, [index, query])

  const showPanel = open && query.trim().length > 0 && index !== null

  const openFirstHit = () => {
    const first = hits[0]
    if (!first) return
    setOpen(false)
    window.location.href = `./${first.slug}.html#${first.anchor}`
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <label htmlFor="site-search" className="sr-only">
        サイト内検索
      </label>
      <Input
        id="site-search"
        type="search"
        placeholder="検索（例: はちみつ、チャイルドシート）"
        className="h-11 rounded-full bg-background"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && hits.length > 0) {
            e.preventDefault()
            openFirstHit()
          }
        }}
        autoComplete="off"
      />
      {showPanel && (
        <ul
          role="listbox"
          aria-label="検索結果"
          className="absolute left-0 right-0 top-12 z-50 max-h-[min(24rem,60dvh)] overflow-auto rounded-lg border border-border bg-card shadow-md"
        >
          {hits.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted-foreground">見つかりませんでした</li>
          )}
          {hits.map((h, i) => (
            <li key={`${h.slug}-${h.anchor}-${i}`}>
              <a
                href={`./${h.slug}.html#${h.anchor}`}
                className="block min-h-11 px-4 py-2.5 hover:bg-accent active:bg-accent"
                onClick={() => setOpen(false)}
              >
                <span className="block text-sm font-medium leading-snug">{h.heading}</span>
                <span className="block text-xs text-muted-foreground">
                  {h.order}. {h.chapterTitle} — {h.snippet}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
