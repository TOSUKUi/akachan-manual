// items/*.md（月齢別アイテム）の frontmatter 解析 → ItemsBand。
// ファイルは YAML frontmatter のみで構成する（本文 Markdown は持たない＝描画されない情報を作らないため）。
// 失敗は構造化エラー（code + message + hint）で返し、ビルドを止める。
import matter from 'gray-matter'
import type { FactSource } from './fact-model.ts'
import {
  ITEM_BAND_IDS,
  ITEM_CATEGORIES,
  ITEM_NEEDS,
  MAX_END_MONTH,
  MIN_MONTH,
  SHOP_KINDS,
  type CompareRow,
  type Item,
  type ItemBandId,
  type ItemCategory,
  type ItemCompare,
  type ItemNeed,
  type ItemsBand,
  type SupportItem,
  type ShopKind,
  type ShopLink,
  type ItemPrice,
} from './items-model.ts'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/

export interface ItemIssue {
  file: string
  /** どのアイテム／支援の問題か（band 全体のエラーでは省略） */
  item?: string
  code: string
  message: string
  hint?: string
}

export type ItemsParseResult =
  { ok: true; band: ItemsBand; issues: [] } | { ok: false; band?: undefined; issues: ItemIssue[] }

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** 想定外のキー（商品 URL の直書きなど）をエラーにする。 */
function rejectUnknownKeys(
  record: UnknownRecord,
  allowed: readonly string[],
  target: string,
  issues: ItemIssue[],
): void {
  for (const key of Object.keys(record)) {
    if (!allowed.includes(key)) {
      issues.push({
        file: target,
        code: 'items_field_unknown',
        message: `不明なフィールド "${key}" です`,
        hint: `使えるフィールド: ${allowed.join(', ')}（商品の直リンク URL は書けません。販売先は shops の kind + q だけ）`,
      })
    }
  }
}

function toText(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return ''
}

/** 月（-1 = 妊娠中）。数値・数値文字列のどちらも許容し、-1 未満 / 400 か月超には丸める。 */
function toMonth(value: unknown): number | undefined {
  let num: number
  if (typeof value === 'number' && Number.isFinite(value)) num = value
  else if (typeof value === 'string' && /^-?\d+$/.test(value.trim())) num = Number.parseInt(value.trim(), 10)
  else return undefined
  if (num < MIN_MONTH) return MIN_MONTH
  return Math.min(Math.round(num), 400)
}

/** 金額（整数円）。"1,980" のような文字列も許容。 */
function toAmount(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.round(value)
  if (typeof value === 'string') {
    const cleaned = value.replace(/[,\s円]/g, '')
    if (/^\d+$/.test(cleaned)) return Number.parseInt(cleaned, 10)
  }
  return undefined
}

function toIsoDate(value: unknown): string | undefined {
  // YAML は YYYY-MM-DD を Date として解釈するため、Date も受け取る
  if (value instanceof Date) {
    const iso = value.toISOString().slice(0, 10)
    return ISO_DATE.test(iso) ? iso : undefined
  }
  const text = toText(value)
  return ISO_DATE.test(text) ? text : undefined
}

function parseSources(value: unknown, file: string, issues: ItemIssue[]): FactSource[] {
  const sources: FactSource[] = []
  if (!Array.isArray(value)) return sources
  value.forEach((entry, index) => {
    const at = `sources[${index}]`
    if (!isRecord(entry)) {
      issues.push({
        file,
        item: at,
        code: 'items_source_invalid',
        message: '出典は name / url / checked を持つマップです',
        hint: '- name: 出典名 / url: https://… / checked: YYYY-MM-DD',
      })
      return
    }
    rejectUnknownKeys(entry, ['name', 'url', 'checked'], `${file}#${at}`, issues)
    const name = toText(entry.name)
    const url = toText(entry.url)
    const checked = toIsoDate(entry.checked)
    if (!name)
      issues.push({
        file,
        item: at,
        code: 'items_field_missing',
        message: '出典の name が空です',
        hint: '例: 西松屋「ベビーウェア選び方ガイド」',
      })
    if (!/^https?:\/\//.test(url)) {
      issues.push({
        file,
        item: at,
        code: 'items_source_url_invalid',
        message: `url が http(s) URL ではありません（${url || '(空)'}）`,
        hint: 'https:// から始める',
      })
    }
    if (checked === undefined) {
      issues.push({
        file,
        item: at,
        code: 'items_checked_invalid',
        message: `checked が YYYY-MM-DD 形式ではありません（${toText(entry.checked) || '(空)'}）`,
        hint: 'URLを確認した日付を書く',
      })
    }
    if (name && url && checked) sources.push({ name, url, checked })
  })
  return sources
}

