/**
 * 静的マルチページ遷移用のヘルパー。
 * このサイトは SPA ではなく SSG の静的 HTML（base './' 相対、GitHub Pages 配信）で、
 * 章遷移はフルリロード（通常の <a href>）で行う。href は生成 HTML への相対パス。
 */

// 定義元は items-model.ts（ビルド側からも参照できる）。UI 側はこちらを使う。
export { TIMELINE_SLUG }
import { TIMELINE_SLUG } from './items-model.ts'

/** slug から遷移先 HTML への相対パスを返す（例: 'vaccines' → './vaccines.html'）。トップは './index.html'。 */
export function chapterHref(slug: string): string {
  if (slug === '') return './index.html'
  return `./${slug}.html`
}

/** 品目タイムラインへの相対パス（'./timeline.html'）。 */
export function timelineHref(): string {
  return chapterHref(TIMELINE_SLUG)
}

/** アンカー付きの相対パス（例: './day-of-birth.html#top'）。 */
export function chapterHrefWithAnchor(slug: string, anchor: string): string {
  return `${chapterHref(slug)}#${anchor}`
}

/**
 * 現在のページの slug を URL path から取得（例: '/vaccines.html' → 'vaccines'、'/' → ''）。
 * GitHub Pages のサブディレクトリ配信（/akachan-manual/vaccines.html）でもよいよう、
 * 末尾のセグメントだけを見る（先頭から削るとサブディレクトリ名が混ざって章が見つからなくなる）。
 * クエリとハッシュ（アンカー）は捨てる。
 */
export function currentSlugFromPath(pathname: string | undefined): string {
  if (!pathname) return ''
  const path = pathname.split('?')[0].split('#')[0]
  const segments = path.split('/').filter((s) => s.length > 0)
  const last = segments[segments.length - 1] ?? ''
  const name = last.replace(/\.html$/, '').replace(/^index$/, '')
  return name
}

/** クライアントのみの現在 slug（SSR では空）。 */
export function useClientSlug(): string {
  if (typeof window === 'undefined') return ''
  return currentSlugFromPath(window.location.pathname)
}
