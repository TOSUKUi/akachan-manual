// クライアント側全文検索（AC-7）。
// ビルド時に出力された search-index.json を取得し、サブストリング走査で該当セクションへジャンプする。

export interface SearchHit {
  slug: string
  chapterTitle: string
  order: number
  heading: string
  anchor: string
  snippet: string
}

export interface SearchIndexChapter {
  slug: string
  title: string
  order: number
  fullText: string
  sections: { anchor: string; heading: string; text: string }[]
}

/** search-index.json を読み込む（相対パス。base: './' 静的配信前提）。取得・解析に失敗したら空配列。 */
export async function loadSearchIndex(): Promise<SearchIndexChapter[]> {
  try {
    const res = await fetch('./search-index.json', { cache: 'force-cache' })
    if (!res.ok) return []
    return (await res.json()) as SearchIndexChapter[]
  } catch {
    // ネットワークエラー・未取得（ファイル欠損/offline/非ブラウザ環境）は検索不可として扱う
    return []
  }
}

function makeSnippet(text: string, query: string): string {
  const idx = text.indexOf(query)
  if (idx < 0) return text.slice(0, 40)
  const start = Math.max(0, idx - 24)
  const end = Math.min(text.length, idx + query.length + 32)
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
}

/** クエリで章・セクションを走査し、ヒットを新しい順に最大 limit 件返す。 */
export function searchIndex(index: readonly SearchIndexChapter[], query: string, limit = 8): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (q.length < 1) return []
  const hits: SearchHit[] = []
  for (const ch of index) {
    const chapterHit = ch.title.toLowerCase().includes(q)
    for (const sec of ch.sections) {
      const inHeading = sec.heading.toLowerCase().includes(q)
      const inText = sec.text.toLowerCase().includes(q)
      if (!inHeading && !inText && !chapterHit) continue
      hits.push({
        slug: ch.slug,
        chapterTitle: ch.title,
        order: ch.order,
        heading: sec.heading || ch.title,
        anchor: sec.anchor,
        snippet: inText ? makeSnippet(sec.text, q) : sec.heading || makeSnippet(ch.fullText, q),
      })
      if (hits.length >= limit) return hits
    }
    // 章タイトルだけがヒットした場合は冒頭アンカーで 1 件
    if (chapterHit && !hits.some((h) => h.slug === ch.slug)) {
      hits.push({
        slug: ch.slug,
        chapterTitle: ch.title,
        order: ch.order,
        heading: ch.title,
        anchor: 'top',
        snippet: makeSnippet(ch.fullText, q),
      })
      if (hits.length >= limit) return hits
    }
  }
  return hits
}
