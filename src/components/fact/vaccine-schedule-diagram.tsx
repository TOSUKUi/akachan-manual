/**
 * 予防接種スケジュール「目で見る版」（fact の「:::diagram vaccine-schedule:::」マーカーで描画）。
 * モバイル優先：1 行 1 ワクチン、時期と回数をテキストで表示（横スクロール不要）。
 * 内容は fact/03-vaccines.md の表（品川区・厚労省公式情報）と同じ。
 */
interface VaccineRow {
  name: string
  window: string
}

const ROWS: readonly VaccineRow[] = [
  { name: 'RSウイルス（妊婦）', window: '妊娠28週0日〜36週6日（妊婦本人）・1回' },
  { name: '五種混合（1期 初回）', window: '生後2カ月〜・3回（20日以上間隔）' },
  { name: '小児用肺炎球菌（初回）', window: '生後2カ月〜・最大3回（開始時期により異なる）' },
  { name: 'B型肝炎', window: '生後2カ月〜・3回（27日以上間隔×2回、1回目から139日以上で3回目）' },
  { name: 'ロタウイルス（経口）', window: '生後6週0日〜・2回（ロタリックス）または3回（ロタテック）' },
  { name: 'BCG（結核）', window: '生後5カ月〜満1歳の前日・1回' },
  { name: '五種混合（1期 追加）', window: '1歳〜・1回（3回目から6カ月以上あけて）' },
  { name: '小児用肺炎球菌（追加）', window: '生後12カ月〜・1回（初回から60日以上あけて）' },
  { name: 'MR（麻しん・風しん）', window: '1歳〜2歳の誕生日前日・1回' },
  { name: '水痘（水ぼうそう）', window: '1歳〜・2回（3カ月以上あけて）' },
  { name: '日本脳炎（1期）', window: '3歳・4歳・3回（6〜28日間隔×2回 + 追加1回）' },
]

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
            <p className="min-w-0 text-xs leading-relaxed text-muted-foreground">{r.window}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
