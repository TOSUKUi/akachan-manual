// @vitest-environment jsdom
// /timeline の画面テスト。UI 文言をハードコードせず、生成済みデータ（ITEMS_DATA / SITE_DATA）から期待値を作る。
// 月齢レール・カテゴリnav・品目カードはすべて name / role で指す（テキストのみ一致の取りこぼしを防ぐ）。
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { routes } from '@/App'
import { useRoutes } from 'react-router-dom'
import { Component as TimelinePage } from '../timeline'
import { SITE_DATA } from '@/generated/site-data'
import { ITEMS_DATA } from '@/generated/items-data'
import { shopUrl } from '@/lib/shop-links'
import {
  CATEGORY_LABELS,
  ITEM_CATEGORIES,
  monthLabel,
  summarize,
  yen,
  type ItemCategory,
} from '@/lib/items-model'
import type { ItemsBand } from '@/lib/items-model'

const STORAGE_KEY = 'items-timeline:v1'

const data = () => ITEMS_DATA

/** 月齢 chip のラベルはページの実装と同じ組み立て（文言をテストに固定しない） */
const railLabel = (band: ItemsBand): string => monthLabel(band)

/** band のセクション（region）。見出し名で絞り込む */
const bandRegion = (label: string) => screen.getByRole('region', { name: label })
const categoryNav = () => screen.getByRole('navigation', { name: 'カテゴリで絞り込む' })
const monthRail = () => screen.getByRole('navigation', { name: '月齢で絞り込む' })

/** アプリ本体と同じルート構成で描画する（ランドマーク検証用） */
function AppRoutes() {
  return useRoutes(routes)
}

/** 準備状況と目安予算バー（デスクトップ専用。モバイル側に同名ボタンがあるためスコープを切る） */
const summaryBar = () => screen.getByRole('region', { name: '準備状況と目安予算' })
/** カテゴリ chip。テキストだけだと band 本文の「ねる」等に先行マッチするため button + 語句で絞る */
const categoryChip = (label: string) =>
  within(categoryNav()).getByRole('button', { name: new RegExp(`^${label}\\s*\\d+品$`) })
/** 品目カード内のチェックボックス（該当 band の中だけから探す） */
function checkboxIn(label: string, id: string) {
  const input = within(bandRegion(label)).getByRole('checkbox', { name: id })
  if (!(input instanceof HTMLInputElement)) throw new Error(`${id} の checkbox がありません`)
  return input
}

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  cleanup()
})

