import { ArrowRight, ShoppingBasket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { chapterHref } from '@/lib/nav'
import { ITEMS_DATA } from '@/generated/items-data'
import { SITE_DATA } from '@/generated/site-data'

/** 月齢別タイムラインへの入口（spec 0003 AC-1）。トップ最上部の 1 枚カード。 */
function TimelineCard() {
  const total = ITEMS_DATA.items.length
  const mustCount = ITEMS_DATA.items.filter((i) => i.need === 'must').length
  return (
    <a
      href="./timeline.html"
      className="block rounded-lg border border-primary/40 bg-primary/5 p-4 transition-colors motion-reduce:duration-0 hover:border-primary hover:bg-primary/10 active:bg-primary/10"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <ShoppingBasket className="size-5 text-primary" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 font-heading text-base font-bold text-foreground">
            いつ、何を買う？ 月齢別タイムライン
            <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
            妊娠中から 2
            歳まで、月齢順に「この時期に揃えるもの」を縦並びで確認できます。目安金額や西松屋・アカチャンホンポなどの検索先、品川区の給付・健診も同じ時間軸に載せています。
          </span>
          <span className="mt-2 block font-mono text-xs text-muted-foreground">
            全 {total} 品目（うち必須 {mustCount} 品） / 8 ステージ
          </span>
        </span>
      </div>
    </a>
  )
}

/** 最重要チェックリスト（AC-1）。必須 12 項目をバッジ付きで一覧。 */
function MustChecklist() {
  const items = SITE_DATA.mustItems.filter((i) => i.canonical)
  return (
    <Card id="must-checklist">
      <CardContent className="pt-5">
        <h2 className="font-heading text-lg font-bold">やるべきこと（最重要）</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          公的機関がエビデンスに基づいて注意を促していることから抜粋した、12個の必須項目です。タップで該当の場所へジャンプします。
        </p>
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`./${item.chapterSlug}.html#${item.anchor}`}
                className="group flex min-h-11 items-center gap-2 rounded-md px-2 hover:bg-accent active:bg-accent sm:flex-row"
              >
                <Badge variant="secondary" className="shrink-0 bg-primary/10 font-heading text-primary">
                  必須
                </Badge>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium group-hover:text-primary">{item.label}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground sm:hidden">
                    {item.chapterTitle}
                  </span>
                </span>
                <span className="ml-auto hidden shrink-0 truncate text-xs text-muted-foreground sm:block">
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
              className="group flex min-h-11 items-center gap-2 rounded-md px-2 hover:bg-accent active:bg-accent sm:flex-row"
            >
              <Badge variant="outline" className="shrink-0 font-heading">
                手続き
              </Badge>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium group-hover:text-primary">{item.label}</span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground sm:hidden">
                  1. 出産直前から直後までやる手続き
                </span>
              </span>
              <span className="ml-auto hidden shrink-0 truncate text-xs text-muted-foreground sm:block">
                1. 出産直前から直後までやる手続き
              </span>
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
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SITE_DATA.chapters.map((c) => (
          <a
            key={c.slug}
            href={chapterHref(c.slug)}
            className="block rounded-lg border border-border bg-card p-3 transition-colors motion-reduce:duration-0 hover:border-primary hover:bg-accent active:bg-accent"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-sm font-bold text-primary">{c.order}</span>
              <h3 className="font-heading text-[15px] font-bold">{c.title}</h3>
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
            <p className="mt-1 text-xs text-muted-foreground">最終確認日: {c.lastVerified}</p>
          </a>
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
          赤ちゃんから2歳までやるべきこと。気を付けること。
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          品川区在住のパパ向けに、赤ちゃんが生まれてから2歳までの育児情報をまとめています。
          出生届などの期限のある手続き、予防接種のスケジュール、離乳食の進め方、事故の防ぎ方など、
          各項目に行政などの出典リンクを付けています。
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          最終確認日: {SITE_DATA.meta.siteLastVerified}（章ごとに日にちが別です）
        </p>
        <div className="mt-4 hidden lg:block">
          <a
            href="#must-checklist"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition-colors motion-reduce:duration-0 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-ring"
          >
            やるべきこと（最重要）へ <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </section>

      <TimelineCard />

      <MustChecklist />
      <DobChecklist />

      <Separator />

      <ChapterGrid />
    </div>
  )
}

export default Component
