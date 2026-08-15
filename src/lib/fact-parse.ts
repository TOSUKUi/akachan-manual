// fact.md のパーサ。Markdown 変換は行わず、表示用の構造化データへ変換する。
import matter from 'gray-matter'
import type {
  Block,
  CalloutBlock,
  ChecklistBlock,
  Fact,
  FactFrontmatter,
  FactSection,
  FactSource,
  FlowBlock,
  FlowNode,
  InlineSpan,
  ListBlock,
  ListItem,
  TableBlock,
} from './fact-model.ts'

export interface FactIssue {
  file: string
  section?: string
  message: string
}

export type FactParseResult =
  | { ok: true; fact: Fact }
  | { ok: false; issues: FactIssue[] }

const SOURCE_LINE = /^\s*根拠[:：]\s+(.+)$/
const SOURCE_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
const MUST_LINE = /^\s*(?:⭐\s*)?必須[:：]\s+(.+)$/
const MUST_ID = /\[([a-z][a-z0-9-]*)\]/g
const DIAGRAM_LINE = /^:::diagram\s+([a-z][a-z0-9-]*)\s*:::\s*$/
const H2 = /^##\s+(.+?)\s*$/
const H3 = /^###\s+(.+?)\s*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
const ID = /^[a-z][a-z0-9-]*$/
const TABLE_SEPARATOR = /^\s*\|(?:\s*:?-{3,}:?\s*\|)+\s*$/
const LIST_LINE = /^(\s*)-\s+(.*)$/

export function anchorFor(heading: string, taken: ReadonlySet<string>): string {
  const base =
    heading
      .trim()
      .toLowerCase()
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
  return [...rest.matchAll(SOURCE_LINK)].map((m) => ({ name: m[1].trim(), url: m[2].trim() }))
}

function parseMustLine(rest: string): string[] {
  return [...rest.matchAll(MUST_ID)].map((m) => m[1])
}

function isIsoDate(value: string): boolean {
  if (!DATE.test(value)) return false
  const [y, m, d] = value.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d
}

function coerceFrontmatter(
  data: unknown,
  fileName: string,
): { ok: true; fm: FactFrontmatter } | { ok: false; issues: FactIssue[] } {
  const issues: FactIssue[] = []
  const d = (data ?? {}) as Record<string, unknown>
  const str = (key: string): string => {
    const value = d[key]
    const result = typeof value === 'string' ? value : value instanceof Date ? value.toISOString().slice(0, 10) : ''
    if (!result) issues.push({ file: fileName, message: `frontmatter の ${key} が空です` })
    return result
  }
  const title = str('title')
  const slug = str('slug')
  const orderRaw = d.order
  const order = typeof orderRaw === 'number' && Number.isInteger(orderRaw) ? orderRaw : 0
  if (order === 0 && orderRaw !== 0) issues.push({ file: fileName, message: 'frontmatter の order が整数ではありません' })
  const lastVerified = str('last_verified')
  if (lastVerified && !isIsoDate(lastVerified)) {
    issues.push({ file: fileName, message: `frontmatter の last_verified が YYYY-MM-DD 形式ではありません（${lastVerified}）` })
  }
  const sourcesRaw = d.sources
  const sources: FactSource[] = []
  if (Array.isArray(sourcesRaw)) {
    for (const [i, source] of sourcesRaw.entries()) {
      const value = (source ?? {}) as Record<string, unknown>
      const name = typeof value.name === 'string' ? value.name : ''
      const url = typeof value.url === 'string' ? value.url : ''
      if (!name || !url.startsWith('http')) {
        issues.push({ file: fileName, message: `frontmatter の sources[${i}] に name と http(s) url が両方必要です` })
      } else sources.push({ name, url })
    }
  } else issues.push({ file: fileName, message: 'frontmatter の sources 配列が欠けています' })
  const mustRaw = d.must
  const must: string[] = []
  if (Array.isArray(mustRaw)) {
    for (const [i, value] of mustRaw.entries()) {
      if (typeof value === 'string' && ID.test(value)) must.push(value)
      else issues.push({ file: fileName, message: `frontmatter の must[${i}] が kebab-case の ID ではありません` })
    }
  } else issues.push({ file: fileName, message: 'frontmatter の must 配列が欠けています（無い章は []）' })
  if (issues.length > 0) return { ok: false, issues }
  return { ok: true, fm: { title, slug, order, lastVerified, sources, must } }
}

