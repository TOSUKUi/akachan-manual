import { describe, expect, it } from 'vitest'
import { ITEMS_DATA } from '@/generated/items-data'
import { parseItemsFile } from '../items-parse'
import { buildItemsData, validateItems } from '../items-validate'
import { resolveShopLinks, shopUrl } from '../shop-links'
import {
  ITEM_BAND_IDS,
  compactYenRange,
  filterItems,
  monthLabel,
  monthLabelCompact,
  monthPoint,
  monthRangeLabel,
  summarize,
  type Item,
  type ItemsBand,
} from '../items-model'

const MINIMAL = `---
band: m4-6
label: 生後4〜6か月
monthsFrom: 4
monthsTo: 6
intro: 離乳食が始まる時期です。
caution: 発達は個人差が大きいです。製品表示も確認してください。
sources:
  - name: 西松屋 離乳食グッズ
    url: https://www.24028.jp/example/
    checked: 2026-09-01
items:
  - id: m46-spoon
    name: 離乳食用スプーン
    category: tabe
    need: must
    startMonth: 5
    endMonth: 18
    size: 1本＋替え1本
    note: 生後5〜6か月ごろから離乳食を始めます。
    whySources:
      - https://www.24028.jp/example/
    price:
      low: 300
      high: 1200
      unit: 1本（税込）
      sources:
        - https://www.24028.jp/example/
      checked: 2026-09-01
    shops:
      - kind: nishimatyaya
        q: 離乳食 スプーン
---
`

function bandOf(raw: string): ItemsBand {
  const result = parseItemsFile(raw, 'test.md')
  if (!result.ok) throw new Error(result.issues.map((i) => i.message).join('; '))
  return result.band
}

function mutate(patch: (band: ItemsBand) => void): ItemsBand {
  const band = bandOf(MINIMAL)
  patch(band)
  return band
}

/** 8区分すべてを埋めた最小データ（区分欠落チェックを通すため） */
function allBands(overrides: Partial<Record<string, ItemsBand>> = {}): ItemsBand[] {
  return ITEM_BAND_IDS.map(
    (id) =>
      overrides[id] ??
      bandOf(
        MINIMAL.replace('band: m4-6', `band: ${id}`)
          .replace('items:\n', 'items:\n')
          .replace('id: m46-spoon', `id: ${id}-spoon`),
      ),
  )
}

describe('parseItemsFile', () => {
  it('正規の band を解釈できる', () => {
    const band = bandOf(MINIMAL)
    expect(band.id).toBe('m4-6')
    expect(band.monthsFrom).toBe(4)
    expect(band.items[0].endMonth).toBe(18)
    expect(band.items[0].price?.low).toBe(300)
    expect(band.items[0].shops).toEqual([{ kind: 'nishimatyaya', q: '離乳食 スプーン' }])
  })

  it('文字列の月齢・価格も数値化する', () => {
    const band = bandOf(MINIMAL.replace('startMonth: 5', 'startMonth: "5"').replace('low: 300', 'low: "300"'))
    expect(band.items[0].startMonth).toBe(5)
    expect(band.items[0].price?.low).toBe(300)
  })

  it('未知の band / category / need を弾く', () => {
    const issues = parseItemsFile(MINIMAL.replace('band: m4-6', 'band: m3-4'), 'test.md')
    expect(!issues.ok).toBe(true)
    if (!issues.ok) expect(issues.issues.some((i) => i.message.includes('band'))).toBe(true)

    const cat = parseItemsFile(MINIMAL.replace('category: tabe', 'category: food'), 'test.md')
    expect(!cat.ok).toBe(true)

    const need = parseItemsFile(MINIMAL.replace('need: must', 'need: essential'), 'test.md')
    expect(!need.ok).toBe(true)
  })

  it('shops に url を書かれたら拒否する', () => {
    const result = parseItemsFile(
      MINIMAL.replace(
        'q: 離乳食 スプーン',
        'q: 離乳食 スプーン\n        url: https://www.amazon.co.jp/dp/ABC1234',
      ),
      'test.md',
    )
    expect(!result.ok).toBe(true)
    if (!result.ok) expect(result.issues.some((i) => i.message.includes('url は書けません'))).toBe(true)
  })

  it('whySources が band の sources[] に無い URL なら失敗する', () => {
    const result = parseItemsFile(
      MINIMAL.replace(
        '- https://www.24028.jp/example/\n    price',
        '- https://example.com/elsewhere\n    price',
      ),
      'test.md',
    )
    expect(!result.ok).toBe(true)
    if (!result.ok) expect(result.issues.some((i) => i.message.includes('sources[]'))).toBe(true)
  })
})

