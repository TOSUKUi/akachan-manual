// Vite プラグイン（アイテムタイムライン用）:
// - buildStart: items/*.md の検証 + src/generated/items-data.ts の生成（検証エラーでビルド失敗）
// - dev: items/ の変更を検知して再生成する
import { watch as fsWatch } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { ITEMS_DIR, generateItemsData } from './generate-items-data.ts'

export function itemsPlugin(): Plugin {
  return {
    name: 'akachan-items',
    async buildStart() {
      await generateItemsData(process.cwd())
    },
    configureServer(server) {
      const itemsDir = path.resolve(server.config.root, ITEMS_DIR)
      let timer: ReturnType<typeof setTimeout> | undefined
      const regenerate = () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            await generateItemsData(server.config.root)
            console.log('[items] items/ が変更されたため items-data を再生成しました')
            server.ws.send({ type: 'full-reload' })
          } catch (err) {
            console.error(err instanceof Error ? err.message : String(err))
          }
        }, 150)
      }
      try {
        fsWatch(itemsDir, { recursive: true }, regenerate)
      } catch {
        // 監視できない環境では素通し（ビルド時は buildStart が検証する）
      }
      return () => {
        if (timer) clearTimeout(timer)
      }
    },
  }
}
