# 0003. 月齢別アイテムタイムラインページ（item-timeline）

**Date**: 2026-09-01（最終更新 2026-09-02: 実装・実測結果に合わせてデータ契約と検証記録を反映）
**Status**: Implemented（AC-1〜AC-12 をビルドゲート・テスト・ブラウザで確認済み）

## Summary

妊娠中から2歳まで「いつ何がいるか」を、上から下へ読めるいちばん長いタイムラインとして見せるページ。月齢を選ぶと今月必要なアイテムに絞られ、カテゴリと「そろえる／あると便利」で絞り込める。買ったものにチェックを入れると残り点数と目安金額の合計が残る。品川区の健診や給付も同じ時間軸に並べる。

既存の `fact/`（知識の章）とは別に、`items/*.md` をコンテンツソースとして新設する。価格は「調査日のついた目安」としてだけ持ち、特定商品の直リンクは置かない（販売先のリンクは検索ページのみ）。

## Context

既存サイトは9章の知識（医療・安全・手続き）で、読む順はあっても「この月に何を買えばいいか」の時系列がない。父親の実際の悩みは「今月なにを買うべきか、いくらくらい見るのか、どこで探すのか」で、知識章とは問いが違う。

制約:

- 価格は毎日動く。静的サイトで商品価格を断定すると、公開直後から嘘になる。小売業者ではない第三者が自社比較の根拠として示す金額は「調査日つきのレンジ」に留める（景表法の有利誤認に近づかないため）。
- 特定商品ページへの直リンクは在庫切れ・リニューアルで切れる。静的サイトでリンク切れ検証を商品単位で回すのは運用不能。
- 既存のビルドゲートは `fact/` 向け（全セクションに根拠必須・180日鮮度・12項目カバレッジ）。価格や販売先のデータを `fact/` に入れるとゲートの意味が薄まる。
- SSG の静的マルチページ（SPA 禁止、base `./`）。初期 HTML は全アイテムを絞り込みなしで描画し、ハイドレーション後にユーザー操作で変わる。localStorage 由来の状態を初期描画に混ぜない。
- 既存の知識コンテンツが「公的・事業者の一次ソースにあたって引用する」という規律を維持する（一次ソースでないものは参照元を明かす）。

## Requirements

**User stories**:
- 生まれる前の父親として、妊娠中から2歳まで何をいつ買うかを1本の縦並びで把握したい。準備漏れと買いすぎを避けたい。
- 今の月齢の父親として、今月やるべきことに絞って見たい。長文を上から読まなくていいようにしたい。
- 予算を考える父親として、残りアイテムの目安金額の合計が見たい。見通しを立てたい。
- 品川区在住の父親として、同じ時間軸上で区の健診・給付・配布物も見たい。買い忘れと申請漏れを防ぎたい。

