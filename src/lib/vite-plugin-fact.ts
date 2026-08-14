// Vite プラグイン：
// - buildStart: fact/*.md の検証 + src/generated/site-data.ts の生成（検証エラーでビルド失敗、AC-4/AC-5）
// - closeBundle: dist/ に search-index.json（AC-7）と .nojekyll（AC-8）を書き出す
// - dev: fact/ の変更を検知して再生成する
import { watch as fsWatch } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { FACT_DIR, generateSiteData } from './generate-site-data.ts'
import type { SiteData } from './fact-model.ts'

export function factPlugin(): Plugin {
  let root = process.cwd()
  let data: SiteData | undefined

  return {
    name: 'akachan-fact',
    configResolved(config) {
      root = config.root
    },
    async buildStart() {
      const result = await generateSiteData(root)
      data = result.data
    },
    async closeBundle() {
      if (!data) return
      const outDir = path.resolve(process.cwd(), 'dist')
      const { writeFile, mkdir } = await import('node:fs/promises')
      await mkdir(outDir, { recursive: true })
      await writeFile(path.join(outDir, 'search-index.json'), JSON.stringify(data.searchIndex))
      await writeFile(path.join(outDir, '.nojekyll'), '')
    },
    configureServer(server) {
      const factDir = path.resolve(server.config.root, FACT_DIR)
      let timer: ReturnType<typeof setTimeout> | undefined
      const regenerate = () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const result = await generateSiteData(server.config.root)
            data = result.data
            console.log('[fact] fact/ が変更されたため site-data を再生成しました')
            server.ws.send({ type: 'full-reload' })
          } catch (err) {
            console.error(err instanceof Error ? err.message : String(err))
          }
        }, 150)
      }
      try {
        fsWatch(factDir, { recursive: true }, regenerate)
      } catch {
        // 監視できない環境では素通し（ビルド時は buildStart が検証する）
      }
      return () => {
        if (timer) clearTimeout(timer)
      }
    },
  }
}