function inlineIssue(text: string, file: string, section: string | undefined): FactIssue | undefined {
  if (text.includes('`') || /\]\(/.test(text)) {
    return { file, section, message: '本文ではコード記法とリンク記法を使えません' }
  }
  const boldCount = (text.match(/\*\*/g) ?? []).length
  if (boldCount % 2 !== 0 || /(^|[^*])\*(?!\*)|(?<!\*)\*(?!\*)/.test(text)) {
    return { file, section, message: '本文で許可される強調は対応する **太字** のみです' }
  }
  if (/(^|[^_])_(?!_)[^_]+_(?!_)/.test(text) || text.includes('__')) {
    return { file, section, message: '本文ではイタリック記法を使えません' }
  }
  return undefined
}

function parseInline(text: string, file: string, section?: string): { spans: InlineSpan[]; issues: FactIssue[] } {
  const issue = inlineIssue(text, file, section)
  if (issue) return { spans: [], issues: [issue] }
  const spans: InlineSpan[] = []
  let cursor = 0
  const re = /\*\*([^*]+)\*\*/g
  for (const match of text.matchAll(re)) {
    const index = match.index ?? 0
    if (index > cursor) spans.push({ text: text.slice(cursor, index), bold: false })
    spans.push({ text: match[1], bold: true })
    cursor = index + match[0].length
  }
  if (cursor < text.length) spans.push({ text: text.slice(cursor), bold: false })
  if (spans.length === 0 && text.length > 0) spans.push({ text, bold: false })
  return { spans, issues: [] }
}

function spanText(spans: readonly InlineSpan[]): string {
  return spans.map((span) => span.text).join('')
}

function parseCells(line: string): string[] {
  const value = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  return value.split('|').map((cell) => cell.trim())
}

function parseTable(lines: readonly string[], file: string, section?: string): { block?: TableBlock; issues: FactIssue[] } {
  const headers = parseCells(lines[0])
  const rows = lines.slice(2).map(parseCells)
  const issues: FactIssue[] = []
  for (const cell of [ ...headers, ...rows.flat() ]) {
    const result = parseInline(cell, file, section)
    issues.push(...result.issues)
  }
  return { block: issues.length === 0 ? { kind: 'table', headers, rows } : undefined, issues }
}

function parseList(lines: readonly string[], file: string, section?: string): { block?: ListBlock; issues: FactIssue[] } {
  const entries: { indent: number; text: string }[] = []
  const issues: FactIssue[] = []
  for (const line of lines) {
    const match = line.match(LIST_LINE)
    if (!match) {
      issues.push({ file, section, message: 'リストの行は - で始めてください' })
      continue
    }
    const spaces = match[1].length
    const depth = spaces === 0 ? 1 : 2
    if (spaces > 2) {
      issues.push({ file, section, message: 'リストのネストは 2 階層までです' })
    }
    const result = parseInline(match[2].trim(), file, section)
    issues.push(...result.issues)
    entries.push({ indent: depth, text: match[2].trim() })
  }
  const roots: ListItem[] = []
  let parent: ListItem | undefined
  for (const entry of entries) {
    const inline = parseInline(entry.text, file, section).spans
    const item: ListItem = { inline, children: [] }
    if (entry.indent === 1) {
      roots.push(item)
      parent = item
    } else if (parent) parent.children.push(item)
    else issues.push({ file, section, message: 'ネストされたリスト項目に親がありません' })
  }
  return { block: issues.length === 0 ? { kind: 'list', ordered: false, items: roots } : undefined, issues }
}

