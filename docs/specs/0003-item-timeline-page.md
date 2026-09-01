# 0003. 月齢别アイテムタイムラインページ（item-timeline）

**Date**: 2026-09-01
**Status**: In Progress

## Summary

妊娠中から2歳まで「いつ何がいるか」を、上から下へ読める縦長いちばんのタイムラインとして見せる新しいページを作る。月齢を選ぶと今月必要なアイテムに強調され、カテゴリと必須・便利で絞り込める。買ったものにチェックを入れると残り点数と目安金額の合計が残る。品川区の健診や給付も同じ時間軸に並べる。

既存の `fact/`（知識の章）とは別に、`items/*.md` をコンテンツソースとして新設する。価格は「調査日のついた目安」としてだけ持ち、特定商品の直リンクは置かない（販売先のリンクは検索ページのみ）。

## Context

既存サイトは9章の知識（医療・安全・手続き）で、読む順はあっても「この月に何を買えばいいか」の時系列がない。父親の実際の悩みは「今月なにを買うべきか、いくら位見るのか、どこで探すのか」で、知識章とは問いが違う。

制約:

- 価格は毎日動く。静的サイトで商品価格を断定すると、公開直後から嘘になる。品表示法の有利誤認にも近づかないため、第三者サイトとしては「調査日つきのレンジ」に留める。
- 特定商品ページへの直リンクは在庫切れ・リニューアルで切れる。静的サイトでリンク切れ検証を商品単位で回すのは運用不能。
- 既存のビルドゲートは `fact/` 向け（全セクションに根拠必須・180日鮮度・12項目カバレッジ）。価格や販売先のデータを `fact/` に入れるとゲートの意味が薄まる。
- SSG の静的マルチページ（SPA 禁止、base './'）。初期 HTML は全アイテムを絞り込みなしで描画し、ハイドレーション後にユーザー操作で変わる。localStorage 由来の状態を初期描画に混ぜない。
- 既存の知識コンテンツが「公式一次ソースのみ」という規律を維持する。

## Requirements

**User stories**:
- として 生まれる前の父親, 妊娠中から2歳まで何をいつ買うかを1本の縦並びで把握したい so that 準備漏れと買いすぎを避けられる。
- として 今の月齢の父親, 今月やるべき事にしぼって見たい so that 長文を上から読まなくていい。
- として 予算を考える父親, 残りアイテムの目安金額の合計が見たい so that 見通しを立てられる。
- として 品川区在住の父親, 同じ時間軸上で区の健診・給付・配布物也想いだしたい so that 買い忘れと申請漏れを防げる。

**Acceptance criteria**:
- **AC-1**: `npm run build` で `timeline.html` が追加生成され、既存10ページと導線（トップ・章メニュー）から到達できる。
- **AC-2**: ページは妊娠中→0〜1→2〜3→…→19〜24 の band を上から下へ時系列で描画し、各 band にその時期のアイテムが並ぶ。
- **AC-3**: 「今何か月？」の選択で、対象月を含む band が強調され、対象月を過ぎた band は折りたたまれて件数だけ見える。未選択時は全 band が開いている。
- **AC-4**: カテゴリ（8種）と「必須／すべて」で絞り込め、結果件数が `aria-live` で読み上げられる。条件に合うアイテムが0件の場合は空の状態が明示される。
- **AC-5**: 各アイテムに「使い始める目安月」「終わりの目安」「サイズ・数量」「なぜ今か」が表示され、`whySource` は band の `sources[].url` に存在すること。欠ければビルド失敗。
- **AC-6**: 価格はレンジと単位と調査日を表示し「目安」であることを明記する。調査日が180日を超えるとビルド時に警告。
- **AC-7**: 販売先リンクは Amazon / 楽天市場 / 西松屋 / アカチャンホンポ / ユニクロの**検索URL**のみを、kind と検索語からビルド時生成する。データに販売先の直URLや商品IDを持たせられず、混入したらビルド失敗。
- **AC-8**: アイテムの購入済みチェックが `localStorage`（key `items-timeline:v1`）に保存され、再訪後も復元される。残り点数と、価格が分かる残りアイテムの目安合計（下限〜上限）が出る。
- **AC-9**: 各 band に品川区・東京都の健診や支援のマーカー（例: 4か月児健診の絵本バッグ引換券、見守りおむつ定期便、妊婦のための支援給付）が根拠URLつきで表示される。
- **AC-10**: 375px と1280px で横スクロール0、タップ目標44px以上、`prefers-reduced-motion` で動きなし、絞り込みとチェックがキーボードで操作可能（WCAG AA）。
- **AC-11**: パーサ・バリデータ・リンク生成の純関数テストが通る。未知 band / 未知 category / `startMonth > endMonth` / 根拠URL欠落 / 直リンク混入 / id 重複で失敗すること。

