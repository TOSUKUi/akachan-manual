// fact/*.md → src/generated/site-data.ts の生成 CLI（検証ゲートを含む）。
// npm run gen / ビルドの前置きとして実行される。
import { generateSiteData } from '../src/lib/generate-site-data'

const root = process.cwd()
try {
  const { data, report } = await generateSiteData(root)
  console.log(
    `[fact] 章 ${data.chapters.length} 件 / 必須項目 ${data.mustItems.length} 件 / 最終確認日 ${data.meta.siteLastVerified}（警告 ${report.warnings.length} 件）を src/generated/site-data.ts に生成しました`,
  )
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
}
