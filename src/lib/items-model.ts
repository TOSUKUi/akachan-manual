// items/*.md（月齢別アイテムタイムライン）のデータモデルと正規定数。
// fact/ と同じく「コンテンツはソース、src/generated は生成物」。価格は調査時点での変動値なので
// fact の根拠ゲートとは別の強さで検証する（詳細: docs/specs/0003-item-timeline-page.md）。
import type { FactSource } from './fact-model.ts'

/**
 * 品目タイムラインページの slug。生成物は /timeline.html。
 * 章（fact/）と同じ slug を許すとページに辿れなくなるため fact-validate で禁止する（spec 0003 AC-1）。
 * app 側（nav.ts）とビルド側（fact-validate.ts）の両方から参照される唯一の定義元。
 */
export const TIMELINE_SLUG = 'timeline'

export const ITEM_BAND_IDS = [
  'pregnancy',
  'newborn',
  'm2-3',
  'm4-6',
  'm7-9',
  'm10-12',
  'm13-18',
  'm19-24',
] as const
export type ItemBandId = (typeof ITEM_BAND_IDS)[number]

export const ITEM_CATEGORIES = [
  'neru',
  'kiru',
  'tabe',
  'arau',
  'ugoku',
  'anzen',
  'asobi',
  'karada',
] as const
export type ItemCategory = (typeof ITEM_CATEGORIES)[number]

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  neru: 'ねる',
  kiru: 'きる',
  tabe: 'のむ・食べる',
  arau: '洗う・おむつ',
  ugoku: '移動・おでかけ',
  anzen: '安全対策',
  asobi: '遊ぶ',
  karada: 'からだ・体調',
}

export const ITEM_NEEDS = ['must', 'useful'] as const
export type ItemNeed = (typeof ITEM_NEEDS)[number]

export const NEED_LABELS: Record<ItemNeed, string> = {
  must: 'そろえる',
  useful: 'あると便利',
}

/** 販売先は検索ページへのリンクのみ生成する（特定商品への直リンクは持たない）。 */
export const SHOP_KINDS = ['amazon', 'rakuten', 'nishimatyaya', 'akachan', 'uniqlo'] as const
export type ShopKind = (typeof SHOP_KINDS)[number]

export const SHOP_LABELS: Record<ShopKind, string> = {
  amazon: 'Amazon',
  rakuten: '楽天市場',
  nishimatyaya: '西松屋',
  akachan: 'アカチャンホンポ',
  uniqlo: 'ユニクロ',
}

export const SHOP_SEARCH_LABELS: Record<ShopKind, string> = {
  amazon: 'Amazon で検索',
  rakuten: '楽天で検索',
  nishimatyaya: '西松屋で検索',
  akachan: 'アカチャンホンポで検索',
  uniqlo: 'ユニクロで検索',
}

/** 月齢の下限は妊娠中（-1）、band の上限は本サイトの範囲（24 か月）。endMonth は製品次第で 2 歳以降も可。 */
export const MIN_MONTH = -1
export const MAX_BAND_MONTH = 24
export const MAX_END_MONTH = 84

/** アイテム価格・根拠の鮮度閾値（日）。超過は警告（fact の AC-11 と同じ考え方）。 */
export const ITEMS_STALE_DAYS = 180

export interface ItemPrice {
  low: number
  high: number
  unit: string
  sources: string[]
  checked: string
}

export interface ShopLink {
  kind: ShopKind
  q: string
}

export interface Item {
  id: string
  name: string
  category: ItemCategory
  need: ItemNeed
  /** 準備／使い始めの目安月。-1 は妊娠中。 */
  startMonth: number
  /** 買い替え・卒業の目安月。不明なら省略。 */
  endMonth?: number
  /** サイズ・数量の目安（自由文）。 */
  size?: string
  /** なぜこの時期か。個人差・製品表示優先の但し書きを含める。 */
  note: string
  /** 月齢・サイズ・必要性の根拠 URL。必ず band の sources[] に含まれる。 */
  whySources: string[]
  price?: ItemPrice
  shops: ShopLink[]
}

export interface SupportItem {
  id: string
  title: string
  detail: string
  source: string
}

export interface ItemsBand {
  id: ItemBandId
  label: string
  monthsFrom: number
  monthsTo: number
  intro: string
  caution: string
  sources: FactSource[]
  support: SupportItem[]
  items: Item[]
  fileName: string
}

