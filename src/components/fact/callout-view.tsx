import { CircleAlert, Info, TriangleAlert } from 'lucide-react'
import type { CalloutBlock } from '@/lib/fact-model'
import { InlineSpans } from './inline-spans'

const CALLOUT_META = {
  note: {
    label: 'メモ',
    icon: Info,
    className: 'border-primary/40 bg-primary/5 text-foreground',
    iconClassName: 'text-primary',
  },
  warning: {
    label: '注意',
    icon: TriangleAlert,
    className: 'border-gold/50 bg-gold-soft/60 text-foreground',
    iconClassName: 'text-gold',
  },
  danger: {
    label: '危険',
    icon: CircleAlert,
    className: 'border-destructive/50 bg-destructive/5 text-foreground',
    iconClassName: 'text-destructive',
  },
} as const

export default function CalloutView({ block }: { block: CalloutBlock }) {
  const meta = CALLOUT_META[block.tone]
  const Icon = meta.icon
  return (
    <aside role={block.tone === 'note' ? undefined : 'alert'} className={`my-4 rounded-lg border p-4 ${meta.className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 size-5 shrink-0 ${meta.iconClassName}`} aria-hidden="true" />
        <div className="min-w-0 text-[15px] leading-7">
          <p className="mb-1 font-heading text-sm font-bold">{meta.label}</p>
          <p><InlineSpans spans={block.inline} /></p>
        </div>
      </div>
    </aside>
  )
}