function parseChecklist(lines: readonly string[], id: string, file: string, section?: string): { block?: ChecklistBlock; issues: FactIssue[] } {
  const issues: FactIssue[] = []
  const items = lines.filter((line) => line.trim().length > 0).map((line) => {
    const match = line.match(/^\s*-\s+\[([ xX])\]\s+(.+)$/)
    if (!match) {
      issues.push({ file, section, message: 'checklist の項目は - [ ] または - [x] で記述してください' })
      return { text: '', done: false }
    }
    const inline = parseInline(match[2].trim(), file, section)
    issues.push(...inline.issues)
    return { text: spanText(inline.spans), done: match[1].toLowerCase() === 'x' }
  }).filter((item) => item.text.length > 0)
  if (items.length === 0) issues.push({ file, section, message: 'checklist に項目がありません' })
  return { block: issues.length === 0 ? { kind: 'checklist', id, items } : undefined, issues }
}

function parseFlow(lines: readonly string[], id: string, file: string, section?: string): { block?: FlowBlock; issues: FactIssue[] } {
  const issues: FactIssue[] = []
  const meaningful = lines.filter((line) => line.trim().length > 0)
  const rootLine = meaningful[0]?.match(/^\s*Q:\s*(.+)$/)
  if (!rootLine || !rootLine[1].trim()) {
    return { issues: [{ file, section, message: 'flow の先頭は Q: <質問文> で記述してください' }] }
  }
  const rootInline = parseInline(rootLine[1].trim(), file, section)
  issues.push(...rootInline.issues)
  const nodes: FlowNode[] = [{ id: 'f1', text: spanText(rootInline.spans), choices: [] }]
  let parent: FlowNode | undefined
  let counter = 2
  for (const line of meaningful.slice(1)) {
    const match = line.match(/^(\s*)-\s+(.+)$/)
    if (!match) {
      issues.push({ file, section, message: 'flow の選択肢は - で始めてください' })
      continue
    }
    const indent = match[1].length
    if (indent !== 0 && indent !== 2) {
      issues.push({ file, section, message: 'flow の選択肢は 0 または 2 スペースで字下げしてください' })
      continue
    }
    const arrow = match[2].indexOf('→')
    if (arrow < 0) {
      issues.push({ file, section, message: 'flow の選択肢は - <ラベル> → <本文> で記述してください' })
      continue
    }
    const labelRaw = match[2].slice(0, arrow).trim()
    const targetRaw = match[2].slice(arrow + 1).trim()
    if (!labelRaw || !targetRaw) {
      issues.push({ file, section, message: 'flow の選択肢のラベルと本文は空にできません' })
      continue
    }
    if (indent === 2 && !parent) {
      issues.push({ file, section, message: 'flow の子選択肢に親がありません' })
      continue
    }
    const labelResult = parseInline(labelRaw, file, section)
    const targetResult = parseInline(targetRaw, file, section)
    issues.push(...labelResult.issues, ...targetResult.issues)
    const node: FlowNode = { id: `f${counter}`, text: spanText(targetResult.spans), choices: [] }
    counter += 1
    nodes.push(node)
    if (indent === 0) {
      nodes[0].choices.push({ label: spanText(labelResult.spans), nextId: node.id })
      parent = node
    } else {
      parent!.choices.push({ label: spanText(labelResult.spans), nextId: node.id })
    }
  }
  const references = new Set(nodes.map((node) => node.id))
  for (const node of nodes) {
    for (const choice of node.choices) if (!references.has(choice.nextId)) {
      issues.push({ file, section, message: `flow の行き先「${choice.nextId}」を解決できません` })
    }
  }
  if (nodes.length < 2) issues.push({ file, section, message: 'flow は 2 ノード以上必要です' })
  if (nodes[0].choices.length === 0) issues.push({ file, section, message: 'flow にルートの選択肢がありません' })
  if (!nodes.some((node) => node.choices.length === 0)) issues.push({ file, section, message: 'flow には終端ノードが 1 つ以上必要です' })
  return { block: issues.length === 0 ? { kind: 'flow', id, nodes } : undefined, issues }
}

