// fact.md のパーサ。純粋関数のみ（I/O なし、Result 型で失敗を返す）。
import matter from 'gray-matter'
import { marked } from 'marked'
import type {
  Fact,
  FactFrontmatter,
  FactSection,
  FactSource,
} from './fact-model.ts'

/** 期待される失敗（ビルドゲートがまとめて報告する）。 */
export interface FactIssue {
  /** ファイル名（fact/ 基準）。グローバルな問題では '-' */
  file: string
  /** 該当セクションの見出し（ある場合） */
  section?: string
  message: string
}

export type FactParseResult =
  | { ok: true; fact: Fact }
  | { ok: false; issues: FactIssue[] }

/** 「根拠: [name](url)」行。1 行に複数のリンクを許可。 */
const SOURCE_LINE = /^\s*根拠[:：]\s+(.+)$/
const SOURCE_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g

/** 「必須: [id]」マーカー行。⭐ 付き・カンマ区切りの複数 ID を許可。 */
const MUST_LINE = /^\s*(?:⭐\s*)?必須[:：]\s+(.+)$/
const MUST_ID = /\[([a-z][a-z0-9-]*)\]/g

/** 「:::diagram <name>:::」マーカー行（セクション本文の先頭に置く）。 */
const DIAGRAM_LINE = /^:::diagram\s+([a-z][a-z0-9-]*)\s*:::$/

const H2 = /^##\s+(.+?)\s*$/
const H3 = /^###\s+(.+?)\s*$/

const DATE = /^\d{4}-\d{2}-\d{2}$/

/** 見出しから検索ジャンプ用のアンカーを生成（ビルド時生成、spec の Value sourcing）。 */
export function anchorFor(heading: string, taken: ReadonlySet<string>): string {
  const base =
    heading
      .trim()
      .toLowerCase()
      // 英数字・かな・漢字・カタカナ・_.- は残し、その他はハイフン
      .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af._-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  let candidate = base
  let i = 2
  while (taken.has(candidate)) {
    candidate = `${base}-${i}`
    i += 1
  }
  return candidate
}

function parseSourceLine(rest: string): FactSource[] {
  const out: FactSource[] = []
  for (const m of rest.matchAll(SOURCE_LINK)) {
    out.push({ name: m[1].trim(), url: m[2].trim() })
  }
  return out
}

function parseMustLine(rest: string): string[] {
  return [...rest.matchAll(MUST_ID)].map((m) => m[1])
}

function isIsoDate(value: string): boolean {
  if (!DATE.test(value)) return false
  const [y, m, d] = value.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  )
}

/** frontmatter を型付きに整える。不正なら issues を返す。 */
function coerceFrontmatter(
  data: unknown,
  fileName: string,
):
  | { ok: true; fm: FactFrontmatter }
  | { ok: false; issues: FactIssue[] } {
  const issues: FactIssue[] = []
  const d = (data ?? {}) as Record<string, unknown>

  const str = (key: string): string => {
    const v = d[key]
    let s = ''
    if (typeof v === 'string') s = v
    // YAML は未クォートの 2026-08-15 を Date オブジェクトとして解析する
    else if (v instanceof Date) s = v.toISOString().slice(0, 10)
    if (s.length === 0) {
      issues.push({ file: fileName, message: `frontmatter の ${key} が空です` })
    }
    return s
  }

  const title = str('title')
  const slug = str('slug')
  const orderRaw = d.order
  const order =
    typeof orderRaw === 'number' && Number.isInteger(orderRaw)
      ? orderRaw
      : (issues.push({ file: fileName, message: 'frontmatter の order が整数ではありません' }), 0)
  const lastVerified = str('last_verified')
  if (lastVerified && !isIsoDate(lastVerified)) {
    issues.push({
      file: fileName,
      message: `frontmatter の last_verified が YYYY-MM-DD 形式ではありません（${lastVerified}）`,
    })
  }

  const sourcesRaw = d.sources
  const sources: FactSource[] = []
  if (Array.isArray(sourcesRaw)) {
    for (const [i, s] of sourcesRaw.entries()) {
      const e = (s ?? {}) as Record<string, unknown>
      const name = typeof e.name === 'string' ? e.name : ''
      const url = typeof e.url === 'string' ? e.url : ''
      if (!name || !url.startsWith('http')) {
        issues.push({
          file: fileName,
          message: `frontmatter の sources[${i}] に name と http(s) url が両方必要です`,
        })
      } else {
        sources.push({ name, url })
      }
    }
  } else {
    issues.push({ file: fileName, message: 'frontmatter の sources 配列が欠けています' })
  }

  const mustRaw = d.must
  const must: string[] = []
  if (Array.isArray(mustRaw)) {
    for (const [i, v] of mustRaw.entries()) {
      if (typeof v === 'string' && /^[a-z][a-z0-9-]*$/.test(v)) {
        must.push(v)
      } else {
        issues.push({
          file: fileName,
          message: `frontmatter の must[${i}] が kebab-case の ID ではありません`,
        })
      }
    }
  } else {
    issues.push({ file: fileName, message: 'frontmatter の must 配列が欠けています（無い章は []）' })
  }

  if (issues.length > 0) return { ok: false, issues }
  return {
    ok: true,
    fm: {
      title: title ?? '',
      slug: slug ?? '',
      order,
      lastVerified: lastVerified ?? '',
      sources,
      must,
    },
  }
}

