// /timeline — 月齢別「いつ・何を買うか」タイムライン。モバイルは 1 カラム縦積み（spec 0003）。
// 開閉モデル: expandedBands === null が「全開」（初期状態）。月齢を選ぶと未選択 band が accordion に、
// 「この時期だけをたたむ」で開いている band だけ閉じられる（閉じている band を accordion にしない）。
// 月齢は複数選択可。チェック状態は checklist-view.tsx と同じ localStorage キー設計で復元する。
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from 'react'
import { ArrowRight, Baby, ChevronDown, ChevronUp, Gift, RotateCcw } from 'lucide-react'
import { ItemCard } from '@/components/timeline/item-card'
import { HOJOKIN_URL } from '@/config'
import { SITE_DATA } from '@/generated/site-data'
import { ITEMS_DATA } from '@/generated/items-data'
import {
  CATEGORY_LABELS,
  ITEM_CATEGORIES,
  filterItems,
  monthLabel,
  monthPoint,
  summarize,
  yen,
  type Item,
  type ItemBandId,
  type ItemCategory,
  type ItemsBand,
  type ItemsData,
  type ItemFilters,
} from '@/lib/items-model'
import { resolveShopLinks, type ResolvedShopLink } from '@/lib/shop-links'

const STORAGE_KEY = 'items-timeline:v1'

interface StoredTimeline {
  v: 1
  done: string[]
}

function isStoredTimeline(value: unknown): value is StoredTimeline {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  const candidate = value as Record<string, unknown>
  const keys = Object.keys(candidate).sort()
  return (
    keys.length === 2 &&
    keys[0] === 'done' &&
    keys[1] === 'v' &&
    candidate.v === 1 &&
    Array.isArray(candidate.done) &&
    candidate.done.every((item) => typeof item === 'string')
  )
}

/** 保存されたチェック済み ID。壊れていれば null（= 初期状態）。消えた品目 ID は黙って落とす（checklist-view と同じ）。 */
function loadDone(items: readonly Item[]): string[] | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []
    const parsed: unknown = JSON.parse(raw)
    if (!isStoredTimeline(parsed)) return null
    const validIds = new Set(items.map((item) => item.id))
    return [...new Set(parsed.done)].filter((id) => validIds.has(id))
  } catch {
    return null
  }
}

/** その時期とあわせて読む章（fact/ の slug のみ。ラベルは SITE_DATA から解決して誤字を防ぐ） */
const RELATED_CHAPTER_SLUGS: Partial<Record<ItemBandId, string[]>> = {
  pregnancy: ['procedures', 'day-of-birth'],
  newborn: ['newborn-care', 'day-of-birth'],
  'm2-3': ['subsidies', 'medical'],
  'm4-6': ['feeding', 'medical'],
  'm7-9': ['feeding', 'medical'],
  'm10-12': ['day-of-birth', 'medical'],
  'm13-18': ['safety', 'emergency', 'subsidies'],
  'm19-24': ['childcare', 'subsidies'],
}

function resolveChapterTitle(slug: string): string | undefined {
  return SITE_DATA.chapters.find((chapter) => chapter.slug === slug)?.title
}

const RELATED_CHAPTERS: Partial<Record<ItemBandId, { slug: string; title: string }[]>> = Object.fromEntries(
  Object.entries(RELATED_CHAPTER_SLUGS).map(([bandId, slugs]) => [
    bandId,
    (slugs ?? [])
      .map((slug) => {
        const title = resolveChapterTitle(slug)
        return title ? { slug, title } : undefined
      })
      .filter((entry): entry is { slug: string; title: string } => entry !== undefined),
  ]),
)

type BandPosition = 'neutral' | 'past' | 'current' | 'future'

const POSITION_LABELS: Record<BandPosition, string> = {
  neutral: 'この時期',
  past: '過ぎた時期',
  current: 'いまの時期',
  future: 'これからの時期',
}

