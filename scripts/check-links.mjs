// 全出典 URL の生死を確認するゲート（コンテンツ信頼性の根幹）。CI では continue-on-error。
// 使い方: node scripts/check-links.mjs [--workers N]
//
// 判定は3分類にする。全部を失敗にすると、こちら側で直せないものでゲートが鳴り続ける：
//   dead      … 404 / 410、またはステータス偽装を剥がした結果がサイトの「ページが見つかりません」
//   blocked   … 403 / 451（bot 拒否・WAF）。ブラウザでは開けることが多く、人手確認に回す
//   transient … 5xx・通信不可・タイムアウト。サイト側障害で、こちらで直せない
// exit 1 は dead に対してだけ。blocked / transient は報告する。
import { readFile, readdir } from 'node:fs/promises'
import process from 'node:process'

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
const OK = new Set([200])
// 429 / 529 は「混雑・過剰要求」のシグナル。短待ち時間での再試行は逆効果なので長く待つ。
const RETRY = new Set([403, 429, 451, 500, 502, 503, 504, 529, 999])
const BACKOFF = { 429: 12_000, 529: 20_000 }
const NOT_FOUND_MARKERS = [
  'お探しのページ',
  'ページが見つかりません',
  'ページを公開しておりません',
  'ページが存在しません',
  '404 Not Found',
  'Page Not Found',
  'page not found',
]

function arg(name, dflt) {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : dflt
}

// 出典は fact/ と items/ の frontmatter + 本文に現れる https URL。重複は探っても意味がないので1回にする。
async function collect() {
  const urls = new Map() // url -> Set<file>
  for (const dir of ['fact', 'items']) {
    for (const e of (await readdir(dir, { withFileTypes: true })).filter(
      (e) => e.isFile() && e.name.endsWith('.md'),
    )) {
      const f = `${dir}/${e.name}`
      const s = await readFile(f, 'utf8')
      for (const m of s.matchAll(/https?:\/\/[^\s"'<>()\[\]]+/g)) {
        const u = m[0].replace(/[.,;、。」)]+$/, '')
        if (!urls.has(u)) urls.set(u, new Set())
        urls.get(u).add(f)
      }
    }
  }
  return [...urls].map(([url, fileSet]) => ({ url, files: [...fileSet] }))
}

// ステータスだけを信用しない。サイトの 404 ページを 403 で返す運用（消費者庁で実測）があるため、
// 落ちた時は本文的头を見て「ページが見つかりません」かどうかを見る。
function verdict(code, body) {
  if (OK.has(code)) return 'ok'
  const text = typeof body === 'string' ? body : ''
  if (NOT_FOUND_MARKERS.some((m) => text.includes(m))) return 'dead'
  if (code === 404 || code === 410) return 'dead'
  if (code === 403 || code === 451) return 'blocked'
  if (code === 'timeout' || code === 'error' || code >= 500) return 'transient'
  return 'dead'
}

async function probe(url) {
  const max = 3
  for (let attempt = 1; attempt <= max; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(25_000),
        headers: {
          'User-Agent': UA,
          Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
          'Accept-Language': 'ja,en;q=0.8',
          'Cache-Control': 'no-cache',
          Referer: new URL(url).origin + '/',
        },
      })
      const code = res.status
      if (OK.has(code)) return { code, body: '', kind: 'ok' }
      let body = ''
      try {
        body = (await res.text()).slice(0, 6000)
      } catch {
        body = ''
      }
      const kind = verdict(code, body)
      if (kind === 'dead' || attempt === max) return { code, body, kind }
      await new Promise((r) => setTimeout(r, BACKOFF[code] ?? 1500 * attempt))
    } catch (e) {
      if (attempt === max) return { code: 'error', body: '', kind: 'transient', note: e?.name ?? '' }
      await new Promise((r) => setTimeout(r, 1500 * attempt))
    }
  }
  return { code: 'error', body: '', kind: 'transient' }
}

const all = await collect()
const workers = Number(arg('workers', 8))
const results = new Map()
let done = 0
console.log(`[links] ${all.length} 件を HTTP 確認（並列 ${workers}、429/529 は長期バックオフつき再試行）`)

async function worker(slice) {
  for (const item of slice) {
    const r = await probe(item.url)
    results.set(item.url, { ...r, files: item.files })
    if (++done % 25 === 0) console.log(`  ${done}/${all.length}`)
  }
}

await Promise.all(Array.from({ length: workers }, (_, i) => worker(all.filter((_, j) => j % workers === i))))

const bad = all.filter((a) => results.get(a.url).kind !== 'ok')
const dead = bad.filter((a) => results.get(a.url).kind === 'dead')
const blocked = bad.filter((a) => results.get(a.url).kind === 'blocked')
const transient = bad.filter((a) => results.get(a.url).kind === 'transient')
const okCount = all.length - bad.length

if (bad.length) {
  console.error(`\n[links] 応答確認 ${bad.length} 件の内訳:`)
  const show = (label, list) => {
    if (!list.length) return
    console.error(`  ${label} (${list.length})`)
    for (const a of list) {
      const r = results.get(a.url)
      console.error(`    ${String(r.code)}  ${a.url}`)
      console.error(`          参照: ${a.files.join(', ')}`)
    }
  }
  show('実404（このファイルの差し替えが必要）', dead)
  show('拒否・bot 遮断（ブラウザで開けるか要確認）', blocked)
  show('一時障害・通信不可（再確認）', transient)
}

console.log(`\n[links] 正常 ${okCount}/${all.length}`)
console.log(`[links] 内訳 — dead ${dead.length} / 拒否 ${blocked.length} / 一時的 ${transient.length}`)
if (dead.length) {
  console.error(`\n[links] 要差し替え ${dead.length} 件`)
  process.exit(1)
}
console.log('[links] 実404 は 0 件')