/** 本文を intro + H2/H3 セクションに分割して解析する。 */
export function parseSections(body: string): FactSection[] {
  const lines = body.split(/\r?\n/)
  const taken = new Set<string>(['top'])
  const sections: FactSection[] = []
  let current: FactSection | undefined
  // 調査アートの「## Gaps」セクションは公開対象外（ビルドゲートも検証しない）
  let skipping = false

  const ensure = (): FactSection => {
    if (!current) {
      current = { level: 1, heading: '', anchor: 'top', content: [], sources: [], mustIds: [], bodyHtml: '' }
      sections.push(current)
    }
    return current
  }

  for (const line of lines) {
    const h2 = line.match(H2)
    const h3 = line.match(H3)
    if (h2 || h3) {
      const level = (h2 ? 2 : 3) as 2 | 3
      const heading = (h2 ? h2[1] : h3![1]).trim()
      if (level === 2) skipping = /^gaps\b/i.test(heading)
      if (skipping) continue
      current = {
        level,
        heading,
        anchor: anchorFor(heading, taken),
        content: [],
        sources: [],
        mustIds: [],
        bodyHtml: '',
      }
      sections.push(current)
      taken.add(current.anchor)
      continue
    }
    if (skipping) continue
    const sec = ensure()
    // セクション先頭の「:::diagram <name>:::」マーカー（本文からは除去して保存）。
    // 見出し直後の空行が content に入る場合があるため、「空行のみなら先頭扱い」にする。
    if (!sec.diagram) {
      const dm = line.match(DIAGRAM_LINE)
      if (dm && sec.content.every((l) => l.trim() === '')) {
        sec.diagram = dm[1]
        continue
      }
    }
    const source = line.match(SOURCE_LINE)
    if (source) {
      sec.sources.push(...parseSourceLine(source[1]))
      continue
    }
    const must = line.match(MUST_LINE)
    if (must) {
      sec.mustIds.push(...parseMustLine(must[1]))
      continue
    }
    sec.content.push(line)
  }
  return sections
}

/** セクション本文（Markdown）を HTML に変換する（ビルド時に一度だけ実行）。
 * 画面はこの HTML を dangerouslySetInnerHTML で表示し、実行時描画を持たない。 */
export function sectionBodyHtml(content: readonly string[]): string {
  const md = content.join('\n')
  if (md.trim().length === 0) return ''
  return marked.parse(md, { async: false, gfm: true })
}

/** fact ファイル 1 つ（生テキスト）を解析する。 */
export function parseFactFile(raw: string, fileName: string): FactParseResult {
  const { data, content } = matter(raw)
  const fmResult = coerceFrontmatter(data, fileName)
  if (!fmResult.ok) return { ok: false, issues: fmResult.issues }
  const body = content.trim()
  const sections = parseSections(body).map((s) => ({
    ...s,
    bodyHtml: sectionBodyHtml(s.content),
  }))
  return {
    ok: true,
    fact: {
      frontmatter: fmResult.fm,
      sections,
      body,
      fileName,
    },
  }
}

/** セクションの検索用テキスト（見出し + 本文 + ソース名）。 */
export function sectionText(section: FactSection): string {
  return [
    section.heading,
    ...section.content,
    ...section.sources.map((s) => s.name),
  ]
    .join('\n')
    .trim()
}

/** 章の全文（検索インデックス用、AC-7）。 */
export function chapterFullText(sections: readonly FactSection[]): string {
  return sections
    .map((s) => sectionText(s))
    .filter((t) => t.length > 0)
    .join('\n')
}

/** SEO の description：冒頭文から生成（AC-10 の Value sourcing）。 */
export function chapterDescription(sections: readonly FactSection[]): string {
  const intro = sections[0]
  const firstLine =
    intro?.content.find((l) => l.trim().length > 0) ??
    sections.slice(1).flatMap((s) => s.content).find((l) => l.trim().length > 0) ??
    ''
  const plain = firstLine.replace(/[*_`[\]()#>|-]/g, '').trim()
  const sentence = plain.split(/[。.!]/)[0] ?? plain
  return sentence.slice(0, 120)
}
