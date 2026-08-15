// fact のビルド検証ゲート（AC-4, AC-5, AC-11）。純粋関数（now を引数で注入）。
import {
  CANONICAL_MUST_IDS,
  CANONICAL_MUST_LABELS,
  type Fact,
  type MustItem,
  type SearchIndex,
  type SiteData,
} from './fact-model.ts'
import {
  chapterDescription,
  chapterFullText,
  sectionText,
  type FactIssue,
} from './fact-parse.ts'

/** last_verified の鮮度閾値（日）。超過は警告（AC-11）。 */
export const STALE_DAYS = 180

export interface ValidationReport {
  errors: FactIssue[]
  warnings: FactIssue[]
  ok: boolean
}

function daysBetween(fromIso: string, to: Date): number {
  const [y, m, d] = fromIso.split('-').map(Number)
  const from = Date.UTC(y, m - 1, d)
  return Math.floor((to.getTime() - from) / 86_400_000)
}

/**
 * 全 fact を検証する。エラーがあればビルドは失敗する。
 * - slug 重複（Key invariants）
 * - 根拠リンクの無いセクション（AC-4）
 * - 根拠 URL が frontmatter の sources[] に含まれない（AC-4）
 * - 必須マーカーと frontmatter の must が一致しない（AC-5）
 * - 12 正規 ID のカバレッジ欠落（AC-5）
 * - last_verified が 180 日超過（AC-11、警告のみ）
 */
export function validateFacts(
  facts: readonly Fact[],
  now: Date = new Date(),
): ValidationReport {
  const errors: FactIssue[] = []
  const warnings: FactIssue[] = []

  // slug 重複
  const seenSlugs = new Map<string, string>()
  for (const f of facts) {
    const slug = f.frontmatter.slug
    const prev = seenSlugs.get(slug)
    if (prev) {
      errors.push({
        file: f.fileName,
        message: `slug「${slug}」が ${prev} と重複しています（slug は重複禁止）`,
      })
    } else {
      seenSlugs.set(slug, f.fileName)
    }
  }

  for (const f of facts) {
    const { fileName, frontmatter, sections } = f
    const sourceUrls = new Set(frontmatter.sources.map((s) => s.url))
    const usedUrls = new Set<string>()
    const markerIds = new Set<string>()

    for (const sec of sections) {
      const label = sec.heading || 'intro（冒頭）'

      // 空セクションはスキップ（見出しの直後に次の見出しがある場合など）
      const hasContent =
        sec.content.some((l) => l.trim().length > 0) ||
        sec.sources.length > 0 ||
        sec.mustIds.length > 0
      if (!hasContent) continue

      // AC-4: 根拠リンクの無い事実はビルド失敗
      if (sec.sources.length === 0) {
        errors.push({
          file: fileName,
          section: label,
          message:
            '「根拠: [ソース名](URL)」行が 1 件もありません。各セクション（H2/H3 単位）に根拠を必ず添えてください。',
        })
      }

      // AC-4: 根拠 URL は sources[] に含まれること
      for (const s of sec.sources) {
        usedUrls.add(s.url)
        if (!sourceUrls.has(s.url)) {
          errors.push({
            file: fileName,
            section: label,
            message: `根拠 URL「${s.url}」が frontmatter の sources[] に含まれていません。sources[] に追加してください。`,
          })
        }
      }

      for (const id of sec.mustIds) markerIds.add(id)
      // 図マーカーは既知の名前だけ許可（typo をビルド時に検出）
      if (sec.diagram && !['vaccine-schedule'].includes(sec.diagram)) {
        errors.push({
          file: fileName,
          section: label,
          message: `図「${sec.diagram}」は未定義です（既知: vaccine-schedule）`,
        })
      }
    }

    // AC-5: 本文のマーカーと frontmatter の must が一致すること
    for (const id of frontmatter.must) {
      if (!markerIds.has(id)) {
        errors.push({
          file: fileName,
          message: `frontmatter の must に「${id}」がありますが、本文に「必須: [${id}]」マーカーがありません。`,
        })
      }
    }
    for (const id of markerIds) {
      if (!frontmatter.must.includes(id)) {
        errors.push({
          file: fileName,
          message: `本文の「必須: [${id}]」マーカーが frontmatter の must 配列に含まれていません。`,
        })
      }
    }

    // AC-11: 鮮度警告
    if (frontmatter.lastVerified) {
      const age = daysBetween(frontmatter.lastVerified, now)
      if (age > STALE_DAYS) {
        warnings.push({
          file: fileName,
          message: `last_verified（${frontmatter.lastVerified}）が ${age} 日前で ${STALE_DAYS} 日を超えています。医療情報の裏取りを再確認してください。`,
        })
      }
    }

    // 衛生警告: 引用されていない sources
    for (const s of frontmatter.sources) {
      if (!usedUrls.has(s.url)) {
        warnings.push({
          file: fileName,
          message: `sources[] の「${s.name}」（${s.url}）が本文の根拠から引用されていません。`,
        })
      }
    }
  }

  // AC-5: 12 正規 ID のカバレッジ
  const covered = new Set<string>()
  for (const f of facts) for (const id of f.frontmatter.must) covered.add(id)
  for (const id of CANONICAL_MUST_IDS) {
    if (!covered.has(id)) {
      errors.push({
        file: '-',
        message: `必須カバレッジ「${id}（${CANONICAL_MUST_LABELS[id]}）」がどの章にも記載されていません。12 項目すべてを 1 つの章以上でカバーしてください。`,
      })
    }
  }

  return { errors, warnings, ok: errors.length === 0 }
}