describe('validateItems', () => {
  const now = new Date('2026-09-01T00:00:00Z')

  it('全 band 揃った最小データは通る', () => {
    const report = validateItems(allBands(), now)
    expect(report.errors.map((e) => e.message)).toEqual([])
    expect(report.ok).toBe(true)
  })

  it('区分が欠けていれば失敗する', () => {
    const bands = allBands().filter((b) => b.id !== 'm19-24')
    const report = validateItems(bands, now)
    expect(report.ok).toBe(false)
    expect(report.errors.some((e) => e.message.includes('m19-24'))).toBe(true)
  })

  it('月齢 range が逆順なら失敗する', () => {
    const report = validateItems(allBands({ 'm4-6': mutate((b) => (b.monthsTo = 2)) }), now)
    expect(report.ok).toBe(false)
    expect(report.errors.some((e) => e.message.includes('band の対象月が不正'))).toBe(true)
  })

  it('startMonth > endMonth は失敗する', () => {
    const band = mutate((b) => {
      b.items[0].endMonth = 2
    })
    const report = validateItems(allBands({ 'm4-6': band }), now)
    expect(report.errors.some((e) => e.message.includes('endMonth が startMonth より前'))).toBe(true)
  })

  it('根拠 URL が無いアイテムは失敗する', () => {
    const band = mutate((b) => {
      b.items[0].whySources = []
    })
    const report = validateItems(allBands({ 'm4-6': band }), now)
    expect(report.errors.some((e) => e.message.includes('whySources'))).toBe(true)
  })

  it('価格の source が sources[] に無ければ失敗する', () => {
    const band = mutate((b) => {
      b.items[0].price!.sources = ['https://not-registered.example/']
    })
    const report = validateItems(allBands({ 'm4-6': band }), now)
    expect(report.errors.some((e) => e.message.includes('price.sources'))).toBe(true)
  })

  it('low > high の価格帯は失敗する', () => {
    const band = mutate((b) => {
      b.items[0].price = { ...b.items[0].price!, low: 2000, high: 1000 }
    })
    const report = validateItems(allBands({ 'm4-6': band }), now)
    expect(report.errors.some((e) => e.message.includes('low'))).toBe(true)
  })

  it('本文に混入した URL も失敗する', () => {
    const band = mutate((b) => {
      b.items[0].note = 'https://www.amazon.co.jp/dp/ABC1234 で売っています'
    })
    const report = validateItems(allBands({ 'm4-6': band }), now)
    expect(report.errors.some((e) => e.message.includes('URL が混入'))).toBe(true)
  })

  it('band 横断で item.id が重複すれば失敗する', () => {
    const dup = mutate((b) => {
      b.id = 'm7-9'
      b.monthsFrom = 7
      b.monthsTo = 9
      b.fileName = '04-7-9m.md'
      b.items[0].id = 'm4-6-spoon'
    })
    const report = validateItems(allBands({ 'm7-9': dup }), now)
    expect(report.errors.some((e) => e.message.includes('item.id がサイト全体で重複'))).toBe(true)
  })

  it('support.source が sources[] に無ければ失敗する', () => {
    const band = mutate((b) => {
      b.support = [
        {
          id: 's1',
          title: '健診',
          detail: '説明',
          source: 'https://elsewhere.example/',
        },
      ]
    })
    const report = validateItems(allBands({ 'm4-6': band }), now)
    expect(report.errors.some((e) => e.item === 's1' && e.message.includes('sources[]'))).toBe(true)
  })

  it('item の endMonth が startMonth より前 / 上限超なら失敗する', () => {
    const reversed = mutate((b) => {
      b.items[0].startMonth = 7
      b.items[0].endMonth = 6
    })
    const r1 = validateItems(allBands({ 'm4-6': reversed }), now)
    expect(r1.errors.some((e) => e.message.includes('endMonth が startMonth より前'))).toBe(true)

    const tooOld = mutate((b) => {
      b.items[0].endMonth = 85
    })
    const r2 = validateItems(allBands({ 'm4-6': tooOld }), now)
    expect(r2.errors.some((e) => e.code === 'items_month_out_of_range')).toBe(true)
  })

  it('band.sources に登録だけして参照しない出典を失敗扱いにする', () => {
    const band = mutate((b) => {
      b.sources = [
        ...b.sources,
        {
          name: '未使用の出典',
          url: 'https://example.com/unused/',
          checked: '2026-09-01',
        },
      ]
    })
    const report = validateItems(allBands({ 'm4-6': band }), now)
    expect(report.errors.some((e) => e.code === 'items_source_unreferenced')).toBe(true)
  })

  it('調査日が未来日の出典・価格は失敗扱いにする（未実施の確認を「済」にしない）', () => {
    const band = mutate((b) => {
      b.sources[0] = { ...b.sources[0], checked: '2999-01-01' }
      b.items[0].price = { ...b.items[0].price!, checked: '2999-01-01' }
    })
    const report = validateItems(allBands({ 'm4-6': band }), now)
    expect(report.ok).toBe(false)
    const codes = report.errors.filter((e) => e.code === 'items_checked_date_future').map((e) => e.item)
    expect(codes).toContain('m46-spoon')
  })

  it('CI（UTC ランナー）でも JST の調査日を未来日として誤検知しない', () => {
    // JST 2026-09-02 06:16 = UTC 2026-09-01 21:16。UTC で「今日」を計算すると 09-02 が未来になる
    const band = mutate((b) => {
      b.sources[0] = { ...b.sources[0], checked: '2026-09-02' }
      b.items[0].price = { ...b.items[0].price!, checked: '2026-09-02' }
    })
    const ciNow = new Date('2026-09-01T21:16:00Z')
    const ok = validateItems(allBands({ 'm4-6': band }), ciNow)
    expect(ok.errors.map((e) => e.code)).not.toContain('items_checked_date_future')

    // 本当に未来日は弾く（JST 2026-09-01 時点では 09-02 は未来）
    const report = validateItems(allBands({ 'm4-6': band }), new Date('2026-09-01T00:00:00Z'))
    expect(report.errors.map((e) => e.code)).toContain('items_checked_date_future')
  })

  it('価格の調査日が 180 日超なら警告（失敗はしない）', () => {
    const band = mutate((b) => {
      b.items[0].price = { ...b.items[0].price!, checked: '2025-01-01' }
    })
    const report = validateItems(allBands({ 'm4-6': band }), now)
    expect(report.ok).toBe(true)
    expect(report.warnings.some((w) => w.message.includes('価格の鮮度'))).toBe(true)
  })
})