function markerBlock(lines: readonly string[], file: string, section?: string): { block?: Block; issues: FactIssue[] } {
  const opening = lines[0].match(/^:::(\S+)(?:\s+(.+))?$/)
  if (!opening) return { issues: [{ file, section, message: 'マーカーの形式が不正です' }] }
  const name = opening[1]
  const arg = opening[2]?.trim() ?? ''
  if (name === 'callout') {
    if (!['note', 'warning', 'danger'].includes(arg)) return { issues: [{ file, section, message: 'callout の tone は note / warning / danger のいずれかです' }] }
    const text = lines
      .slice(1, -1)
      .filter((line) => line.trim())
      .map((line) => line.trim())
      .join('\n')
    const inline = parseInline(text, file, section)
    const issues = [...inline.issues]
    if (!text) issues.push({ file, section, message: 'callout に本文がありません' })
    return { block: issues.length === 0 ? { kind: 'callout', tone: arg as CalloutBlock['tone'], inline: inline.spans } : undefined, issues }
  }
  if (name === 'checklist') {
    if (!ID.test(arg)) return { issues: [{ file, section, message: 'checklist の ID が不正です' }] }
    return parseChecklist(lines.slice(1, -1), arg, file, section)
  }
  if (name === 'flow') {
    if (!ID.test(arg)) return { issues: [{ file, section, message: 'flow の ID が不正です' }] }
    return parseFlow(lines.slice(1, -1), arg, file, section)
  }
  return { issues: [{ file, section, message: `未知のマーカー「:::${name}」です` }] }
}

function parseBlocks(lines: readonly string[], file: string, section?: string): { blocks: Block[]; issues: FactIssue[] } {
  const blocks: Block[] = []
  const issues: FactIssue[] = []
  let i = 0
  let paragraph: string[] = []
  const flushParagraph = () => {
    const text = paragraph.map((line) => line.trim()).join('')
    paragraph = []
    if (!text) return
    const result = parseInline(text, file, section)
    issues.push(...result.issues)
    if (result.issues.length === 0) blocks.push({ kind: 'paragraph', inline: result.spans })
  }
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { flushParagraph(); i += 1; continue }
    const diagram = line.match(DIAGRAM_LINE)
    if (diagram) { flushParagraph(); blocks.push({ kind: 'diagram', name: diagram[1] }); i += 1; continue }
    if (line === ':::') {
      flushParagraph(); issues.push({ file, section, message: '対応する開始マーカーのない ::: です' }); i += 1; continue
    }
    if (line.startsWith(':::')) {
      flushParagraph()
      const markerName = line.match(/^:::(\S+)/)?.[1] ?? ''
      let end = i + 1
      while (end < lines.length && lines[end] !== ':::') end += 1
      if (end >= lines.length) {
        issues.push({ file, section, message: `マーカー「:::${markerName}」が閉じられていません` })
        i = lines.length
        continue
      }
      const result = markerBlock(lines.slice(i, end + 1), file, section)
      issues.push(...result.issues)
      if (result.block) blocks.push(result.block)
      i = end + 1
      continue
    }
    if (/^\s*-\s+\[[ xX]\]/.test(line)) {
      flushParagraph(); issues.push({ file, section, message: 'タスクリストは :::checklist の中だけで使用できます' }); i += 1; continue
    }
    if (/^\s*>/.test(line)) {
      flushParagraph(); issues.push({ file, section, message: '引用記法は使用できません' }); i += 1; continue
    }
    if (/^\s*\d+[.)]\s+/.test(line)) {
      flushParagraph(); issues.push({ file, section, message: '番号付きリストは使用できません' }); i += 1; continue
    }
    if (line.trim().startsWith('|') && i + 1 < lines.length && TABLE_SEPARATOR.test(lines[i + 1])) {
      flushParagraph()
      const tableLines = [line, lines[i + 1]]
      i += 2
      while (i < lines.length && lines[i].trim().startsWith('|')) { tableLines.push(lines[i]); i += 1 }
      const result = parseTable(tableLines, file, section)
      issues.push(...result.issues)
      if (result.block) blocks.push(result.block)
      continue
    }
    if (LIST_LINE.test(line)) {
      flushParagraph()
      const listLines: string[] = []
      while (i < lines.length && lines[i].trim() && LIST_LINE.test(lines[i])) { listLines.push(lines[i]); i += 1 }
      const result = parseList(listLines, file, section)
      issues.push(...result.issues)
      if (result.block) blocks.push(result.block)
      continue
    }
    if (/^#{1,6}\s+/.test(line)) {
      flushParagraph(); issues.push({ file, section, message: '本文中の見出しは使用できません' }); i += 1; continue
    }
    paragraph.push(line)
    i += 1
  }
  flushParagraph()
  return { blocks, issues }
}

