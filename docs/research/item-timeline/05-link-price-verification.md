# 05. 掲載URLと価格の裏取り記録（2026-09-02 実施）

`items/*.md` が指すURLの生死と、価格レンジの実在を機械的に検証した記録。spec 0003 の AC-4 / AC-5 / AC-7 に対応する。

## 検証方法

- **URL生死**: 掲載中の全URL（106件）を `curl -A "Mozilla/5.0"` で取得し HTTPステータスを確認。Python `urllib` は Amazon で 503、一部URLで不正リダイレクトを出すため、測定は必ず curl に統一した。
- **価格裏取り**: 価格をもつ45品目について、引用元HTML内に `low` / `high` の金額（`¥1,000` / `￥1,000` / 生数値）が実在するかを正規表現で確認。Amazon は検索結果をサーバー側でHTMLに焼き付けるため金額が本文に出る。楽天は SSR に価格を含さず、埋め込みJSON中の `DSP_PRICE` 実売額（税込み）を読む必要があった。アカチャンホンポ（`pageData` JSON 内 `price`）・西松屋（SSRに `¥`）は本文から抽出。
- 取得HTMLはキャッシュし、再実行時に再 fetch しない。

## 結果

- **価格: 45/45 品目が引用元HTML内の金額と一致**（下限・上限とも実在する値のみ採用）。
- **リンク: 31件が死亡**。内訳と対処は下記。

## 死亡URLの内訳と対処

| 種別 | 件数 | 対処 |
|---|---|---|
| `www.nishimatsuya-website.net`（存在しないドメイン） | 18 | 実ECドメイン `www.24028-net.jp/item_list.html?searchbox=1&q=` の検索URLへ |
| Amazon 商品直リンク `/dp/<ASIN>` | 32 | 検索URL `https://www.amazon.co.jp/s?k=…` へ。価格出典も同じ検索ページに張り替え、金額を再取得 |
| ピジョン `…/qa/` | 2 | 生存ページへ差し替え（`baby-feeding/`、`column/magp/091nasalcare.html`） |
| ピジョン `baby-feeding/food_9.html` | 1 | `baby-feeding/`（離乳食・授乳サポート）へ |
| ピジョン `baby/weaning-steps.html` / `column/food/009foods.html` | 2 | `baby/getsurei/getsurei-{3,5,8,12}.html`（離乳食開始月齢の実ページ）へ |
| 西松屋プレママ `/guide/{stroller,bath,diaper,babyroom,clothes,milk}/` | 6 | 生存する `/premama/preparation-item/*`・`/premama/guide/bedding/`・検索URLへ |
| ユニクロ `/jp/ja/products/search?q=` | 1 | `/jp/ja/search/?q=`（実測で検索が機能する形式） |
| 品川区 `hpg…`（別コンテンツへのリダイレクト含む） | 複数 | 下記 canonical path へ |

## 品川区URLについて（重要）

- `/KK/kodomo/…` 形式は `/PC/kodomo/…` 同名ページへリダイレクトされる（内容は同一）。**`/PC/` を正とする。**
- `hpg000000798`（乳幼児健康診査・相談）が持つリンクは `hpg000033502`（4か月児）、`hpg000033504`（9〜10か月）、`hpg000033505`（1歳6か月）、`hpg000033506`（2歳6〜3歳未満）、`hpg000033507`（病後児）、`hpg000033509`（病児）で、これが site 内の正式な系列。
- 検証実行日は当 egress IP に対して品川区サイトがHTML形式の404ページを返す状態（`robots.txt` も同様）で、`/PC/kodomo/kodomo/…` 形式の旧URLがその状態では通らなかった。**ページ本文を直接確認できた時点で取得した事実**（4か月児健診の引き換え品＝絵本・絵本バッグ、1歳6か月児健診＝食器・エプロン、2歳6か月健診＝ことばの絵本・おむつライブラリー、見守りおむつ定期便＝令和8年4月開始申請受付中、妊婦のための支援給付＝妊娠時5万円／出産後5万円、養育家庭のホームアシスト事業の助成＝里帰りに10万円上限）は保持し、URLは上記 canonical に統一した。

## 価格を持たせない品目

`nb-diaper-cream`（排泄の間隔を数える／おしりふきの補助）は、アカチャンホンポ・西松屋・Amazon の検索で「おしりふき」以外の該当品が出ず、根拠にできる金額がなかった。**金額を作らず price 無し**（件数・準備完了の状態にだけカウント）。

## 再発防止（ビルドゲート）

- `items/*.md` 1ファイル内で完結する出典参照チェックを `src/lib/items-parse.ts` の `checkSourceReferences` として実装し、解析時と `validateItems` の両方で流す。
  - 参照されているのに未登録 → `items_source_not_registered`
  - 登録されているのに誰からも参照されない → `items_source_unreferenced`（生きたURLを登録だけして放置する事故を防ぐ）
- 価格の調査日が180日を超えたらビルド警告（既存の fact 鮮度警告と同じ閾値）。