describe('shop-links', () => {
  it('5販売先の検索URLを組み立てる', () => {
    expect(shopUrl({ kind: 'amazon', q: 'ベビーベッド' })).toBe(
      'https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%99%E3%83%83%E3%83%89',
    )
    expect(shopUrl({ kind: 'rakuten', q: '授乳クッション' })).toContain('search.rakuten.co.jp/search/mall/')
    // 販売先の検索URL形式は 2026-09-02 に実サイトへアクセスして確認したもの
    expect(shopUrl({ kind: 'nishimatyaya', q: '短肌着' })).toBe(
      'https://www.24028-net.jp/item_list.html?searchbox=1&q=%E7%9F%AD%E8%82%8C%E7%9D%80',
    )
    expect(shopUrl({ kind: 'akachan', q: 'ベビーカー' })).toBe(
      'https://shop.akachan.jp/shop/goods/search.aspx?keyword=%E3%83%99%E3%83%93%E3%83%BC%E3%82%AB%E3%83%BC',
    )
    expect(shopUrl({ kind: 'uniqlo', q: 'ベビー 肌着' })).toContain('uniqlo.com/jp/ja/search/?q=')
  })

  it('未知の kind と空の検索語は例外', () => {
    expect(() => shopUrl({ kind: 'mercli', q: 'x' } as never)).toThrow()
    expect(() => shopUrl({ kind: 'amazon', q: '   ' })).toThrow()
  })

  it('resolveShopLinks は kind と検索語を保持したまま URL を添える', () => {
    const [link] = resolveShopLinks([{ kind: 'rakuten', q: '哺乳瓶' }])
    expect(link.kind).toBe('rakuten')
    expect(link.q).toBe('哺乳瓶')
    expect(link.url).toMatch(/^https:\/\/search\.rakuten\.co\.jp/)
  })
})

