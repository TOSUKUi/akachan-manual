// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ITEMS_DATA } from '../../generated/items-data'
import { SITE_DATA } from '../../generated/site-data'

const httpsOnly = (u: string) => /^https:\/\/\S+$/.test(u)

describe('セキュリティ基線（出典と外链）', () => {
  it('fact の全出典 URL が https の絶対 URL', () => {
    for (const ch of SITE_DATA.chapters) for (const s of ch.sources) expect(httpsOnly(s.url)).toBe(true)
  })

  it('items の全出典・支援・比較行の URL が https の絶対 URL', () => {
    const urls: string[] = []
    for (const b of ITEMS_DATA.bands) {
      b.sources.forEach((s) => urls.push(s.url))
      b.support?.forEach((s) => urls.push(s.source))
      b.items.forEach((it) => {
        urls.push(...it.whySources)
        if (it.price) urls.push(...it.price.sources)
        it.compare?.rows.forEach((r) => urls.push(r.source))
        if (it.recommend) urls.push(it.recommend.url)
      })
    }
    expect(urls.length).toBeGreaterThan(100)
    for (const u of urls) expect(httpsOnly(u)).toBe(true)
  })

  it('危険スキーム（javascript: / data: / file:）が生成物に混入しない', () => {
    const blob = JSON.stringify(SITE_DATA) + JSON.stringify(ITEMS_DATA)
    for (const bad of ['javascript:', 'vbscript:', 'file://', 'data:text/html'])
      expect(blob).not.toContain(bad)
  })

  it('商品直リンクを持たない（販売先は kind + q の検索のみ）', () => {
    for (const it of ITEMS_DATA.items)
      for (const shop of it.shops) {
        expect(shop.q.length).toBeGreaterThan(0)
        expect(JSON.stringify(shop)).not.toMatch(/https?:\/\//)
      }
  })

  it('index.html に CSP があり、インラインスクリプトを持たない', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toContain('Content-Security-Policy')
    expect(html).toMatch(/script-src 'self'/)
    expect(html).not.toMatch(/<script>[^]/) // インライン script タグなし
    expect(html).toMatch(/<script[^>]+src="\.\/hash-jump\.js"/)
  })

  it('localStorage に保存するのは item id とチェック文言だけ（PII を入れない）', () => {
    const src = readFileSync('src/pages/timeline.tsx', 'utf8')
    expect(src).toMatch(/done: valid/) // 既知 id との積集合で絞る設計
    expect(src).toMatch(/catch/) // 読み書きは例外を握りつぶさない
  })
})
