// 配備済みサイトのライブ検証（ビルドが緑でも画面が死んでいる事故を here で止める）。
//
// 経緯: 2026-11-21 に CSP を script-src 'self' にしたデプロイで、vite-react-ssg が注入する
// インラインスクリプトが止まり、全ページがエラー境界化しながら build と CI は緑のままだった。
// 静的 HTML を grep しても分からない類の壊れ方なので、実ブラウザで開いて確かめる。
//
// 使いどころ: `npm run build` の後、またはデプロイ後に `node scripts/verify-live.mjs`。
// BASE=http://127.0.0.1:4173 を渡せば dist のローカル配信でも同じ検証が通る。
//
// Chromium と playwright-core はリポジトリの依存にしない（このスクリプトはデプロイ後に人が
// 回す補助）。見つからなければ SKIPPED と出して exit 0（ゲートとして黙って落ちない）。
import { createHash } from 'node:crypto'
import { readdirSync, existsSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'

const BASE = process.env.BASE || 'https://akachan-manual.tosukui.xyz'
const VIEWPORTS = [
  { name: 'mobile-390', width: 390, height: 844, isMobile: true },
  { name: 'tablet-768', width: 768, height: 1024, isMobile: false },
  { name: 'desktop-1280', width: 1280, height: 900, isMobile: false },
]
const PAGES = (process.env.PAGES || '/timeline.html,/index.html,/safety.html').split(',').filter(Boolean)

function firstExisting(globs) {
  for (const g of globs) {
    const segs = g.split('/')
    if (segs[0] === '') segs.splice(0, 2, '/' + segs[1]) // 絶対パスの先頭空要素を吸収
    const [base, ...rest] = segs
    if (!existsSync(base)) continue
    let dirs = [base]
    for (const seg of rest) {
      const next = []
      for (const d of dirs) {
        try {
          for (const e of readdirSync(d, { withFileTypes: true })) {
            if (new RegExp('^' + seg.replace(/\*/g, '.*') + '$').test(e.name)) next.push(path.join(d, e.name))
          }
        } catch {
          /* 読み進められない階層は無視 */
        }
      }
      dirs = next
    }
    if (dirs.length) return dirs[0]
  }
  return null
}

const h = homedir()
const chromium = firstExisting([
  `${h}/.cache/ms-playwright/chromium-*/chrome-linux*/chrome`,
  `${h}/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux*/chrome-headless-shell`,
])
// index.mjs を持つものだけを選ぶ（同じ名前の別バージョン残りが混ざることがある）
const pwEntry = firstExisting([
  `${h}/.npm/_npx/*/node_modules/playwright-core/index.mjs`,
  `${process.cwd()}/node_modules/playwright-core/index.mjs`,
])

if (!chromium || !pwEntry) {
  console.log(
    '[verify-live] SKIPPED: chromium または playwright-core が見つかりません（ゲートではありません）',
  )
  process.exit(0)
}

const { chromium: pw } = await import(pwEntry)
const browser = await pw.launch({ executablePath: chromium })
const problems = []
const rows = []

for (const vp of VIEWPORTS) {
  for (const pagePath of PAGES) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
    })
    const page = await ctx.newPage()
    const pageErrors = []
    const cspBlocks = []
    page.on('pageerror', (e) => pageErrors.push(String(e).slice(0, 120)))
    page.on('console', (m) => {
      if (/Refused to|Content Security Policy/i.test(m.text()))
        cspBlocks.push(m.text().replace(/\s+/g, ' ').slice(0, 140))
    })
    await page.goto(BASE + pagePath + (pagePath.includes('?') ? '&' : '?') + 'verify=live', {
      waitUntil: 'load',
    })
    await page.waitForTimeout(1500)

    const r = await page.evaluate(() => {
      const recos = [...document.querySelectorAll('.reco')]
      const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content || ''
      const live = [...document.querySelectorAll('p[aria-live=polite]')]
        .filter((e) => e.offsetParent !== null)
        .map((e) => e.innerText.replace(/\s+/g, ' ').trim())[0]
      return {
        errBoundary: document.body.innerText.includes('Unexpected Application Error'),
        h1: document.querySelectorAll('h1').length,
        inline: [...document.querySelectorAll('script:not([src])')]
          .map((s) => s.textContent)
          .filter((t) => t.trim()),
        csp,
        reco: recos.length,
        recoNamed: recos.filter((d) => d.querySelector('.reco-name')?.textContent?.trim()).length,
        recoRel: recos.every((d) => /noopener/.test(d.querySelector('.reco-name')?.rel || '')),
        recoBlank: recos.every((d) => d.querySelector('.reco-name')?.target === '_blank'),
        srOnly: recos.every((d) => !!d.querySelector('.reco-name .sr-only')),
        boxes: document.querySelectorAll('li input[type=checkbox]').length,
        live,
        bands: document.querySelectorAll('.band-head').length,
      }
    })

    const uncovered = r.inline.filter(
      (b) => !r.csp.includes('sha256-' + createHash('sha256').update(b, 'utf8').digest('base64')),
    ).length
    const scriptSrc = (r.csp.match(/script-src([^;]*)/) || ['', ''])[1]

    // チェック → aria-live の要約が変わるか（水和化が生きているかの最小証明）
    let checkDelta = '該当なし'
    if (r.boxes > 0) {
      const box = page.locator('li input[type=checkbox]').first()
      await box.scrollIntoViewIfNeeded()
      await box.uncheck({ force: true }).catch(() => {})
      await box.check({ force: true })
      await page.waitForTimeout(400)
      const after = await page.evaluate(
        () =>
          [...document.querySelectorAll('p[aria-live=polite]')]
            .filter((e) => e.offsetParent !== null)
            .map((e) => e.innerText.replace(/\s+/g, ' ').trim())[0] ?? '',
      )
      checkDelta = after && after !== r.live ? 'OK' : `NO CHANGE (${r.live} -> ${after})`
    }

    const fail = (why) => problems.push(`${vp.name} ${pagePath}: ${why}`)
    if (r.errBoundary) fail('エラー境界が出ている')
    if (pageErrors.length) fail(`pageerror ${pageErrors.length} 件: ${pageErrors[0]}`)
    if (uncovered) fail(`CSP 未許可のインラインスクリプト ${uncovered} 本`)
    if (
      /"script-src[^"]*unsafe-(inline|eval)/.test(r.csp) ||
      /script-src[^;]*unsafe-(inline|eval)/.test(r.csp)
    )
      fail('script-src に unsafe-inline / unsafe-eval が入った')
    if (r.h1 !== 1) fail(`h1 が ${r.h1} 個`)
    if (r.reco !== r.recoNamed) fail(`推薦の name が欠けたブロック ${r.reco - r.recoNamed} 個`)
    if (r.reco > 0 && (!r.recoRel || !r.recoBlank || !r.srOnly))
      fail('推薦リンクの rel/target/sr-only が不備')
    if (checkDelta.startsWith('NO CHANGE')) fail('チェックで aria-live が変わらない（水和化していない）')

    // 第三者解析スクリプトは CSP で意図的に止める（Cloudflare Web Analytics 等）。
    // それ以外のリフューズは問題として数える。
    const realBlocks = cspBlocks.filter((t) => !/cloudflareinsights\.com/.test(t))
    if (realBlocks.length) fail(`CSP でブロックされたリソース ${realBlocks.length} 件: ${realBlocks[0]}`)

    rows.push(
      `${vp.name.padEnd(12)} ${pagePath.padEnd(15)} reco=${r.reco}/${r.recoNamed} bands=${r.bands} boxes=${r.boxes} check=${checkDelta} cspHash=${/script-src[^;]*sha256-/.test(r.csp)} uncovered=${uncovered} err=${r.errBoundary ? 'BOUNDARY' : 'ok'}`,
    )
    await ctx.close()
  }
}
await browser.close()

rows.forEach((r) => console.log('  ' + r))
if (problems.length) {
  problems.forEach((p) => console.error('  × ' + p))
  console.error(`[verify-live] ${problems.length} 件の問題`)
  process.exit(1)
}
console.log(`[verify-live] OK — ${rows.length} ページ分すべて合格（BASE=${BASE}）`)
