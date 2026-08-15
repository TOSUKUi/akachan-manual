import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ChapterSubBar from '@/components/chapter/chapter-sub-bar'
import ChapterToc from '@/components/chapter-toc'
import { Separator } from '@/components/ui/separator'
import FactSectionView from '@/components/fact/fact-section-view'
import { useScrollSpy } from '@/lib/use-scroll-spy'
import { SITE_DATA } from '@/generated/site-data'

export function Component() {
  const { slug } = useParams<{ slug: string }>()
  // 静的配信では /<slug>.html でアクセスされるため拡張子を落とす
  const cleanSlug = slug?.replace(/\.html$/, '') ?? ''
  const chapter = SITE_DATA.chapters.find((c) => c.slug === cleanSlug)
  // スクロールスパイ: ids は参照安定（useMemo）にして observer を再作成しない。
  // level-1 の intro は見出しなしで TOC 行もないため除外（TOC 行と正確に一致させる）。
  const ids = useMemo(
    () => (chapter ? chapter.sections.filter((s) => s.level >= 2).map((s) => s.anchor) : []),
    [chapter],
  )
  const activeId = useScrollSpy(ids, 180)
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
      className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card p-3 text-left active:bg-accent sm:min-h-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
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
      className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card p-3 text-right active:bg-accent sm:min-h-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
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
      <ChapterSubBar chapter={chapter} />

      <Separator />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-8 lg:items-start">
        <div className="min-w-0 space-y-6">
          {/* CJK measure: 65-75ch はラテン語のガイドライン。15px 本文で 42rem ≈ 44 全角文字/行
              が CJK の同等幅（ux-guidelines No 21）。max-w-prose（CJK で ≈975px）は使わない。 */}
          <article className="max-w-2xl">
            {chapter.sections.map((s, i) => (
              <FactSectionView key={`${s.anchor}-${i}`} section={s} />
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
