import { Badge } from '@/components/ui/badge'
import VaccineScheduleDiagram from '@/components/fact/vaccine-schedule-diagram'
import { CANONICAL_MUST_LABELS } from '@/lib/fact-model'
import type { FactSection, FactSource } from '@/lib/fact-model'

/** 「根拠:」行の描画（AC-4）。ソースは必ず表示する。 */
export function SourceLine({ sources }: { sources: readonly FactSource[] }) {
  if (sources.length === 0) return null
  return (
    <p className="mt-3 border-l-2 border-primary/40 pl-3 text-xs leading-relaxed text-muted-foreground">
      根拠:{' '}
      {sources.map((s, i) => (
        <span key={`${s.url}-${i}`}>
          {i > 0 && '、'}
          <a href={s.url} target="_blank" rel="noreferrer" className="underline hover:text-primary">
            {s.name}
          </a>
        </span>
      ))}
    </p>
  )
}

/** 「必須」バッジ（AC-5）。canonical ID には表示ラベルを出す。
 * 長いラベルが 375px で横はみ出しするため（review full の blocker）、
 * この場所に限り折り返しを許可する（badge.tsx の nowrap は他のチップ用途で維持）。 */
export function MustBadges({ ids }: { ids: readonly string[] }) {
  if (ids.length === 0) return null
  return (
    <span className="mt-2 flex flex-wrap gap-1.5">
      {ids.map((id) => (
        <Badge
          key={id}
          variant="secondary"
          className="h-auto max-w-full whitespace-normal text-left leading-snug bg-primary/10 font-heading text-primary"
        >
          必須: {CANONICAL_MUST_LABELS[id as keyof typeof CANONICAL_MUST_LABELS] ?? id}
        </Badge>
      ))}
    </span>
  )
}

interface FactSectionViewProps {
  section: FactSection
}

/** fact の 1 セクション（見出し + 変換済み HTML 本文 + 根拠 + 必須バッジ）。 */
export default function FactSectionView({ section }: FactSectionViewProps) {
  const body = (
    <>
      {section.bodyHtml.length > 0 && (
        <div className="markdown-body mt-2 space-y-3 text-[15px] leading-7">
          {section.diagram === 'vaccine-schedule' && <VaccineScheduleDiagram />}
          {/* 本文はビルド時に HTML 化済み（fact-parse.ts の sectionBodyHtml）。
              実行時マークダウン描画は持たない → SSR とクライアントで同一文字列になる。 */}
          <div dangerouslySetInnerHTML={{ __html: section.bodyHtml }} />
        </div>
      )}
      <SourceLine sources={section.sources} />
      <MustBadges ids={section.mustIds} />
    </>
  )

  if (section.level === 3) {
    return (
      <section id={section.anchor}>
        <h3 className="mt-6 font-heading text-base font-bold">{section.heading}</h3>
        {body}
      </section>
    )
  }

  if (section.level === 1) {
    // intro（最初の H2 以前）：見出しなしで本文だけ
    return <section id={section.anchor}>
      {body}
    </section>
  }

  return (
    <section id={section.anchor} className="border-t border-border pt-6">
      {/* オフセットは html の scroll-padding-top が単一出所（spec-mobile.md §2.8） */}
      <h2 className="mt-8 font-heading text-lg font-bold first:mt-0 lg:mt-6">{section.heading}</h2>
      {body}
    </section>
  )
}
