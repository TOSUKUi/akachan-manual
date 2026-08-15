/**
 * 予防接種スケジュール「目で見る版」（fact の「:::diagram vaccine-schedule:::」マーカーで描画）。
 * モバイル優先：1 行 1 ワクチン、回数は丸数字チップ、時期はテキストで表示（横スクロール不要）。
 * 内容は fact/03-vaccines.md の表（品川区・厚労省公式情報）と同じ。チップは装飾のみ（aria-hidden）。
 */
interface VaccineRow {
  name: string
  doses: number
  window: string
}

const ROWS: readonly VaccineRow[] = [
  { name: 'RSウイルス（妊婦）', doses: 1, window: '妊娠28週0日〜36週6日（妊婦本人）' },
  { name: '五種混合（1期 初回）', doses: 3, window: '生後2カ月〜、20日以上間隔で3回' },
  { name: '小児用肺炎球菌（初回）', doses: 3, window: '生後2カ月〜、最大3回（開始時期により異なる）' },
  { name: 'B型肝炎', doses: 3, window: '生後2カ月〜（27日以上間隔×2回、1回目から139日以上で3回目）' },
  { name: 'ロタウイルス（経口）', doses: 2, window: '生後6週0日〜（ロタリックス2回 / ロタテック3回）' },
  { name: 'BCG（結核）', doses: 1, window: '生後5カ月〜満1歳の前日' },
  { name: '五種混合（1期 追加）', doses: 1, window: '1歳〜（3回目から6カ月以上あけて）' },
  { name: '小児用肺炎球菌（追加）', doses: 1, window: '生後12カ月〜（初回から60日以上あけて）' },
  { name: 'MR（麻しん・風しん）', doses: 1, window: '1歳〜2歳の誕生日前日' },
  { name: '水痘（水ぼうそう）', doses: 2, window: '1歳〜（3カ月以上あけて2回）' },
  { name: '日本脳炎（1期）', doses: 3, window: '3歳・4歳（6〜28日間隔×2回 + 追加1回）' },
]

/** 回数チップ（1..n の丸数字）。装飾のみ。 */
function DoseChips({ count }: { count: number }) {
  return (
    <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="inline-flex size-6 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-xs font-bold text-primary"
        >
          {i + 1}
        </span>
      ))}
    </span>
  )
}

/** 「0〜2歳の予防接種スケジュール」を一目で見られるリスト表示。 */
export default function VaccineScheduleDiagram() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <p className="border-b border-border bg-muted/60 px-4 py-2 font-heading text-sm font-bold">
        0〜2歳 予防接種スケジュール（目で見る版）
      </p>
      <ul className="divide-y divide-border bg-card">
        {ROWS.map((r) => (
          <li
            key={r.name}
            className="flex flex-col gap-1.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-3"
          >
            <p className="min-w-0 flex-1 font-heading text-sm font-bold leading-snug">{r.name}</p>
            <p className="flex min-w-0 flex-wrap items-center gap-2">
              <DoseChips count={r.doses} />
              <span className="min-w-0 text-xs leading-relaxed text-muted-foreground">{r.window}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