**Acceptance criteria**:
- **AC-1**: `npm run build` で `timeline.html` が追加生成され、既存10ページと導線（トップ・章メニュー）から到達できる。
- **AC-2**: ページは妊娠中→新生児（0〜1か月）→2〜3か月→4〜6か月→7〜9か月→10〜12か月→13〜18か月→19〜24か月の band を上から下へ時系列で描画し、各 band 内は「使い始め月」の昇順にアイテムが並ぶ（同一値はコンテンツ側の順を保つ）。
- **AC-3**: 月齢 chip（複数選択可）で選択した band だけが開き、未選択の band はたたまれて「使用期間・過ぎた時期／これからの時期・残り件数・残り目安金額」だけが残る。未選択時は全 band が開く。
- **AC-4**: カテゴリ（8種・複数選択は和集合）と「そろえるだけ」で絞り込め（月齢・カテゴリ・必要度のあいだは AND）、結果件数が `aria-live` で読み上げられる。band 内に該当が無いときは band 内に、選択状態で開いている band すべてが0件のときは大見出し下にも空の状態を明示する。
- **AC-5**: 各アイテムに「使い始める目安月」「使い終わりの目安」「サイズ・数量」「なぜ今か」が表示され、`whySources[]` の各URLは band の `sources[].url` に存在すること。欠ければビルド失敗。
- **AC-6**: 価格はレンジ・単位・調査日と出典リンクを表示し「目安」であることを明記する。`price.sources[]` は band の `sources[]` に登録済みで `0 < low <= high`。調査日が `ITEMS_STALE_DAYS`（180日）を超えるとビルド警告（エラーにはしない）。レンジが2倍以上開いている品目は「幅が大きい」を添える。
- **AC-7**: 月ラベルは `monthRangeLabel()` に一本化し、band 上限（24か月）を超えて使う品月は素の月数を晒さず「〜2 歳以降も継続」と表示する。1歳超は「1歳7か月」のように才＋か月で書く。
- **AC-8**: 販売先リンクは Amazon / 楽天市場 / 西松屋 / アカチャンホンポ / ユニクロの**検索URL**のみを、kind と検索語から生成する（`src/lib/shop-links.ts`）。データに販売先の直URLや商品IDを持たせず、混入したらビルド失敗（`items_shop_url_forbidden`）。本文フィールドへのURL混入は `items_url_leak` で弾く。
- **AC-9**: 「すべての時期を開く／閉じる」と band 単位の「この時期だけをたたむ」で開閉を切り替えられる。閉じた band は accordion（ボタン行＋ `aria-expanded`）になり、開いている band だけをたためる（閉じている band を accordion にしない）。全閉じの状態も許す。
- **AC-10**: 各 band に品川区・東京都の健診や支援のマーカー（例: 4か月児健診の引き換え品、見守りおむつ定期便、妊婦のための支援給付、養育家庭ホームアシスト事業）が根拠URLつきで表示される。
- **AC-11**: アイテムの購入済みチェックが `localStorage`（key `items-timeline:v1`）に保存され、再訪後も復元される。残り点数と、価格が分かる残りアイテムの目安合計（下限〜上限）が出る。壊れた保存値は無視して初期描画し、修正機会として1回だけ warning を出す。
- **AC-12**: 320/375/390/414px と1280px で横スクロール0、タップ目標44px以上、`prefers-reduced-motion` で動きなし、絞り込み・開閉・チェックがキーボード操作可能（WCAG AA）。`lang="ja"`（`lang="en"` にしない）、出典・販売先リンクは `rel="noopener noreferrer"`、外部リンクである旨を sr-only で示す。
- **AC-13**: パーサ・バリデータ・リンク生成の純関数テストが通る。未知 band / 未知 category / band の `monthsFrom > monthsTo` / item の `startMonth > endMonth` / `endMonth > MAX_END_MONTH` / 根拠URL未登録 / 未参照の登録ソース / 直リンク混入 / id 重複 / 未知 shop kind / 空の検索語 / 数値フィールドの文字列化で失敗すること。

## Options considered

### Option 1: `items/*.md`（frontmatter YAML）+ 専用の生成・検証ゲート

章と同じ「Markdown + frontmatter」で band ごとに構造化データを持ち、専用パーサとバリデータで `src/generated/items-data.ts` を生成する。価格は調査日つきの参考値として扱い、根拠ゲートとは別扱いにする。

**Pros**:
- 既存の生成物／検証ゲートと同じ形。コンテンツ編集の体験も同じ。
- フィールド検証（月齢レンジ、列挙値、根拠URL、直リンク禁止）をビルド時にできる。
- `fact/` の規律を汚さず、鮮度警告だけ共有できる。

**Cons**:
- schema とパーサ、ページが増える（新規コード量が最も多い）。
- 既存 fact の検証をそのまま流用できない（別バリデータを書く）。

### Option 2: `fact/10-items.md` として章に含める

既存の章として `根拠:` 行ゲートの下に置く。

**Pros**:
- 新規コードがほぼ不要（テンプレートと導線で済む）。
- 既存の鮮度・根拠チェックがそのまま効く。

**Cons**:
- 価格のレンジは「事実」ではないため、180日鮮度警告が毎月鳴り続ける。
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

