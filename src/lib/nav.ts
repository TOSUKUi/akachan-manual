/**
 * 静的マルチページ遷移用のヘルパー。
 * このサイトは SPA ではなく SSG の静的 HTML（base './' 相対、GitHub Pages 配信）で、
 * 章遷移はフルリロード（通常の <a href>）で行う。href は生成 HTML への相対パス。
 */

/** slug から遷移先 HTML への相対パスを返す（例: 'vaccines' → './vaccines.html'）。トップは './index.html'。 */
export function chapterHref(slug: string): string {
  if (slug === '') return './index.html'
  return `./${slug}.html`
}

/** アンカー付きの相対パス（例: './day-of-birth.html#top'）。 */
export function chapterHrefWithAnchor(slug: string, anchor: string): string {
  return `${chapterHref(slug)}#${anchor}`
}

/** 現在のページの slug を location.pathname から取得（例: '/vaccines.html' → 'vaccines'、'/' → ''）。
 * SSR（SSG ビルド時）は window が無いので空文字を返す（active 判定はクライアントのみ）。 */
export function currentSlugFromPath(pathname: string | undefined): string {
  if (!pathname) return ''
  const name = pathname.replace(/^\//, '').replace(/\.html$/, '').replace(/^index$/, '')
  return name
}

/** クライアントのみの現在 slug（SSR では空）。 */
export function useClientSlug(): string {
  if (typeof window === 'undefined') return ''
  return currentSlugFromPath(window.location.pathname)
}
