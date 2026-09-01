// items/*.md → src/generated/items-data.ts の生成 CLI（検証ゲートを含む）。
// npm run gen / ビルドの前置きとして実行される。
import { generateItemsData } from '../src/lib/generate-items-data'

const root = process.cwd()
try {
  const { data, report } = await generateItemsData(root)
  const priceCount = data.items.filter((i) => i.price).length
  console.log(
    `[items] 区分 ${data.bands.length} 件 / アイテム ${data.items.length} 件（価格つき ${priceCount} 件）/ 警告 ${report.warnings.length} 件を src/generated/items-data.ts に生成しました`,
  )
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
}
