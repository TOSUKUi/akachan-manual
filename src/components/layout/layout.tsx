import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import BackToTopButton from '@/components/layout/back-to-top-button'
import MobileChapterSheet from '@/components/layout/mobile-chapter-sheet'
import SearchBox from '@/components/search/search-box'
import { HOJOKIN_URL, SITE_NAME } from '@/config'
import { chapterHref, useClientSlug } from '@/lib/nav'
import { SITE_DATA } from '@/generated/site-data'

/** 章チップ（ポインター環境の lg 以上のみ表示、ラップして全 9 章を見せる）。 */
function ChapterNav() {
  const currentSlug = useClientSlug()
  return (
    <nav aria-label="章 navigation" className="pb-1">
      <ul className="flex flex-wrap gap-1.5">
        <li>
          <a
            href="./timeline.html"
            aria-current={currentSlug === 'timeline' ? 'page' : undefined}
            className={[
              'rounded-full border px-2.5 py-1 text-xs transition-colors motion-reduce:duration-0',
              currentSlug === 'timeline'
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-primary/40 bg-primary/5 text-primary hover:bg-primary/10',
            ].join(' ')}
          >
            いつ・何を買う？
          </a>
        </li>
        {SITE_DATA.chapters.map((c) => (
          <li key={c.slug}>
            <a
              href={chapterHref(c.slug)}
              aria-current={currentSlug === c.slug ? 'page' : undefined}
              className={[
                'rounded-full border px-2.5 py-1 text-xs transition-colors motion-reduce:duration-0',
                currentSlug === c.slug
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:bg-accent',
              ].join(' ')}
            >
              {c.order}. {c.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Layout() {
  const [sheetOpen, setSheetOpen] = useState(false)
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-4 pt-2">
          <div className="flex items-center gap-2">
            <a href="./index.html" className="shrink-0 font-heading text-base font-bold">
              <span className="sm:hidden">あかちゃん</span>
              <span className="hidden sm:inline">{SITE_DATA.meta.siteName}</span>
            </a>
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
            保育料・給付・助成の申請時期や必要書類の詳細は姉妹サイト{' '}
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
