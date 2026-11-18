# セキュリティ診断と実施内容（2026-09-02）

静的サイトの性格上、致命的リスクは無し。以下は独立診断（subagent）+ 本体実測で確認した内容と、実施した硬化。

## 実測で安全を確認した事

- **XSG/XSS 経路**: `dangerouslySetInnerHTML` / `innerHTML` / `insertAdjacentHTML` / `eval` は src/ に 0 件。Markdown→HTML 変換を一切行わず、構造化データから React テキストノードで描画。dist 実 grep で `javascript:` / `vbscript:` / `data:text/html` / `file:///` は 0 件。
- **frontmatter への危険スキーム混入**: `javascript:` / `data:` / `vbscript:` / `file:` を混ぜた一時 fact / items ファイルで `npm run gen` → **検証エラーで失敗し、生成物は 1 バイトも更新されなかった**（生成ゲートが機能）。
- **依存の本番到達性**: npm audit 37 件（critical 3 / high 19）は全て dev 依存サブツリー。undici / body-parser / proxy-addr / js-yaml / zod / MCP SDK / hono / express が dist/ に混入している件数は **全て 0**。本番の JS は 2 ファイル。
- **GitHub Actions**: `pull_request_target` 不使用、PR では deploy しない、トップ `contents: read`、deploy ジョブは `pages: write` + `id-token: write` の最小権限。PR context を `run:` に補間していない。`npm ci` 利用、lockfileVersion 3、registry 署名 618 件 + attestations 144 件。
- **秘密情報**: `process.env` / `import.meta.env` は src/ と vite.config.ts で 0 件。dist 内に source map 0 件。認証・Cookie 不使用。
- **localStorage**: try/catch + `unknown` からの厳密検証 + 実在 ID との積集合。保存するのは品目 ID とチェック文言のみ（PII なし）。
- **外链**: `target="_blank"` の rel 欠落 0 件（timeline 515・vaccines 39 を実数え）。アフィリエイト/utm 追跡パラメータ 0 件。Amazon 等は検索ページのみで商品直リンクを持たない。

## 実施した硬化

| 変更 | 内容 |
|---|---|
| 出典 URL を https 一本に | `items-parse.ts` 4 箇所（band sources / support.source / compare.rows[].source / recommend.url）と `fact-parse.ts` の frontmatter 検証を `/^https:\/\/\S+$/` に統一。`startsWith('http')` は `httpx://` 等も通していた |
| 根拠行の非 https リンクを握りつぶさない | 従来は正規表現が https 以外を黙って捨てていた。`badSourceLinks` を数え、事実ごとに検証失敗へ格上げ |
| 外链 rel | `rel="noreferrer"` の 2 箇所を `noopener noreferrer` に統一（旧ブラウザの tabnabbing 対策） |
| CSP | `index.html` に `Content-Security-Policy` を追加（`default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'none'; object-src 'none'; base-uri 'self'`）。`style-src` の `unsafe-inline` は React が CSS 変数（`--header-h` / `--tl-bar-h`）を inline style で立てるため必要 |
| インラインスクリプト排除 | hash jump を `public/hash-jump.js` へ外部化。`script-src 'self'` を通すため |
| Actions を SHA 固定 | checkout / setup-node / configure-pages / upload-pages-artifact / deploy-pages を annotated tag の SHA に固定。GitHub API と `git ls-remote` の二系統で SHA を照合 |
| URL 生死ゲート | `scripts/check-links.mjs`（全 fact/items の URL を https 限定で GET 確認、403/429/5xx は最大3回再試行、1件でも失敗なら exit 1） |
| 回帰テスト | `src/lib/__tests__/security.test.ts` 6 件（https 限定、危険スキーム非混入、商品直リンク禁止、CSP あり・インラインスクリプトなし、localStorage の設計） |

## 既知の残り（意図的に未実施）

- `frame-ancestors` と HSTS は meta タグでは効かないため、Pages のレスポンスヘッダ側で効かせる必要がある（現時点で iframe 埋め込み・Cookie の類はないため実益なし）。
- npm audit の dev 依存 37 件は upstream fix 待ち（fix 候補なし 15 件含む）。本番到達しないため許容。
