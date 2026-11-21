// 脆弱性診断で出た指摘を当てる冪等パッチ（出典を https 一本に揃え、外链 rel と CSP を締める）。
// 実行: npx tsx scripts/apply-security-hardening.mts
import { readFile, writeFile } from 'node:fs/promises'

type Edits = Array<[string, string]>

async function patch(file: string, edits: Edits): Promise<void> {
  let s = await readFile(file, 'utf8')
  let changed = 0
  for (const [from, to] of edits) {
    if (to !== from && s.includes(to)) continue // 冪等
    if (!s.includes(from)) throw new Error(`${file}: anchor 不在 -> ${from.slice(0, 70)}`)
    s = s.replace(from, to)
    changed++
  }
  if (!changed) return console.log(`skip ${file}`)
  await writeFile(file, s)
  console.log(`patched ${file} (${changed})`)
}

// --- 1) 出典 URL を https のみに（コンテンツに http:// は 1 件も無いため破壊なし） ---
await patch('src/lib/items-parse.ts', [
  [`    if (!/^https?:\\/\\//.test(url)) {`, `    if (!/^https:\\/\\/\\S+$/.test(url)) {`],
  [
    `        message: \`url が http(s) URL ではありません（${url || '(空)'}）\`,`,
    "        message: `url が https の絶対 URL ではありません（${url || '(空)'}）`,",
  ],
  [`    if (!/^https?:\\/\\//.test(source))`, `    if (!/^https:\\/\\/\\S+$/.test(source))`],
  [`      if (!/^https?:\\/\\//.test(source))`, `      if (!/^https:\\/\\/\\S+$/.test(source))`],
])

await patch('src/lib/fact-parse.ts', [
  [`      if (!name || !url.startsWith('http')) {`, `      if (!name || !/^https:\\/\\/\\S+$/.test(url)) {`],
  [
    `          message: \`frontmatter の sources[${i}] に name と http(s) url が両方必要です\`,`,
    '          message: `frontmatter の sources[${i}] に name と https の url が両方必要です`,',
  ],
])

// --- 2) 外链 rel を noopener noreferrer に統一（旧ブラウザでの tabnabbing 対策） ---
await patch('src/pages/[chapter].tsx', [[`rel="noreferrer"`, `rel="noopener noreferrer"`]])
await patch('src/components/fact/fact-section-view.tsx', [[`rel="noreferrer"`, `rel="noopener noreferrer"`]])

// --- 3) CSP（インラインスクリプトを外部ファイルへ退避して script-src 'self' を可能に） ---
await patch('index.html', [
  [
    `    <link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />`,
  ],
])

console.log('セキュリティ硬化パッチ 完了')
