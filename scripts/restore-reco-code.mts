// recommend 機能のコード側を復元する冪等スクリプト（作業ツリー消失への対策）。
// 実行: npx tsx scripts/restore-reco-code.mts
import { readFile, writeFile } from 'node:fs/promises'

type Edits = Array<[string, string]>

async function patch(file: string, edits: Edits): Promise<void> {
  let s = await readFile(file, 'utf8')
  let changed = 0
  for (const [from, to] of edits) {
    if (s.includes(to)) continue // 冪等
    if (!s.includes(from)) throw new Error(`${file}: anchor が見つかりません -> ${from.slice(0, 70)}`)
    s = s.replace(from, to)
    changed++
  }
  if (!changed) return console.log(`skip ${file}`)
  await writeFile(file, s)
  console.log(`patched ${file} (${changed})`)
}

const RECOMMEND_INTERFACE = `/**
 * 「買ってから失敗した」という声をもとに選んだ一品。
 * url は調査日に実取得で実在と価格を確認できた商品ページに限る（推測・記憶での記入は不可）。
 */
export interface Recommend {
  name: string
  url: string
  /** 販売元の税込表示どおりの実測価格（「~~円〜」「在庫なし・要問合せ」可） */
  price: string
  /** 実測値と評価件数を根拠として書く */
  note: string
}

`

await patch('src/lib/items-model.ts', [
  ['/** 販売先は kind + 検索語だけ持つ', RECOMMEND_INTERFACE + '/** 販売先は kind + 検索語だけ持つ'],
  [
    `  price?: ItemPrice
  shops: ShopLink[]
}`,
    `  price?: ItemPrice
  shops: ShopLink[]
  /** 買ってから失敗したという声をもとに選んだ一品（未選定なら省略） */
  recommend?: Recommend
}`,
  ],
])

const PARSER = `function parseRecommend(
  value: unknown,
  file: string,
  itemLabel: string,
  issues: ItemIssue[],
): Recommend | undefined {
  if (value === undefined) return undefined
  const at = \`item "\${itemLabel}".recommend\`
  if (!isRecord(value)) {
    issues.push({
      file,
      item: itemLabel,
      code: 'items_invalid_yaml',
      message: \`\${at} は name / url / price / note を持つマップです\`,
      hint: '実在を確認できた一品の商品名・URL・実測価格・選定理由を書く',
    })
    return undefined
  }
  for (const key of Object.keys(value)) {
    if (!(RECOMMEND_FIELDS as readonly string[]).includes(key)) {
      issues.push({
        file,
        item: itemLabel,
        code: 'items_unknown_field',
        message: \`\${at}.\${key} は未知のフィールドです\`,
        hint: \`使えるフィールド: \${RECOMMEND_FIELDS.join(', ')}\`,
      })
    }
  }
  const out: Partial<Recommend> = {}
  for (const field of RECOMMEND_FIELDS) {
    const v = value[field]
    if (typeof v !== 'string' || v.trim() === '') {
      issues.push({
        file,
        item: itemLabel,
        code: 'items_invalid_yaml',
        message: \`\${at}.\${field} は空でない文字列で書いてください\`,
        hint: 'price は実測した金額、note は実測値と評価件数を根拠にしてください',
      })
      continue
    }
    if (field === 'url' && !/^https:\\/\\/\\S+$/.test(v.trim())) {
      issues.push({
        file,
        item: itemLabel,
        code: 'items_invalid_yaml',
        message: \`\${at}.url は https の絶対 URL にしてください\`,
        hint: '調査日に実取得で確認できた商品ページの URL を書く',
      })
      continue
    }
    out[field] = v.trim()
  }
  if (Object.keys(out).length !== RECOMMEND_FIELDS.length) return undefined
  return out as Recommend
}

`

await patch('src/lib/items-parse.ts', [
  ['  type CompareRow,', '  type CompareRow,\n  type Recommend,'],
  [
    `  'price',
  'shops',
] as const
const PRICE_FIELDS = ['low', 'high', 'unit', 'sources', 'checked'] as const`,
    `  'price',
  'shops',
  'recommend',
] as const
const PRICE_FIELDS = ['low', 'high', 'unit', 'sources', 'checked'] as const
const RECOMMEND_FIELDS = ['name', 'url', 'price', 'note'] as const`,
  ],
  ['function parsePrice(', PARSER + 'function parsePrice('],
  [
    `  const shops = parseShops(value.shops, file, label, issues)`,
    `  const shops = parseShops(value.shops, file, label, issues)
  const recommend = parseRecommend(value.recommend, file, label, issues)`,
  ],
  [
    `  if (price) item.price = price
  return item`,
    `  if (price) item.price = price
  if (recommend) item.recommend = recommend
  return item`,
  ],
])

const RECO_BLOCK = `          {item.recommend && (
            <div className="reco">
              <span className="reco-tag">選ぶならこれ</span>
              <a
                className="reco-name"
                href={item.recommend.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.recommend.name}
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
              <span className="reco-price">{item.recommend.price}</span>
              <p className="reco-why">{item.recommend.note}</p>
            </div>
          )}

`

await patch('src/components/timeline/item-card.tsx', [
  ['      {item.compare && (', RECO_BLOCK + '      {item.compare && ('],
])

export const RECO_CSS = `
.reco {
  display: grid;
  gap: 4px;
  margin: 10px 0;
  padding: 10px 12px;
  border: 1px solid var(--primary);
  border-radius: 10px;
  background: color-mix(in oklab, var(--primary) 7%, var(--card));
}

.reco-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary);
}

.reco-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--foreground);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.reco-price {
  font-size: 0.8125rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--foreground);
}

.reco-why {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--muted-foreground);
}
`

await patch('src/index.css', [
  ['@media (prefers-reduced-motion: reduce) {', RECO_CSS + '\n@media (prefers-reduced-motion: reduce) {'],
])

console.log('recommend コード復元 完了')