/** トップの最重要チェックリスト項目を抽出する（AC-1、Value sourcing）。 */
export function buildMustItems(facts: readonly Fact[]): MustItem[] {
  const byOrder = [...facts].sort((a, b) => a.frontmatter.order - b.frontmatter.order)
  const items: MustItem[] = []
  for (const f of byOrder) {
    for (const sec of f.sections) {
      for (const id of sec.mustIds) {
        const canonical = (CANONICAL_MUST_IDS as readonly string[]).includes(id)
        items.push({
          id,
          label: canonical
            ? CANONICAL_MUST_LABELS[id as keyof typeof CANONICAL_MUST_LABELS]
            : sec.heading || '必須項目',
          chapterSlug: f.frontmatter.slug,
          chapterTitle: f.frontmatter.title,
          anchor: sec.anchor,
          canonical,
        })
      }
    }
  }
  return items
}

/** 検索インデックスを生成する（AC-7、Value sourcing）。 */
export function buildSearchIndex(facts: readonly Fact[]): SearchIndex {
  const byOrder = [...facts].sort((a, b) => a.frontmatter.order - b.frontmatter.order)
  return byOrder.map((f) => ({
    slug: f.frontmatter.slug,
    title: f.frontmatter.title,
    order: f.frontmatter.order,
    fullText: chapterFullText(f.sections).toLowerCase(),
    sections: f.sections
      .filter((s) => sectionText(s).length > 0)
      .map((s) => ({
        anchor: s.anchor,
        heading: s.heading,
        text: sectionText(s).toLowerCase(),
      })),
  }))
}

/** サイト全体データ（トップ・章ページが読む）を組む。 */
export function buildSiteData(
  facts: readonly Fact[],
  meta: SiteData['meta'],
): SiteData {
  const byOrder = [...facts].sort((a, b) => a.frontmatter.order - b.frontmatter.order)
  return {
    meta,
    chapters: byOrder.map((f) => ({
      slug: f.frontmatter.slug,
      title: f.frontmatter.title,
      order: f.frontmatter.order,
      lastVerified: f.frontmatter.lastVerified,
      sources: f.frontmatter.sources,
      must: f.frontmatter.must,
      description: chapterDescription(f.sections),
      sections: f.sections,
      body: f.body,
    })),
    mustItems: buildMustItems(facts),
    searchIndex: buildSearchIndex(facts),
  }
}