interface RawSection {
  level: 1 | 2 | 3
  heading: string
  anchor: string
  lines: string[]
  sources: FactSource[]
  mustIds: string[]
}

function rawSections(body: string): RawSection[] {
  const lines = body.split(/\r?\n/)
  const taken = new Set<string>(['top'])
  const sections: RawSection[] = []
  let current: RawSection | undefined
  let skipping = false
  const ensure = (): RawSection => {
    if (!current) {
      current = { level: 1, heading: '', anchor: 'top', lines: [], sources: [], mustIds: [] }
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
      const anchor = anchorFor(heading, taken)
      current = { level, heading, anchor, lines: [], sources: [], mustIds: [] }
      sections.push(current)
      taken.add(anchor)
      continue
    }
    if (skipping) continue
    const section = ensure()
    const source = line.match(SOURCE_LINE)
    if (source) { section.sources.push(...parseSourceLine(source[1])); continue }
    const must = line.match(MUST_LINE)
    if (must) { section.mustIds.push(...parseMustLine(must[1])); continue }
    section.lines.push(line)
  }
  return sections
}

export function parseSections(body: string): FactSection[] {
  return rawSections(body).map((section) => ({
    level: section.level,
    heading: section.heading,
    anchor: section.anchor,
    blocks: parseBlocks(section.lines, '-', section.heading).blocks,
    sources: section.sources,
    mustIds: section.mustIds,
  }))
}

export function parseFactFile(raw: string, fileName: string): FactParseResult {
  const { data, content } = matter(raw)
  const fmResult = coerceFrontmatter(data, fileName)
  if (!fmResult.ok) return { ok: false, issues: fmResult.issues }
  const issues: FactIssue[] = []
  const sections = rawSections(content.trim()).map((section) => {
    const result = parseBlocks(section.lines, fileName, section.heading || undefined)
    issues.push(...result.issues)
    return {
      level: section.level,
      heading: section.heading,
      anchor: section.anchor,
      blocks: result.blocks,
      sources: section.sources,
      mustIds: section.mustIds,
    } satisfies FactSection
  })
  if (issues.length > 0) return { ok: false, issues }
  return { ok: true, fact: { frontmatter: fmResult.fm, sections, fileName } }
}

export function blockText(block: Block): string {
  switch (block.kind) {
    case 'paragraph': return spanText(block.inline)
    case 'list': return block.items.map((item) => `${spanText(item.inline)}\n${item.children.map((child) => spanText(child.inline)).join('\n')}`).join('\n')
    case 'table': return [block.headers.join(' '), ...block.rows.map((row) => row.join(' '))].join('\n')
    case 'callout': return spanText(block.inline)
    case 'checklist': return block.items.map((item) => item.text).join('\n')
    case 'flow': return block.nodes.map((node) => [node.text, ...node.choices.map((choice) => choice.label)].join('\n')).join('\n')
    case 'diagram': return block.name
  }
}

export function sectionText(section: FactSection): string {
  return [section.heading, ...section.blocks.map(blockText), ...section.sources.map((source) => source.name)].join('\n').trim()
}

export function chapterFullText(sections: readonly FactSection[]): string {
  return sections.map(sectionText).filter(Boolean).join('\n')
}

export function chapterDescription(sections: readonly FactSection[]): string {
  const paragraph = sections.flatMap((section) => section.blocks).find((block): block is Extract<Block, { kind: 'paragraph' }> => block.kind === 'paragraph')
  const plain = paragraph ? spanText(paragraph.inline).trim() : ''
  return (plain.split(/[。.!]/)[0] ?? plain).slice(0, 120)
}
