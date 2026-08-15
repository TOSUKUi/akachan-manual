import { describe, expect, it } from 'vitest'
import { CANONICAL_MUST_IDS } from '../fact-model.ts'
import { parseFactFile } from '../fact-parse.ts'
import type { Fact } from '../fact-model.ts'
import { STALE_DAYS, validateFacts } from '../fact-validate.ts'

/** 生 Markdown 1 章から Fact を作るヘルパー（失敗なら例外）。 */
function makeFact(raw: string, fileName = '01-test.md'): Fact {
  const result = parseFactFile(raw, fileName)
  if (!result.ok) throw new Error(`invalid fixture: ${JSON.stringify(result.issues)}`)
  return result.fact
}

function chapterRaw(opts: {
  title?: string
  slug?: string
  order?: number
  lastVerified?: string
  must?: string[]
  body?: string
}): string {
  const {
    title = 'テスト章',
    slug = 'test-chapter',
    order = 1,
    lastVerified = '2026-08-01',
    must = ['sids'],
    body = [
      'intro。',
      '根拠: [S](https://e.com/a)',
      '',
      '## セクション',
      '内容。',
      ...must.map((id) => `必須: [${id}]`),
      '根拠: [S](https://e.com/a)',
    ].join('\n'),
  } = opts
  return `---
title: ${title}
slug: ${slug}
order: ${order}
last_verified: ${lastVerified}
must: ${must.length === 0 ? '[]' : `\n${must.map((m) => `  - ${m}`).join('\n')}`}
sources:
  - name: S
    url: "https://e.com/a"
---

${body}
`
}

const NOW = new Date(Date.UTC(2026, 7, 15)) // 2026-08-15

describe('validateFacts', () => {
  it('全 12 正規 ID がカバーされていれば通る（AC-5 happy）', () => {
    // 12 項目を 1 章に集約した最小セット
    const facts = [makeFact(chapterRaw({ must: [...CANONICAL_MUST_IDS] }))]
    const report = validateFacts(facts, NOW)
    expect(report.errors).toEqual([])
    expect(report.ok).toBe(true)
  })

  it('12 正規 ID が 1 つでも欠けるとビルド失敗になる（AC-5 failure）', () => {
    const facts = [makeFact(chapterRaw({ must: ['sids'] }))]
    const report = validateFacts(facts, NOW)
    expect(report.ok).toBe(false)
    const missing = CANONICAL_MUST_IDS.filter((id) => id !== 'sids')
    for (const id of missing) {
      expect(report.errors.some((e) => e.message.includes(id))).toBe(true)
    }
  })

  it('根拠行の無いセクションはエラー（AC-4）', () => {
    const facts = [
      makeFact(
        chapterRaw({
          body: ['intro。', '根拠: [S](https://e.com/a)', '', '## セクション', '根拠無し。'].join('\n'),
          must: [],
        }),
      ),
    ]
    const report = validateFacts(facts, NOW)
    expect(report.errors.some((e) => e.message.includes('根拠'))).toBe(true)
  })

  it('根拠 URL が sources[] に無ければエラー（AC-4）', () => {
    const facts = [
      makeFact(
        chapterRaw({
          must: [],
          body: ['intro。', '根拠: [外](https://other.com/x)', '', '## S', '根拠: [S](https://e.com/a)'].join(
            '\n',
          ),
        }),
      ),
    ]
    const report = validateFacts(facts, NOW)
    expect(report.errors.some((e) => e.message.includes('https://other.com/x'))).toBe(true)
  })

  it(`last_verified が ${STALE_DAYS} 日超なら警告（AC-11 failure）`, () => {
    const facts = [makeFact(chapterRaw({ lastVerified: '2026-01-01', must: [...CANONICAL_MUST_IDS] }))]
    const report = validateFacts(facts, NOW)
    expect(report.errors).toEqual([])
    expect(report.warnings.some((w) => w.message.includes(String(STALE_DAYS)))).toBe(true)
  })

  it('鮮度内の last_verified なら警告なし', () => {
    const facts = [makeFact(chapterRaw({ lastVerified: '2026-08-01' }))]
    const report = validateFacts(facts, NOW)
    expect(report.warnings.filter((w) => w.message.includes('last_verified'))).toEqual([])
  })

  it('本文マーカーと frontmatter must が一致しなければエラー（AC-5）', () => {
    // frontmatter は sids の宣言、本文マーカーは honey
    const facts = [
      makeFact(
        chapterRaw({
          must: ['sids'],
          body: ['intro。', '根拠: [S](https://e.com/a)', '', '## S', '内容。', '必須: [honey]', '根拠: [S](https://e.com/a)'].join(
            '\n',
          ),
        }),
      ),
    ]
    const report = validateFacts(facts, NOW)
    expect(report.errors.some((e) => e.message.includes('sids'))).toBe(true)
    expect(report.errors.some((e) => e.message.includes('honey'))).toBe(true)
  })

  it('slug 重複はエラー', () => {
    const a = makeFact(chapterRaw({ must: [] }), '01-a.md')
    const b = makeFact(chapterRaw({ must: [] }), '02-b.md')
    const report = validateFacts([a, b], NOW)
    expect(report.errors.some((e) => e.message.includes('重複'))).toBe(true)
  })
})