describe('/timeline', () => {
  it('初期描画は band を全開にし、先頭に h1 がある（AC-1）', () => {
    render(<TimelinePage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
    for (const band of data().bands) {
      expect(bandRegion(band.label)).toBeTruthy()
      // 全開なので品目名が本文として読める
      expect(within(bandRegion(band.label)).getByText(band.items[0].name)).toBeTruthy()
    }
    // 品目は band に属する順に並ぶ
    // band 見出しだけを拾って時系列順を確認（月齢レール等の h2 を除外）
    const order = screen
      .getAllByRole('heading', { level: 2 })
      .filter((h) => h.id.endsWith('-heading'))
      .map((h) => h.textContent)
    expect(order).toEqual(data().bands.map((b) => b.label))
    for (const band of data().bands) {
      expect(document.getElementById(band.id)).not.toBeNull()
    }
  })

  it('品目ごとに使い始め・なぜ今・価格と出典リンクを表示する（AC-5 / AC-6）', () => {
    render(<TimelinePage />)
    const band = data().bands[3]
    const item = band.items[0]
    const region = bandRegion(band.label)
    const nameEl = within(region).getByText(item.name)
    const card = nameEl.closest('li')
    if (!card) throw new Error(`${item.name} のカードが見当たりません`)

    const links = Array.from(card.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    const price = item.price
    if (price) {
      expect(links).toEqual(expect.arrayContaining(price.sources))
      expect(card.textContent).toContain(yen(price.low))
      expect(card.textContent).toContain(yen(price.high))
      expect(card.textContent).toMatch(/[0-9,]+円\s*〜\s*[0-9,]+円/)
      // 価格の調査日を画面に出す
      expect(card.textContent).toContain(price.checked)
      // 価格帯の幅が 2 倍以上なら「幅が大きい」と伝える
      if (price.high >= price.low * 2) expect(card.textContent).toContain('幅が大きい')
    }
    expect(links).toEqual(expect.arrayContaining(item.whySources))

    // 出典リンクのラベルは band の sources[].name（URL 文字列を晒さない）
    for (const url of [...item.whySources, ...(price?.sources ?? [])]) {
      const source = band.sources.find((s) => s.url === url)
      if (!source) throw new Error(`出典が未登録です: ${url}`)
      const anchor = Array.from(card.querySelectorAll('a')).find((a) => a.getAttribute('href') === url)
      if (!anchor) throw new Error(`リンクが見つかりません: ${url}`)
      expect(anchor.textContent).toContain(source.name)
    }

    // 月齢・サイズの根拠（本文）も出す
    expect(card.textContent).toContain(item.note)
  })

  it('band 内の品目は使い始め月の昇順で、2 歳超の品月は「2 歳以降」表記になる（AC-2 / AC-13）', () => {
    for (const band of data().bands) {
      const starts = band.items.map((i) => i.startMonth)
      expect(starts).toEqual([...starts].sort((a, b) => a - b))
    }
    render(<TimelinePage />)
    const longRunners = data().items.filter((i) => (i.endMonth ?? 0) > 24)
    expect(longRunners.length).toBeGreaterThan(0)
    for (const item of longRunners) {
      const card = screen.getByText(item.name).closest('li')
      if (!card) throw new Error(`${item.name} のカードがありません`)
      expect(card.textContent).toContain('2 歳以降も継続')
      expect(card.textContent).not.toContain('84 か月')
    }
  })

  it('カテゴリで絞り込める（OR 条件・複数選択可）。件数は band ごとに出る（AC-4）', () => {
    render(<TimelinePage />)
    const first = ITEMS_DATA.bands[0]
    const second = ITEMS_DATA.bands[1]

    // 「たべる」カテゴリを実データから特定（固有名詞をテストに固定しない）
    const target = (Object.keys(CATEGORY_LABELS) as ItemCategory[]).find((c) =>
      first.items.some((i) => i.category === c),
    )
    if (!target) throw new Error(`${first.id} に品目がありません`)
    const targetLabel = CATEGORY_LABELS[target]
    const expected = first.items.filter((i) => i.category === target).length
    expect(expected).toBeGreaterThan(0)

    fireEvent.click(categoryChip(targetLabel))
    expect(categoryChip(targetLabel).getAttribute('aria-pressed')).toBe('true')

    // 選択中の band 本文にはカテゴリ名の語が複数出ない（「ねる」などで取りこぼさない）
    const region = bandRegion(first.label)
    const inCategory = first.items.filter((i) => i.category === target)
    const sample = inCategory[0]
    expect(within(region).getAllByText(sample.name)).toHaveLength(1)

    // 対象カテゴリの全品目が残り、他カテゴリは落ちる（カテゴリ間は OR）
    for (const item of inCategory) {
      expect(within(region).getByText(item.name)).toBeTruthy()
    }
    for (const item of first.items.filter((i) => i.category !== target)) {
      expect(within(region).queryByText(item.name)).toBeNull()
    }
    // 件数が band の実数と一致
    expect(
      within(region).getByText(`表示 ${inCategory.length} 品・残り ${inCategory.length} 品`),
    ).toBeTruthy()
    // 選択したカテゴリを持たない band は本文にそのカテゴリ名を出さない
    if (!second.items.some((i) => i.category === target)) {
      expect(within(bandRegion(second.label)).queryByText(targetLabel)).toBeNull()
    }
  })

  it('カテゴリと必要度の絞り込みを組み合わせられる。該当 0 件ならその旨を出す（AC-4）', () => {
    render(<TimelinePage />)
    const first = data().bands[0]
    // 妊娠中に存在しないカテゴリを選ぶと、その band だけ 0 件になる
    const absent = ITEM_CATEGORIES.find((c) => !first.items.some((i) => i.category === c))
    if (!absent) throw new Error('妊娠中に存在しないカテゴリがありません')

    fireEvent.click(categoryChip(CATEGORY_LABELS[absent]))
    expect(
      within(bandRegion(first.label)).getByText('この時期で、いまの絞り込み条件に合う品目はありません。'),
    ).toBeTruthy()
    // 他の band には品目があるので、全体では 0 件にならない
    expect(screen.queryByText(/条件に合う品目が 0 件です/)).toBeNull()

    // 月齢を妊娠中に絞ると、いま見えている band が 0 件 → 大見出し下にも 0 件表示
    fireEvent.click(within(monthRail()).getByRole('button', { name: new RegExp(`^${railLabel(first)}`) }))
    expect(screen.getByText(/条件に合う品目が 0 件です/)).toBeTruthy()

    // 絞り込みをもどす（月齢はそのまま）→ さらに「すべて見る」で全開
    fireEvent.click(within(summaryBar()).getByRole('button', { name: '絞り込みをもどす' }))
    expect(screen.queryByText(/条件に合う品目が 0 件です/)).toBeNull()
    fireEvent.click(within(monthRail()).getByRole('button', { name: /^すべて見る/ }))
    expect(within(bandRegion(first.label)).getByText(first.items[0].name)).toBeTruthy()
  })

  it('月齢 chip は band 範囲のラベルを使い、2 歳超を素の数値（25 以上・84）で晒さない（AC-3 / AC-13）', () => {
    render(<TimelinePage />)
    const rail = monthRail().textContent ?? ''
    // 最後の band を含む全 band が chip として並ぶ
    for (const band of data().bands) expect(rail).toContain(monthLabel(band))
    expect(rail).toContain('全 71品')
    // 24 か月超の raw 月齢（25〜84）を画面に出さない
    expect(rail).not.toMatch(/(^|[^0-9])(2[5-9]|[3-9][0-9])\s*か月/)
    expect(rail).not.toContain('84')
  })

  it('モバイル用の吸着バーにも残り品数と残価額が同じ値で出る（AC-7）', () => {
    render(<TimelinePage />)
    const bar = screen.getByTestId('mobile-summary')
    // 画面幅が狭い画面でも残価額が常に見える位置にあり、全局バーと同一の値が出る
    expect(bar.className).toContain('sticky')
    expect(bar.className).toContain('lg:hidden')
    const priced = data().items.filter((i) => i.price)
    const man = (list: typeof priced, key: 'low' | 'high') =>
      (list.reduce((a, i) => a + (i.price ? i.price[key] : 0), 0) / 10000).toFixed(1)
    expect(bar.textContent).toContain(`残り ${data().items.length} 品`)
    expect(bar.textContent).toContain(`${man(priced, 'low')}万〜${man(priced, 'high')}万円`)
  })

  it('band を選ぶと band 見出しがいまの時期になり、選択を解くと中立に戻る（AC-3）', () => {
    const lastBand = data().bands[data().bands.length - 1]
    render(<TimelinePage />)
    const lastHeading = () =>
      within(bandRegion(lastBand.label)).getByRole('heading', { level: 2 }).parentElement as HTMLElement

    // 未選択時は現在マーカーを出さない
    expect(within(lastHeading()).queryByText('いまの時期')).toBeNull()

    fireEvent.click(within(monthRail()).getByRole('button', { name: new RegExp(`^${railLabel(lastBand)}`) }))
    expect(within(lastHeading()).getByText('いまの時期')).toBeTruthy()

    fireEvent.click(within(monthRail()).getByRole('button', { name: new RegExp(`^${railLabel(lastBand)}`) }))
    expect(within(lastHeading()).queryByText('いまの時期')).toBeNull()
  })

  it('月齢を選ぶと該当 band だけが開き、前後はたたむ（AC-3 / AC-9）', () => {
    // 妊娠中のチェックを 1 件復元するケース（loadDone の band ゼロ判定を同時に潰す）
    const targetBand = data().bands[2]
    const doneId = data().bands[0].items[0].id
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, done: [doneId] }))
    render(<TimelinePage />)

    fireEvent.click(
      within(monthRail()).getByRole('button', { name: new RegExp(`^${railLabel(targetBand)}`) }),
    )

    // 選択 band だけが開いている
    expect(within(bandRegion(targetBand.label)).getAllByRole('checkbox')).toHaveLength(
      targetBand.items.length,
    )
    for (const other of data().bands.filter((b) => b.id !== targetBand.id)) {
      const region = bandRegion(other.label)
      expect(within(region).queryAllByRole('checkbox')).toHaveLength(0)
      // たたんだ行に使用期間・状態・残数が残る（閉じても情報を見失わない）
      expect(within(region).getByText(/使用期間/)).toBeTruthy()
      expect(within(region).getByText(/過ぎた時期|これからの時期/)).toBeTruthy()
      expect(within(region).getByRole('button', { name: `${other.label}の品目を開く` })).toBeTruthy()
    }

    // 復元されたチェックが選択 band の集計に効いている
    const total = targetBand.items.length
    expect(within(bandRegion(targetBand.label)).getByText(`表示 ${total} 品・残り ${total} 品`)).toBeTruthy()

    // 選択 band の見出しに「いまの時期」が出る
    const heading = within(bandRegion(targetBand.label)).getByRole('heading', { level: 2 })
    const headingRow = heading.parentElement
    if (!headingRow) throw new Error(`${targetBand.label} の見出しラッパーがありません`)
    expect(within(headingRow as HTMLElement).getByText('いまの時期')).toBeTruthy()

    // もう一度同じ chip を押すと全開に戻る
    fireEvent.click(
      within(monthRail()).getByRole('button', { name: new RegExp(`^${railLabel(targetBand)}`) }),
    )
    for (const band of data().bands) {
      expect(within(bandRegion(band.label)).getAllByRole('checkbox')).toHaveLength(band.items.length)
    }

    // 「この時期だけをたたむ」で選択 band だけ閉じると、チェックボックスはどこにも出ない
    fireEvent.click(
      within(monthRail()).getByRole('button', { name: new RegExp(`^${railLabel(targetBand)}`) }),
    )
    fireEvent.click(
      within(bandRegion(targetBand.label)).getByRole('button', { name: /この時期だけをたたむ/ }),
    )
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
    expect(within(summaryBar()).getByRole('button', { name: /すべての時期を開く/ })).toBeTruthy()
    fireEvent.click(within(summaryBar()).getByRole('button', { name: /すべての時期を開く/ }))
    expect(screen.getAllByRole('checkbox')).toHaveLength(data().items.length)
  })

  it('チェック状態が localStorage に保存され、再描画で復元される。壊れた値も復元できる（AC-11）', async () => {
    const band = data().bands[0]
    const item = band.items[0]

    render(<TimelinePage />)
    const box = checkboxIn(band.label, item.name)
    fireEvent.click(box)
    await waitFor(() => {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) throw new Error('localStorage に保存されていません')
      expect(JSON.parse(raw)).toEqual({ v: 1, done: [item.id] })
    })
    cleanup()

    render(<TimelinePage />)
    expect(checkboxIn(band.label, item.name).checked).toBe(true)
    // チェック済みは残り品目と予算から引かれる
    expect(
      within(bandRegion(band.label)).getByText(
        `表示 ${band.items.length} 品・残り ${band.items.length - 1} 品`,
      ),
    ).toBeTruthy()
    cleanup()

    // JSON は壊れていないが形が違う値は、警告だけ出して初期状態から描画し直す
    window.localStorage.setItem(STORAGE_KEY, '{"v":1,"ok":true}')
    render(<TimelinePage />)
    expect(checkboxIn(band.label, item.name).checked).toBe(false)
    fireEvent.click(checkboxIn(band.label, item.name))
    await waitFor(() => {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) throw new Error('localStorage に保存されていません')
      expect(JSON.parse(raw)).toEqual({ v: 1, done: [item.id] })
    })
    cleanup()

    // 不正な JSON は無視して描画できる
    window.localStorage.setItem(STORAGE_KEY, '{bad')
    render(<TimelinePage />)
    expect(checkboxIn(band.label, item.name).checked).toBe(false)

    // チェックを入れてからまとめて外す
    fireEvent.click(checkboxIn(band.label, item.name))
    expect(checkboxIn(band.label, item.name).checked).toBe(true)
    fireEvent.click(within(summaryBar()).getByRole('button', { name: 'チェックをすべて外す' }))
    expect(checkboxIn(band.label, item.name).checked).toBe(false)
    await waitFor(() => {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) throw new Error('localStorage に保存されていません')
      expect(JSON.parse(raw)).toEqual({ v: 1, done: [] })
    })
  })

  it('合計目安金額が実データの集計と一致し、チェック分が引かれる（AC-11）', () => {
    render(<TimelinePage />)
    // 期待値はコンテンツから算出（金額・品目数をテストに二重化しない）
    const baseline = summarize(data().items, [])
    const budget = screen.getByRole('region', { name: '準備状況と目安予算' })
    expect(budget.textContent).toContain('残り品の目安予算')
    expect(budget.textContent).toContain(`${yen(baseline.remainingLow)}〜${yen(baseline.remainingHigh)}`)

    const first = data().bands[0]
    fireEvent.click(checkboxIn(first.label, first.items[0].name))
    const withCheck = summarize(data().items, [first.items[0].id])
    // チェックした品目の価格ぶんが引かれる（価格は正値なので残額が下がる）
    expect(withCheck.remainingLow).toBeLessThan(baseline.remainingLow)
    expect(budget.textContent).toContain(`${yen(withCheck.remainingLow)}〜${yen(withCheck.remainingHigh)}`)
    expect(screen.getByText(`全 ${baseline.total} 品目のうち`)).toBeTruthy()
    expect(screen.getByText(/準備完了 1 品/)).toBeTruthy()
  })

  it('章との関連リンクが fact/ の slug として解決できる（AC-1）', () => {
    render(<TimelinePage />)
    const related = screen
      .getAllByText(/を読む$/)
      .filter((el) => el.closest('a')?.getAttribute('href')?.endsWith('.html'))
    const slugs = SITE_DATA.chapters.map((c) => c.slug)
    expect(related.length).toBeGreaterThan(0)
    for (const el of related) {
      const anchor = el.closest('a')
      if (!anchor) throw new Error('関連リンクが a 要素ではありません')
      expect(slugs).toContain(anchor.getAttribute('href')?.replace('./', '').replace('.html', ''))
    }
  })

  it('販売先は各サイトの検索 URL のみ（商品直リンク・生の EC ドメインを晒さない）', () => {
    render(<TimelinePage />)
    const hosts = new Set<string>()
    for (const a of Array.from(document.querySelectorAll('a'))) {
      const href = a.getAttribute('href')
      if (href?.startsWith('http')) hosts.add(new URL(href).host)
    }
    const allowed = [
      'amazon.co.jp',
      'city.shinagawa.tokyo.jp',
      'pigeon.info',
      '24028-net.jp',
      '24028.jp',
      'rakuten.co.jp',
      'akachan.jp',
      'uniqlo.com',
      'nite.go.jp',
      'wbgt.env.go.jp',
      'cfa.go.jp',
      'tosukui.github.io',
      'example.com',
      'example.jp',
    ]
    for (const host of hosts) {
      expect(allowed.some((d) => host === d || host.endsWith(`.${d}`))).toBe(true)
    }
    // 存在しない EC ドメインを拾わない
    expect(hosts.has('nishimatsuya-website.net')).toBe(false)
    // 品目カードの販売先リンクは、5 販売先の検索 URL 形式のみを許容する
    const templates: Record<string, RegExp> = {
      amazon: /^https:\/\/www\.amazon\.co\.jp\/s\?k=/,
      rakuten: /^https:\/\/search\.rakuten\.co\.jp\/search\/mall\/.+\/$/,
      nishimatyaya: /^https:\/\/www\.24028-net\.jp\/item_list\.html\?searchbox=1&q=/,
      akachan: /^https:\/\/shop\.akachan\.jp\/shop\/goods\/search\.aspx\?keyword=/,
      uniqlo: /^https:\/\/www\.uniqlo\.com\/jp\/ja\/search\/\?q=/,
    }
    let checkedShops = 0
    for (const band of data().bands) {
      for (const item of band.items) {
        if (item.shops.length === 0) continue
        const card = within(bandRegion(band.label)).getByText(item.name).closest('li')
        if (!card) throw new Error(`${item.name} のカードがありません`)
        const links = Array.from(card.querySelectorAll('a'))
        for (const shop of item.shops) {
          const expected = shopUrl(shop)
          const anchor = links.find(
            (a) => a.getAttribute('href') === expected && (a.textContent ?? '').includes(item.name),
          )
          if (!anchor) throw new Error(`${item.name}: 品目名を含む販売先リンクが見つかりません ${expected}`)
          expect(anchor.getAttribute('href')).toMatch(templates[shop.kind])
          checkedShops += 1
        }
      }
    }
    expect(checkedShops).toBeGreaterThan(30)
  })

  it('band 内は使い始め月の順に並び、2 歳超の品月は数値を晒さない（AC-2 / AC-13）', () => {
    render(<TimelinePage />)
    const byId = new Map(data().items.map((i) => [`item-${i.id}`, i]))
    for (const band of data().bands) {
      const ids = within(bandRegion(band.label))
        .getAllByRole('checkbox')
        .map((cb) => (cb as HTMLInputElement).id)
      expect(ids).toHaveLength(band.items.length)
      const starts = ids.map((id) => byId.get(id)!.startMonth)
      expect(starts).toEqual([...starts].sort((a, b) => a - b))
    }

    // endMonth が band の上限（24 か月）を超える品目は「2 歳以降」ラベルを使い、素の月数を画面に出さない
    const longRunners = data().items.filter((i) => (i.endMonth ?? 0) > 24)
    expect(longRunners.length).toBeGreaterThan(0)
    for (const item of longRunners) {
      const card = screen.getByText(item.name).closest('li')
      if (!card) throw new Error(`${item.name} のカードがありません`)
      expect(card.textContent).toContain('2 歳以降')
      expect(card.textContent).not.toContain('84 か月')
    }
  })
})