## Options considered

### Option 1: `items/*.md`（frontmatter YAML）+ 専用の生成・検証ゲート

章と同じ「Markdown + frontmatter」で band ごとに構造化データを持ち、専用パーサとバリデータで `src/generated/items-data.ts` を生成する。価格は調査日つきの参考値として扱い、根拠ゲートとは別扱いにする。

**Pros**:
- 既存の生成物／検証ゲートと同じ形。コンテンツ編集の体験も同じ。
- フィールド検証（月齢レンジ、枚举、根拠URL、直リンク禁止）をビルド時にできる。
- `fact/` の規律を汚さず、鮮度警告だけ共有できる。

**Cons**:
- schema とパーサ、ページが増える（新規コード量いちばん多い）。
- 既存 fact の検証を流用できない（別バリデータを書く）。

### Option 2: `fact/10-items.md` として章に含める

既存の章として `根拠:` 行ゲートの下に置く。

**Pros**:
- 新規コードがほぼ不要（テンプレートと導線だけで済む）。
- 既存の鮮度・根拠チェックがそのまま効く。

**Cons**:
- 価格のレンジが「事実」ではないため、180日鮮度警告が毎月鳴り続ける。
- インタラクティブな絞り込み・チェックボックスが構造化ブロックに載らず、「一目でわかる」が達成できない。

### Option 3: `src/data/items.ts` に型付きで直書き

**Pros**:
- 最速。型で入力制約が効く。

**Cons**:
- 「コンテンツは Markdown、生成物は build 成果物」という設計思想から外れる。
- 検証が型チェックだけで、根拠URL・価格の鮮度・直リンク禁止を見張れない。

## Decision

**Chosen option**: Option 1: `items/*.md` + 専用の生成・検証ゲート

知識と買い物リストをコンテンツ層で分け、タイムライン専用のページとして作る。価格は調査日つきの目安としてだけ持ち、販売先は検索リンクのみで表現する。

**Implementation skills**: `shadcn`（`.agents/skills/shadcn/`） · `vite`（`.agents/skills/vite/`） · `vitest`（`.agents/skills/vitest/`） · `ui-ux-pro-max`（`.agents/skills/ui-ux-pro-max/`）

## Rationale

Context の二つの力（価格は陳腐化する／リンク切れを検証しきれない）が Option 2 と 3 を除外する。価格は「事実」ではなく「調査時点で読めたレンジ」なので、fact の根拠ゲートに混ぜると警告が常時鳴るか、逆にゲートが緩む。専用 band に分ければ「月齢の根拠は公式・小売のガイドページ必須、価格は調査日つきで警告のみ」という別の強さの規律を課せる。

検索リンクのみ採用は、`docs/research/item-timeline/03-links-and-disclosure.md` で5サイト分の検索URLを実測検証済みのため、リンク切れの検証が「フォーマットが生きているか」の年2回で済む。アカチャンホンポは月齢絞り込みURLが使えるため、リンクがそのままタイムラインの月と対応する。

## Feature design

**データモデル**（`items/*.md` frontmatter、band 単位）:

```yaml
band: m4-6            # pregnancy | newborn | m2-3 | m4-6 | m7-9 | m10-12 | m13-18 | m19-24
label: 生後4〜6か月
monthsFrom: 4
monthsTo: 6
intro: この時期に起きること（1〜2文）
sources: [{ name, url, checked }]
support: [{ id, title, detail, source }]   # 区・都の健診や支援（source は sources[].url に含まれる）
items:
  - id: baby-spoon            # サイト全体で一意
    name: 離乳食用スプーン
    category: tabe            # neru | kiru | tabe | arau | ugoku | anzen | asobi | karada
    need: must                # must | useful
    startMonth: 5             # -1 = 妊娠中, 0..24
    endMonth: 18              # 省略可（不明）
    size: 1本 from 洗い替え1本  # サイズ・数量の目安（自由文）
    note: 離乳食開始は生後5〜6か月目安。
    whySource: https://...    # sources[].url のいずれか1つ必須
    price: { low: 300, high: 1200, unit: 1本（税込）, source: https://..., checked: 2026-09-01 }
    shops: [{ kind: amazon, q: 離乳食 スプーン }]  # kind: amazon | rakuten | nishimatyaya | akachan | uniqlo
```

