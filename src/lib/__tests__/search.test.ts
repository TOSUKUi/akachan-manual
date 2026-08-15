import { describe, expect, it } from 'vitest'
import { parseFactFile } from '../fact-parse.ts'
import { buildSearchIndex } from '../fact-validate.ts'
import { searchIndex } from '../search.ts'

const RAW = `---
title: 安全・事故防止
slug: safety
order: 6
last_verified: 2026-08-01
must:
  - choking
sources:
  - name: テストソース
    url: "https://e.com/a"
---

安全について。
根拠: [テストソース](https://e.com/a)

## 窒息防止
みかん・ナッツ・はちみつなど、気道に詰まりやすい食品には注意してください。
必須: [choking]
根拠: [テストソース](https://e.com/a)

## チャイルドシート
チャイルドシートは生後すぐに使い始めましょう。
根拠: [テストソース](https://e.com/a)
`

function index() {
  const r = parseFactFile(RAW, '06-safety.md')
  if (!r.ok) throw new Error('invalid fixture')
  return buildSearchIndex([r.fact])
}

describe('searchIndex', () => {
  it('本文中の単語で該当セクションにヒットする（AC-7）', () => {
    const hits = searchIndex(index(), 'はちみつ')
    expect(hits.length).toBe(1)
    expect(hits[0].slug).toBe('safety')
    expect(hits[0].heading).toBe('窒息防止')
    expect(hits[0].anchor).toBe('窒息防止')
    expect(hits[0].snippet).toContain('はちみつ')
  })

  it('見出しの単語でもヒットする', () => {
    const hits = searchIndex(index(), 'チャイルドシート')
    expect(hits.length).toBe(1)
    expect(hits[0].heading).toBe('チャイルドシート')
  })

  it('無い言葉はヒットしない / 空クエリは空配列', () => {
    expect(searchIndex(index(), '存在しない語彙xyz')).toEqual([])
    expect(searchIndex(index(), '   ')).toEqual([])
  })

  it('limit で上限を守る', () => {
    const hits = searchIndex(index(), 'テストソース', 1)
    expect(hits.length).toBeLessThanOrEqual(1)
  })
})