Context の二つの力（価格は陳腐化する／リンク切れを検証しきれない）が Option 2 と 3 を除外する。価格は「事実」ではなく「調査時点で読めたレンジ」なので、fact の根拠ゲートに混ぜると警告が常時鳴るか、逆にゲートが緩む。専用 band に分ければ「月齢の根拠は公的・事業者ガイド必須、価格は調査日つきで警告のみ」という別の強さの規律を課せる。

販売先リンクを kind + 検索語から生成する設計は、実際の失敗が根拠になっている。商品直リンクをデータに持たせた版では、`https://www.akachan.jp/.../goods_code=1112534` へのリンク3本が実際に404になり、さらに実在しないドメイン `nishimatsuya-website.net` を18本の出典として擁していた。検索URLなら「フォーマットが生きているか」の年2回の確認で済み、品切れとも無関係に链接が死なない。kind を5種に閉じ、`SHOP_KINDS` に無い kind と `shops[].url` をビルドで弾くことで、リンクを増やすほど検証対象が増える構造自体を排除する。

## Feature design

**データモデル**（`items/*.md` frontmatter、band 単位。本文 Markdown は持たない）:

```yaml
# items/03-m4-6.md
band: m4-6            # pregnancy | newborn | m2-3 | m4-6 | m7-9 | m10-12 | m13-18 | m19-24
label: 生後4〜6か月
monthsFrom: 4         # -1 = 妊娠中
monthsTo: 6
intro: この時期に起きること（1〜2文。URLを含めない）
caution: 個人差・製品表示優先の但し書き
sources:              # この band で使う出典の登録簿（name / url / checked）
  - name: アカチャンホンポ 離乳食用品 商品カテゴリ
    url: https://shop.akachan.jp/shop/c/cb149/
    checked: "2026-09-02"
support:              # 区・都の健診や支援（source は sources[].url の1つ）
  - id: shigaetsu-shiho
    title: 4か月児健康診査（引き換えに「はじめてのえほん よんで よんで」）
    detail: 公式本文で確認できた範囲の事実だけを書く。
    source: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html
items:
  - id: m46-tableware        # サイト全体で一意（band id をプレフィックスにしない）
    name: 離乳食用の食器・スプーン（初期）
    category: tabe            # neru | kiru | tabe | arau | ugoku | anzen | asobi | karada
    need: must                # must | useful
    startMonth: 5             # -1 = 妊娠中, 0..24
    endMonth: 18              # 省略可（不明）, MAX_END_MONTH=84 まで
    size: 初期用（小さめ）1セット   # サイズ・数量の目安（自由文・URL不可）
    note: 離乳食開始の目安は生後5〜6か月。
    whySources:               # sources[].url に登録済みのURLのみ（1つ以上）
      - https://www.pigeon.info/baby/getsurei/getsurei-8.html
    price:                    # 価格なし（省略）も許す。金額を作らないための escape hatch
      low: 419
      high: 2118
      unit: 1セット（税込）
      checked: "2026-09-02"
      sources:                # 金額を読み取ったページ。ここも sources[] 登録済み必須
        - https://shop.akachan.jp/shop/c/cb149/
    shops:                    # kind は amazon | rakuten | nishimatyaya | akachan | uniqlo
      - kind: nishimatyaya
        q: 離乳食 食器
```

