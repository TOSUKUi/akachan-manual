import { fileURLToPath } from 'node:url'
import type {} from 'vite-react-ssg' // ssgOptions の型拡張を効かせるため
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { factPlugin } from './src/lib/vite-plugin-fact.ts'

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
  },
})
