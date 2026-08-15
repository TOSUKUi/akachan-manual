import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import BackToTopButton from '@/components/layout/back-to-top-button'
import MobileChapterSheet from '@/components/layout/mobile-chapter-sheet'
import SearchBox from '@/components/search/search-box'
import { HOJOKIN_URL, SITE_NAME } from '@/config'
import { SITE_DATA } from '@/generated/site-data'

/** 章チップ（ポインター環境の lg 以上のみ表示、ラップして全 9 章を見せる）。 */
function ChapterNav() {
  return (
    <nav aria-label="章 navigation" className="pb-1">
      <ul className="flex flex-wrap gap-1.5">
        {SITE_DATA.chapters.map((c) => (
          <li key={c.slug}>
            <NavLink
              to={`/${c.slug}`}
              className={({ isActive }) =>
                [
                  'rounded-full border px-2.5 py-1 text-xs transition-colors motion-reduce:duration-0',
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
  const [sheetOpen, setSheetOpen] = useState(false)
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-4 pt-2">
          <div className="flex items-center gap-2">
            <Link to="/" className="shrink-0 font-heading text-base font-bold">
              <span className="sm:hidden">あかちゃん</span>
              <span className="hidden sm:inline">{SITE_DATA.meta.siteName}</span>
            </Link>
            <div className="min-w-0 flex-1">
              <SearchBox />
            </div>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-expanded={sheetOpen}
              aria-controls={sheetOpen ? 'chapter-sheet' : undefined}
              className="inline-flex h-11 min-w-11 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 font-heading text-sm font-bold text-foreground active:bg-accent lg:hidden focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Menu className="size-4" aria-hidden="true" />
              章
            </button>
          </div>
          <div className="hidden py-2.5 lg:block">
            <ChapterNav />
          </div>
        </div>
        {/* 免責 + サイト全体の最終確認日（AC-6） */}
        <div className="border-t border-border bg-accent/60 px-4 py-1.5 text-center text-[11px] leading-snug text-muted-foreground">
          このサイトの内容は AI がまとめたものです。医療・法律のアドバイスではありません。医療については必ずかかりつけの医師・助産師・保健センターに相談し、各項目の最終確認日と元ソース（一次情報）を必ず確認してください。
          <span className="whitespace-nowrap">（全項目最終確認: {SITE_DATA.meta.siteLastVerified}）</span>
        </div>
      </header>

      {/* ヘッダー（backdrop-filter は fixed のコンテイナーブロックを作る）の外で描画 */}
      <MobileChapterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 lg:max-w-5xl">
        <Outlet />
      </main>

      <BackToTopButton />

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
