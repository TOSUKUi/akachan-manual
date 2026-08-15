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

intro の**段落**です。
根拠: [テストソース](https://example.com/a)

## セクションA
内容Aです。
必須: [sids]
根拠: [テストソース](https://example.com/a)

### サブセクション
内容Bです。
根拠: [テストソース](https://example.com/a)
`

function withBody(body: string): string {
  return VALID.replace('intro の**段落**です。', body)
}

describe('parseFactFile', () => {
  it('frontmatter と構造化セクション・根拠・必須マーカーを解析する', () => {
    const result = parseFactFile(VALID, '01-test.md')
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const { fact } = result
    expect(fact.frontmatter.slug).toBe('test-chapter')
    expect(fact.frontmatter.title).toBe('テスト章')
    expect(fact.frontmatter.order).toBe(1)
    expect(fact.frontmatter.lastVerified).toBe('2026-08-01')
    expect(fact.frontmatter.must).toEqual(['sids'])
    expect(fact.sections.map((s) => s.level)).toEqual([1, 2, 3])
    expect(fact.sections[0].blocks[0]).toEqual({
      kind: 'paragraph',
      inline: [{ text: 'intro の', bold: false }, { text: '段落', bold: true }, { text: 'です。', bold: false }],
    })
    expect(fact.sections[1].mustIds).toEqual(['sids'])
    expect(fact.sections[1].sources).toEqual([{ name: 'テストソース', url: 'https://example.com/a' }])
  })

  it('未クォートの YYYY-MM-DD は YAML の Date としても ISO 文字列になる', () => {
    const result = parseFactFile(VALID, '01-test.md')
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
    if (!result.ok) expect(result.issues.some((i) => i.message.includes('YYYY-MM-DD'))).toBe(true)
  })

  it('checklist、callout、flow を構造化する', () => {
    const raw = withBody(`:::callout warning
注意です。
:::

:::checklist birth
- [ ] 出生届を出す
- [x] 保険を確認する
:::

:::flow crying
Q: 赤ちゃんが泣いている
- 体調を確認する → あやして様子見
  - ぐったりしている → 医療機関へ
- 機嫌がよい → 様子見
:::
根拠: [テストソース](https://example.com/a)`)
    const result = parseFactFile(raw, '01-test.md')
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const blocks = result.fact.sections[0].blocks
    expect(blocks[0]).toMatchObject({ kind: 'callout', tone: 'warning' })
    expect(blocks[1]).toEqual({ kind: 'checklist', id: 'birth', items: [
      { text: '出生届を出す', done: false },
      { text: '保険を確認する', done: true },
    ] })
    const flow = blocks[2]
    expect(flow.kind).toBe('flow')
    if (flow.kind === 'flow') {
      expect(flow.nodes).toHaveLength(4)
      expect(flow.nodes[0].text).toBe('赤ちゃんが泣いている')
      expect(flow.nodes.find((node) => node.choices.length === 0)?.text).toBe('医療機関へ')
    }
  })

  it('テーブルとネストしたリストを構造化する', () => {
    const raw = withBody(`- 親項目
  - 子項目

| 項目 | 内容 |
| --- | --- |
| A | B |
根拠: [テストソース](https://example.com/a)`)
    const result = parseFactFile(raw, '01-test.md')
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const blocks = result.fact.sections[0].blocks
    expect(blocks[0]).toMatchObject({ kind: 'list', ordered: false })
    expect(blocks[1]).toEqual({ kind: 'table', headers: ['項目', '内容'], rows: [['A', 'B']] })
  })

  it('未知マーカー、閉じ忘れ、禁止構文を拒否する', () => {
    for (const body of [
      ':::unknown x\n本文\n:::',
      ':::callout note\n本文',
      '- [ ] タスク',
      '> 引用',
      '1. 番号',
      '[リンク](https://example.com)',
      '*斜体*',
      '`コード`',
      '**未閉じ',
    ]) {
      const result = parseFactFile(withBody(`${body}\n根拠: [テストソース](https://example.com/a)`), '01-test.md')
      expect(result.ok, body).toBe(false)
    }
  })

  it('flow: 矢印なし・空ラベル・空本文を拒否する', () => {
    for (const flow of [
      ':::flow f\nQ: 泣いていますか\n- はい\n:::',
      ':::flow f\nQ: 泣いていますか\n- → 本文\n:::',
      ':::flow f\nQ: 泣いていますか\n- はい →\n:::',
    ]) {
      const result = parseFactFile(withBody(`${flow}\n根拠: [テストソース](https://example.com/a)`), '01-test.md')
      expect(result.ok, flow).toBe(false)
    }
  })

  it('flow: 親の無い子選択肢・ルート選択肢なし・終端なしを拒否する', () => {
    const cases = [
      // 最初の行が 2 スペース字下げ（親なし）
      ':::flow f\nQ: 泣いていますか\n  - はい → あやす\n:::',
      // ルートに選択肢が無い（深さ 0 が無く子だけ）
      ':::flow f\nQ: 泣いていますか\n:::',
      // 全ノードが選択肢を持ち終端が無い（どの leaf も子を持つ）
      ':::flow f\nQ: 泣いていますか\n- はい → あやす\n  - 効く → そのまま様子を見る\n    - さらに → 離れる\n:::',
    ]
    for (const flow of cases) {
      const result = parseFactFile(withBody(`${flow}\n根拠: [テストソース](https://example.com/a)`), '01-test.md')
      expect(result.ok, flow).toBe(false)
    }
  })

  it('flow: 正常な分岐と終端（choices: []）をパースする', () => {
    const body = [
      ':::flow crying',
      'Q: 泣いていますか',
      '- はい → あやして様子を見る',
      '  - 泣き止む → 様子見 OK',
      '  - 3時間続く → 医療機関へ',
      '- いいえ → そのまま様子を見る',
      ':::',
    ].join('\n')
    const result = parseFactFile(withBody(`${body}\n根拠: [テストソース](https://example.com/a)`), '01-test.md')
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const flow = result.fact.sections[0].blocks.find((b) => b.kind === 'flow')
    expect(flow).toBeDefined()
    if (!flow || flow.kind !== 'flow') return
    expect(flow.nodes).toHaveLength(5)
    expect(flow.nodes[0].text).toBe('泣いていますか')
    expect(flow.nodes[0].choices.map((c) => c.nextId)).toEqual(['f2', 'f5'])
    // 終端は choices が空のノード
    expect(flow.nodes.filter((n) => n.choices.length === 0).length).toBeGreaterThanOrEqual(1)
    // → の後のテキストは次ノードの text に保持される
    const node2 = flow.nodes.find((n) => n.id === 'f2')
    expect(node2?.text).toBe('あやして様子を見る')
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

  it('diagram マーカーは DiagramBlock として抽出される', () => {
    const sections = parseSections('## スケジュール\n:::diagram vaccine-schedule:::\n\n下表のとおり。\n根拠: [S](https://e.com/a)\n')
    expect(sections[0].blocks[0]).toEqual({ kind: 'diagram', name: 'vaccine-schedule' })
  })
})

describe('anchorFor', () => {
  it('日本語見出しをアンカー化し、衝突時は -2 を付ける', () => {
    const taken = new Set<string>(['top', '揺さぶらない'])
    expect(anchorFor('揺さぶらない', taken)).toBe('揺さぶらない-2')
    expect(anchorFor('揺さぶらない', new Set(['top']))).toBe('揺さぶらない')
  })
})
