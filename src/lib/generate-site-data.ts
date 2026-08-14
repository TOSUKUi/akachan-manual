// fact/*.md の読み込み・検証・データ生成の共有ロジック（CLI と Vite プラグインで共用）。
// 検証エラーで失敗する（AC-4, AC-5）。警告は表示して続行（AC-11）。
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { DISCLAIMER, HOJOKIN_URL, SITE_NAME } from '../config.ts'
import type { Fact, SiteData } from './fact-model.ts'
import { parseFactFile, type FactIssue } from './fact-parse.ts'
import { buildSiteData, validateFacts } from './fact-validate.ts'

export const FACT_DIR = 'fact'
export const GENERATED_FILE = path.join('src', 'generated', 'site-data.ts')

interface Generated {
  data: SiteData
  report: { errors: FactIssue[]; warnings: FactIssue[] }
}

async function loadFacts(factDir: string): Promise<{ facts: Fact[]; issues: FactIssue[] }> {
  const entries = await readdir(factDir, { withFileTypes: true })
  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name)
    .sort()
  const facts: Fact[] = []
  const issues: FactIssue[] = []
  for (const name of files) {
    const raw = await readFile(path.join(factDir, name), 'utf8')
    const result = parseFactFile(raw, name)
    if (result.ok) facts.push(result.fact)
    else issues.push(...result.issues)
  }
  return { facts, issues }
}

function maxLastVerified(facts: readonly Fact[]): string {
  return (
    facts
      .map((f) => f.frontmatter.lastVerified)
      .filter(Boolean)
      .sort()
      .at(-1) ?? ''
  )
}

/** fact/ を読み込み・検証し、src/generated/site-data.ts を書き出す。 */
export async function generateSiteData(root: string): Promise<Generated> {
  const factDir = path.resolve(root, FACT_DIR)
  const { facts, issues: parseIssues } = await loadFacts(factDir)
  const report = validateFacts(facts)
  const errors = [...parseIssues, ...report.errors]

  for (const w of report.warnings) {
    console.warn(`[fact] 警告 ${w.file}${w.section ? ` / ${w.section}` : ''}: ${w.message}`)
  }

  if (errors.length > 0) {
    const lines = errors.map((i) => `  - ${i.file}${i.section ? ` / ${i.section}` : ''}: ${i.message}`)
    throw new Error(`fact の検証に失敗しました（${errors.length} 件）:\n${lines.join('\n')}`)
  }

  const data = buildSiteData(facts, {
    siteName: SITE_NAME,
    siteLastVerified: maxLastVerified(facts),
    hojokinUrl: HOJOKIN_URL,
    disclaimer: DISCLAIMER,
  })

  const out = path.resolve(root, GENERATED_FILE)
  await mkdir(path.dirname(out), { recursive: true })
  const code = [
    '// このファイルは scripts/gen-site-data.mts（fact/*.md から）で自動生成されます。',
    '// 手編集しないこと。変更は fact/ 側で行う。',
    "import type { SiteData } from '../lib/fact-model'",
    '',
    `export const SITE_DATA: SiteData = ${JSON.stringify(data, null, 2)};`,
    '',
  ].join('\n')
  await writeFile(out, code, 'utf8')

  return { data, report: { errors, warnings: report.warnings } }
}
