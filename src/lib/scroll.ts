/**
 * スクロール系の副作用だけをまとめた薄いレイヤー。
 * ページ本体（純粋な描画ロジック）から分離し、検証可能にする。
 */

/**
 * 上端に吸着する要素（sticky + top 指定）が画面最上部から奪う高さ。
 *
 * sticky 要素は「吸着後」その位置に留まるので、未到達状態の rect.bottom を使うと
 * 本来より大きく引いて目標位置がずれる。`top` が length の場合は
 * `top + 高さ`（= 吸着後の下端）を用いる。`top: auto` は現在の位置をそのまま使う。
 */
export function stickyBottom(candidates: readonly (Element | null)[]): number {
  let bottom = 0
  for (const el of candidates) {
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.height <= 0) continue // 折返し前で非表示（hidden lg:block 等）の帯は無視
    const style = getComputedStyle(el)
    if (style.position !== 'sticky') continue
    const top = Number.parseFloat(style.top)
    bottom = Math.max(bottom, Number.isFinite(top) ? top + rect.height : rect.bottom)
  }
  return bottom
}

export interface ScrollOptions {
  /** 上端の固定帯ぶん引く距離（px）。スクロール直前に評価する。 */
  readonly offset: () => number
  readonly smooth: boolean
  /** 開閉アニメで高さが変わるあいだ待ち続ける上限フレーム数 */
  readonly maxFrames?: number
  /** この回数だけ高さが連続で同じなら収束とみなす */
  readonly stableFrames?: number
}

/**
 * 要素の頭（固定帯の直下）までスクロールする。
 * band の開閉（GSAP の高さアニメ）中は文書高さが変わり続けるので、
 * 高さが収束してから目標を計算する。返り値は実行前に取り消す関数。
 */
export function scrollToElementTop(element: HTMLElement, options: ScrollOptions): () => void {
  const maxFrames = options.maxFrames ?? 120
  const stableFrames = options.stableFrames ?? 3
  const jump = () => {
    const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - options.offset())
    window.scrollTo({ top, behavior: options.smooth ? 'smooth' : 'auto' })
  }
  if (!options.smooth) {
    jump()
    return () => {}
  }

  let cancelled = false
  let lastHeight = -1
  let stable = 0
  let frames = 0
  let frameId = 0

  const tick = () => {
    if (cancelled) return
    const height = document.documentElement.scrollHeight
    stable = height === lastHeight ? stable + 1 : 0
    lastHeight = height
    if (stable >= stableFrames || frames >= maxFrames) {
      jump()
      return
    }
    frames += 1
    frameId = window.requestAnimationFrame(tick)
  }
  frameId = window.requestAnimationFrame(tick)

  return () => {
    cancelled = true
    window.cancelAnimationFrame(frameId)
  }
}
