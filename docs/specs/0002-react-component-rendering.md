# 0002. 本文表示の React コンポーネント化（fact.md は事実データに徹する）

**Date**: 2026-08-16
**Status**: Proposed

## Summary

本文の表示方法を「Markdown を HTML に変換して流し込む」方式から「fact.md を構造化データとして読み、React コンポーネントで直接描画する」方式に変えます。fact.md は事実の列挙だけを書き、見た目と操作は React 側が全部担当します。チェックリスト（進捗バー付き）、インタラクティブな判断フロー（はい/いいえで進む）、注意ボックス、テーブルを shadcn/ui ベースのコンポーネントで描画します。実行時の Markdown 変換ライブラリ（marked）は廃止します。

## Context

現在のサイトは 0001 の spec に従い、fact.md をビルド時に marked で HTML に変換して `bodyHtml` として埋め込み、画面は `dangerouslySetInnerHTML` で表示しています。段落・テーブル・リストは CSS で装飾できますが、これは「Markdown の文法（テーブル・引用・タスクリスト）で書ける範囲」に表示が制限されます。

ユーザーが求めているのは「一目で分かる」「インタラクティブに操作できる」画面です。具体的には:

- チェックリストをチェックすると進捗が進む（例: 出生届の手続きチェックリスト）
- 「赤ちゃんが泣いた → 3時間経ってない？ → あやして様子見 → 3時間経った → 医療機関へ」のような判断フローを、はい/いいえで進む操作感で表示
- 注意・危険の強調（注意ボックス）
- 読みやすいテーブル

Markdown の変換結果（`<input disabled>`、`<blockquote>`、`<table>`）はこれらの表現を持ちません。react-markdown の components マッピングや marked のレンダラー拡張で shadcn/ui コンポーネント（Checkbox・Alert・Stepper）に変換する「互換レイヤー」は世の中に存在せず、作るとしても複雑で保守性が低くなります（GFM の限られたタグしかマップできず、チェック保存・進捗・フロー分岐のような状態を持つ操作は表現不能）。

結論として「Markdown を変換して shadcn にマップする」方式は諦め、「fact.md は事実のデータ、表示は React コンポーネントが直接描画」に切り替えます。これにより:

- fact.md は事実の列挙だけになり、表示の文法に依存しない（保守性が上がる）
- 画面は React の表現力を全部使える（チェックリスト・フロー・注意ボックス・テーブル）
- 検証ゲート（根拠リンク必須・12 必須項目・鮮度警告）は構造化データに対して機械的に検査できる（維持）

この変更は表示レイヤーのみで、コンテンツ（fact.md の事実）と検証ゲートは変わりません。

## Requirements

**User stories**:
- パパ予定者として、出産後の手続きをチェックリストで確認し、チェックすると進捗が分かるようにしたい。
- パパ予定者として、赤ちゃんが泣き止まないときの判断フローを、はい/いいえで進みながら確認したい。
- パパ予定者として、注意・危険な項目が一目で分かる強調表示が欲しい。
- パパ予定者として、予防接種スケジュールや離乳食の表が読みやすく表示されて欲しい。
- サイト管理者として、fact.md は事実の列挙だけに保ち、表示の詳細がコンテンツに混ざらないようにしたい。

**Acceptance criteria**（/check verify の契約）:
- **AC-1**: fact.md に表示のための文法（Markdown のタスクリスト `- [ ]`、引用 `>`、番号リスト `1.` など）をマーカーブロック外では一切書かず、事実のデータだけを列挙する。`:::checklist` 内の `- [ ]` はデータ構文（チェック項目の列挙）として許可する。表示の指示は構造化マーカー（`:::checklist` / `:::flow` / `:::callout` など）のみで行い、マーカーはビルド時に検証される（未知のマーカーはビルド失敗）。
- **AC-2**: チェックリストは React コンポーネントで描画され、チェックすると進捗（例: 3/5 完了）が表示される。チェック状態は localStorage に保存され（キー: `checklist:<章スラグ>/<ブロックID>`、値: `{v:1, done: string[]}`）、リロードしても保持される。
- **AC-3**: 判断フローは React コンポーネントで描画され、はい/いいえの選択で次の質問に進む。現在地（どの分岐にいるか）が可視化され、「最初からやり直す」ができる。
- **AC-4**: 注意・危険・必須の強調は React コンポーネント（shadcn/ui ベース）で描画され、通常の段落と明確に区別できる。
- **AC-5**: テーブルは React コンポーネント（shadcn/ui Table ベース）で描画され、モバイルで横スクロール、デスクトップで全幅表示。既存の予防接種・離乳食テーブルが読みやすくなる。
- **AC-6**: 実行時の Markdown 変換ライブラリ（react-markdown / remark-gfm / marked）をクライアントバンドルから排除する（ビルド時・実行時とも Markdown 変換をしない）。
- **AC-7**: 既存の検証ゲート（根拠リンク必須、12 必須項目カバレッジ、180 日鮮度警告）が維持され、全テストが通る。
- **AC-8**: 全ページ（9 章 + トップ）が既存の SSG で静的 HTML として出力され、コンソールエラー 0、ハイドレーションエラー 0。
- **AC-9**: モバイル（375px）とデスクトップ（1280px）の両方で、既存の UI/UX レビュー指摘（テーブル・バッジ・サブバー・オーバーフロー）が再発しない。

