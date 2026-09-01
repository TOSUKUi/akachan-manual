// items/*.md → src/generated/items-data.ts の生成（検証ゲート込み）。
// generate-site-data.ts と同じ流儀: 検証エラーは throw（ビルド失敗）、鮮度は警告して続行。
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseItemsFile, type ItemIssue } from './items-parse.ts'
import { buildItemsData, validateItems } from './items-validate.ts'
import type { ItemsData } from './items-model.ts'

export const ITEMS_DIR = 'items'
export const ITEMS_GENERATED_FILE = path.join('src', 'generated', 'items-data.ts')

export interface GeneratedItems {
  data: ItemsData
  report: { errors: ItemIssue[]; warnings: ItemIssue[] }
}

export async function loadItems(
  itemsDir: string,
): Promise<{ bands: ItemsData['bands']; issues: ItemIssue[] }> {
  const entries = await readdir(itemsDir, { withFileTypes: true })
  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name)
    .sort()
  const bands: ItemsData['bands'] = []
  const issues: ItemIssue[] = []
  for (const name of files) {
    const raw = await readFile(path.join(itemsDir, name), 'utf8')
    const result = parseItemsFile(raw, name)
    if (result.ok) bands.push(result.band)
    else issues.push(...result.issues)
  }
  return { bands, issues }
}

/** items/ を読み込み・検証し、src/generated/items-data.ts を書き出す。 */
export async function generateItemsData(root: string): Promise<GeneratedItems> {
  const itemsDir = path.resolve(root, ITEMS_DIR)
  const { bands, issues: parseIssues } = await loadItems(itemsDir)
  const report = validateItems(bands)
  const errors = [...parseIssues, ...report.errors]

  for (const w of report.warnings) {
    console.warn(`[items] 警告 ${w.file}${w.item ? ` / ${w.item}` : ''}: ${w.message}`)
  }

  if (errors.length > 0) {
    const lines = errors.map((i) => `  - ${i.file}${i.item ? ` / ${i.item}` : ''}: ${i.message}`)
    throw new Error(`items/ の検証に失敗しました（${errors.length} 件）:\n${lines.join('\n')}`)
  }

  const data = buildItemsData(bands)
  const out = path.resolve(root, ITEMS_GENERATED_FILE)
  await mkdir(path.dirname(out), { recursive: true })
  const code = [
    '// このファイルは scripts/gen-items-data.mts（items/*.md から）で自動生成されます。',
    '// 手編集しないこと。変更は items/ 側で行う。',
    "import type { ItemsData } from '../lib/items-model'",
    '',
    `export const ITEMS_DATA: ItemsData = ${JSON.stringify(data, null, 2)};`,
    '',
  ].join('\n')
  await writeFile(out, code, 'utf8')

  return { data, report: { errors, warnings: report.warnings } }
}
