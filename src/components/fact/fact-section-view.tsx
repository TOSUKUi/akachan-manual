import { Fragment } from 'react'
import { Badge } from '@/components/ui/badge'
import CalloutView from '@/components/fact/callout-view'
import ChecklistView from '@/components/fact/checklist-view'
import DataTable from '@/components/fact/data-table'
import ListBlockView from '@/components/fact/list-block-view'
import { InlineSpans } from '@/components/fact/inline-spans'
import { CANONICAL_MUST_LABELS } from '@/lib/fact-model'
import type { Block, FactSection, FactSource } from '@/lib/fact-model'

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
        <Badge
          key={id}
          variant="secondary"
          className="h-auto max-w-full whitespace-normal bg-primary/10 text-left font-heading leading-snug text-primary"
        >
          必須: {CANONICAL_MUST_LABELS[id as keyof typeof CANONICAL_MUST_LABELS] ?? id}
        </Badge>
      ))}
    </span>
  )
}

interface FactSectionViewProps {
  section: FactSection
  chapterSlug: string
}

function BlockView({ block, chapterSlug }: { block: Block; chapterSlug: string }) {
  switch (block.kind) {
    case 'paragraph':
      return (
        <p className="text-[15px] leading-7">
          <InlineSpans spans={block.inline} />
        </p>
      )
    case 'list':
      return <ListBlockView block={block} />
    case 'table':
      return <DataTable block={block} />
    case 'callout':
      return <CalloutView block={block} />
    case 'checklist':
      return <ChecklistView chapterSlug={chapterSlug} block={block} />
    case 'flow':
      // crying-response フローチャートは表示しない（ユーザー指摘: 不要）。
      // 対処は本文の箇条書きが正本。fact は変更しない。
      return null
    case 'diagram':
      // vaccine-schedule ダイアグラムは下のテーブル（fact の正本）と情報が
      // 重複するため表示しない（画面側の整理。fact は変更しない）。
      return null
  }
}

/** fact の 1 セクション（見出し + 構造化ブロック + 根拠 + 必須バッジ）。 */
export default function FactSectionView({ section, chapterSlug }: FactSectionViewProps) {
  const body = (
    <>
      {section.blocks.length > 0 && (
        <div className="mt-2 space-y-3">
          {section.blocks.map((block, index) => (
            <Fragment key={`${block.kind}-${index}`}>
              <BlockView block={block} chapterSlug={chapterSlug} />
            </Fragment>
          ))}
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
    return <section id={section.anchor}>{body}</section>
  }

  return (
    <section id={section.anchor} className="border-t border-border pt-6">
      <h2 className="mt-8 font-heading text-lg font-bold first:mt-0 lg:mt-6">{section.heading}</h2>
      {body}
    </section>
  )
}