describe('/timeline アクセシビリティ基線（spec 0001 / AC-12）', () => {
  /** 外部に出るリンク（品目の販売先リンク）だけを対象にする */
  const externalLinks = () =>
    Array.from(document.querySelectorAll('a')).filter((a) => {
      const href = a.getAttribute('href') ?? ''
      return href.startsWith('http') && /amazon|24028-net|shop\.akachan|uniqlo/.test(href)
    })

  it('ランドマーク構造: banner / main / 章 nav / 月齢 nav / カテゴリ nav（アプリ全体）', () => {
    if (!('IntersectionObserver' in globalThis)) {
      // Layout の BackToTopButton が使うため jsdom 用にスタブを当てる
      ;(globalThis as Record<string, unknown>).IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    }
    render(
      <MemoryRouter initialEntries={['/timeline']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getByRole('banner')).toBeTruthy()
    expect(screen.getByRole('main')).toBeTruthy()
    expect(screen.getByRole('navigation', { name: '章 navigation' })).toBeTruthy()
    expect(screen.getByRole('navigation', { name: '月齢で絞り込む' })).toBeTruthy()
    expect(screen.getByRole('navigation', { name: 'カテゴリで絞り込む' })).toBeTruthy()
    // チップの導線が実在（spec 0003 AC-1）
    expect(
      within(screen.getByRole('banner'))
        .getByRole('link', { name: /いつ・何を買う/ })
        .getAttribute('href'),
    ).toBe('./timeline.html')
  })

  it('見出し階層: h1 は1つ、band は h2 + region、品目名はチェックボックスの名前', () => {
    render(<TimelinePage />)
    const h1 = document.querySelectorAll('h1')
    expect(h1).toHaveLength(1)
    expect(h1[0].textContent).toContain('いつ、何を買う？')
    for (const band of data().bands) {
      const heading = document.getElementById(`${band.id}-heading`)
      expect(heading?.tagName).toBe('H2')
      const region = screen.getByRole('region', { name: band.label })
      expect(region.contains(heading)).toBe(true)
      for (const item of band.items) {
        // 品目名は label 経由でチェックボックスの名前になる（タップしやすく SR にも読ませる）
        expect(within(region).getByRole('checkbox', { name: item.name })).toBeTruthy()
      }
    }
  })

  it('価格差が2倍以上の品目は「幅が大きい」の注記を出す（AC-6）', () => {
    render(<TimelinePage />)
    const wide = data().items.filter((i) => i.price && i.price.high >= i.price.low * 2)
    expect(wide.length).toBeGreaterThan(0)
    for (const item of wide) {
      const card = screen.getByRole('checkbox', { name: item.name }).closest('li')
      expect(card?.textContent).toContain('幅が大きい')
    }
  })

  it('外部リンクは noopener noreferrer + 新しいタブである旨を sr-only で伝える', () => {
    render(<TimelinePage />)
    const links = externalLinks()
    expect(links.length).toBeGreaterThan(50)
    for (const a of links) {
      expect(a.getAttribute('target')).toBe('_blank')
      const rel = a.getAttribute('rel') ?? ''
      expect(rel).toContain('noopener')
      expect(rel).toContain('noreferrer')
      expect(a.textContent).toContain('新しいタブで開きます')
    }
    // sr-only 相当の目次誘導リンクも同じ.rel
    for (const a of Array.from(document.querySelectorAll('a[href^="#item-index"]'))) {
      expect(a.getAttribute('href')).toBe('#item-index')
    }
  })

  it('タップ目標は 44px 以上（月齢レール・たたんだ band の見出しボタン）', () => {
    render(<TimelinePage />)
    const buttons = [
      ...Array.from(monthRail().querySelectorAll('button')),
      ...Array.from(categoryNav().querySelectorAll('button')),
    ]
    expect(buttons.length).toBeGreaterThan(0)
    for (const b of buttons) {
      expect(b.className).toMatch(/min-h-\[44px\]|min-h-11/)
    }
    // 閉じた band はボタン行として開ける（44px 以上）
    fireEvent.click(within(summaryBar()).getByRole('button', { name: 'すべての時期を閉じる' }))
    const collapsed = screen.getByRole('button', { name: '2〜3か月の品目を開く' })
    expect(collapsed.className).toMatch(/min-h-\[44px\]|min-h-11/)
  })

  it('月齢レールとカテゴリ chip はトグル状態を aria-pressed で伝える', () => {
    render(<TimelinePage />)
    const all = within(monthRail()).getByRole('button', { name: /すべて見る/ })
    expect(all.getAttribute('aria-pressed')).toBe('true')
    const chip = within(monthRail()).getByRole('button', { name: new RegExp(railLabel(data().bands[3])) })
    expect(chip.getAttribute('aria-pressed')).toBe('false')
    fireEvent.click(chip)
    expect(chip.getAttribute('aria-pressed')).toBe('true')
  })

  it('絞り込み結果の件数は aria-live で読み上げる', () => {
    render(<TimelinePage />)
    const live = document.querySelector('[aria-live="polite"]')
    expect(live).toBeTruthy()
    expect(live?.textContent).toContain('品目')
  })
})
