// dist の各 HTML に CSP script-src のハッシュ許可を注入する（npm run build の postbuild）。
//
// 背景: vite-react-ssg は各ページに
//   <script>window.__VITE_REACT_SSG_HASH__ = '<hash>'</script>
//   <script>window.__staticRouterHydrationData = JSON.parse("...")</script>
// の 2 本のインラインスクリプトを入れる。CSP を script-src 'self'（'unsafe-inline' 無し）で
// 配るとこれがブロックされ、window.__VITE_REACT_SSG_HASH__ が undefined のまま
// static-loader-data-manifest-undefined.json を fetch → 404 の HTML を JSON.parse しようとして
// 全ページが「Unexpected Application Error!」になる（2026-11-21 に実測。静的 HTML は正しく
// 生成されているので、ビルドが壊れているように見えないのが厄介だった）。
//
// 'unsafe-inline' を戻すと XSS 対策としての実質的な意味を失うため、ページごとに存在する
// インラインスクリプトの SHA-256 を列挙して許可する。中身が変わればハッシュが変わるので、
// SSG が生成する決定的な 2 本だけが許可され、注入された任意スクリプトは引き続き拒否される。
import { readFile, writeFile, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

const INLINE =
  /<script(?![^>]*\bsrc=)(?![^>]*\btype=["']application\/json)(?![^>]*\btype=["']text\/bookmark[^>]*)[^>]*>([\s\S]*?)<\/script>/g

function hashOf(body) {
  return `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`
}

async function htmlFiles(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await htmlFiles(p)))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

const files = (await htmlFiles('dist')).filter((f) => !f.includes('/assets/'))
let touched = 0
const problems = []

for (const file of files) {
  let html = await readFile(file, 'utf8')
  const meta = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/)
  if (!meta) {
    problems.push(`${file}: CSP meta が無い`)
    continue
  }
  const bodies = [...html.matchAll(INLINE)].map((m) => m[1]).filter((b) => b.trim().length > 0)
  if (bodies.length === 0) continue

  const hashes = [...new Set(bodies.map(hashOf))]
  const current = meta[1]
  if (current.includes("'unsafe-inline'") && current.match(/script-src[^;]*'unsafe-inline'/)) {
    problems.push(`${file}: script-src に 'unsafe-inline' が残っている（ハッシュ許可の意図と矛盾）`)
  }
  const add = hashes.filter((h) => !current.includes(h))
  if (add.length === 0) continue

  const next = current.replace(/(script-src\s+'self')/, `$1 ${add.join(' ')}`)
  if (next === current) {
    problems.push(`${file}: script-src ディレクティブをinject出来なかった`)
    continue
  }
  html = html.replace(meta[0], meta[0].replace(meta[1], next))
  await writeFile(file, html)
  touched++
}

console.log(`[csp-hashes] ${files.length} ページ中 ${touched} ページに script-src ハッシュを注入`)
if (problems.length) {
  problems.forEach((p) => console.warn(`  ! ${p}`))
}
// 全ページが許可されているかを検証（注入漏れは実行時にしか気づけないので、ビルドで落とす）
let missing = 0
for (const file of files) {
  const html = await readFile(file, 'utf8')
  const meta = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/)
  if (!meta) continue
  const bodies = [...html.matchAll(INLINE)].map((m) => m[1]).filter((b) => b.trim().length > 0)
  const uncovered = bodies.filter((b) => !meta[1].includes(hashOf(b)))
  if (uncovered.length) {
    missing++
    console.error(`  × ${file}: 未許可のインラインスクリプト ${uncovered.length} 本`)
  }
}
if (missing) {
  console.error(`[csp-hashes] ${missing} ページで CSP 未許可のインラインスクリプトが残りました`)
  process.exit(1)
}
