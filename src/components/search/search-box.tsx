import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { loadSearchIndex, searchIndex } from '@/lib/search'
import type { SearchHit, SearchIndexChapter } from '@/lib/search'

/**
 * 共有ヘッダーの検索ボックス（AC-7）。
 * クライアント側で search-index.json を走査し、該当セクションへジャンプする。
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

  return (
    <div ref={boxRef} className="relative w-full">
      <label htmlFor="site-search" className="sr-only">
        サイト内検索
      </label>
      <Input
        id="site-search"
        type="search"
        placeholder="検索（例: はちみつ、チャイルドシート）"
        className="h-9 rounded-full bg-background"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
      />
      {showPanel && (
        <ul
          role="listbox"
          aria-label="検索結果"
          className="absolute left-0 right-0 top-11 z-50 max-h-96 overflow-auto rounded-lg border border-border bg-card shadow-md"
        >
          {hits.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted-foreground">見つかりませんでした</li>
          )}
          {hits.map((h, i) => (
            <li key={`${h.slug}-${h.anchor}-${i}`}>
              <a
                href={`./${h.slug}.html#${h.anchor}`}
                className="block px-4 py-2.5 hover:bg-accent"
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