describe('表示ラベル', () => {
  it('月ラベル', () => {
    expect(monthPoint(-1)).toBe('妊娠中')
    expect(monthPoint(0)).toBe('0 か月')
    expect(monthPoint(5)).toBe('5 か月')
    expect(monthPoint(12)).toBe('1 歳')
    expect(monthPoint(18)).toBe('1 歳 6 か月')
    expect(monthPoint(24)).toBe('2 歳')
  })

  it('使用期間ラベル', () => {
    expect(monthRangeLabel(5)).toBe('5 か月ごろから')
    expect(monthRangeLabel(5, 5)).toBe('5 か月ごろ')
    expect(monthRangeLabel(-1, 6)).toBe('妊娠中〜6 か月ごろ')
    expect(monthRangeLabel(2, 6)).toBe('2〜6 か月ごろ')
    expect(monthRangeLabel(0, 1)).toBe('0〜1 か月ごろ')
    expect(monthRangeLabel(-1, 84)).toBe('妊娠中から（2 歳以降も継続）')
    expect(monthRangeLabel(13, 24)).toBe('1 歳 1 か月〜2 歳ごろ')
    // 本サイトの band 上限（24 か月）を超える使用期間は、素の月数を晒さず「2 歳以降も継続」と書く
    for (const [from, to] of [
      [-1, 84],
      [13, 84],
      [18, 84],
      [25, 84],
    ] as const) {
      const label = monthRangeLabel(from, to)
      expect(label).toContain('2 歳以降も継続')
      expect(label).not.toContain('84')
    }
  })
})

describe('band 内の月順ソート（AC-2）', () => {
  it('buildItemsData は band 内を使い始め月の昇順に並べ替える', () => {
    const data = buildItemsData(allBands())
    for (const band of data.bands) {
      const starts = band.items.map((i) => i.startMonth)
      expect(starts).toEqual([...starts].sort((a, b) => a - b))
    }
    // フラット一覧も band → 月順
    const flat = data.items.map((i) => `${i.bandId}:${i.startMonth}`)
    const bandOrder = new Map(ITEM_BAND_IDS.map((id, i) => [id, i]))
    const expected = [...data.items]
      .sort((a, b) => bandOrder.get(a.bandId)! - bandOrder.get(b.bandId)! || a.startMonth - b.startMonth)
      .map((i) => `${i.bandId}:${i.startMonth}`)
    expect(flat).toEqual(expected)
  })

  it('入力が逆順でも band 内は使い始め月の昇順に戻る', () => {
    const target = bandOf(
      MINIMAL.replace(
        'items:\n',
        `items:
  - id: m46-late
    name: のちにつかうもの
    category: asobi
    need: useful
    startMonth: 9
    note: あとから使うもの
    whySources:
      - https://www.24028.jp/example/
    shops: []
`,
      ),
    )
    const data = buildItemsData([target])
    expect(data.bands[0].items.map((i) => i.startMonth)).toEqual([5, 9])
    expect(data.items.map((i) => i.id)).toEqual(['m46-spoon', 'm46-late'])
  })
})