/** chips 上の月齢ラベル（spec 0003 AC-3）: 「妊娠期」「新生児 0〜1か月」「生後2〜3か月」 */
function MonthRail({
  bands,
  selectedBands,
  onToggleBand,
  onShowAll,
}: {
  bands: readonly ItemsBand[]
  selectedBands: readonly ItemBandId[]
  onToggleBand: (band: ItemBandId) => void
  onShowAll: () => void
}) {
  const chipClass = (active: boolean) =>
    `flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm whitespace-nowrap lg:min-h-9 ${
      active
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border bg-card text-foreground hover:border-primary active:bg-accent'
    }`

  return (
    <nav aria-label="月齢で絞り込む" className="mt-6">
      <h2 className="font-heading text-sm font-bold text-foreground">いまはどこ？ 月齢えらび</h2>
      <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap">
        <li>
          <button
            type="button"
            aria-pressed={selectedBands.length === 0}
            onClick={onShowAll}
            className={chipClass(selectedBands.length === 0)}
          >
            <span>すべて見る</span>
            <span className="font-mono text-xs">全 {bands.reduce((sum, b) => sum + b.items.length, 0)}品</span>
          </button>
        </li>
        {bands.map((band) => (
          <li key={band.id}>
            <button
              type="button"
              aria-pressed={selectedBands.includes(band.id)}
              onClick={() => onToggleBand(band.id)}
              className={chipClass(selectedBands.includes(band.id))}
            >
              <span>{monthLabel(band)}</span>
              <span className="font-mono text-xs">{band.items.length}品</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** カテゴリ・重要度の絞り込み（月齢とは AND 条件。count は全期間の該当数） */
function CategoryBar({
  items,
  categories,
  mustOnly,
  onToggleCategory,
  onToggleMustOnly,
  actions,
}: {
  items: readonly Item[]
  categories: readonly ItemCategory[]
  mustOnly: boolean
  onToggleCategory: (category: ItemCategory) => void
  onToggleMustOnly: () => void
  /** モバイルでは「必要だけ」と同じ行に並べる（絞り込み行がそのまま唯一の操作バーになる） */
  actions?: ReactNode
}) {
  const countBy = useMemo(() => {
    const map = new Map<ItemCategory, number>()
    for (const item of items) {
      map.set(item.category, (map.get(item.category) ?? 0) + 1)
    }
    return map
  }, [items])
  const chipClass = (active: boolean) =>
    `inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-sm font-medium whitespace-nowrap lg:min-h-9 ${
      active
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border bg-card text-foreground hover:border-primary active:bg-accent'
    }`

  return (
    <nav aria-label="カテゴリで絞り込む" className="mt-4">
      <h2 className="font-heading text-sm font-bold text-foreground">カテゴリしぼり込み</h2>
      <ul className="mt-2 flex flex-wrap gap-2">
        <li>
          <button
            type="button"
            aria-pressed={mustOnly}
            onClick={onToggleMustOnly}
            className={chipClass(mustOnly)}
          >
            必要だけ
          </button>
        </li>
        {actions && <li className="contents">{actions}</li>}
        {ITEM_CATEGORIES.map((c) => (
          <li key={c}>
            <button
              type="button"
              aria-pressed={categories.includes(c)}
              onClick={() => onToggleCategory(c)}
              className={chipClass(categories.includes(c))}
            >
              {CATEGORY_LABELS[c]}
              <span
                className={`font-mono text-xs ${categories.includes(c) ? 'opacity-80' : 'text-muted-foreground'}`}
              >
                {countBy.get(c) ?? 0}品
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

interface BandSectionProps {
  band: ItemsBand
  position: BandPosition
  expanded: boolean
  /** この band を accordion（閉じた行）にできる状態か（= 開いている band） */
  collapsible: boolean
  filters: ItemFilters
  doneSet: ReadonlySet<string>
  shopsByItem: ReadonlyMap<string, ResolvedShopLink[]>
  /** 次 band との境界ラベル（モバイルの「▼ 品目へ」ジャンプで「読み飛ばす量」を伝える） */
  boundaryLabel: string | null
  onJumpToNextItem: () => void
  onBackToIndex: () => void
  onToggle: (id: string, done: boolean) => void
  onExpand: () => void
  onCollapse: () => void
}

function BandSectionInner(
  {
    band,
    position,
    expanded,
    collapsible,
    filters,
    doneSet,
    shopsByItem,
    boundaryLabel,
    onJumpToNextItem,
    onBackToIndex,
    onToggle,
    onExpand,
    onCollapse,
  }: BandSectionProps,
  ref: Ref<HTMLElement>,
) {
  const items = useMemo(() => filterItems(band.items, filters), [band.items, filters])
  const summary = summarize(items, [...doneSet])
  const related = RELATED_CHAPTERS[band.id] ?? []
  // 見出しは常時描画し、ランドマーク名と「ジャンプ先リンク」の両方を満たす（spec 0003 / AC-1, AC-10）
  const headingId = `${band.id}-heading`

  return (
    <section
      ref={ref}
      id={band.id}
      aria-labelledby={headingId}
      className={`relative border-l-2 pl-4 sm:pl-6 ${
        position === 'current' ? 'border-primary' : 'border-border'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1.5 -left-[11px] size-4 rounded-full border-2 border-background sm:-left-[15px] ${
          position === 'neutral' || position === 'current' ? 'border-primary bg-primary' : 'border-border bg-card'
        }`}
      />
      <div className="pb-10">
        {/* 見出しは展開/折りたたみの両状態で常時描画（ランドマーク名と跳び先リンクのため） */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h2
            id={headingId}
            className="font-heading text-xl font-bold text-foreground sm:text-2xl"
          >
            {band.label}
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            {monthPoint(band.monthsFrom)} 〜 {monthPoint(band.monthsTo)}
          </span>
          {position === 'current' && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              いまの時期
            </span>
          )}
        </div>

        {expanded ? (
          <>
            <p className="mt-1 text-xs text-muted-foreground">
              表示 {items.length} 品・残り {summary.remaining} 品
            </p>
            <p className="mt-2 leading-7 text-foreground">{band.intro}</p>

            {band.support.length > 0 && (
              <section
                aria-labelledby={`${band.id}-support`}
                className="mt-4 rounded-lg border border-gold/40 bg-gold-soft/60 p-4"
              >
                <h3
                  id={`${band.id}-support`}
                  className="flex items-center gap-2 font-heading text-base font-bold text-foreground"
                >
                  <Gift className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  この時期に区からもらえるもの・やっておくこと
                </h3>
                <ul className="mt-2 space-y-3">
                  {band.support.map((support) => (
                    <li key={support.id}>
                      <p className="text-sm font-bold text-foreground">{support.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {support.detail}
                      </p>
                      <a
                        href={support.source}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 flex min-h-9 items-center text-sm text-primary underline underline-offset-2 hover:opacity-80 sm:min-h-0"
                      >
                        品川区・東京都の案内ページ
                        <span className="sr-only">（新しいタブで開きます）</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {items.length === 0 ? (
              <p className="mt-4 rounded-lg border border-dashed border-border bg-background p-4 text-sm leading-relaxed text-muted-foreground">
                この時期で、いまの絞り込み条件に合う品目はありません。
              </p>
            ) : (
              <>
                {/* 見出し・intro・区の支援を過ぎたところへ 1 タップで飛ぶ（モバイルだけ。デスクトップは左スパイが見出しリスト） */}
                <p className="mt-4 flex lg:hidden">
                  <button
                    type="button"
                    onClick={onJumpToNextItem}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-3 text-sm font-bold text-primary active:bg-primary/10"
                  >
                    <span aria-hidden="true">▼</span>
                    {boundaryLabel
                      ? `${band.label}の品目へ（次： ${boundaryLabel}）`
                      : `${band.label}の品目へ`}
                  </button>
                </p>
                <ul className="mt-3 space-y-3 lg:mt-4">
                  {items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      done={doneSet.has(item.id)}
                      onToggle={onToggle}
                      sources={band.sources}
                      shops={shopsByItem.get(item.id) ?? []}
                    />
                  ))}
                </ul>
              </>
            )}

            <p className="mt-3 rounded-lg bg-secondary/70 p-3 text-sm leading-relaxed text-foreground">
              {band.caution}
            </p>

            {collapsible && (
              <p>
                <button
                  type="button"
                  onClick={onCollapse}
                  className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 lg:min-h-9"
                >
                  <ChevronUp className="size-4" aria-hidden="true" />
                  この時期だけをたたむ
                </button>
              </p>
            )}

            {related.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {related.map((entry) => (
                  <li key={entry.slug}>
                    <a
                      href={`./${entry.slug}.html`}
                      className="flex min-h-9 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 sm:min-h-0"
                    >
                      {entry.title}を読む
                      <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {/* 時期をまたぐ移動（モバイルだけ） */}
            <p className="mt-3 flex gap-4 lg:hidden">
              <button
                type="button"
                onClick={onBackToIndex}
                className="inline-flex min-h-11 items-center gap-1.5 text-sm text-primary underline underline-offset-2 hover:opacity-80"
              >
                <span aria-hidden="true">∨</span>
                品目インデックスに戻る
              </button>
              {boundaryLabel && (
                <button
                  type="button"
                  onClick={onJumpToNextItem}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm text-primary underline underline-offset-2 hover:opacity-80"
                >
                  {boundaryLabel}の品目へ
                  <span aria-hidden="true">∧</span>
                </button>
              )}
            </p>
          </>
        ) : (
          <button
            type="button"
            onClick={onExpand}
            aria-label={`${band.label}の品目を開く`}
            className="mt-2 flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 text-left active:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:min-h-12"
          >
            <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
              <span className="text-muted-foreground">使用期間：</span>
              <span className="text-foreground">
                {monthPoint(band.monthsFrom)} 〜 {monthPoint(band.monthsTo)}
              </span>
              <span className="rounded bg-primary-soft px-1.5 py-0.5 text-xs text-primary">
                {POSITION_LABELS[position]}
              </span>
              <span className="text-muted-foreground">
                表示 {items.length} 品・残り {summary.remaining} 品（{summary.done} 品完了）
              </span>
              {summary.remainingHigh > 0 && (
                <span className="text-muted-foreground">
                  残り目安 {yen(summary.remainingLow)}〜{yen(summary.remainingHigh)}
                </span>
              )}
            </span>
            <ChevronDown className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  )
}

const BandSection = forwardRef(BandSectionInner)

export function Component({ data = ITEMS_DATA }: { data?: ItemsData } = {}) {
  const [selectedBands, setSelectedBands] = useState<readonly ItemBandId[]>([])
  const [expandedBands, setExpandedBands] = useState<readonly ItemBandId[] | null>(null)
  const [categories, setCategories] = useState<readonly ItemCategory[]>([])
  const [mustOnly, setMustOnly] = useState(false)
  const [done, setDone] = useState<readonly string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const restored = loadDone(data.items)
    if (restored) setDone(restored)
    setHydrated(true)
  }, [data.items])

  // hydrate 後にのみ保存する（初期描画で空のチェックを上書きしない）
  useEffect(() => {
    if (!hydrated) return
    try {
      const validIds = new Set(data.items.map((item) => item.id))
      const valid = [...new Set(done)].filter((id) => validIds.has(id))
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, done: valid }))
    } catch {
      // localStorage が使えなくてもチェックはメモリ上で有効のまま（checklist-view と同じ）
    }
  }, [done, hydrated, data.items])

  const toggle = (id: string, isDone: boolean) => {
    setDone((current) =>
      isDone ? [...new Set([...current, id])] : current.filter((value) => value !== id),
    )
  }

  const toggleCategory = (category: ItemCategory) => {
    setCategories((current) =>
      current.includes(category) ? current.filter((c) => c !== category) : [...current, category],
    )
  }

  // 月齢選択: 未選択 band を accordion にする。全解除で全開に戻す。
  const selectBand = (bandId: ItemBandId) => {
    const next = selectedBands.includes(bandId)
      ? selectedBands.filter((id) => id !== bandId)
      : [...selectedBands, bandId]
    setSelectedBands(next)
    // 選択した band だけを開く（複数選択可）。全解除なら全開に戻す。
    setExpandedBands(next.length > 0 ? next : null)
  }
  const showAllBands = () => {
    setSelectedBands([])
    setExpandedBands(null)
  }
  // 「すべて閉じる」は開いている band をゼロに。「すべて開く」は選択も解いて全開（null）に戻す。
  const collapseAllBands = () => setExpandedBands([])
  const expandAllBands = () => {
    setSelectedBands([])
    setExpandedBands(null)
  }
  // 「この時期だけをたたむ」は開いている band だけを狙う。全閉じになったら状態はそのまま（全開に戻さない）。
  const collapseBand = (bandId: ItemBandId) => {
    setExpandedBands(
      (current) =>
        (current ?? data.bands.map((band) => band.id)).filter((id) => id !== bandId),
    )
  }

  /* --- band 間スクロール（任意地点から period 先頭へ戻す / 次の period 先頭を跨ぐ） --- */

  const bandRefs = useRef(new Map<ItemBandId, HTMLElement>())
  const registerBand = (bandId: ItemBandId) => (el: HTMLElement | null) => {
    if (el) bandRefs.current.set(bandId, el)
    else bandRefs.current.delete(bandId)
  }
  // ヘッダー分だけ引いて見出し位置へ。reduced-motion のときは即移動。
  const scrollToBand = (bandId: ItemBandId) => {
    const el = bandRefs.current.get(bandId)
    if (!el) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const header = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '0',
    )
    const top = el.getBoundingClientRect().top + window.scrollY - header - 12
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' })
  }
  const backToIndex = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  // 販売先URL・価格調査日のレンジ・band 位置はすべてデータから算出（ハードコードしない）
  const shopsByItem = useMemo(
    () =>
      new Map(
        data.bands.flatMap((band) =>
          band.items.map((item) => [item.id, resolveShopLinks(item.shops)] as const),
        ),
      ),
    [data],
  )
  const priceSurvey = useMemo(() => {
    const dates = data.bands
      .flatMap((band) => band.items.filter((item) => item.price).map((item) => item.price!.checked))
      .sort()
    if (dates.length === 0) return null
    return dates[0] === dates[dates.length - 1]
      ? dates[0]
      : `${dates[0]} 〜 ${dates[dates.length - 1]}`
  }, [data])
  const bandRange = useMemo(() => {
    if (data.bands.length === 0) return ''
    const min = Math.min(...data.bands.map((band) => band.monthsFrom))
    const max = Math.max(...data.bands.map((band) => band.monthsTo))
    return `${monthPoint(min)}から ${monthPoint(max)}まで`
  }, [data])
  // 月齢 chip の選択を軸に band を判定する（未選択 band だけ accordion）。
  // 月齢未選択でも「この時期だけをたたむ」で個別に閉じられる（expandedBands === null が全開）。
  const selectedSet = useMemo(() => new Set(selectedBands), [selectedBands])
  const positionOf = (band: ItemsBand): BandPosition => {
    if (selectedBands.length === 0) return 'neutral'
    const firstSelected = data.bands.findIndex((b) => selectedSet.has(b.id))
    const index = data.bands.findIndex((b) => b.id === band.id)
    return selectedSet.has(band.id) ? 'current' : index < firstSelected ? 'past' : 'future'
  }

  const filters = useMemo<ItemFilters>(() => ({ categories, mustOnly }), [categories, mustOnly])
  const filterActive = categories.length > 0 || mustOnly
  const doneSet = useMemo(() => new Set(done), [done])
  const summary = useMemo(() => summarize(data.items, done), [data.items, done])
  // 「表示中」は実際に画面へ出ている band の該当数のこと（閉じている band は数えない）
  const visibleCount = useMemo(
    () =>
      data.bands.reduce((sum, band) => {
        const expanded = expandedBands === null ? true : expandedBands.includes(band.id)
        return expanded ? sum + filterItems(band.items, filters).length : sum
      }, 0),
    [data, filters, expandedBands],
  )

  const resetFilters = () => {
    setCategories([])
    setMustOnly(false)
  }

  // 開閉・リセット系操作。デスクトップは集計バー内、モバイルはカテゴリ絞り込み行に出す
  // （同一要素を幅によってどちらかにしか表示しない）。
  const barActions = (
    <>
      <button
        type="button"
        onClick={expandedBands === null ? collapseAllBands : expandAllBands}
        className="inline-flex min-h-11 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 lg:min-h-9"
      >
        {expandedBands === null ? (
          <ChevronUp className="size-4 shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
        )}
        {expandedBands === null ? 'すべての時期を閉じる' : 'すべての時期を開く'}
      </button>
      {filterActive && (
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex min-h-11 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 lg:min-h-9"
        >
          <RotateCcw className="size-4 shrink-0" aria-hidden="true" />
          絞り込みをもどす
        </button>
      )}
      {done.length > 0 && (
        <button
          type="button"
          onClick={() => setDone([])}
          className="inline-flex min-h-11 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 lg:min-h-9"
        >
          <RotateCcw className="size-4 shrink-0" aria-hidden="true" />
          チェックをすべて外す
        </button>
      )}
    </>
  )

  return (
    <div className="space-y-6">
      <header>
        <p className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground">
          <Baby className="size-3.5" aria-hidden="true" />
          妊娠中から 2 歳まで
        </p>
        <h1 className="mt-1 font-heading text-2xl leading-snug font-bold sm:text-[28px] lg:text-3xl">
          いつ、何を買う？ 月齢別タイムライン
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
          上から読むだけで、{bandRange}にそろえるものがわかる。
          月齢とカテゴリで絞り込め、チェックしたものは残り点数と目安予算から引かれる。
        </p>
        {priceSurvey && (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            価格は {priceSurvey} 時点で調査した目安（税込・セールやポイント還元は含まず）。
          </p>
        )}
      </header>

      <MonthRail
        bands={data.bands}
        selectedBands={selectedBands}
        onToggleBand={selectBand}
        onShowAll={showAllBands}
      />

      <CategoryBar
        items={data.items}
        categories={categories}
        mustOnly={mustOnly}
        onToggleCategory={toggleCategory}
        onToggleMustOnly={() => setMustOnly((v) => !v)}
        actions={
          /* モバイルでは絞り込み行が操作バーを兼ねる（集計値は出さない） */
          <div className="contents lg:hidden">{barActions}</div>
        }
      />

      {/* 準備状況と目安予算のサマリー：画面が広くなり十分に見えている band 数も分かるデスクトップ専用。
          モバイルでは常時表示すると「品目の頭」が画面から落ち続けるため、band 行の要約で代用する。 */}
      <section
        aria-label="準備状況と目安予算"
        className="sticky top-[var(--header-h)] z-30 hidden rounded-lg border border-border bg-card/95 p-3 backdrop-blur lg:block"
      >
        <p aria-live="polite" className="text-sm text-foreground">
          {`全 ${summary.total} 品目のうち`}
          <span className="font-heading font-bold"> 残り {summary.remaining} 品</span>
          <span className="text-muted-foreground">（準備完了 {summary.done} 品）</span>
          {filterActive && (
            <span className="text-muted-foreground">／ いまの条件で {visibleCount} 品目を表示中</span>
          )}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {summary.remainingHigh > 0 ? (
            <>
              残り品の目安予算{' '}
              <span className="font-mono text-foreground">
                {`${yen(summary.remainingLow)}〜${yen(summary.remainingHigh)}`}
              </span>{' '}
              （価格がわかる {summary.priced} 品目・税込）
            </>
          ) : (
            <>残り品に価格つきの品目はありません</>
          )}
        </p>
        <div className="mt-2 hidden flex-wrap items-center gap-x-3 gap-y-1 text-sm lg:flex">{barActions}</div>
      </section>

      {filterActive && visibleCount === 0 && (
        <p className="rounded-lg border border-dashed border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
          条件に合う品目が 0 件です。カテゴリの選びすぎか「必要だけ」の絞り込みが厳しすぎます。
        </p>
      )}

      <div>
        {data.bands.map((band, i) => {
          const expanded = expandedBands === null ? true : expandedBands.includes(band.id)
          const next = data.bands[i + 1]
          return (
            <BandSection
              key={band.id}
              band={band}
              position={positionOf(band)}
              expanded={expanded}
              collapsible={expanded}
              filters={filters}
              doneSet={doneSet}
              shopsByItem={shopsByItem}
              boundaryLabel={next ? `${next.monthsFrom}か月〜` : null}
              onJumpToNextItem={() => next && scrollToBand(next.id)}
              onBackToIndex={backToIndex}
              onToggle={toggle}
              onExpand={() => {
                setExpandedBands((current) => [
                  ...(current ?? data.bands.map((b) => b.id)),
                  band.id,
                ])
              }}
              onCollapse={() => collapseBand(band.id)}
              ref={registerBand(band.id)}
            />
          )
        })}
      </div>

      <p className="-mt-4 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
        月齢・数量の目安には個人差があります。ねんねの安全条件（硬いマット・仰向け・同じ部屋に別の寝具）は
        どの時期でも同じで、上記の「ねる」品目が揃っても寝床の条件は変わりません。
        医療や安全の判断は{' '}
        <a
          href="./safety.html"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          安全対策の章
        </a>{' '}
        を優先してください。品川区の給付・助成でカバーできる費用は{' '}
        <a
          href={HOJOKIN_URL}
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          shinagawa-hojokin
        </a>{' '}
        で確認できます。
      </p>
    </div>
  )
}

export default Component
