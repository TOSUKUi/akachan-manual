import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import SearchBox from '@/components/search/search-box'
import { HOJOKIN_URL, SITE_NAME } from '@/config'
import { SITE_DATA } from '@/generated/site-data'

function ChapterNav() {
  return (
    <nav aria-label="章 navigation" className="-mx-4 overflow-x-auto px-4">
      <ul className="flex gap-1.5 whitespace-nowrap pb-1">
        {SITE_DATA.chapters.map((c) => (
          <li key={c.slug}>
            <NavLink
              to={`/${c.slug}`}
              className={({ isActive }) =>
                [
                  'inline-block rounded-full border px-3 py-1.5 text-xs transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:bg-accent',
                ].join(' ')
              }
            >
              {c.order}. {c.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** ハッシュ（#anchor）を映したセクションへスクロールする。
 * SSG + 水合ではブラウザの原生 fragment スクロールが壊れがちなので明示的にやる。
 * 初回ロードは index.html のインラインスクリプトも併用する（ダブルジャンプは幂等なので無害）。 */
function useHashScroll() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    if (id === 'top') {
      window.scrollTo({ top: 0 })
      return
    }
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView()
    })
    return () => cancelAnimationFrame(raf)
  }, [location.hash])
}

export default function Layout() {
  useHashScroll()
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-4 pt-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="shrink-0 font-heading text-lg font-bold">
              {SITE_DATA.meta.siteName}
            </Link>
            <div className="min-w-0 flex-1">
              <SearchBox />
            </div>
          </div>
          <div className="py-2.5">
            <ChapterNav />
          </div>
        </div>
        {/* 免責 + サイト全体の最終確認日（AC-6） */}
        <div className="border-t border-border bg-accent/60 px-4 py-1.5 text-center text-[11px] leading-snug text-muted-foreground">
          このサイトの内容は AI がまとめたものです。医療・法律のアドバイスではありません。医療については必ずかかりつけの医師・助産師・保健センターに相談し、各項目の最終確認日と元ソース（一次情報）を必ず確認してください。
          <span className="whitespace-nowrap">（全項目最終確認: {SITE_DATA.meta.siteLastVerified}）</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="mt-10 border-t border-border bg-card">
        <div className="mx-auto w-full max-w-3xl space-y-3 px-4 py-6 text-xs leading-relaxed text-muted-foreground">
          <p className="font-heading text-sm font-bold text-foreground">{SITE_NAME}</p>
          <p>{SITE_DATA.meta.disclaimer}</p>
          <p>
            保育料・給付・助成の「申請はいつ・何が必要か」の詳細は姉妹サイト{' '}
            <a href={HOJOKIN_URL} className="underline hover:text-primary">
              shinagawa-hojokin
            </a>{' '}
            を見てください。
          </p>
          <p>
            全項目の最終確認日: {SITE_DATA.meta.siteLastVerified}（更新は各章ごとにその章の日にちを参照）
          </p>
        </div>
      </footer>
    </div>
  )
}