describe('buildItemsData', () => {
  it('band を時系列順に並べ、アイテムに bandId を付けたフラット一覧を作る', () => {
    const data = buildItemsData(allBands().reverse())
    expect(data.bands.map((b) => b.id)).toEqual([...ITEM_BAND_IDS])
    expect(data.items.every((i) => typeof i.bandId === 'string')).toBe(true)
    expect(data.sources.length).toBeGreaterThan(0)
  })
})

describe('絞り込み・集計の純関数', () => {
  const item = (over: Partial<Item>): Item => ({
    id: 'x',
    name: '品目',
    category: 'kiru',
    need: 'must',
    startMonth: 0,
    note: '説明',
    whySources: [],
    shops: [],
    ...over,
  })

  it('カテゴリ指定はそのカテゴリだけ通す', () => {
    const items = [item({ id: 'a', category: 'kiru' }), item({ id: 'b', category: 'neru' })]
    expect(filterItems(items, { categories: ['neru'], mustOnly: false }).map((i) => i.id)).toEqual(['b'])
    expect(filterItems(items, { categories: [], mustOnly: false })).toHaveLength(2)
  })

  it('必須のみフラグは must だけ通す', () => {
    const items = [item({ id: 'a', need: 'must' }), item({ id: 'b', need: 'useful' })]
    expect(filterItems(items, { categories: [], mustOnly: true }).map((i) => i.id)).toEqual(['a'])
  })

  it('カテゴリ複数選択は和集合（OR）で返す', () => {
    const items = [
      { ...item({}), id: '1', category: 'kiru' as const },
      { ...item({}), id: '2', category: 'tabe' as const },
      { ...item({}), id: '3', category: 'neru' as const },
    ]
    expect(filterItems(items, { categories: ['kiru', 'tabe'], mustOnly: false }).map((i) => i.id)).toEqual([
      '1',
      '2',
    ])
    expect(filterItems(items, { categories: [], mustOnly: true }).map((i) => i.id)).toEqual(['1', '2', '3'])
    expect(filterItems(items, { categories: ['neru'], mustOnly: true }).map((i) => i.id)).toEqual(['3'])
  })

  it('残り点数と残り予算レンジを計算する（価格なし品目は金額に含めない）', () => {
    const items = [
      item({
        id: 'a',
        price: {
          low: 1000,
          high: 2000,
          unit: '1個（税込）',
          sources: [],
          checked: '2026-09-01',
        },
      }),
      item({
        id: 'b',
        price: {
          low: 500,
          high: 800,
          unit: '1個（税込）',
          sources: [],
          checked: '2026-09-01',
        },
      }),
      item({ id: 'c' }),
    ]
    const all = summarize(items, [])
    expect(all).toMatchObject({
      total: 3,
      remaining: 3,
      done: 0,
      remainingLow: 1500,
      remainingHigh: 2800,
      priced: 2,
    })

    const oneDone = summarize(items, ['a'])
    expect(oneDone).toMatchObject({
      remaining: 2,
      done: 1,
      remainingLow: 500,
      remainingHigh: 800,
      priced: 1,
    })

    // 価格のわかる品目がすべて完了なら金額は 0
    expect(summarize(items, ['a', 'b'])).toMatchObject({
      remaining: 1,
      remainingLow: 0,
      remainingHigh: 0,
      priced: 0,
    })
  })
})

