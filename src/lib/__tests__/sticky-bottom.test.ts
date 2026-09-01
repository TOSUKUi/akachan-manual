// src/lib/__tests__/sticky-bottom.test.ts
// @vitest-environment jsdom
// 固定帯の実測（吸着ラッパの検出）。「スクロール後に band 見出しが見える」回帰の根になる。
import { afterEach, describe, expect, it } from 'vitest'
import { stickyBottom } from '../scroll'

describe('stickyBottom', () => {
  const rect = (top: number, height: number) => ({
    top,
    height,
    bottom: top + height,
    left: 0,
    right: 0,
    width: 0,
    x: 0,
    y: top,
    toJSON: () => ({}),
  })

  afterEach(() => {
    document.body.replaceChildren()
  })

  it('吸着しているのは計測対象自身でなくてもよい（sticky な祖先の高さで測る）', () => {
    // 月齢レールとサマリー卡片を一つの吸着ラッパにまとめた実構成
    document.body.innerHTML =
      '<div id="wrap" style="position: sticky; top: 103px"><section id="bar"></section></div>' +
      '<div id="plain"><p id="inside"></p></div>'
    const bar = document.getElementById('bar')!
    const inside = document.getElementById('inside')!
    document.getElementById('wrap')!.getBoundingClientRect = () => rect(103, 118) as unknown as DOMRect

    expect(stickyBottom([bar, inside])).toBe(221) // 103 + 118（吸着後の下端）
  })

  it('吸着していなく、吸着祖先も持たない要素は数えない', () => {
    document.body.innerHTML = '<div id="plain"><p id="inside"></p></div>'
    const inside = document.getElementById('inside')!
    document.getElementById('plain')!.getBoundingClientRect = () => rect(0, 200) as unknown as DOMRect
    expect(stickyBottom([inside, null])).toBe(0)
  })

  it('折返し前で非表示の帯は数えない', () => {
    document.body.innerHTML =
      '<div id="wrap" style="position: sticky; top: 103px"><section id="bar"></section></div>'
    const bar = document.getElementById('bar')!
    document.getElementById('wrap')!.getBoundingClientRect = () => rect(0, 0) as unknown as DOMRect
    expect(stickyBottom([bar])).toBe(0)
  })
})
