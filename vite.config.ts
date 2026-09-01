import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import type {} from 'vite-react-ssg' // ssgOptions の型拡張を効かせるため
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { factPlugin } from './src/lib/vite-plugin-fact.ts'
import { itemsPlugin } from './src/lib/vite-plugin-items.ts'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

// onBeforePageRender は SSG レンダリング時（buildStart の後）に走るため、
// 先ほど factPlugin が再生成した site-data.ts をディスクから読み直す。
// （config 読み込み時の import は古いままになることがある）
function loadSiteData() {
  const raw = readFileSync('src/generated/site-data.ts', 'utf8')
  const start = raw.indexOf('= ') + 2
  const end = raw.lastIndexOf(';')
  return JSON.parse(raw.slice(start, end)) as {
    meta: { siteName: string }
    chapters: { slug: string; title: string; description: string }[]
  }
}

// /timeline のメタ（章ではない固定ページなのでここで管理。spec 0003）。
const TIMELINE_META = {
  title: 'いつ・何を買う？月齢別タイムライン',
  description:
    '妊娠中から 2 歳まで、月齢顺着に「この時期に揃えるもの」を縦並びでまとめたタイムライン。サイズ・数量の目安、価格帯の目安、西松屋・アカチャンホンポなどの検索先、品川区の給付・健診も同じ時間軸で確認できます。',
}

// GitHub Pages（サブディレクトリ配信）対応のため相対 base。
// base: './' にすることで dist/ 内のリンク・アセットがすべて相対パスになる。
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), factPlugin(), itemsPlugin()],
  // ローカル開発用プレビュー（vite preview）のみに効くホスト許可。
  // LAN hostname（例: worker4-ai）や IP からアクセスできるようにする。
  // 本番（GitHub Pages 配信の静的 dist/）には影響しない。
  preview: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    // script: 'sync' にする（async だとエントリ JS が window.__VITE_REACT_SSG_HASH__
    // 設定スクリプトより先に実行され、static-loader-data-manifest-undefined.json を
    // fetch してクラッシュするレースが起きる。sync = 遅延実行で順序保証）。
    script: 'sync',
    // 各ルートに SEO メタデータを注入（AC-10）。
    // index.html の既定 title/description はトップページ用にしておく。
    onBeforePageRender(route, indexHTML) {
      const normalized = route.startsWith('/') ? route : `/${route}`
      if (normalized === '/timeline') {
        indexHTML = indexHTML.replace(
          /<title>[\s\S]*?<\/title>/,
          `<title>${escapeHtml(`${TIMELINE_META.title} | ${loadSiteData().meta.siteName}`)}</title>`,
        )
        return indexHTML.replace(
          /<head>/,
          `<head>\n    <meta name="description" content="${escapeHtml(TIMELINE_META.description)}">`,
        )
      }
      const data = loadSiteData()
      const chapter = data.chapters.find((c) => `/${c.slug}` === normalized)
      if (!chapter) return indexHTML
      const title = `${chapter.title} | ${data.meta.siteName}`
      indexHTML = indexHTML.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
      indexHTML = indexHTML.replace(
        /<head>/,
        `<head>\n    <meta name="description" content="${escapeHtml(chapter.description)}">`,
      )
      return indexHTML
    },
  },
})
