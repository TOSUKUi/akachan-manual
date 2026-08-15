import { describe, expect, it } from 'vitest'
import { anchorFor, parseFactFile, parseSections } from '../fact-parse.ts'

const VALID = `---
title: テスト章
slug: test-chapter
order: 1
last_verified: 2026-08-01
must:
  - sids
sources:
  - name: テストソース
    url: "https://example.com/a"
---

intro の段落です。
根拠: [テストソース](https://example.com/a)

## セクションA
内容Aです。
必須: [sids]
根拠: [テストソース](https://example.com/a)

### サブセクション
内容Bです。
根拠: [テストソース](https://example.com/a)
`

describe('parseFactFile', () => {
  it('frontmatter とセクション・根拠・必須マーカーを解析する', () => {
    const result = parseFactFile(VALID, '01-test.md')
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const { fact } = result
    expect(fact.frontmatter.slug).toBe('test-chapter')
    expect(fact.frontmatter.title).toBe('テスト章')
    expect(fact.frontmatter.order).toBe(1)
    expect(fact.frontmatter.lastVerified).toBe('2026-08-01')
    expect(fact.frontmatter.must).toEqual(['sids'])
    expect(fact.frontmatter.sources).toEqual([{ name: 'テストソース', url: 'https://example.com/a' }])
    // intro(level1) + H2 + H3
    expect(fact.sections.map((s) => s.level)).toEqual([1, 2, 3])
    expect(fact.sections[1].heading).toBe('セクションA')
    expect(fact.sections[1].mustIds).toEqual(['sids'])
    expect(fact.sections[1].sources).toEqual([{ name: 'テストソース', url: 'https://example.com/a' }])
  })

  it('未クォートの YYYY-MM-DD は YAML の Date としても ISO 文字列になる', () => {
    const raw = VALID.replace('last_verified: 2026-08-01', 'last_verified: 2026-08-01')
    const result = parseFactFile(raw, '01-test.md')
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.fact.frontmatter.lastVerified).toBe('2026-08-01')
  })

  it('欠けた frontmatter は issues を返す（ok: false）', () => {
    const raw = VALID.replace('sources:\n  - name: テストソース\n    url: "https://example.com/a"\n', '')
    const result = parseFactFile(raw, '01-test.md')
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('should fail')
    expect(result.issues.some((i) => i.message.includes('sources'))).toBe(true)
  })

  it('last_verified が不正な形式なら issue になる', () => {
    const raw = VALID.replace('2026-08-01', '2026/08/01')
    const result = parseFactFile(raw, '01-test.md')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.issues.some((i) => i.message.includes('YYYY-MM-DD'))).toBe(true)
    }
  })
})

describe('parseSections', () => {
  it('## Gaps セクションは公開対象外として除外される', () => {
    const sections = parseSections('## Gaps\n調査不足の項目。\n\n## 本番\n内容。\n根拠: [S](https://e.com/a)\n')
    expect(sections.map((s) => s.heading)).toEqual(['本番'])
  })

  it('同名見出しにアンカーの重複回避が付く', () => {
    const sections = parseSections('## 同名\nA\n根拠: [S](https://e.com/a)\n\n## 同名\nB\n根拠: [S](https://e.com/a)\n')
    expect(sections[0].anchor).toBe('同名')
    expect(sections[1].anchor).toBe('同名-2')
  })
})

describe('anchorFor', () => {
  it('日本語見出しをアンカー化し、衝突時は -2 を付ける', () => {
    const taken = new Set<string>(['top', '揺さぶらない'])
    expect(anchorFor('揺さぶらない', taken)).toBe('揺さぶらない-2')
    expect(anchorFor('揺さぶらない', new Set(['top']))).toBe('揺さぶらない')
  })
})
