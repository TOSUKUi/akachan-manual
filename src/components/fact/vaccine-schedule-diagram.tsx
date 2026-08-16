/**
 * 予防接種スケジュール「目で見る版」（fact の「:::diagram vaccine-schedule:::」マーカーで描画）。
 * このサイトの予防接種スケジュールの**正本**（fact/03-vaccines.md の旧テーブルを統合）。
 * 予診票送付時期でグループ化し、各ワクチンの回数・接種方法を 1 行にまとめる。
 * モバイル優先: 縦リストで横スクロール不要。情報は品川区・厚労省公式に基づく。
 */
interface VaccineItem {
  name: string
  detail: string
}

interface VaccineGroup {
  /** 予診票送付時期（品川区表の「予診票送付時期」列） */
  when: string
  items: VaccineItem[]
}

const GROUPS: readonly VaccineGroup[] = [
  {
    when: '出生前（妊娠届提出後）',
    items: [
      {
        name: 'RSウイルス',
        detail: '妊娠28週0日〜36週6日の間に1回（妊婦本人）',
      },
    ],
  },
  {
    when: '生後2カ月',
    items: [
      {
        name: '五種混合（ジフテリア・百日せき・破傷風・不活化ポリオ・Hib）',
        detail: '3回（20日以上の間隔。標準は20〜56日）',
      },
      {
        name: '小児用肺炎球菌',
        detail: '最大3回（生後2カ月〜6カ月開始は3回。生後24カ月まで。開始年齢により異なる）',
      },
      {
        name: 'B型肝炎',
        detail: '3回（27日以上間隔×2回、1回目から139日以上で3回目。標準は生後2〜8カ月）',
      },
      {
        name: 'ロタウイルス（経口）',
        detail:
          'ロタリックスは2回（生後6週0日〜24週0日）、ロタテックは3回（生後6週0日〜32週0日）。1回目は生後14週6日までに開始',
      },
    ],
  },
  {
    when: '生後5カ月',
    items: [
      {
        name: 'BCG（結核）',
        detail: '1回（満1歳誕生日の前日まで。標準は生後5〜8カ月）',
      },
    ],
  },
  {
    when: '1歳',
    items: [
      {
        name: '五種混合（1期追加）',
        detail: '1回（初回3回完了後、3回目から6か月以上あけて）',
      },
      {
        name: '小児用肺炎球菌（追加）',
        detail: '1回（最後の初回接種から60日以上あけて、生後12か月以降）',
      },
      {
        name: 'MR（麻しん・風しん）',
        detail: '1回（1歳〜2歳誕生日の前日まで）',
      },
      {
        name: '水痘（水ぼうそう）',
        detail: '2回（3カ月以上あけて。標準は1回目が生後12〜15カ月、2回目は1回目から6カ月〜1年）',
      },
    ],
  },
  {
    when: '3歳・4歳',
    items: [
      {
        name: '日本脳炎（1期）',
        detail: '3回（3歳で6〜28日間隔×2回、4歳で初回完了後6か月以上あけて1回。7歳6か月前日まで）',
      },
    ],
  },
]

/** 「0〜2歳の予防接種スケジュール」の正本（予診票送付時期でグループ化）。 */
export default function VaccineScheduleDiagram() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <p className="border-b border-border bg-muted/60 px-4 py-2 font-heading text-sm font-bold">
        0〜2歳 予防接種スケジュール（予診票の送付時期ごと）
      </p>
      <div className="divide-y divide-border bg-card">
        {GROUPS.map((g) => (
          <section key={g.when}>
            <p className="bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary">{g.when}</p>
            <ul className="divide-y divide-border/60">
              {g.items.map((it) => (
                <li key={it.name} className="px-4 py-2.5">
                  <p className="font-heading text-sm font-bold leading-snug">{it.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {it.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
