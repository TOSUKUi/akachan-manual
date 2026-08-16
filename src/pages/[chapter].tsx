import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ChapterSubBar from '@/components/chapter/chapter-sub-bar'
import ChapterToc from '@/components/chapter-toc'
import { Separator } from '@/components/ui/separator'
import FactSectionView from '@/components/fact/fact-section-view'
import IndexPage from '@/pages/index'
import { useScrollSpy } from '@/lib/use-scroll-spy'
import { SITE_DATA } from '@/generated/site-data'

export function Component() {
  const { slug } = useParams<{ slug: string }>()
  // 静的配信では /<slug>.html でアクセスされるため拡張子を落とす。
  // /index.html はトップ（review full の minor: slug='index' を index とみなす）。
  const cleanSlug = (slug?.replace(/\.html$/, '') ?? '').replace(/^index$/, '')
  const chapter = SITE_DATA.chapters.find((c) => c.slug === cleanSlug)
  // スクロールスパイ: ids は参照安定（useMemo）にして observer を再作成しない。
  // level-1 の intro は見出しなしで TOC 行もないため除外（TOC 行と正確に一致させる）。
  // Hooks 規則のため、全ての early return より前に呼ぶ（chapter 未取得時は空 ids で安全）。
  const ids = useMemo(
    () => (chapter ? chapter.sections.filter((s) => s.level >= 2).map((s) => s.anchor) : []),
    [chapter],
  )
  const activeId = useScrollSpy(ids, 180)
  // /index.html はトップページとして描画（review full の minor）
  if (cleanSlug === '') return <IndexPage />
  if (!chapter) {
    return <p>章が見つかりません。</p>
  }
  const idx = SITE_DATA.chapters.findIndex((c) => c.slug === cleanSlug)
  const prev = idx > 0 ? SITE_DATA.chapters[idx - 1] : null
  const next = idx < SITE_DATA.chapters.length - 1 ? SITE_DATA.chapters[idx + 1] : null

  // 前後の章カード（spec-mobile.md §2.7）: モバイルは縦積みの ≥56px カード、sm 以上はコンパクト行
  const prevCard = (
    <Link
      to={prev ? `/${prev.slug}` : '/'}
      className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors motion-reduce:duration-0 active:bg-accent sm:min-h-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:hover:text-primary"
    >
      <ChevronLeft className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{prev ? '前の章' : 'ホーム'}</span>
        <span className="block truncate font-heading text-sm font-bold">
          {prev ? `${prev.order}. ${prev.title}` : 'トップページ'}
        </span>
      </span>
    </Link>
  )
  const nextCard = next && (
    <Link
      to={`/${next.slug}`}
      className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card p-3 text-right transition-colors motion-reduce:duration-0 active:bg-accent sm:min-h-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:hover:text-primary"
    >
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">次の章</span>
        <span className="block truncate font-heading text-sm font-bold">
          {next.order}. {next.title}
        </span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </Link>
  )

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs text-muted-foreground">
          第 {chapter.order} 章 / 全 {SITE_DATA.chapters.length} 章
        </p>
        <h1 className="mt-1 font-heading text-2xl font-bold leading-snug">{chapter.title}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          この章の最終確認日: {chapter.lastVerified}
        </p>
      </header>

      {/* モバイルのみ: タイトル + セクションジャンプ（spec-mobile.md §2.5） */}
      <ChapterSubBar chapter={chapter} activeId={activeId} />

      {/* 区切り線は先頭セクション自身の border-t に任せる（二重線・空白帯を避ける） */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-8">
        <div className="min-w-0 space-y-6">
          {/* 本文・出典・前後の章を同一幅（左カラム全幅）で揃える。
              704px ≈ 15px 本文で 46 全角文字/行で、 CJK の快適な行長帯内。 */}
          <article>
            {chapter.sections.map((s, i) => (
              <FactSectionView key={`${s.anchor}-${i}`} section={s} chapterSlug={chapter.slug} />
            ))}
          </article>

          <Separator />

          <section className="text-xs leading-relaxed text-muted-foreground">
            <h2 className="font-heading text-sm font-bold text-foreground">この章の出典</h2>
            <ul className="mt-2 space-y-1">
              {chapter.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-9 items-center underline hover:text-primary sm:min-h-0 sm:block"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <nav
            aria-label="前後の章"
            className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-stretch sm:justify-between"
          >
            {prevCard}
            {nextCard}
          </nav>
        </div>

        <ChapterToc order={chapter.order} sections={chapter.sections} activeId={activeId} />
      </div>
    </div>
  )
}

export default Component
