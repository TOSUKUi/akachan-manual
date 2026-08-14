// サイト全体の設定定数。URL などの外部参照はここで一元管理する（AC-9）。

/** サイト名。 */
export const SITE_NAME = 'あかちゃんマニュアル'

/**
 * 姉妹サイト shinagawa-hojokin（品川区 妊娠・出産・産後の給付・助成）の公開 URL。
 * 制度・手続きの詳細への誘導リンクはすべてこの定数から出す（AC-9、1 箇所管理）。
 */
export const HOJOKIN_URL = 'https://TOSUKUi.github.io/shinagawa-hojokin/'

/** 免責文（AC-6）。全ページのヘッダー下部とフッターに表示される。 */
export const DISCLAIMER =
  'このサイトの内容は AI がまとめたものです。医療・法律のアドバイスではありません。医療については必ずかかりつけの医師・助産師・保健センターに相談し、各項目の最終確認日と元ソース（一次情報）を必ず確認してください。'

/** GitHub Pages のリポジトリ名（サブディレクトリ公開時の参照用）。 */
export const PAGES_BASE = '/akachan-manual/'
