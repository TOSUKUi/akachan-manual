import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import type {} from 'vite-react-ssg' // ssgOptions の型拡張を効かせるため
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { factPlugin } from './src/lib/vite-plugin-fact.ts'

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

// GitHub Pages（サブディレクトリ配信）対応のため相対 base。
// base: './' にすることで dist/ 内のリンク・アセットがすべて相対パスになる。
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), factPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    script: 'async',
    // 各ルートに SEO メタデータを注入（AC-10）。
    // index.html の既定 title/description はトップページ用にしておく。
    onBeforePageRender(route, indexHTML) {
      const normalized = route.startsWith('/') ? route : `/${route}`
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