describe('月齢 chip のラベル（spec 0003 AC-3 / AC-13）', () => {
  const band = (id: ItemsBand['id'], monthsFrom: number, monthsTo: number): ItemsBand => ({
    id,
    label: id,
    monthsFrom,
    monthsTo,
    intro: '',
    caution: '',
    sources: [],
    support: [],
    items: [],
    fileName: `${id}.md`,
  })

  it('デスクトップは「妊娠期」「新生児 0〜1か月」「生後2〜3か月」形式', () => {
    expect(monthLabel(band('pregnancy', -1, -1))).toBe('妊娠期')
    expect(monthLabel(band('newborn', 0, 1))).toBe('新生児 0〜1か月')
    expect(monthLabel(band('m2-3', 2, 3))).toBe('生後2〜3か月')
    expect(monthLabel(band('m19-24', 19, 24))).toBe('生後19〜24か月')
  })

  it('モバイル省略形も band 範囲のまま（2 歳超の素の数値は作らない）', () => {
    expect(monthLabelCompact(band('pregnancy', -1, -1))).toBe('妊娠期')
    expect(monthLabelCompact(band('newborn', 0, 1))).toBe('新生児')
    expect(monthLabelCompact(band('m13-18', 13, 18))).toBe('13〜18か月')
    expect(monthLabelCompact(band('m19-24', 19, 24))).toBe('19〜24か月')
  })
})

describe('validateItems の追加ガード', () => {
  const now = new Date('2026-09-01T00:00:00Z')

  it('whySources が空の品目は失敗（根拠 URL 必須）', () => {
    const bands = allBands({
      'm4-6': mutate((b) => {
        b.items[0].whySources = []
      }),
    })
    expect(validateItems(bands, now).errors.map((e) => e.code)).toContain('items_why_sources_missing')
  })

  it('同じ band 内で item.id が重複すれば失敗', () => {
    const bands = allBands({
      'm4-6': mutate((b) => {
        b.items.push({ ...b.items[0], name: '同名ID' })
      }),
    })
    expect(validateItems(bands, now).errors.map((e) => e.code)).toContain('items_id_duplicate')
  })
})

describe('検索 URL', () => {
  it('検索語を二重エンコードしない（%25 を作らない）', () => {
    const url = shopUrl({ kind: 'amazon', q: 'ベビーベッド レンタル' })
    expect(url.startsWith('https://www.amazon.co.jp/s?k=')).toBe(true)
    expect(url).not.toContain('%25E3%2583%2599')
  })

  it('モバイル用の短縮形は 1 万円以上を万表記にまとめ、狭いレンジは中点の円表記にする', () => {
    expect(compactYenRange(1029250, 4899110)).toBe('102.9万〜489.9万円')
    expect(compactYenRange(3000000, 7250000)).toBe('300.0万〜725.0万円')
    expect(compactYenRange(4890000, 4899000)).toBe('4,894,500円前後')
    expect(compactYenRange(0, 0)).toBe('0円前後')
  })
})

describe('品目データの内容カバレッジ（spec 0003 AC-2 / 利用シナリオ1）', () => {
  const items = ITEMS_DATA.bands.flatMap((band) => band.items)

  it('0〜24か月のどの月を見ても1品以上ひっかかる（月齢の目盛り欠落の回帰防止）', () => {
    const uncovered: number[] = []
    for (let month = 0; month <= 24; month++) {
      const hits = items.filter((i) => i.startMonth <= month && month <= Math.max(i.endMonth, month))
      if (hits.length === 0) uncovered.push(month)
    }
    expect(uncovered).toEqual([])
  })

  it('どの band も5品以上あり、后半の band が痩せていない', () => {
    for (const band of ITEMS_DATA.bands) {
      expect(band.items.length, `${band.id} の品目数`).toBeGreaterThanOrEqual(5)
    }
  })

  it('サイズアウト・切り替え系が月齢順に並んでいる（服サイズは 60→70→80→90）', () => {
    const sizeRestock = items
      .filter((i) => /^服(・肌着)?の買い足し（\d+サイズ）$/.test(i.name))
      .sort((a, b) => a.startMonth - b.startMonth)
      .map((i) => i.name.match(/（(\d+)サイズ）/)?.[1])
    expect(sizeRestock).toEqual(['60', '70', '80', '90'])
  })
})