- `Item.monthsFrom` は `-1..24`、`endMonth` は省略または `>= startMonth`。band の `monthsFrom..monthsTo` と整合する必要はない（またぎ可。例: A型ベビーカーは band `pregnancy` で `endMonth: 6`）。
- パーサは YAML 文字列の月齢・価格を必ず数値へ変換し、数値でないものはエラーにする（暗黙の型崩れをビルドで止める）。
- 生成物: `src/generated/items-data.ts`（`ITEMS_DATA`）。検索インデックスには含めない（検索は知识章のみ）。

**API surface**（純関数、副作用なし）:

| 関数 | 入力 | 出力 | 主なエラー |
|---|---|---|---|
| `parseItemsFile(name, raw)` | band md 文字列 | `{ band?: ItemsBand, issues }` | frontmatter 欠落、型不正 |
| `loadItems(root)` | プロジェクトルート | `{ data, report }` | 検証エラーで throw |
| `validateItems(bands, now)` | band 配列 + 現在日 | `{ errors, warnings, ok }` | AC-5/6/7/11 の違反 |
| `shopUrl(shop)` | `{kind, q}` | 検索URL | 未知 kind で throw |
| `activeItems(items, month)` | 選択月 | 該当アイテム／過ぎた件数 | 範囲外 month で [] |

**Value sourcing**:

| 表示・生成する値 | 出所 |
|---|---|
| 使い始め月・サイズ・数量 | band frontmatter の `items[].startMonth/size`。根拠は `items[].whySource`（小売ガイド・メーカー月齢ガイド・公的ガイド） |
| 価格レンジ（下限・上限・単位） | `items[].price.low/high/unit`。各値は実ページで読んだ金額のみ。調査日 `price.checked` |
| 「調査時点の目安」表示 | `price.checked` から生成（ハードコードしない） |
| 販売先のURL | `shopUrl(kind, q)` のビルド時生成。テンプレは 03 の実測済み5書式（`src/lib/shop-links.ts` に集約） |
| 残り点数・残り目安金額合計 | チェック済みIDの集合（localStorage）から未チェックアイテムを計算。価格は low/high の合計、価格なしアイテムは件数だけ計上 |
| 区の健診・支援マーカー | `band.support[]`。金額・時期は `support[].source` の公式ページ本文 |
| 月セレクトの選択肢 | band の `monthsFrom..monthsTo`（`-1` は「妊娠中」ラベル） |

**Key invariants**:
- `items[].id` はサイト全体で一意。band id は8種のみ。`category` と `need` と `shops.kind` は列挙値。
- `whySource` と `support[].source` は自 band の `sources[].url` に含まれること。
- アイテム・support のどのフィールドにも `http` を含む文字列を `whySource` / `source` / `sources[].url` 以外に持たせない（＝直リンク混入の禁止）。
- 価格レンジは `0 < low <= high`、`price.source` は sources[] 必須、`price.checked` は ISO 日付。

**Security model**: 公開静的サイト。認証なし。個人情報は保存しない（localStorage にチェック済みのアイテムIDのみ）。外部リンクは `rel="noopener noreferrer"` + `target="_blank"`。ロゴ・画像は使わずテキストリンクのみ（商標・誤認回避）。

**設定**: 新規環境変数なし。

**Critical test scenarios**（各 AC に対応）:
- Happy path: 8 band が時系列で生成され、`timeline.html` に band 見出しとアイテム名が出る。検証 AC-1, AC-2
- Failure case: 直リンクURL・未知 category・`startMonth > endMonth`・根拠URL欠落の band md でビルドが失敗し、エラーメッセージがファイル名と項目名を含む。検証 AC-5, AC-7, AC-11
- Failure case: `price.checked` が181日前なら警告、エラーではない。検証 AC-6
- Interaction: 月を選ぶと過去 band が折りたたまれ、カテゴリ＋必須のみで絞ると件数が更新され、0件なら空の状態が出る。検証 AC-3, AC-4
- Persistence: チェック後に localStorage へ `items-timeline:v1` が書かれ、再マウントで復元、不正な保存データは無視して初期描画。検証 AC-8
- Auth/permission: 該当なし（公開ページ）

