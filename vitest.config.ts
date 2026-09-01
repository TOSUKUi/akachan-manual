import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
    environment: 'node',
    // ページまるごと描画する jsdom テスト（タイムライン全81品目 + 章本文）は
    // CI の遅いランナーでは既定の 5s を超える。失敗ではなく速度の問題なので
    // 上限だけを緩め、個々のテストは15s以内に収まる設計のままとする。
    testTimeout: 20000,
    hookTimeout: 20000,
  },
})