## Options considered

### Option 1: 実行時 react-markdown + components マッピング（現状の一部）

react-markdown の `components` オプションで `table` → shadcn Table、`blockquote` → Alert などにマップする。react-markdown は既に依存にあった。

**Pros**:
- 導入が小さい（既存の react-markdown を拡張するだけ）

**Cons**:
- GFM の限られたタグしかマップできない（table・li・blockquote だけ）
- チェック保存・進捗・フロー分岐のような状態を持つ操作は表現不能
- 実行時パースのコスト、SSR/クライアント不一致のリスク（#418 の原因だった）
- 「互換レイヤー」を自作することになり保守性が低い

### Option 2: marked のレンダラー拡張（現在の実装）

ビルド時に marked で HTML 化し `bodyHtml` として埋め込む。段落・テーブルは CSS で装飾できる。

**Pros**:
- ビルド時変換なので実行時コストなし、SSR/クライアント不一致なし（#418 解消済み）

**Cons**:
- 変換結果は素朴な HTML タグだけで、チェックリスト・フロー・注意ボックスの表現を持たない
- `- [ ]` は `<input disabled>` になり、インタラクティブにするには別途 React 化が必要
- 結局「変換 + 特殊ケースの手当て」の二重構造になり複雑

### Option 3: fact.md を構造化データとして読み、React コンポーネントで直接描画（選択）

fact.md は事実のデータを列挙（マーカーで構造を明示）。ビルド時に構造化データ（tasks / flow / callouts / tables / paragraphs）としてパースし、React コンポーネント（ChecklistView / FlowChartView / CalloutView / DataTable）が直接描画する。

**Pros**:
- 画面は React の表現力を全部使える（チェック・進捗・フロー・注意ボックス・テーブル）
- fact.md は事実の列挙だけになり、表示の文法に依存しない（保守性が上がる）
- 検証ゲートは構造化データに対して機械的に検査できる（マーカー検証・根拠リンク・必須カバレッジ）
- 実行時 Markdown 変換が不要（バンドルが小さくなる）

**Cons**:
- パーサーの改修が必要（Markdown 変換から構造化抽出へ）
- 段落・リストなどの素朴な本文は React 側で描画する必要がある（`Paragraph` / `List` コンポーネント）

### Option 4: 全部 React で書く（fact.md をやめる）

fact.md を廃止し、コンテンツを React の JSX で直接書く。

**Pros**:
- 中間層がなくなる

**Cons**:
- 検証ゲート（根拠リンク必須・12 必須項目・鮮度警告）が機械検査できなくなる
- 事実の更新がコードレビューになり、AI エージェントでの更新が難しくなる
- コンテンツ = コードになり保守性が大きく下がる

## Decision

**Chosen option**: Option 3: fact.md を構造化データとして読み、React コンポーネントで直接描画

fact.md は事実のデータだけを列挙し、ビルド時に構造化データ（tasks / flow / callouts / tables / paragraphs）としてパースして site-data.ts に埋め込む。画面は React コンポーネント（shadcn/ui ベース）が直接描画する。実行時・ビルド時の Markdown 変換（marked / react-markdown / remark-gfm）は廃止する。

**Implementation skills**: `shadcn` (shadcn/ui, `.agents/skills/shadcn/`) · `ui-ux-pro-max` (UI/UX design intelligence, `.agents/skills/ui-ux-pro-max/`) · `vite` (antfu/skills, `.agents/skills/vite/`) · `vitest` (antfu/skills, `.agents/skills/vitest/`)

## Rationale

ユーザーの要求は「一目で分かる」「インタラクティブに操作できる」画面です。Option 1（react-markdown マッピング）と Option 2（marked 変換）は、Markdown の文法で書ける範囲に表示が制限され、チェックリスト・フロー・注意ボックスのような状態を持つ操作を表現できません。「Markdown を shadcn/ui に変換する互換レイヤー」は存在せず、自作すると複雑で保守性が低くなります。

