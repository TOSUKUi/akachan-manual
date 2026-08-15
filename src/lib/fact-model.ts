// fact.md のデータモデルと正規定数。純正関数から扱う構造化データ。

export const CANONICAL_MUST_IDS = [
  'sids',
  'vaccines',
  'carseat',
  'no-shaking',
  'choking',
  'accident',
  'head-shape',
  'eyes',
  'hip',
  'honey',
  'sleep-risk',
  'postpartum',
] as const

export type CanonicalMustId = (typeof CANONICAL_MUST_IDS)[number]

export const CANONICAL_MUST_LABELS: Record<CanonicalMustId, string> = {
  sids: 'SIDS 予防（仰向け寝・固めのマットレス・枕なし・喫煙回避）',
  vaccines: '定期予防接種の漏れ防止（スケジュール管理・品川区の助成）',
  carseat: 'チャイルドシート常時着用（乳児は後ろ向き）',
  'no-shaking': '揺さぶり禁止（泣き止まない時の対処法）',
  choking: '誤飲・窒息予防（小さな物・コード・ビニール袋）',
  accident: '転落・やけど・溺水・熱中症予防',
  'head-shape': '頭の形（向き癖への対処・タミータイムは起きている時のみ）',
  eyes: '目の問題（斜視・弱視は早期発見が決め手）',
  hip: '股関節脱臼のチェック（おむつ替え時の開排）',
  honey: 'はちみつは 1 歳まで禁止（乳児ボツリヌス症）',
  'sleep-risk': 'うつ伏せ寝・添い寝のリスク',
  postpartum: '産後うつのサインと相談窓口',
}

export interface FactFrontmatter {
  title: string
  slug: string
  order: number
  lastVerified: string
  sources: FactSource[]
  must: string[]
}

export interface FactSource {
  name: string
  url: string
  checked?: string
}

export interface InlineSpan {
  text: string
  bold: boolean
}

export interface ListItem {
  inline: InlineSpan[]
  children: ListItem[]
}

export interface ParagraphBlock {
  kind: 'paragraph'
  inline: InlineSpan[]
}

export interface ListBlock {
  kind: 'list'
  ordered: boolean
  items: ListItem[]
}

export interface TableBlock {
  kind: 'table'
  headers: string[]
  rows: string[][]
}

export type CalloutTone = 'note' | 'warning' | 'danger'

export interface CalloutBlock {
  kind: 'callout'
  tone: CalloutTone
  inline: InlineSpan[]
}

export interface ChecklistItem {
  text: string
  done: boolean
}

export interface ChecklistBlock {
  kind: 'checklist'
  id: string
  items: ChecklistItem[]
}

export interface FlowChoice {
  label: string
  /** 常に FlowNode.id を指す。終端は choices が空のノードで表す。 */
  nextId: string
}

export interface FlowNode {
  id: string
  text: string
  choices: FlowChoice[]
}

export interface FlowBlock {
  kind: 'flow'
  id: string
  nodes: FlowNode[]
}

export interface DiagramBlock {
  kind: 'diagram'
  name: string
}

export type Block =
  | ParagraphBlock
  | ListBlock
  | TableBlock
  | CalloutBlock
  | ChecklistBlock
  | FlowBlock
  | DiagramBlock

export interface FactSection {
  level: 1 | 2 | 3
  heading: string
  anchor: string
  blocks: Block[]
  sources: FactSource[]
  mustIds: string[]
}

export interface Fact {
  frontmatter: FactFrontmatter
  sections: FactSection[]
  fileName: string
}

export interface SearchIndexChapter {
  slug: string
  title: string
  order: number
  fullText: string
  sections: { anchor: string; heading: string; text: string }[]
}

export type SearchIndex = SearchIndexChapter[]

export interface MustItem {
  id: string
  label: string
  chapterSlug: string
  chapterTitle: string
  anchor: string
  canonical: boolean
}

export interface SiteMeta {
  siteName: string
  siteLastVerified: string
  hojokinUrl: string
  disclaimer: string
}

export interface SiteData {
  meta: SiteMeta
  chapters: ChapterData[]
  mustItems: MustItem[]
  searchIndex: SearchIndex
}

export interface ChapterData {
  slug: string
  title: string
  order: number
  lastVerified: string
  sources: FactSource[]
  must: string[]
  description: string
  sections: FactSection[]
}
