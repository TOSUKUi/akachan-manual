# あかちゃんマニュアル（品川区向け赤ちゃんガイド）

## Stack

- **Language / Runtime**: TypeScript, Node 20+
- **Framework**: Vite + React、静的マルチページは vite-react-ssg（SPA 禁止）
- **Key dependencies**: react, react-dom, shadcn/ui, vite-react-ssg, vitest
- **Package manager**: npm
- **Hosting**: GitHub Pages（dist/ 出力、base './'、.nojekyll、GitHub Actions で gh-pages 配備）

## Build approach

Tracer Bullet（薄いエンドツーエンドのスライスから作り、太くしていく）

## Commands

```bash
npm install          # 依存のインストール
npm run dev          # dev サーバー
npm run build        # dist/ に静的 HTML
npm test             # テスト
```

スキャフォールド済み（Vite + React + vite-react-ssg + shadcn/ui）。コンテンツは `fact/*.md`（frontmatter + 本文、各セクションに「根拠: [ソース](URL)」必須）から `npm run gen` で `src/generated/site-data.ts` が生成される。検証ゲート（根拠リンク・必須カバレッジ 12 項目・180 日鮮度警告）はビルド時に失敗・警告する。調査途中稿は `fact-research/`（未公開）。

UI は mobile-first で端末ごとに最適化済み（`docs/uiux/` に spec・レビュー記録）：モバイル（<lg）は 1 行ヘッダー + 章メニュー bottom-sheet（44px タッチターゲット、セクションジャンプ sub-bar、トップへ FAB、`/` 検索ショートカット）、デスクトップ（lg=1024px 以上）は章内 sticky TOC + スクロールスパイ（`src/components/chapter-toc.tsx` / `src/lib/use-scroll-spy.ts`）・本文 672px（約 45 字/行）・インデックス 2 列グリッド。アンカーの sticky 補正は `src/index.css` の `--header-h`/`--subbar-h` + `scroll-padding-top` が一元管理（ヘッダー実装が変わったら実測で更新）。

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`.

## Rules

- 関数は純関数が基本（副作用なし）、変換は map / filter / reduce
- データは不変（const, readonly）、共有ミュータブル状態は禁止
- 副作用（I/O, ネットワーク, 状態変更）はシステムの端に集めて明示する
- 継承より関数合成、素の関数で足りるならクラスを使わない
- null は避け union 型の明示的 undefined で、期待される失敗は例外でなく明示エラー（Result 型）
- 型は strict, any 禁止, 型を網羅
- UI はアクセシビリティ基線 WCAG AA
- conventional commits、命名統一（ファイル kebab-case、関数 camelCase、コンポーネント PascalCase）

## Tooling

`/develop tooling` が以下を選択どおりインストールする（記録のみ、ここには入れない）: ESLint + Prettier、コミット前 lint + format + typecheck、vitest（ユニット + 統合、実行器は /test）、push 時 CI（lint, typecheck, test）+ GitHub Pages 配備。

## Git

- integration: on
- branch prefix: feat/
- commit: per-milestone

## Agent skills

- [shadcn](.agents/skills/shadcn/): `shadcn/ui`, shadcn/ui コンポーネントの追加・構成の規約
- [vite](.agents/skills/vite/): `antfu/skills`, Vite の設定・プラグイン・API の指針
- [vitest](.agents/skills/vitest/): `antfu/skills`, Vitest のセットアップとユニット / コンポーネントテスト

Declined: shadcn MCP server, GitHub MCP server

## Context files

<!-- Nested AGENTS.md files are listed here as they are created -->

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
