// fact.md のデータモデルと正規定数。純粋な型のみ（I/O なし）。

/**
 * 必須カバレッジの正規 ID（spec 0001 付録、AC-5）。
 * 12 個のうちいずれかがどの章にも記載されていない場合、ビルドが失敗する。
 */
export const CANONICAL_MUST_IDS = [
  'sids',
  'vaccines',
  'carseat',
  'no-shaking',
  'choking',
  'accident',
  'head-shape',
  'eyes',
  'hip',
  'honey',
  'sleep-risk',
  'postpartum',
] as const

export type CanonicalMustId = (typeof CANONICAL_MUST_IDS)[number]

/** 正規 ID に対応する表示ラベル（トップのチェックリストで使う）。 */
export const CANONICAL_MUST_LABELS: Record<CanonicalMustId, string> = {
  sids: 'SIDS 予防（仰向け寝・固めのマットレス・枕なし・喫煙回避）',
  vaccines: '定期予防接種の漏れ防止（スケジュール管理・品川区の助成）',
  carseat: 'チャイルドシート常時着用（乳児は後ろ向き）',
  'no-shaking': '揺さぶり禁止（泣き止まない時の対処法）',
  choking: '誤飲・窒息予防（小さな物・コード・ビニール袋）',
  accident: '転落・やけど・溺水・熱中症予防',
  'head-shape': '頭の形（向き癖への対処・タミータイムは起きている時のみ）',
  eyes: '目の問題（斜視・弱視は早期発見が決め手）',
  hip: '股関節脱臼のチェック（おむつ替え時の開排）',
  honey: 'はちみつは 1 歳まで禁止（乳児ボツリヌス症）',
  'sleep-risk': 'うつ伏せ寝・添い寝のリスク',
  postpartum: '産後うつのサインと相談窓口',
}

/** fact の frontmatter（AC-3）。 */
export interface FactFrontmatter {
  /** 章の表示名 */
  title: string
  /** URL の一部。重複禁止 */
  slug: string
  /** 章の並び順 */
  order: number
  /** 最終裏取り確認日（YYYY-MM-DD） */
  lastVerified: string
  /** この章で参照した公式ソース一覧。url は必須（AC-4） */
  sources: FactSource[]
  /** 必須バッジを付ける項目の正規 ID 配列（AC-5） */
  must: string[]
}

/** 参照ソースの 1 件。 */
export interface FactSource {
  name: string
  url: string
  /** 裏取り確認日（YYYY-MM-DD）。省略可。 */
  checked?: string
}

/**
 * 本文の 1 セクション（H2/H3 単位、AC-4 の検証単位）。
 * 「根拠: [name](url)」行と「必須: [id]」マーカーを解析して分けている。
 */
export interface FactSection {
  /** 見出しレベル。intro（最初の H2 以前）は 1 */
  level: 1 | 2 | 3
  /** 見出しテキスト。intro は空文字 */
  heading: string
  /** 検索ジャンプ用のアンカー（見出しのスラッグ化） */
  anchor: string
  /** 通常の Markdown 本文（見出し・根拠・必須マーカー行を除く） */
  content: string[]
  /** 本文をビルド時に HTML 化したもの（画面はこれを dangerouslySetInnerHTML で表示） */
  bodyHtml: string
  /** 「根拠:」行から解析したソース */
  sources: FactSource[]
  /** 「必須: [id]」マーカーから解析した ID */
  mustIds: string[]
  /** 「:::diagram <name>:::」マーカーから解析した図の名前（描画は React コンポーネント） */
  diagram?: string
}

/** 1 つの fact ファイルを解析した結果。 */
export interface Fact {
  frontmatter: FactFrontmatter
  sections: FactSection[]
  /** 本文の生 Markdown（フロントマターを除く） */
  body: string
  /** ファイル名（fact/ ディレクトリ基準） */
  fileName: string
}

/** 検索インデックス用の 1 章エントリ（AC-7）。 */
export interface SearchIndexChapter {
  slug: string
  title: string
  order: number
  fullText: string
  sections: { anchor: string; heading: string; text: string }[]
}

/** 検索インデックス全体（dist/search-index.json として出力）。 */
export type SearchIndex = SearchIndexChapter[]

/** トップのチェックリスト用の必須項目 1 件（AC-1）。 */
export interface MustItem {
  id: string
  /** 正規 ID ならそのラベル、それ以外はセクション見出し */
  label: string
  chapterSlug: string
  chapterTitle: string
  /** マーカーが載ったセクションのアンカー */
  anchor: string
  /** 正規 ID かどうか（バッジの強調に使う） */
  canonical: boolean
}

/** サイト全体で表示する値（トップの免責・最終確認日など、AC-6）。 */
export interface SiteMeta {
  siteName: string
  /** 全章の lastVerified の最大値（AC-6） */
  siteLastVerified: string
  /** 姉妹サイト shinagawa-hojokin の URL（AC-9、config で一元管理） */
  hojokinUrl: string
  /** 免責文（AC-6） */
  disclaimer: string
}

/** ビルド時に生成し、React アプリが読むサイトデータ。 */
export interface SiteData {
  meta: SiteMeta
  chapters: ChapterData[]
  /** トップの最重要チェックリスト（must に一致する項目、AC-1） */
  mustItems: MustItem[]
  /** 検索インデックス（AC-7） */
  searchIndex: SearchIndex
}

/** 章ページ表示用のデータ。 */
export interface ChapterData {
  slug: string
  title: string
  order: number
  lastVerified: string
  sources: FactSource[]
  must: string[]
  /** SEO の description（タイトル + 冒頭文から生成、AC-10） */
  description: string
  sections: FactSection[]
  body: string
}