Option 3 は「fact.md は事実のデータ、表示は React」という分離を実現します。検証ゲートは構造化データに対して機械的に検査できるため維持され、画面は React の表現力を全部使えます。fact.md は表示の文法に依存しないため、事実の更新は Markdown の知識だけでできます。

Option 4（全部 React）は検証ゲートを失うため採用しません。検証ゲート（根拠リンク必須・12 必須項目・鮮度警告）はこのサイトの生命線であり、機械検査できる構造を維持することが最優先です。

## Feature design

**Data model sketch**（fact-section の構造化データ化）:

```
FactSection:
  level: 1 | 2 | 3
  heading: string
  anchor: string
  blocks: Block[]          # content を構造化した表示ブロック
  sources: FactSource[]
  mustIds: string[]

Block (判別可能な union):
  ParagraphBlock   { kind: 'paragraph', inline: InlineSpan[] }
  ListBlock        { kind: 'list', ordered: boolean, items: ListItem[] }
  TableBlock       { kind: 'table', headers: string[], rows: string[][] }
  CalloutBlock     { kind: 'callout', tone: 'note' | 'warning' | 'danger', inline: InlineSpan[] }
  ChecklistBlock   { kind: 'checklist', id: string, items: { text: string, done: boolean }[] }
  FlowBlock        { kind: 'flow', id: string, nodes: FlowNode[] }
  DiagramBlock     { kind: 'diagram', name: string }

InlineSpan:
  { text: string, bold: boolean }   # 最小限のインライン表現（太字のみ許可）

ListItem:
  { inline: InlineSpan[], children: ListItem[] }   # ネスト対応（深さ上限 2 を検証）

FlowNode:
  id: string                # パーサーが位置ベースで自動採番（例: f1, f2, ...）
  text: string              # 質問文または終端の表示テキスト
  choices: { label: string, nextId: string | null }[]   # null = 終端

**ブロック分割規則**（行ベースの状態機械）:
- 空行 = ブロック境界
- `- ` 始まり = リスト（インデントでネスト、深さ上限 2）
- `|` + 区切り行（`|---|`） = テーブル。ヘッダーは区切り行の直前行（GFM と一致）
- `:::` 始まり = マーカー開始。単独 `:::` 行 = マーカー閉じ
- 連続テキスト行（空行でない） = 1 段落

**インライン表現**（段落・リスト・注意ボックス内）:
- `**太字**` のみ許可し、`InlineSpan`（`{ text, bold }`）にパースする。既存コンテンツの `**` 使用（全 9 章で 418 箇所）を表示等価で移行するため
- それ以外のインライン構文（リンク・イタリック・コード）は禁止し、ビルド検証で落とす
- これは「Markdown 変換ライブラリを使わない」という AC-6 と矛盾しない（自前の最小インラインパース）
```

**マーカー仕様**（fact.md に書く構造化マーカー。ビルド検証付き）:

```
:::callout warning
絶対に赤ちゃんを揺さぶらないでください。
:::

:::checklist birth-registration
- 出生届を出す（14日以内）
- 児童手当を申請する（15日以内）
:::

:::flow crying-3h
Q: 赤ちゃんが泣いている
- おむつ・空腹・暑さ寒さを確認 → あやして様子見
  - 3時間以上泣き続ける → 小児科・救急に相談
  - 発熱・ぐったり → すぐ医療機関へ
- 泣き止んで機嫌がいい → 様子見OK
:::
```

- `:::callout <tone>`: 注意ボックス（tone は note / warning / danger）。閉じ `:::` までを text として抽出
- `:::checklist <id>`: チェックリスト。続く `- [ ]` 行を items として抽出。`- [x]` は done: true（初期値）
- `:::flow <id>`: 判断フロー。文法は下記（クロスチェック B4 で確定）:
  - `Q: <質問文>` がルート（1 つのみ）。以降の `- <ラベル> → <ノード本文>` が選択肢
  - 選択肢の下に子 `-` がある = そのノードは質問（子が次の選択肢）。子が無い = 終端（`nextId: null`）
  - ノード id はパーサーが位置ベースで自動採番（f1, f2, ...）。状態は非永続なのでドリフト無害
  - ビルド時検証: ノード数 ≥ 2、全選択肢の行き先解決、終端が 1 個以上（AC-1）
