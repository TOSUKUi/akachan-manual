// 全出典 URL の生死を CI で確認するゲート（コンテンツ信頼性の根幹）。
// 使い方: node scripts/check-links.mjs [--workers N] [--from FILE]
// 200 以外を即失敗。403/429/999 は再試行（bot 拒否は一時的なことが多い）。
import { readFile } from 'node:fs/promises'
import process from 'node:process'

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
const OK = new Set([200])
const RETRY = new Set([403, 429, 500, 502, 503, 999])

function arg(name, dflt) {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : dflt
}

async function collect() {
  const urls = new Set()
  const files = []
  for (const dir of ['fact', 'items']) {
    const { readdir } = await import('node:fs/promises')
    for (const e of (await readdir(dir, { withFileTypes: true })).filter(
      (e) => e.isFile() && e.name.endsWith('.md'),
    ))
      files.push(`${dir}/${e.name}`)
  }
  for (const f of files) {
    const s = await readFile(f, 'utf8')
    for (const m of s.matchAll(/https?:\/\/[^\s"'<>()\[\]]+/g)) urls.add(m[0].replace(/[.,;、。」]+$/, ''))
  }
  return [...urls].filter((u) => /^https:\/\//.test(u))
}

async function head(url, attempt = 1) {
  const max = 3
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(25_000),
      headers: { 'User-Agent': UA, 'Accept-Language': 'ja,en;q=0.8', Referer: new URL(url).origin + '/' },
    })
    if (!OK.has(res.status) && RETRY.has(res.status) && attempt < max) {
      await new Promise((r) => setTimeout(r, 1500 * attempt))
      return head(url, attempt + 1)
    }
    return res.status
  } catch (e) {
    if (attempt < max) {
      await new Promise((r) => setTimeout(r, 1500 * attempt))
      return head(url, attempt + 1)
    }
    return `ERR ${e?.name ?? ''}`
  }
}

const urls = await collect()
const workers = Number(arg('workers', 8))
const bad = []
let done = 0
console.log(`[links] ${urls.length} 件を HTTP 確認（並列 ${workers}）`)

async function worker(slice) {
  for (const u of slice) {
    const status = await head(u)
    if (!OK.has(status)) bad.push({ url: u, status })
    if (++done % 25 === 0) console.log(`  ${done}/${urls.length}`)
  }
}

await Promise.all(Array.from({ length: workers }, (_, i) => worker(urls.filter((_, j) => j % workers === i))))

if (bad.length) {
  console.error(`\n[links] 失敗 ${bad.length} 件:`)
  for (const b of bad) console.error(`  ${b.status}  ${b.url}`)
  process.exit(1)
}
console.log(`[links] OK ${urls.length}/${urls.length}`)