- `Item.startMonth` は `-1..24`、`endMonth` は省略または `startMonth <= endMonth <= MAX_END_MONTH(84)`。band のレンジと整合させる必要はない（またぎ可。例: band `pregnancy` の `pre-a-stroller` は `endMonth: 15`）。`endMonth` は「使用目安の終点」で、完了判定には使わない（月を進めてもチェックは消えない）。
- パーサは YAML 文字列の月齢・価格を必ず数値へ変換し、数値でないものはエラーにする（`items_int` / `items_price_number`。YAML 1.1 の `yes/no` 化など暗黙の型崩れをビルドで止める）。
- **出典参照は1ファイル内で完結させる**（次節）。
- 生成物: `src/generated/items-data.ts`（`ITEMS_DATA = { bands, items, sources }`）。`buildItemsData()` が band を `ITEM_BAND_IDS` 順、band 内を `startMonth` の昇順（安定ソート）に並べる。検索インデックスには含めない（検索は知識章のみ）。
- 実データ（2026-09-02）: band 8 / アイテム 62 / 価格つき 61（`nb-diaper-cream` は該当品が出ず価格なし。金額を作らず `price` 省略）/ 登録ソースは band ごとに 19・18・10・15・15・13・12・14。band ごとの品目数は 16 / 10 / 6 / 7 / 6 / 6 / 5 / 6。

**出典の扱い（リンク規律）**:

- `whySources[]` / `price.sources[]` / `support[].source` は**必ず自 band の `sources[].url` に存在**する。逆に `sources[]` の各URLは最低1回参照されていなければならない（未登録→`items_source_not_registered`、未参照→`items_source_unreferenced`）。参照と登録が1ファイル内で閉じていれば、バンド単位の編集で黙ってリンクが死ぬことがない。
- 販売先の検索URLはビルド時生成のみ。`shops` に `url` や商品IDを書いたら `items_shop_url_forbidden`、本文・`intro`・`size`・`q` に `http` を含む文字列が来たら `items_url_leak`。kind 実測済みの書式（2026-09-02 実サイト確認）:
  - amazon `https://www.amazon.co.jp/s?k=<q>` ／ rakuten `https://search.rakuten.co.jp/search/mall/<q>/`
  - nishimatyaya（キーの綴りはこのまま運用）`https://www.24028-net.jp/item_list.html?searchbox=1&q=<q>` — `/search/?q=` と `/products/search?keywords=` は404
  - akachan `https://shop.akachan.jp/shop/goods/search.aspx?keyword=<q>` — `/shop/search?keyword=` は404。カテゴリページ `/shop/c/cbNNN/` は常に200で価格もHTMLに含まれる
  - uniqlo `https://www.uniqlo.com/jp/ja/search/?q=<q>`
- 価格の金額は**出典ページに実在する値だけ**を使う（`￥1,234` / `1,234円` / Amazon `a-price-whole` / 楽天 `DSP_PRICE` といった金額表記だけを抽出し、送料込み目安などのページ chrome は除外）。`low`/`high` は観測値の10〜90パーセンタイル。裏取り手順は `docs/research/item-timeline/05`。
- 区の個別ページは配信構造が変わりやすい。品川区は同一URLが200と404を交互に返す不安定な状態を観測しており、**1回の404でリンクを削除しない（再試行してから判断する）**。canonical path は `/PC/…`（`/KK/…` は同一ページへのリダイレクト）。
- 外部リンクは `rel="noopener noreferrer"` + `target="_blank"`。ロゴ・画像は使わずテキストリンクのみ（商標・誤認回避）。

**API surface**（純関数、副作用なし）:

| 関数 | 所在 | 入力 | 出力 | 主なエラー |
|---|---|---|---|---|
| `parseItemsFile(content, name)` | `src/lib/items-parse.ts` | band md 文字列 | `{ ok:true, band, issues:[] }` \| `{ ok:false, issues }` | frontmatter 欠落、型不正、本文あり、出典参照の不整合 |
| `checkSourceReferences(band, file)` | `src/lib/items-parse.ts` | band + ファイル名 | `ItemIssue[]` | `items_source_not_registered` / `items_source_unreferenced` |
| `validateItems(bands, now)` | `src/lib/items-validate.ts` | band 配列 + 現在日 | `{ errors, warnings, ok }` | AC-5/6/8/10/13 の違反＋鮮度警告 |
| `buildItemsData(bands)` | `src/lib/items-validate.ts` | 検証済み band 配列 | 並び順と `sources` を整えた `ItemsData` | — |
| `shopUrl(shop)` / `resolveShopLinks(shops)` | `src/lib/shop-links.ts` | `{kind, q}` | 検索URL（band 表示用の解決済みリンク） | 未知 kind / 空の q で throw |
| `filterItems(items, filters)` | `src/lib/items-model.ts` | `{ categories(OR), mustOnly }` | 該当アイテム | — |
| `summarize(items, doneIds)` | `src/lib/items-model.ts` | 全アイテム + 完了ID | 残り件数と low/high 合計 | — |
| `monthLabel(band)` / `monthRangeLabel(from, to)` / `monthPoint(m)` / `supportMatchesMonth()` / `yen()` | `src/lib/items-model.ts` | 月齢・band・金額 | 表示ラベル | — |

