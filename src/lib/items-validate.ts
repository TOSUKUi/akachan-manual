// items/*.md のビルド時検証。詳細は docs/specs/0003-item-timeline-page.md。
// エラー（＝公開前に必ず直すべき）:
//   - 8 区分がすべて欠けている / アイテムが 0 件の band がある
//   - band.id の未知・重複、対象月の範囲外 / 逆順
//   - アイテム id が band 内・サイト全体で重複
//   - なぜ今？の根拠（whySources）/ 価格の source / support.source が band の sources[] に存在しない
//   - band.sources[] に登録しているだけで誰も参照していない出典がある
//   - 価格の低くさ > 高くさ、価格単位が空
//   - note / size / intro / caution / detail への URL 混入（直リンクは専用フィールドにだけ書く）
//   - 出典の checked / 価格の checked が未来日（実施していない確認を「済」にできない）
// 警告（＝警告して続行、fact の AC-11 と同じ考え方）:
//   - 出典の checked / 価格の checked が ITEMS_STALE_DAYS より古い
import { daysFromIsoToJstDay, jstDateISO } from './date.ts'
import { checkSourceReferences, type ItemIssue } from './items-parse.ts'
import type { FactSource } from './fact-model.ts'
import {
  ITEM_BAND_IDS,
  ITEMS_STALE_DAYS,
  MAX_BAND_MONTH,
  MAX_END_MONTH,
  MIN_MONTH,
  type Item,
  type ItemsBand,
  type ItemsData,
} from './items-model.ts'
export interface ItemsReport {
  errors: ItemIssue[]
  warnings: ItemIssue[]
  ok: boolean
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export function validateItems(bands: ItemsBand[], now: Date = new Date()): ItemsReport {
  const errors: ItemIssue[] = []
  const warnings: ItemIssue[] = []
  const present = new Set<string>()
  const ownerOfItem = new Map<string, string>()

  for (const band of bands) {
    const file = band.fileName
    if (!(ITEM_BAND_IDS as readonly string[]).includes(band.id)) {
      errors.push({ file, code: 'items_band_unknown', message: `band.id が未知の区分です（${band.id}）` })
      continue
    }
    if (present.has(band.id)) {
      errors.push({
        file,
        code: 'items_band_duplicate',
        message: `band.id が重複しています（${band.id}）。同じ区分のファイルを 1 つに統合してください`,
      })
      continue
    }
    present.add(band.id)

    if (band.items.length === 0)
      errors.push({ file, code: 'items_empty', message: `${band.id} にアイテムが 1 件もありません` })
    if (band.monthsFrom < MIN_MONTH || band.monthsTo > MAX_BAND_MONTH || band.monthsFrom > band.monthsTo) {
      errors.push({
        file,
        code: 'items_month_out_of_range',
        message: `band の対象月が不正です（${band.monthsFrom}〜${band.monthsTo}）`,
        hint: '-1〜24 の範囲で monthsFrom <= monthsTo',
      })
    }

    const bandUrls = new Set<string>()
    band.sources.forEach((source: FactSource, i: number) => {
      if (!/^https?:\/\//.test(source.url))
        errors.push({
          file,
          code: 'items_source_url_invalid',
          message: `sources[${i}].url が http(s) URL ではありません（${source.url}）`,
        })
      if (bandUrls.has(source.url))
        errors.push({
          file,
          code: 'items_source_duplicate',
          message: `sources[${i}].url が band 内で重複しています（${source.url}）`,
          hint: '同じ出典は 1 回だけ登録する',
        })
      bandUrls.add(source.url)
      const stale = staleWarning(source.checked, `出典の鮮度（${source.name}）`)
      if (stale) warnings.push({ file, code: 'items_stale', message: stale })
      if (isFuture(source.checked))
        errors.push({
          file,
          code: 'items_checked_date_future',
          message: `sources[${i}].checked が未来日です（${source.checked}）。実際に確認した日を記入してください`,
        })
    })

    const seenInBand = new Set<string>()
    band.items.forEach((item: Item) => {
      const where = (message: string, code: string, hint?: string): ItemIssue => ({
        file,
        item: item.id,
        code,
        message,
        hint,
      })
      if (seenInBand.has(item.id))
        errors.push(where('item.id が band 内で重複しています', 'items_id_duplicate'))
      seenInBand.add(item.id)
      const owner = ownerOfItem.get(item.id)
      if (owner)
        errors.push(
          where(
            `item.id がサイト全体で重複しています（${owner} にも同名があります）`,
            'items_id_duplicate',
            'id に接頭辞（例: s6-）を付けて区切る',
          ),
        )
      else ownerOfItem.set(item.id, file)

      if (item.endMonth !== undefined && item.endMonth < item.startMonth) {
        errors.push(
          where(
            `endMonth が startMonth より前です（${item.endMonth} < ${item.startMonth}）`,
            'items_month_range_reversed',
            'endMonth >= startMonth にする（使い終わりの予定が無ければ endMonth を削る）',
          ),
        )
      }
      if ((item.endMonth ?? 0) > MAX_END_MONTH) {
        errors.push(
          where(
            `endMonth が範囲外です（${item.endMonth}）`,
            'items_month_out_of_range',
            `${MAX_END_MONTH}（7 歳）まで`,
          ),
        )
      }

      if (item.whySources.length === 0) errors.push(where('whySources が空です', 'items_why_sources_missing'))

      if (item.price) {
        const { low, high, unit, checked, sources } = item.price
        if (!(low > 0) || high < low)
          errors.push(
            where(
              `price が 0 < low <= high の関係ではありません（low: ${low}, high: ${high}）`,
              'items_price_invalid',
            ),
          )
        if (!unit) errors.push(where('price.unit が空です', 'items_price_invalid'))
        if (sources.length === 0) errors.push(where('price.sources が空です', 'items_price_source_missing'))
        const stale = staleWarning(checked, `価格の鮮度（${item.name}）`)
        if (stale) warnings.push({ file, item: item.id, code: 'items_stale', message: stale })
        if (isFuture(checked))
          errors.push(
            where(
              `price.checked が未来日です（${checked}）`,
              'items_checked_date_future',
              '実際に価格を確認した日を記入する',
            ),
          )
      }

      const compareText = item.compare
        ? item.compare.caption + item.compare.rows.map((r) => `${r.name}${r.point}`).join('')
        : ''
      const text = [item.name, item.note ?? '', item.size ?? '', compareText].join(' ')
      const leaked = text.match(/https?:\/\/\S+/)?.[0]
      if (leaked)
        errors.push(
          where(
            `name / note / size に URL が混入しています（${leaked}）`,
            'items_url_leak',
            '根拠は whySources / price.sources、販売先は shops の kind + q で書く',
          ),
        )
    })

    const seenSupport = new Set<string>()
    band.support.forEach((support) => {
      const where = (message: string, code: string, hint?: string): ItemIssue => ({
        file,
        item: support.id,
        code,
        message,
        hint,
      })
      if (seenSupport.has(support.id))
        errors.push(where('support.id が band 内で重複しています', 'items_id_duplicate'))
      seenSupport.add(support.id)
      const leaked = `${support.title}${support.detail}`.match(/https?:\/\/\S+/)?.[0]
      if (leaked)
        errors.push(
          where(
            `title / detail に URL が混入しています（${leaked}）`,
            'items_url_leak',
            'リンクは source フィールドに書く',
          ),
        )
    })

    // 出典参照の整合（未登録の参照 / 未使用の登録）は parse 段と同じ実装を再利用する
    errors.push(...checkSourceReferences(band, file))
  }

  const missing = ITEM_BAND_IDS.filter((id) => !present.has(id))
  for (const id of missing) {
    errors.push({
      file: 'items/',
      code: 'items_band_missing',
      message: `band "${id}" のファイルがありません（8 区分すべてが必要です）`,
    })
  }

  if (errors.length > 0) {
    return { errors, warnings, ok: false }
  }
  return { errors, warnings, ok: true }

  function staleWarning(checked: string | undefined, label: string): string | undefined {
    if (!ISO_DATE.test(checked ?? '')) return undefined
    const age = daysFromIsoToJstDay(checked as string, now)
    return age > ITEMS_STALE_DAYS
      ? `${label}が古い: 調査日 ${checked} は ${age} 日前（${ITEMS_STALE_DAYS} 日超）`
      : undefined
  }

  /** 調査日が当日より後なら「未実施の確認を済ませた」ことになる。ISO 日付以外は無視（形式は parse 段で弾く）。 */
  function isFuture(checked: string | undefined): boolean {
    if (!ISO_DATE.test(checked ?? '')) return false
    return (checked as string) > jstDateISO(now)
  }
}

/** 検証済み band を画面用のデータ構造にまとめる。band は ITEM_BAND_IDS の順、band 内は使い始め月の順にソートする。 */
export function buildItemsData(bands: ItemsBand[]): ItemsData {
  const order = new Map<string, number>(ITEM_BAND_IDS.map((id, i) => [id, i]))
  const sorted = [...bands].sort((a, b) => (order.get(a.id) ?? 99) - (order.get(b.id) ?? 99))
  const sources: ItemsData['sources'] = []
  const seen = new Set<string>()
  for (const band of sorted) {
    for (const source of band.sources) {
      const key = `${band.id}:${source.url}`
      if (seen.has(key)) continue
      seen.add(key)
      sources.push({ ...source, bandId: band.id })
    }
  }
  const byMonth = (a: Item, b: Item): number => a.startMonth - b.startMonth
  return {
    bands: sorted.map((band) => ({ ...band, items: [...band.items].sort(byMonth) })),
    items: sorted.flatMap((band) =>
      [...band.items].sort(byMonth).map((item) => ({ ...item, bandId: band.id })),
    ),
    sources,
  }
}
