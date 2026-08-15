import { Link, useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import FactSectionView from '@/components/fact/fact-section-view'
import { SITE_DATA } from '@/generated/site-data'

export function Component() {
  const { slug } = useParams<{ slug: string }>()
  // 静的配信では /<slug>.html でアクセスされるため拡張子を落とす
  const cleanSlug = slug?.replace(/\.html$/, '') ?? ''
  const chapter = SITE_DATA.chapters.find((c) => c.slug === cleanSlug)
  if (!chapter) {
    return <p>章が見つかりません。</p>
  }
  const idx = SITE_DATA.chapters.findIndex((c) => c.slug === cleanSlug)
  const prev = idx > 0 ? SITE_DATA.chapters[idx - 1] : null
  const next = idx < SITE_DATA.chapters.length - 1 ? SITE_DATA.chapters[idx + 1] : null

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

      <Separator />

      <article>
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
              <a href={s.url} target="_blank" rel="noreferrer" className="underline hover:text-primary">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="前後の章" className="flex items-center justify-between gap-3 pt-2 text-sm">
        {prev ? (
          <Link to={`/${prev.slug}`} className="shrink-0 text-primary underline">
            ← {prev.order}. {prev.title}
          </Link>
        ) : (
          <Link to="/" className="shrink-0 text-primary underline">
            ← トップページ
          </Link>
        )}
        {next && (
          <Link to={`/${next.slug}`} className="shrink-0 text-right text-primary underline">
            {next.order}. {next.title} →
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Component