- `:::diagram <name>`: 図（既存、1 行形式 `:::diagram <name>:::` を維持。新マーカーの閉じ `:::` と共存するため、`:::diagram` 行は 1 行形式として先に判定し、他の `:::` はブロック形式として扱う）

**State transitions**（チェックリスト）:
- 未チェック → チェック（localStorage 保存）→ チェック解除
- チェック状態は localStorage に保存され、リロードしても保持

**Value sourcing**:

| Action | Value produced / displayed | Source |
|---|---|---|
| チェックリスト描画 | タスク一覧、チェック状態、進捗（n/m 完了） | fact.md の `:::checklist` ブロック（ビルド時抽出） |
| チェックの切替 | チェック状態、進捗バー | ユーザー操作 → localStorage（キー: `checklist:<章スラグ>/<ブロックID>`、値: `{v:1, done: string[]}`。item テキストをキーにし、並び替え・文言修正に強い。未知バージョンは読み捨て） |
| 検索インデックス（AC-7） | 章全文テキスト | `blockText(block)` 抽出関数: 全ブロック種別のテキスト連結（チェックリスト項目・フローの質問文・選択肢も含む）。`content` 廃止後の新ソース |
| SEO description（AC-10） | 章の description | 最初の ParagraphBlock の先頭文 |
| フローチャート描画 | 質問文、選択肢、現在地 | fact.md の `:::flow` ブロック（ビルド時抽出） |
| フローの選択 | 次の質問、現在地表示 | ユーザー操作（クライアント状態のみ、保存しない） |
| 注意ボックス描画 | tone、テキスト | fact.md の `:::callout` ブロック（ビルド時抽出） |
| テーブル描画 | ヘッダー、行 | fact.md の GFM テーブル（ビルド時抽出） |
| 根拠リンク表示 | ソース名、URL | fact.md の「根拠:」行（既存、維持） |
| 必須バッジ表示 | 必須 ID、ラベル | fact.md の「必須: [id]」行（既存、維持） |

**Key invariants**:
- fact.md に Markdown の表示文法（`- [ ]`、`>`、`1.`）を書かない（表示はマーカー + 構造化データのみ）
- 未知のマーカー（`:::xxx`）はビルド失敗（検証ゲート）
- チェックリスト ID・フロー ID は章内で一意。localStorage キーは `checklist:<章スラグ>/<ブロックID>` で章スコープを含める（章をまたぐ ID 衝突を防ぐ）
- 検証ゲート（根拠リンク・12 必須項目・鮮度警告）は維持

**Security model**:
- 公開の静的サイト。認証なし
- localStorage はユーザーのブラウザ内のみ（チェック状態は個人の端末に保存され、サーバーに送信しない）

**Configuration required**:
- なし（新しい env var や資格情報は不要）

**Critical test scenarios**:
- チェックリスト: チェック → 進捗が進む → リロード → 状態保持、verifies **AC-2**
- チェックリストのハイドレーション: SSR で未チェック描画 → マウント後 useEffect で localStorage から復元（ハイドレーションエラー 0 を維持）、verifies **AC-2**, **AC-8**
- フローチャート: はい/いいえで進む → 終端に到達 → 最初からやり直す、verifies **AC-3**
- パーサー: 段落 / ネストリスト / テーブル / マーカー混在の本文を正しくブロック分割、verifies **AC-1**
- インライン: `**太字**` が InlineSpan にパースされ、素の `**` が画面に出ない、verifies **AC-1**
- フロー検証: ノード数 < 2・未解決の選択肢・終端なし → ビルド失敗、verifies **AC-1**
- マーカー検証: 未知のマーカー → ビルド失敗、verifies **AC-1**
- 検証ゲート: 根拠リンク欠落 → ビルド失敗、verifies **AC-7**
- 全ページ: コンソールエラー 0、ハイドレーションエラー 0、verifies **AC-8**
- モバイル: 375px でオーバーフロー 0、テーブル横スクロール、verifies **AC-9**

## Build plan

（プロジェクトのビルドアプローチ: Tracer Bullet。薄い縦スライスを先に通し、太くしていく。今回の変更は表示レイヤーの置き換えなので、まず 1 章で新方式を通し、残りの章へ展開する）