export interface ItemsData {
  bands: ItemsBand[]
  /** 集計用に band id を付与したフラットなアイテム一覧。 */
  items: (Item & { bandId: ItemBandId })[]
  /** 全 band の sources を band 付きでフラットにしたもの（鮮度チェック表示用）。 */
  sources: (FactSource & { bandId: ItemBandId })[]
}

/** 月の表示ラベル（例: '妊娠中' / '5 か月' / '1 歳 6 か月'）。-1 は妊娠中。 */
export function monthPoint(month: number): string {
  if (month <= MIN_MONTH) return '妊娠中'
  if (month >= 12) {
    const years = Math.floor(month / 12)
    const rest = month % 12
    return rest === 0 ? `${years} 歳` : `${years} 歳 ${rest} か月`
  }
  return `${month} か月`
}

/** 使い始め〜終わりの表示（例: 「5 か月ごろから」/「2〜6 か月ごろ」/「妊娠中〜6 か月ごろ」）。 */
export function monthRangeLabel(startMonth: number, endMonth?: number): string {
  const start = startMonth <= MIN_MONTH ? '妊娠中' : `${monthPoint(startMonth)}ごろ`
  if (endMonth === undefined) return `${start}から`
  if (endMonth > MAX_BAND_MONTH) return `${start}から（2 歳以降も継続）`
  if (endMonth === startMonth) return `${monthPoint(endMonth)}ごろ`
  // どちらも 1 歳未満なら単位をまとめて「2〜6 か月ごろ」と読む
  if (startMonth >= 0 && endMonth < 12) return `${startMonth}〜${endMonth} か月ごろ`
  return `${monthPoint(startMonth)}〜${monthPoint(endMonth)}ごろ`
}

/** 金額表示（千区切り）。 */
/** 月齢レールの chip 文言（spec 0003 AC-3）。テストも同じ関数を使う。 */
export function monthLabel(band: ItemsBand): string {
  if (band.monthsFrom < 0) return '妊娠期'
  const range = `${band.monthsFrom}〜${band.monthsTo}か月`
  return band.id === 'newborn' ? `新生児 ${range}` : `生後${range}`
}

export function yen(amount: number): string {
  return `${Math.round(amount).toLocaleString('ja-JP')}円`
}

export interface ItemFilters {
  /** 空ならカテゴリ指定なし（全カテゴリを通す）。 */
  readonly categories: readonly ItemCategory[]
  readonly mustOnly: boolean
}

/** フィルタ適用（純関数）。カテゴリ未指定 = 全カテゴリ。 */
export function filterItems<T extends Item>(items: readonly T[], filters: ItemFilters): T[] {
  return items.filter((item) => {
    if (filters.categories.length > 0 && !filters.categories.includes(item.category)) return false
    if (filters.mustOnly && item.need !== 'must') return false
    return true
  })
}

export interface BudgetSummary {
  /** 対象の全アイテム数 */
  total: number
  /** 未チェック（残り）の件数 */
  remaining: number
  /** チェック済み件数 */
  done: number
  /** 残りアイテムの価格帯合計（価格が分からない品目は 0 扱い） */
  remainingLow: number
  remainingHigh: number
  /** 残りのうち価格が分かる品目数 */
  priced: number
}

/** 残り点数と残り予算レンジの集計（純関数）。 */
export function summarize(items: readonly Item[], doneIds: readonly string[]): BudgetSummary {
  const done = new Set(doneIds)
  const summary: BudgetSummary = { total: 0, remaining: 0, done: 0, remainingLow: 0, remainingHigh: 0, priced: 0 }
  for (const item of items) {
    summary.total += 1
    if (done.has(item.id)) {
      summary.done += 1
      continue
    }
    summary.remaining += 1
    if (item.price) {
      summary.remainingLow += item.price.low
      summary.remainingHigh += item.price.high
      summary.priced += 1
    }
  }
  return summary
}


/** URL をこの band の出典名に解決する（未登録ならホスト名）。 */
export function sourceLabel(sources: ReadonlyArray<{ url: string; name: string }>, url: string): string {
  const found = sources.find((s) => s.url === url)
  if (found) return found.name
  try {
    return new URL(url).host
  } catch {
    return url
  }
}
