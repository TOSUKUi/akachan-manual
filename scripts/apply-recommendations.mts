// docs/research/item-timeline/picks/*.json の選定結果を items/*.md の frontmatter に反映する。
// YAML ブロック形式の各 item ブロック末尾に recommend: を追記する（再シリアライズしない＝差分は追記のみ）。
// 実行: npx tsx scripts/apply-recommendations.mts [--replaced]
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

type Reco = { name: string; url: string; price: string; note: string }
type Picks = Record<string, { recommend?: Reco } | Record<string, string>>

const PICKS_DIR = 'docs/research/item-timeline/picks'
const q = (s: string) => `'${String(s).replace(/'/g, "''")}'`

const all: Picks = {}
for (const f of (await readdir(PICKS_DIR)).filter((f) => f.endsWith('.json'))) {
  Object.assign(all, JSON.parse(await readFile(path.join(PICKS_DIR, f), 'utf8')) as Picks)
}

let applied = 0
for (const name of (await readdir('items')).filter((f) => f.endsWith('.md'))) {
  const p = path.join('items', name)
  const lines = (await readFile(p, 'utf8')).split('\n')
  const starts: number[] = []
  for (let i = 0; i < lines.length; i++) if (/^ {2}- id: /.test(lines[i])) starts.push(i)
  if (!starts.length) continue

  // 各 item ブロックの終端（次の item 開始 or items: の終端）を求める
  const inserts: Array<{ at: number; block: string[] }> = []
  let replaced = 0
  for (let k = 0; k < starts.length; k++) {
    const id = lines[starts[k]].slice('  - id: '.length).trim()
    const entry = all[id] as { recommend?: Reco } | undefined
    if (!entry?.recommend) continue
    const r = entry.recommend
    let end = k + 1 < starts.length ? starts[k + 1] : lines.length
    while (end > starts[k] + 1 && (lines[end - 1] === '' || /^---\s*$/.test(lines[end - 1]))) end--
    // 同ブロック内に既に recommend: があればその 5 行を置換（冪等）
    const have = lines.findIndex((l, i) => i > starts[k] && i < end && l === '    recommend:')
    if (have >= 0) {
      lines.splice(
        have,
        5,
        `    recommend:`,
        `      name: ${q(r.name)}`,
        `      url: ${q(r.url)}`,
        `      price: ${q(r.price)}`,
        `      note: ${q(r.note)}`,
      )
      replaced++
      continue
    }
    inserts.push({
      at: end,
      block: [
        '    recommend:',
        `      name: ${q(r.name)}`,
        `      url: ${q(r.url)}`,
        `      price: ${q(r.price)}`,
        `      note: ${q(r.note)}`,
      ],
    })
  }
  if (!inserts.length) continue
  for (const ins of inserts.reverse()) lines.splice(ins.at, 0, ...ins.block)
  await writeFile(p, lines.join('\n'))
  applied += inserts.length + replaced
  console.log(`${name}: 追記 ${inserts.length} / 置換 ${replaced}`)
}
console.log(`合計 ${applied} 品目に recommend を追記（入力 ${Object.keys(all).length} キー）`)
