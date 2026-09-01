// src/lib/__tests__/scroll.test.ts
// レイアウト収束待ちのスクロール。frame を自前で回して決定的に検証する。
import { afterEach, describe, expect, it, vi } from 'vitest'
import { scrollToElementTop } from '../scroll'

/** 計測に必要な最小限の window / document を用意し、frame を手動で進める。 */
function setup({ scrollY: startScrollY = 0, height: startHeight = 9000 } = {}) {
  const scrolls: { top: number; behavior?: string }[] = []
  let frames: (() => void)[] = []
  let scrollY = startScrollY
  let height = startHeight

  vi.stubGlobal('window', {
    get scrollY() {
      return scrollY
    },
    scrollTo: (opts: { top: number; behavior?: string }) => {
      scrollY = opts.top
      scrolls.push(opts)
    },
    requestAnimationFrame: (cb: () => void) => frames.push(cb),
    cancelAnimationFrame: () => {},
  })
  vi.stubGlobal('document', {
    documentElement: {
      get scrollHeight() {
        return height
      },
    },
  })

  return {
    scrolls,
    /** 高さを nextHeight に変えながら n frame 進める（省略なら高さ据え置き） */
    flush(n: number, nextHeight?: number) {
      for (let i = 0; i < n; i++) {
        if (nextHeight !== undefined) height = nextHeight
        const pending = frames
        frames = []
        pending.forEach((cb) => cb())
      }
    },
    element(top: number) {
      return { getBoundingClientRect: () => ({ top }) } as unknown as HTMLElement
    },
  }
}

describe('scrollToElementTop', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('高さが収束するまで待ってから、固定帯分を引いた位置へスクロールする', () => {
    const h = setup({ scrollY: 5000, height: 10000 })
    const cancel = scrollToElementTop(h.element(1000), { offset: () => 100, smooth: true })

    h.flush(1, 8000) // band の開閉で高さが変わり続けているあいだは動かさない
    h.flush(1, 6000)
    h.flush(1, 5000)
    expect(h.scrolls).toHaveLength(0)

    h.flush(3, 5000) // 同じ高さが 3 frame 続いたら実行
    expect(h.scrolls).toHaveLength(1)
    expect(h.scrolls[0]).toEqual({ top: 5900, behavior: 'smooth' }) // 5000 + 1000 - 100
    expect(typeof cancel).toBe('function')
  })

  it('smooth: false ならフレームを待たず即移動する', () => {
    const h = setup({ scrollY: 200 })
    scrollToElementTop(h.element(1000), { offset: () => 40, smooth: false })
    expect(h.scrolls).toEqual([{ top: 1160, behavior: 'auto' }])
  })

  it('高さが収束しなくても上限フレーム数に達すれば移動する', () => {
    const h = setup({ scrollY: 0, height: 1000 })
    scrollToElementTop(h.element(700), { offset: () => 0, smooth: true, maxFrames: 3 })
    for (let i = 0; i < 12; i++) h.flush(1, 1000 + i * 500) // 高さが動き続ける
    expect(h.scrolls).toHaveLength(1)
    expect(h.scrolls[0].top).toBe(700)
  })

  it('ヘッダー収縮のように固定帯の高さが途中で変わっても、実行時点の高さで計算する', () => {
    const h = setup({ scrollY: 3000, height: 9000 })
    let headerBottom = 120 // 依頼時点はヘッダーが高い → スクロールで収縮する
    const offset = vi.fn(() => headerBottom)
    scrollToElementTop(h.element(5000), { offset, smooth: true })

    h.flush(1, 7000) // 高さの変化とヘッダー収縮が同時進行する
    headerBottom = 44
    h.flush(4, 7000)

    expect(h.scrolls).toHaveLength(1)
    expect(h.scrolls[0].top).toBe(7956) // 7000 + 5000 - 44（実行時点の固定帯高）
    expect(offset).toHaveBeenCalled()
  })

  it('cancel 後はスクロールしない', () => {
    const h = setup()
    const cancel = scrollToElementTop(h.element(1000), { offset: () => 0, smooth: true })
    h.flush(1)
    cancel()
    h.flush(6)
    expect(h.scrolls).toHaveLength(0)
  })

  it('トップより上には戻らない', () => {
    const h = setup({ scrollY: 10 })
    scrollToElementTop(h.element(5), { offset: () => 500, smooth: false })
    expect(h.scrolls[0].top).toBe(0)
  })
})
