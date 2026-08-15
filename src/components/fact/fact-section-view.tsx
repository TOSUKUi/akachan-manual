import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '@/components/ui/badge'
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

/** 「必須」バッジ（AC-5）。canonical ID には表示ラベルを出す。 */
export function MustBadges({ ids }: { ids: readonly string[] }) {
  if (ids.length === 0) return null
  return (
    <span className="mt-2 flex flex-wrap gap-1.5">
      {ids.map((id) => (
        <Badge key={id} variant="secondary" className="bg-primary/10 font-heading text-primary">
          必須: {CANONICAL_MUST_LABELS[id as keyof typeof CANONICAL_MUST_LABELS] ?? id}
        </Badge>
      ))}
    </span>
  )
}

interface FactSectionViewProps {
  section: FactSection
}

/** fact の 1 セクション（見出し + Markdown 本文 + 根拠 + 必須バッジ）。 */
export default function FactSectionView({ section }: FactSectionViewProps) {
  const content = section.content.join('\n')
  const body = (
    <>
      {content.length > 0 && (
        <div className="mt-2 space-y-3 text-[15px] leading-7">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
      <SourceLine sources={section.sources} />
      <MustBadges ids={section.mustIds} />
    </>
  )

  if (section.level === 3) {
    return (
      <section id={section.anchor} className="scroll-mt-28">
        <h3 className="mt-6 font-heading text-base font-bold">{section.heading}</h3>
        {body}
      </section>
    )
  }

  if (section.level === 1) {
    // intro（最初の H2 以前）：見出しなしで本文だけ
    return <section id={section.anchor} className="scroll-mt-28">
      {body}
    </section>
  }

  return (
    <section id={section.anchor} className="scroll-mt-28 border-t border-border pt-6">
      <h2 className="mt-6 font-heading text-lg font-bold first:mt-0">{section.heading}</h2>
      {body}
    </section>
  )
}