画面側: ページは `src/pages/timeline.tsx`（vite-react-ssg のファイルルート。`Component` を export し、初期データは `ItemsData` の prop として注入、既定は `ITEMS_DATA`）。band 内の純粋な集計・表示ヘルパは `src/lib/items-model.ts` に置き、ページ固有の JSX を component 側に残す。band は開閉状態に関わらず常に `<section id aria-labelledby>` として DOM に残す（スクロールスパイとジャンプリンクの両立）。導線は `src/lib/nav.ts` の `NAV_ITEMS` に登録（トップの「この月に何を買う？」カード・月チップの遷移・章メニューの `timeline` 項目は同じ表を参照する）。localStorage 読込は `useEffect` 内のみで、初期 HTML は「絞り込み前・localStorage 読込前」の状態だけを描画する。

**Value sourcing**:

| 表示・生成する値 | 出所 |
|---|---|
| 使い始め月・サイズ・数量 | band frontmatter の `items[].startMonth/size`。根拠は `items[].whySources[]`（公的ガイド・メーカー月齢ガイド・小売の準備リスト） |
| 価格レンジ（下限・上限・単位） | `items[].price.low/high/unit`。各値は実ページで読んだ金額のみ（61/62品目を裏取り済み、`docs/research/item-timeline/05`）。調査日 `price.checked` |
| 「調査時点の目安」表示 | `price.checked` から生成（ハードコードしない） |
| 販売先のURL | `shopUrl({kind, q})` の生成のみ。テンプレは実測済み5書式（`src/lib/shop-links.ts` に集約） |
| 残り点数・残り目安金額合計 | チェック済みIDの集合（localStorage）から未チェックアイテムを計算。価格は low/high の合計、価格なしアイテムは件数だけ計上 |
| 区の健診・支援マーカー | `band.support[]`。金額・時期は `support[].source` の公式ページ本文 |
| 月セレクトの選択肢 | band の `monthsFrom..monthsTo`（`-1` は「妊娠中」ラベル） |

**Key invariants**:
- `items[].id` はサイト全体で一意。band id は8種のみ・重複ファイル禁止。`category` / `need` / `shops.kind` は列挙値。
- `whySources[]` / `price.sources[]` / `support[].source` は自 band の `sources[].url` に含まれ、`sources[]` のURLは最低1回参照される。
- `intro`・`caution`・`note`・`size`・`detail`・`shops[].q` に `http` を含む文字列を置かない。販売先URLは `shopUrl()` からしか生成できない。
- 価格レンジは `0 < low <= high`、`price.sources[]` は必須、band / source / price の `checked` は ISO 日付。
- `buildItemsData` の出力は band 内が `startMonth` 昇順（表示順の単一出所）。
- 初期 HTML に絞り込み前・localStorage 読込前の状態だけをレンダリングする（ハイドレーション不整合を防ぐ）。

**Security model**: 公開静的サイト。認証なし。個人情報は保存しない（localStorage にチェック済みのアイテムIDのみ、vite-react-ssg の onReady で初期化し SSR と競合させない）。外部リンクは `rel="noopener noreferrer"`。ロゴ・画像は使わずテキストリンクのみ。

**設定**: 新規環境変数なし。

