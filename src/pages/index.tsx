import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SITE_DATA } from '@/generated/site-data'

/** 最重要チェックリスト（AC-1）。必須 12 項目をバッジ付きで一覧。 */
function MustChecklist() {
  const items = SITE_DATA.mustItems.filter((i) => i.canonical)
  return (
    <Card>
      <CardContent className="pt-5">
        <h2 className="font-heading text-lg font-bold">やるべきこと（最重要）</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          「必須」の項目は、公的機関がエビデンスに基づいて注意を促していることだけを抜粋した
          12 項目です。タップすると該当箇所にジャンプします。
        </p>
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`./${item.chapterSlug}.html#${item.anchor}`}
                className="group flex min-h-11 items-center gap-2 rounded-md px-2 hover:bg-accent active:bg-accent"
              >
                <Badge variant="secondary" className="shrink-0 bg-primary/10 font-heading text-primary">
                  必須
                </Badge>
                <span className="text-[15px] font-medium group-hover:text-primary">
                  {item.label}
                </span>
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                  {item.chapterTitle}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

/** 出産当日〜退院までの手続き（AC-1：1 画面で確認できること）。アンカーは fact の見出しから動的に解決。 */
const DOB_ITEMS: { label: string; anchorPrefix: string }[] = [
  { label: '出生届を 14 日以内に届出（届出人は父または母）', anchorPrefix: '出生届' },
  { label: '国民健康保険への加入（品川区は出生届と同日に可能）', anchorPrefix: '国民健康保険への加入' },
  { label: '出産育児一時金・出産支援の給付（出産予定の申請も可）', anchorPrefix: '出産育児一時金' },
  { label: '児童手当を出生直後に申請', anchorPrefix: '児童手当' },
]

function dobLink(anchorPrefix: string): string {
  const ch = SITE_DATA.chapters.find((c) => c.slug === 'day-of-birth')
  const sec = ch?.sections.find((s) => s.anchor.startsWith(anchorPrefix))
  return sec ? `./day-of-birth.html#${sec.anchor}` : './day-of-birth.html'
}

function DobChecklist() {
  return (
    <section aria-labelledby="dob-heading" className="mt-6 rounded-lg border border-border bg-card p-4">
      <h2 id="dob-heading" className="font-heading text-base font-bold">
        出産当日 → 退院まで（手続きを忘れない）
      </h2>
      <ul className="mt-3 space-y-2">
        {DOB_ITEMS.map((item) => (
          <li key={item.anchorPrefix}>
            <a
              href={dobLink(item.anchorPrefix)}
              className="group flex min-h-11 items-center gap-2 rounded-md px-2 hover:bg-accent active:bg-accent"
            >
              <Badge variant="outline" className="shrink-0 font-heading">
                手続き
              </Badge>
              <span className="text-[15px] font-medium group-hover:text-primary">{item.label}</span>
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">1. 出産直前・当日の動き方</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ChapterGrid() {
  return (
    <section>
      <h2 className="font-heading text-lg font-bold">章一覧（出産当日 → 2歳まで）</h2>
      <div className="mt-3 space-y-2">
        {SITE_DATA.chapters.map((c) => (
          <Link
            key={c.slug}
            to={`/${c.slug}`}
            className="block rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary hover:bg-accent active:bg-accent"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-sm font-bold text-primary">{c.order}</span>
              <h3 className="font-heading text-[15px] font-bold">{c.title}</h3>
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
            <p className="mt-1 text-xs text-muted-foreground">最終確認日: {c.lastVerified}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function Component() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-heading text-2xl font-bold leading-snug sm:text-[28px] lg:text-3xl">
          生まれてから2歳まで、何をして、何をしないか。
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          品川区在住の、知識ゼロのパパ向けの育児マニュアルです。
          出産当日〜退院までの手続きから、夜泣き、予防接種、離乳食、安全・事故防止まで、
          「やること / やらないこと / やるべきこと（必須）」を、出典リンクつきで整理しています。
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          最終確認日: {SITE_DATA.meta.siteLastVerified}（各章は個別の日にちを参照）
        </p>
      </section>

      <MustChecklist />
      <DobChecklist />

      <Separator />

      <ChapterGrid />
    </div>
  )
}

export default Component