1. fact-parse を改修: content を構造化ブロック（paragraph / list / table / callout / checklist / flow / diagram）にパースする。ブロック分割規則（空行・`- `・`|`・`:::`）とインライン `**太字**` パース（InlineSpan）を実装。マーカー検証（未知マーカー・フロー検証・ネスト深さ上限 2）を追加。既存の「根拠:」「必須:」行・Gaps 除外・diagram 抽出は維持。`bodyHtml` を廃止し `blocks: Block[]` に置き換え。テスト更新、satisfies **AC-1**, **AC-6**
2. fact-model を改修: FactSection に `blocks: Block[]` を追加、`content` / `bodyHtml` を廃止。Block の union 型を定義。テスト更新、satisfies **AC-1**, **AC-6**
3. React コンポーネント作成: `ParagraphBlock`（段落）、`ListBlock`（リスト）、`TableBlock`（shadcn Table ベース、モバイル横スクロール）、`CalloutBlock`（tone 別の注意ボックス）。`fact-section-view.tsx` を blocks 描画に改修、satisfies **AC-4**, **AC-5**
4. `ChecklistView` コンポーネント作成: チェックボックス（タッチターゲット 44px）、進捗バー（n/m 完了）、localStorage 保存（キー `checklist:<id>`）、satisfies **AC-2**, **AC-9**
5. `FlowChartView` コンポーネント作成: 質問 → はい/いいえ → 次へ、現在地表示、「最初からやり直す」、satisfies **AC-3**, **AC-9**
6. コンテンツ追加: 1 章（例: 01-day-of-birth）にチェックリスト、1 章（例: 06-safety）に判断フロー（泣き止まないとき）、注意ボックスを適切な箇所に追加。事実は既存の根拠リンク付き情報から構成（新規事実は検証が必要）、satisfies **AC-2**, **AC-3**, **AC-4**
7. 依存整理: marked / react-markdown / remark-gfm を package.json から削除。ビルド・バンドル検証、satisfies **AC-6**
8. 全ページ実測検証: 375px / 768px / 1280px でスクショ + コンソールエラー 0 + オーバーフロー 0。既存 UI/UX 指摘の再発チェック、satisfies **AC-8**, **AC-9**
9. ゲート実行: `npm run gen`（9 章 / 12 必須 / 警告 0）→ tsc → eslint → vitest → build（10 ページ）、satisfies **AC-7**

## Consequences

**Positive**:
- 画面が React の表現力を全部使える（チェックリスト・フロー・注意ボックス・テーブル）
- fact.md は事実の列挙だけになり、表示の文法に依存しない（保守性が上がる）
- 実行時 Markdown 変換が不要（バンドルが小さくなる、#418 のリスクも構造的に消える）
- 検証ゲートは構造化データに対して機械的に検査できる（維持）

**Negative / tradeoffs**:
- パーサーを Markdown 変換から構造化抽出に改修する必要がある（実装コスト）
- 段落・リストなどの素朴な本文も React 側で描画する必要がある（コンポーネントが増える）
- fact.md の書き方が変わる（マーカーの記法を覚える必要がある）

**Neutral**:
- 既存の検証ゲート・SSG・デザイントークンは不変
- チェック状態は localStorage 保存（サーバー同期なし、端末ごとの状態）

## Follow-up

- [ ] 既存の 9 章すべてで、`:::callout` / `:::checklist` / `:::flow` を使うべき箇所を洗い出し、事実を検証して追加する（AC-1 の対象外、コンテンツ拡充）
- [ ] 「泣き止まないときの判断フロー」の医学的根拠（3時間ルール等）を公式ソースで裏取りしてからコンテンツに追加する
- [ ] チェックリストの初期値（`- [x]`）を事実として使う場合の検証方針を決める
- [ ] `ChapterData.body`（生 Markdown 全文）はクライアント未使用のため、移行時に `content` / `bodyHtml` と一緒に削除する

## Migration plan

**Strategy**: big bang（表示レイヤーの置き換え。静的サイトの全ページを一度に切り替える。コンテンツは事実のままなので、ロールバックはコミット revert で完結）
**Phases**:
1. Phase 1: fact-parse / fact-model を構造化ブロック対応に改修。テスト更新（既存 24 テストが新パーサーで通ることを確認）
2. Phase 2: fact-section-view を blocks 描画に改修。段落・リスト・テーブル・注意ボックスが従来表示と同等になることを確認
3. Phase 3: ChecklistView / FlowChartView を追加し、1 章に適用（スモーク）
4. Phase 4: 残りの 9 章へ展開。依存（marked / react-markdown）を削除
5. Phase 5: 全ページ実測検証 + ゲート実行
**Rollback**: コミット revert で旧表示（bodyHtml）に戻る。localStorage キーは新形式（`checklist:<章>/<id>`）のみで、旧データとの衝突なし
**Risks**: パーサー改修で既存の 24 テスト・検証ゲートが壊れる可能性。各 Phase でゲートを回して早期発見する。フローチャートのコンテンツ追加は事実検証が必要（Follow-up 参照）