## Build plan

1. **[AC-11]** `src/lib/items-model.ts` / `items-parse.ts` / `items-validate.ts` / `shop-links.ts` を追加。単体テスト（happy・各失敗・鮮度警告・リンク生成）を `src/lib/__tests__/` に追加。
2. **[AC-1, AC-2]** `src/lib/generate-items-data.ts` と band md の読み込み、`src/generated/items-data.ts` 生成、vite プラグインの watch に `items/` を追加。`src/pages/timeline.tsx` と `src/App.tsx` の静的ルートを追加し、トップ・章メニューへ導線を足す。band 1個（妊娠中）で薄いスライスを疎通。
3. **[AC-2, AC-5]** band 8本と全アイテムを投入（`docs/research/item-timeline/01`, `02` の値のみ使用）。
4. **[AC-3, AC-4, AC-8]** インタラクション: 月セレクト（過去 band の折りたたみ）、カテゴリ／必須絞り込み＋件数 announce、購入済みチェックと残り予算レンジ。
5. **[AC-9]** 各 band の support マーカー描画。
6. **[AC-6, AC-7, AC-10]** 価格の「目安」表示と調査日、販売先リンク、レスポンシブとアクセシビリティ（375/1280 で実測、reduced motion）。
7. **[AC-1..AC-11]** ゲート実行（gen / typecheck / lint / test / build）と `vite preview` のブラウザ検証。

## Consequences

- 新しいコンテンツ層（`items/`）が増える。知識章と買い物リストの二重管理を避けるため、品物の「使い方の知識」は章側に置き、タイムラインは「時期・サイズ・個数・探し先」に限定する（本文は1〜2文）。
- 価格は必ず古くなる。180日警告と「調査日つき」表示が前提。アフィリエイトを導入する場合は景表法（ステマ規制）と各モールの規約対応が別途必要。
- 月齢・サイズの目安は小売・メーカーのガイドに依存する（個人差あり）。医療的な必須事項は既存の safety / health 章を正とし、ページからもリンクする。
- 月齢は band または item の値として持つが、子の発達は個人差が大きく、「月齢で一律に決めない」旨の注記を band ごとに必ず置く。
- `:slug` ルートと静的 `timeline` ルートが同居する。章 slug に `timeline` を付けると衝突するため禁止する（バリデータで守る）。

## Follow-up

- `/check verify` で AC のブラウザ検証（320/375/414/1280）。
- 検索インデックスに band・アイテム名を載せるか（載せるなら「いつ」の検索意図に応える）。
- アカチャンホンポの月齢絞り込みURL（`Search[age]`）は仕様変更リスク。壊れたらキーワード検索へフォールバック。
- `/sync` で AGENTS.md に `items/` 層とタイムラインページの存在を追記。

## Rationale

上記 Decision / Rationale に同じ。意思決定の背景は本ファイルの Options considered を参照。

## References

- `docs/research/item-timeline/01-monthly-needs.md` — 月齢別の必要性・サイズ・数量（西松屋プレママガイド、ピジョン月齢ガイド、消費者庁・こども家庭庁。2026-09-01 確認）
- `docs/research/item-timeline/02-price-platforms.md` — 実売価格レンジとプラットフォーム傾向（西松屋／アカチャンホンポ／ユニクロ／ニトリ／Amazon／楽天／メルカリ。2026-09-01 確認）
- `docs/research/item-timeline/03-links-and-disclosure.md` — 検索URL書式の実測検証とリンク規律
- `docs/research/item-timeline/04-shinagawa-support.md` — 品川区・東京都の支援（公式本文照合・curl 200 確認済み）
- 既存: `docs/specs/0001-baby-guide-static-site.md`, `docs/specs/0002-react-component-rendering.md`, `docs/uiux/spec-mobile.md`, `docs/uiux/spec-desktop.md`