function parseSupport(value: unknown, file: string, issues: ItemIssue[]): SupportItem[] {
  const support: SupportItem[] = []
  if (!Array.isArray(value)) return support
  value.forEach((entry, index) => {
    const at = `support[${index}]`
    if (!isRecord(entry)) {
      issues.push({
        file,
        item: at,
        code: 'items_field_invalid',
        message: '支援は id / title / detail / source を持つマップです',
        hint: 'source は band の sources[] に登録した URL を書く',
      })
      return
    }
    rejectUnknownKeys(
      entry,
      ['id', 'title', 'detail', 'source', 'eligible', 'applyPeriod', 'cost'],
      `${file}#${at}`,
      issues,
    )
    const id = toText(entry.id)
    const title = toText(entry.title)
    const detail = toText(entry.detail)
    const source = toText(entry.source)
    const before = issues.length
    if (!ID_PATTERN.test(id))
      issues.push({
        file,
        item: at,
        code: 'items_id_invalid',
        message: `支援の id が不正です（${id || '(空)'}）`,
        hint: 'a-z0-9 と - の半角英数小文字',
      })
    if (!title)
      issues.push({
        file,
        item: id || at,
        code: 'items_field_missing',
        message: '支援の title が空です',
        hint: '例: 妊婦のための支援給付金（5万円）',
      })
    if (!detail)
      issues.push({
        file,
        item: id || at,
        code: 'items_field_missing',
        message: `支援 "${id || at}" の detail が空です`,
        hint: 'いくら出て、いつ・どう申請するかを書く',
      })
    if (!/^https?:\/\//.test(source))
      issues.push({
        file,
        item: id || at,
        code: 'items_source_url_invalid',
        message: `支援 "${id || at}" の source が http(s) URL ではありません`,
        hint: 'band の sources[] に登録した区の公式ページ URL を書く',
      })
    if (issues.length > before) return
    support.push({ id, title, detail, source })
  })
  return support
}

const ITEM_FIELDS = [
  'id',
  'name',
  'category',
  'need',
  'startMonth',
  'endMonth',
  'size',
  'note',
  'compare',
  'whySources',
  'price',
  'shops',
] as const
const PRICE_FIELDS = ['low', 'high', 'unit', 'sources', 'checked'] as const
const SHOP_FIELDS = ['kind', 'q'] as const

function parsePrice(
  value: unknown,
  file: string,
  itemLabel: string,
  issues: ItemIssue[],
): ItemPrice | undefined {
  if (value === undefined) return undefined
  const at = `item "${itemLabel}".price`
  if (!isRecord(value)) {
    issues.push({
      file,
      item: itemLabel,
      code: 'items_field_invalid',
      message: 'price は low / high / unit / sources / checked を持つマップです',
      hint: 'low / high は円の整数、checked は YYYY-MM-DD',
    })
    return undefined
  }
  rejectUnknownKeys(value, PRICE_FIELDS, `${file}#${at}`, issues)
  const before = issues.length
  const low = toAmount(value.low)
  const high = toAmount(value.high)
  const unit = toText(value.unit)
  const checked = toIsoDate(value.checked)
  const priceSources = Array.isArray(value.sources)
    ? value.sources.map((s) => toText(s)).filter((s) => s.length > 0)
    : []
  if (low === undefined)
    issues.push({
      file,
      item: itemLabel,
      code: 'items_price_invalid',
      message: 'price.low が数値ではありません',
      hint: '円の整数で書く（例: 980）',
    })
  if (high === undefined)
    issues.push({
      file,
      item: itemLabel,
      code: 'items_price_invalid',
      message: 'price.high が数値ではありません',
      hint: '円の整数で書く（例: 1980）',
    })
  if (!unit)
    issues.push({
      file,
      item: itemLabel,
      code: 'items_price_invalid',
      message: 'price.unit が空です',
      hint: '例: 1枚（税込） / 2枚組（税込）',
    })
  if (priceSources.length === 0)
    issues.push({
      file,
      item: itemLabel,
      code: 'items_price_source_missing',
      message: 'price.sources が空です',
      hint: '価格を確認した公式通販などの URL を 1 つ以上書く',
    })
  if (checked === undefined)
    issues.push({
      file,
      item: itemLabel,
      code: 'items_checked_invalid',
      message: 'price.checked が YYYY-MM-DD 形式ではありません',
      hint: '価格を調査した日付を書く',
    })
  if (issues.length > before) return undefined
  return { low: low as number, high: high as number, unit, sources: priceSources, checked: checked as string }
}

function parseShops(value: unknown, file: string, itemLabel: string, issues: ItemIssue[]): ShopLink[] {
  const shops: ShopLink[] = []
  if (!Array.isArray(value)) return shops
  value.forEach((entry, index) => {
    const at = `item "${itemLabel}".shops[${index}]`
    if (!isRecord(entry)) {
      issues.push({
        file,
        item: itemLabel,
        code: 'items_field_invalid',
        message: 'shops は kind と q を持つマップのリストです',
        hint: '- kind: nishimatyaya / q: 短肌着',
      })
      return
    }
    if (entry.url !== undefined) {
      issues.push({
        file,
        item: itemLabel,
        code: 'items_shop_url_forbidden',
        message: 'shops に url は書けません。販売先は kind + q（検索語）だけ許されます',
        hint: '- { kind: amazon, q: 短肌着 } のように書く（検索URLはサイト側で組み立てる）',
      })
      return
    }
    rejectUnknownKeys(entry, SHOP_FIELDS, `${file}#${at}`, issues)
    const kind = toText(entry.kind)
    const q = toText(entry.q)
    if (!(SHOP_KINDS as readonly string[]).includes(kind)) {
      issues.push({
        file,
        item: itemLabel,
        code: 'items_shop_kind_unknown',
        message: `未知の販売先です（${kind || '(空)'}）`,
        hint: `使える kind: ${SHOP_KINDS.join(', ')}`,
      })
      return
    }
    if (!q) {
      issues.push({
        file,
        item: itemLabel,
        code: 'items_field_missing',
        message: 'shops の q（検索語）が空です',
        hint: '検索語だけを書く（URL は書けない）',
      })
      return
    }
    shops.push({ kind: kind as ShopKind, q })
  })
  return shops
}

const COMPARE_FIELDS = ['caption', 'rows'] as const
const COMPARE_ROW_FIELDS = ['name', 'point', 'source'] as const

/** 候補が複数ある品目の比較表（2 行以上・各行に出典 URL 必須） */
function parseCompare(
  value: unknown,
  file: string,
  itemLabel: string,
  issues: ItemIssue[],
): ItemCompare | undefined {
  if (value === undefined) return undefined
  const at = `${itemLabel}.compare`
  if (!isRecord(value)) {
    issues.push({
      file,
      item: itemLabel,
      code: 'items_compare_invalid',
      message: 'compare は caption / rows を持つマップです',
      hint: 'caption: 見出し / rows: [{name, point, source}]',
    })
    return undefined
  }
  rejectUnknownKeys(value, COMPARE_FIELDS, `${file}#${at}`, issues)
  const before = issues.length
  const caption = toText(value.caption)
  if (!caption)
    issues.push({
      file,
      item: at,
      code: 'items_field_missing',
      message: 'compare.caption が空です',
      hint: '例: 消毒・除菌の方式くらべ',
    })

  const rows: CompareRow[] = []
  if (!Array.isArray(value.rows) || value.rows.length < 2) {
    issues.push({
      file,
      item: at,
      code: 'items_compare_invalid',
      message: 'compare.rows は候補を 2 件以上並べます',
      hint: '1 件なら compare を削って note に書く',
    })
  } else {
    value.rows.forEach((row, index) => {
      const rat = `${at}.rows[${index}]`
      if (!isRecord(row)) {
        issues.push({
          file,
          item: rat,
          code: 'items_compare_invalid',
          message: '比較行は name / point / source を持つマップです',
          hint: '- name: 候補名 / point: 使いやすさと実測価格 / source: 出典 URL',
        })
        return
      }
      rejectUnknownKeys(row, COMPARE_ROW_FIELDS, `${file}#${rat}`, issues)
      const name = toText(row.name)
      const point = toText(row.point)
      const source = toText(row.source)
      const rowBefore = issues.length
      if (!name)
        issues.push({
          file,
          item: rat,
          code: 'items_field_missing',
          message: '比較行の name が空です',
          hint: '例: 煮沸消毒（家の鍋で）',
        })
      if (!point)
        issues.push({
          file,
          item: rat,
          code: 'items_field_missing',
          message: `比較行 "${name || rat}" の point が空です`,
          hint: '手間・時間・実売価格（税込と単位）を書く',
        })
      if (!/^https?:\/\//.test(source))
        issues.push({
          file,
          item: rat,
          code: 'items_source_url_invalid',
          message: `比較行 "${name || rat}" の source が http(s) URL ではありません`,
          hint: 'band の sources[] に登録した URL を書く',
        })
      if (issues.length > rowBefore) return
      rows.push({ name, point, source })
    })
  }

  if (issues.length > before) return undefined
  return { caption, rows }
}

function parseItem(value: unknown, file: string, index: number, issues: ItemIssue[]): Item | undefined {
  const at = `items[${index}]`
  if (!isRecord(value)) {
    issues.push({
      file,
      item: at,
      code: 'items_field_invalid',
      message: 'アイテムはフィールドを持つマップです',
      hint: 'id / name / category / need / startMonth / endMonth / whySources を書く',
    })
    return undefined
  }
  rejectUnknownKeys(value, ITEM_FIELDS, `${file}#items[${index}]`, issues)
  const label = toText(value.id) || at
  const before = issues.length

  const id = toText(value.id)
  const name = toText(value.name)
  const category = toText(value.category)
  const need = toText(value.need)
  const startMonth = toMonth(value.startMonth)
  const endMonth = value.endMonth === undefined ? undefined : toMonth(value.endMonth)
  const size = toText(value.size)
  const note = toText(value.note)
  const compare = parseCompare(value.compare, file, label, issues)

  if (!ID_PATTERN.test(id))
    issues.push({
      file,
      item: label,
      code: 'items_id_invalid',
      message: `アイテムの id が不正です（${id || '(空)'}）`,
      hint: 'a-z0-9 と - の半角英数小文字（例: nb-baby-bath）',
    })
  if (!name)
    issues.push({
      file,
      item: label,
      code: 'items_field_missing',
      message: 'アイテムの name が空です',
      hint: '例: 短肌着',
    })
  if (!note)
    issues.push({
      file,
      item: label,
      code: 'items_field_missing',
      message: `アイテム "${id || label}" の note が空です`,
      hint: 'この時期に必要なの理由と使い方の目安を書く',
    })
  if (!(ITEM_CATEGORIES as readonly string[]).includes(category)) {
    issues.push({
      file,
      item: label,
      code: 'items_category_unknown',
      message: `category が未知です（${category || '(空)'}）`,
      hint: `使える category: ${ITEM_CATEGORIES.join(', ')}`,
    })
  }
  if (!(ITEM_NEEDS as readonly string[]).includes(need)) {
    issues.push({
      file,
      item: label,
      code: 'items_need_unknown',
      message: `need が未知です（${need || '(空)'}）`,
      hint: 'must（そろえる）または useful（あると便利）',
    })
  }
  if (startMonth === undefined) {
    issues.push({
      file,
      item: label,
      code: 'items_month_invalid',
      message: 'startMonth が整数ではありません',
      hint: '妊娠中は -1、生後 n か月は n',
    })
  } else if (startMonth > MAX_END_MONTH) {
    issues.push({
      file,
      item: label,
      code: 'items_month_out_of_range',
      message: `startMonth が範囲外です（${startMonth}）`,
      hint: `${MIN_MONTH}〜${MAX_END_MONTH} の範囲で書く`,
    })
  }
  if (endMonth !== undefined) {
    if (endMonth > MAX_END_MONTH)
      issues.push({
        file,
        item: label,
        code: 'items_month_out_of_range',
        message: `endMonth が範囲外です（${endMonth}）`,
        hint: `${MAX_END_MONTH}（7 歳）まで。2 歳以降も使う意味なら 84 を使う`,
      })
    else if (startMonth !== undefined && endMonth < startMonth) {
      issues.push({
        file,
        item: label,
        code: 'items_month_range_reversed',
        message: `endMonth が startMonth より前の月です（${endMonth} < ${startMonth}）`,
        hint: 'endMonth >= startMonth にする',
      })
    }
  }

  const whySources = Array.isArray(value.whySources)
    ? value.whySources.map((u) => toText(u)).filter((u) => u.length > 0)
    : []
  if (whySources.length === 0) {
    issues.push({
      file,
      item: label,
      code: 'items_why_sources_missing',
      message: 'whySources（月齢・サイズ根拠の URL）が空です',
      hint: 'band の sources[] に登録した URL を 1 つ以上書く',
    })
  }

  const price = parsePrice(value.price, file, label, issues)
  const shops = parseShops(value.shops, file, label, issues)

  if (issues.length > before) return undefined
  const item: Item = {
    id,
    name,
    category: category as ItemCategory,
    need: need as ItemNeed,
    startMonth: startMonth as number,
    note,
    whySources,
    shops,
  }
  if (endMonth !== undefined) item.endMonth = endMonth
  if (size) item.size = size
  if (compare) item.compare = compare
  if (price) item.price = price
  return item
}

export function parseItemsFile(content: string, name: string): ItemsParseResult {
  const issues: ItemIssue[] = []
  let front: unknown
  let body = ''
  try {
    const parsed = matter(content)
    front = parsed.data
    body = parsed.content
  } catch (error) {
    return {
      ok: false,
      issues: [
        {
          file: name,
          code: 'items_invalid_yaml',
          message: `frontmatter の YAML が解析できません: ${error instanceof Error ? error.message : String(error)}`,
          hint: 'インデントは半角スペース、コロンは半角で書く',
        },
      ],
    }
  }
  if (!isRecord(front)) {
    return {
      ok: false,
      issues: [
        {
          file: name,
          code: 'items_invalid_yaml',
          message: 'frontmatter がマップではありません',
          hint: 'band: ... から始まるマップにする',
        },
      ],
    }
  }
  if (body.trim() !== '') {
    return {
      ok: false,
      issues: [
        {
          file: name,
          code: 'items_body_not_allowed',
          message: 'frontmatter の外に本文があります',
          hint: 'items/*.md は YAML frontmatter のみで構成する（本文を書いても描画されず、検証もすり抜けます）',
        },
      ],
    }
  }

  const bandId = toText(front.band)
  const label = toText(front.label)
  const monthsFrom = toMonth(front.monthsFrom)
  const monthsTo = toMonth(front.monthsTo)
  const intro = toText(front.intro)
  const caution = toText(front.caution)

  if (!(ITEM_BAND_IDS as readonly string[]).includes(bandId)) {
    issues.push({
      file: name,
      code: 'items_band_unknown',
      message: `band が未知です（${bandId || '(空)'}）`,
      hint: `使える band: ${ITEM_BAND_IDS.join(', ')}`,
    })
  }
  if (!label)
    issues.push({
      file: name,
      code: 'items_field_missing',
      message: 'label が空です',
      hint: '例: 生後4〜6か月',
    })
  if (monthsFrom === undefined || monthsTo === undefined) {
    issues.push({
      file: name,
      code: 'items_month_invalid',
      message: 'monthsFrom / monthsTo が整数ではありません',
      hint: '妊娠中は -1 を使う',
    })
  } else if (monthsFrom > monthsTo) {
    issues.push({
      file: name,
      code: 'items_month_range_reversed',
      message: `monthsFrom > monthsTo です（${monthsFrom} > ${monthsTo}）`,
      hint: 'monthsFrom <= monthsTo にする',
    })
  } else if (monthsFrom < MIN_MONTH || monthsTo > 24) {
    issues.push({
      file: name,
      code: 'items_month_out_of_range',
      message: `band の対象月が範囲外です（${monthsFrom}〜${monthsTo}）`,
      hint: '-1〜24 の範囲（2 歳超は別 band に含める）',
    })
  }
  if (!intro)
    issues.push({
      file: name,
      code: 'items_field_missing',
      message: 'intro が空です',
      hint: 'この時期の方針を 1〜2 文（ページ本文に使う）',
    })
  if (!caution)
    issues.push({
      file: name,
      code: 'items_field_missing',
      message: 'caution が空です',
      hint: '月齢・サイズは目安／製品表示を優先と明記する',
    })

  const sources = parseSources(front.sources, name, issues)
  if (sources.length === 0) {
    issues.push({
      file: name,
      code: 'items_sources_missing',
      message: 'sources が空です',
      hint: 'この band で使う出典を name / url / checked で登録する',
    })
  }
  const support = parseSupport(front.support, name, issues)

  const items: Item[] = []
  if (!Array.isArray(front.items) || front.items.length === 0) {
    issues.push({
      file: name,
      code: 'items_empty',
      message: 'items が空です',
      hint: 'items: に品目のリストを書く',
    })
  } else {
    front.items.forEach((entry: unknown, index: number) => {
      const item = parseItem(entry, name, index, issues)
      if (item) items.push(item)
    })
  }

  if (issues.length > 0) return { ok: false, issues }
  const band: ItemsBand = {
    id: bandId as ItemBandId,
    label,
    monthsFrom: monthsFrom as number,
    monthsTo: monthsTo as number,
    intro,
    caution,
    sources,
    support,
    items,
    fileName: name,
  }
  // 出典参照の整合性（1 ファイル内で完結する検証）は解析の時点で弾む。
  // バンド横断の検証は items-validate.ts が担う。
  const refIssues = checkSourceReferences(band, name)
  if (refIssues.length > 0) return { ok: false, issues: refIssues }
  return { ok: true, band, issues: [] }
}

/**
 * 出典参照の整合性を検証する純関数。
 * 1. 引用されている URL は必ず band.sources[] に登録されていること（切れた参照）
 * 2. band.sources[] の各 URL は必ず 1 つ以上の出典先から参照されていること
 *    （生きた URL を登録だけして使わない「置き去り」を防ぐ）
 * 同一ファイル内の情報だけで完結するので、parse 段でも validate 段でも同じ結果になる。
 */
export function checkSourceReferences(band: ItemsBand, file: string): ItemIssue[] {
  const issues: ItemIssue[] = []
  const registeredUrls = new Set(band.sources.map((s) => s.url))
  const usedUrls = new Set<string>()
  for (const item of band.items) {
    for (const url of item.whySources) {
      usedUrls.add(url)
      if (!registeredUrls.has(url)) {
        issues.push({
          file,
          item: item.id,
          code: 'items_source_not_registered',
          message: `whySources の URL が band の sources[] にありません（${url}）`,
          hint: '出典は band の sources[] に name 付きで登録する（画面に出る出典一覧がこの URL を参照します）',
        })
      }
    }
    if (item.compare) {
      for (const row of item.compare.rows) {
        usedUrls.add(row.source)
        if (!registeredUrls.has(row.source)) {
          issues.push({
            file,
            item: item.id,
            code: 'items_source_not_registered',
            message: `compare.rows の URL が band の sources[] にありません（${row.source}）`,
            hint: '比較行の出典も band の sources[] に登録する',
          })
        }
      }
    }
    if (item.price) {
      for (const url of item.price.sources) {
        usedUrls.add(url)
        if (!registeredUrls.has(url)) {
          issues.push({
            file,
            item: item.id,
            code: 'items_source_not_registered',
            message: `price.sources の URL が band の sources[] にありません（${url}）`,
            hint: '価格の根拠も band の sources[] に登録する（調査日が 180 日を超えるとビルド時に警告）',
          })
        }
      }
    }
  }
  for (const supportItem of band.support) {
    usedUrls.add(supportItem.source)
    if (!registeredUrls.has(supportItem.source)) {
      issues.push({
        file,
        item: supportItem.id,
        code: 'items_source_not_registered',
        message: `support.source が band の sources[] にありません（${supportItem.source}）`,
        hint: '区の支援情報の出典も band の sources[] に登録する',
      })
    }
  }
  for (const source of band.sources) {
    if (!usedUrls.has(source.url)) {
      issues.push({
        file,
        code: 'items_source_unreferenced',
        message: `sources[] の「${source.name}」を出典として参照していません（${source.url}）`,
        hint: 'sources[] は実際に引用した出典だけを登録する。不要なら削除し、使うなら items の whySources / price.sources / support.source から参照する',
      })
    }
  }
  return issues
}