**Critical test scenarios**（各 AC に対応）:
- Happy path: 8 band が時系列で生成され、band 内は `startMonth` 昇順。`timeline.html` に band 見出しとアイテム名が出る。検証 AC-1, AC-2
- Failure case: 直リンクURL・未知 category・band/item の月逆転・`endMonth > MAX_END_MONTH`・根拠URL未登録・未参照ソース・id 重複・文字列入力の band md でビルドが失敗し、エラーメッセージがファイル名と項目名を含む。検証 AC-5, AC-8, AC-13
- Failure case: `price.checked` が181日前なら警告のみ（エラーにしない）。検証 AC-6
- Interaction: 月を選ぶと選択 band だけが開き、他 band は使用期間・残り件数・残り金額を残してたまる。カテゴリ複数選択は和集合、必要度と AND、0件なら band 内／全体の空状態が出る。検証 AC-3, AC-4
- A11y: band landmark の accname が `band.label` と完全一致し、開いている band には `h2#<id>-heading` がある。2歳超の品目は「2 歳以降も継続」表記で素の月数（84）を出さない。検証 AC-7, AC-9, AC-12
- Persistence: チェック後に localStorage へ `items-timeline:v1` が書かれ、再マウントで復元、不正な保存データは無視して初期描画。検証 AC-11
- Auth/permission: 該当なし（公開ページ）

## File layout

| 場所 | 役割 |
|---|---|
| `items/*.md` | band 8本のコンテンツソース（frontmatter のみ。本文を書いたら `items_body_not_allowed` で失敗） |
| `src/lib/items-model.ts` | 型・列挙・定数（`ITEM_BAND_IDS` / `MAX_END_MONTH` / `ITEMS_STALE_DAYS`）と表示純関数（`monthPoint` / `monthRangeLabel` / `filterItems` / `summarize` / `supportMatchesMonth` / `yen`） |
| `src/lib/items-parse.ts` | frontmatter 解析と項目別検証、`checkSourceReferences` |
| `src/lib/items-validate.ts` | 横断検証（band 数・id 重複・直リンク・鮮度・出典参照）と `buildItemsData` |
| `src/lib/shop-links.ts` | 検索URLテンプレ（kind 5種のみ） |
| `src/lib/generate-items-data.ts` / `src/lib/vite-plugin-items.ts` | `npm run gen` と dev 時の `items/` watch（検証失敗は non-zero / build Error） |
| `src/pages/timeline.tsx` | ページ本体（vite-react-ssg ファイルルート。`Component` export、初期値は prop `data?: ItemsData`） |
| `src/components/timeline/{month-rail,band-section,item-card}.tsx` | 月齢レール／band（accordion と section を state で出し分け）／品目カード（価格・出典・販売先検索リンク） |
| `src/lib/nav.ts` の `NAV_ITEMS` | 導線の単一ソース（トップカード・章メニュー・月チップの遷移が同じ表を参照） |
| `src/generated/items-data.ts` | 生成物（gitignore 済み、検索インデックスには入れない） |
| `.urlcheck/` | 開発用の検証スクリプトとHTMLキャッシュ（gitignore 済み。ゲートではなく手動実行の裏取り用） |

## Build plan

1. **[AC-13]** `src/lib/items-model.ts` / `items-parse.ts` / `items-validate.ts` / `shop-links.ts` を追加。単体テスト（happy・各失敗・鮮度警告・リンク生成）を `src/lib/__tests__/items.test.ts` に追加。
2. **[AC-1, AC-2]** `src/lib/generate-items-data.ts` と band md の読み込み、`src/generated/items-data.ts` 生成、vite プラグインの watch に `items/` を追加。`src/pages/timeline.tsx`（ファイルルート）と導線（`src/lib/nav.ts`・トップカード・章メニュー）を追加し、band 1個（妊娠中）で薄いスライスを疎通。
3. **[AC-2, AC-5]** band 8本と全アイテムを投入（`docs/research/item-timeline/01`, `02` の値のみ使用）。
4. **[AC-3, AC-4, AC-11]** インタラクション: 月チップ（複数選択・選択 band のみ展開）、カテゴリ／必要度絞り込み＋件数 announce、購入済みチェックと残り予算レンジ。
5. **[AC-10]** 各 band の support マーカー描画。
6. **[AC-6, AC-7, AC-12]** 価格の「目安」表示と調査日、販売先リンク、月ラベル、レスポンシブとアクセシビリティ（320/375/390/414/1280 で実測、reduced motion）。
7. **[AC-1..AC-13]** ゲート実行（gen / typecheck / lint / test / format:check / build）と `vite preview` のブラウザ検証。さらに全 out link の生死と価格の裏取り（結果は `docs/research/item-timeline/05`）。

## Consequences

- 新しいコンテンツ層（`items/`）が増える。知識章と買い物リストの二重管理を避けるため、品物の「使い方の知識」は章側に置き、タイムラインは「時期・サイズ・個数・探し先」に限定する（note は1〜2文）。
- 価格は必ず古くなる。180日警告と「調査日つき」表示が前提。アフィリエイトを導入する場合は景表法（ステマ規制）と各モールの規約対応が別途必要。
- 月齢・サイズの目安は公的ガイドとメーカー・小売のガイドに依存する（個人差あり）。医療的な必須事項は既存の safety / health 章を正とし、ページからもリンクする。
- band ごとに「月齢で一律に決めない」旨の caution を必ず置く。
- 品川区の個別ページは配信構造が変わりやすく、検証中に同一URLが200と404を交互に返す不安定さを実測した。公開前後にリンク切れチェックを回すこと（再試り前提で）。
- 機械検証できない販売先（ベビーザらス `babiesrus.co.jp` は検索が bot チェックに弾かれる、BIRTHDAY `birthday.co.jp` は 403）は、リンク先として検証できないため現状 kind に含めない。人手で開けることを確認してから `SHOP_KINDS` に追加する。
- `:slug` ルートと静的 `timeline` ルートが同居する。章 slug に `timeline` を付けると衝突するため禁止する（バリデータで守る）。

## Follow-up

- 検索インデックスに band・アイテム名を載せるか（載せるなら「いつ」の検索意図に応える）。
- 全購入完了時に `aria-live="assertive"` で祝祭を読み上げるか（現行は `polite` のみ。完了時文言は band 集計内にあり）。
- アカチャンホンポの月齢絞り込みURL（`Search[age]`）は仕様変更リスク。壊れたらキーワード検索へフォールバック。
- `/sync` で AGENTS.md に `items/` 層とタイムラインページの存在を追記。

## References

- `docs/research/item-timeline/01-monthly-needs.md` — 月齢別の必要性・サイズ・数量（西松屋プレママガイド、アカチャンホンポの手入れ・離乳食ガイド、ピジョン月齢ガイド、消費者庁・こども家庭庁）
- `docs/research/item-timeline/02-price-platforms.md` — 実売価格レンジとプラットフォーム傾向（西松屋／アカチャンホンポ／ユニクロ／ニトリ／Amazon／楽天／メルカリ。2026-09-01 確認）
- `docs/research/item-timeline/03-links-and-disclosure.md` — 検索URL書式の実測検証とリンク規律
- `docs/research/item-timeline/04-shinagawa-support.md` — 品川区・東京都の支援（公式本文照合）
- `docs/research/item-timeline/05-link-price-verification.md` — 全URLの生死 sweep、死URLの置換履歴、価格 61 件の再導出手法（2026-09-02 実測）
- 既存: `docs/specs/0001-baby-guide-static-site.md`, `docs/specs/0002-react-component-rendering.md`, `docs/uiux/spec-mobile.md`, `docs/uiux/spec-desktop.md`

## Implementation log (append-only)

### 2026-09-03 Post-merge fixes (merged PR #1) and deployed verification

- `/check review` の指摘どおり **AC-8 の localStorage 初回挙動**を実装。localStorage 読み出しを `useEffect` に移し、初回描画（SSG/SSR ハイドレーション）は「全 band 全開・未チェック・絞り込みなし」で確定させる。`itemCardId()` を `src/lib/items-model.ts` に export し、カードとハイドレートの id 生成を一元化した。
- 月チップ選択後の自動スクロールを `src/lib/scroll.ts` の `scrollToElementTop()` に分離。`documentElement.scrollHeight` が収束するまで rAF で待ってからスクロールするため、ヘッダー収縮で固定帯の高さが変わっても見出しが固定帯に隠れない。収束待ちだけを実行時点のオフセットで計算する回帰テストを追加。
- **モバイル最適化**: 月チップを 2〜3列グリッド化（タップ目標 44px 以上を担保）、カテゴリ行を横スクロール strip 化、`sticky top-[var(--subbar-h)]` の**モバイル専用サマリーバー**（残り品数＋compact 表記の残価額）を追加。デスクトップは 2 列グリッド＋band 内の sticky 目次を維持しつつ、広画面では目次を流して本文幅を守り、サマリーバーを 1 行に圧縮。`--header-h` はヘッダー常時1行化に合わせて 191px → **103px**、`--timeline-rail-top` は `.rail-sticky` の相対値に置換。
- **リンク規律の修正**: 月チップ・章リンク・トップカードを `.html` 形式に統一（`:5173/timeline.html` を実ブラウザで開き、URL 正規化で相対リンクが壊れないことを確認）。デプロイ済み GitHub Pages の `<a name>` 計測で band 見出し id が `m0-pregnancy`〜`m19-24`、旧 `#m0` / `#84m` は不在と確認。
- 販売先リンクを全 81 品目から抽出し、Amazon / 楽天 / 西松屋 / アカチャンホンポ / ユニクロの**検索 URL を実際に開いて 0 件にならないことを実測**。アカチャンホンポの月齢絞り込み（`Search[age]`）は 0 件を返すため仕様どおりキーワード検索へフォールバックさせ、`src/lib/shop-links.ts` のコメントに「月齢引数は保持せずキーワードのみ渡す」旨を明記。楽天は mallId を含む仕様どおりの URL を維持。
- **デプロイ済みページの実ブラウザ検証**（`https://tosukui.github.io/akachan-manual/timeline.html`、GitHub Actions deploy 完了後）: 390×844 / 768×1024 / 1024×768 / 1194×834 / 1440×900 の 5 ビューポートで、h1=1・band 8・全開・静的チェックボックス 81・外部リンクの `rel="noopener noreferrer"`・横向き overflow なし・ヘッダー高さと月齢レールの高さ上限（レールは横向きスクロール化により 196px → 68px）を確認。チェック → reload 復元 → 月チップ 1 クリックで選択 band 単独展開 → 固定帯の下に着地 → 再読込で band 全開、まで**クリック操作で**検証。コンソールエラー 0 件。
- **月齢の目盛り追加**: 「服のサイズ買い足し」「哺乳びん乳首の交換」「おむつのパンツタイプ／ビッグへの切替」「B型ベビーカー検討」「チャイルドシートの前向き切替」「はいはい期の安全対策」など 10 品目を追加（71 → 81 品目、価格つき 78）。根拠は西松屋サイズ表・乳首サイズ表・おむつ選び方ガイド・育児グッズ準備品リスト、ピジョンお部屋づくり、NITE（すべて 2026-09-03 実測。サイズ別実売はカテゴリページを実ブラウザ描画して税込価格を全件抽出）。旧引用 `hpg000045106` は 404 化したため、東京都福祉局の液体ミルク特集と品川区の避難所備蓄ページに張替えた。詳細は `docs/research/item-timeline/01`「サイズアウト・切り替えの目盛り」と `05` §7。

### Next

- `/sync` を実行して `AGENTS.md` に `items/` 層・タイムラインページ・`src/lib/scroll.ts` を追記し、`docs/uiux/*` を現在のレイアウトに合わせる。
- チェック済み進捗の URL 共有（AC-11 のスコープ拡大）と、2 歳以降 band の追加は未着手（`MAX_END_MONTH = 84` の制約内）。
