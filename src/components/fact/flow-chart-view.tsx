import { useMemo, useState } from 'react'
import type { FlowBlock, FlowNode } from '@/lib/fact-model'

interface FlowChartViewProps {
  block: FlowBlock
}

export default function FlowChartView({ block }: FlowChartViewProps) {
  const root = block.nodes[0]
  const nodeById = useMemo(() => new Map(block.nodes.map((node) => [node.id, node])), [block.nodes])
  const [currentId, setCurrentId] = useState(root?.id ?? '')
  const [path, setPath] = useState<readonly string[]>([])
  const [errorText, setErrorText] = useState<string | undefined>(undefined)

  const current: FlowNode | undefined = nodeById.get(currentId)
  const isTerminal = errorText !== undefined || (current !== undefined && current.choices.length === 0 && current.id !== root?.id)

  const restart = () => {
    setCurrentId(root?.id ?? '')
    setPath([])
    setErrorText(undefined)
  }

  const choose = (label: string, nextId: string) => {
    setPath((previous) => [...previous, label])
    const next = nodeById.get(nextId)
    if (!next) {
      setErrorText('次の案内を表示できません。最初からやり直してください。')
      return
    }
    setErrorText(undefined)
    setCurrentId(next.id)
  }

  if (!root || !current) {
    return (
      <section className="my-4 rounded-lg border border-destructive/40 bg-destructive/5 p-4" role="alert">
        <p className="font-heading text-sm font-bold text-destructive">判断フローを読み込めませんでした。</p>
        <button type="button" onClick={restart} className="mt-3 min-h-11 rounded-md border border-border px-3 text-sm underline">
          最初からやり直す
        </button>
      </section>
    )
  }

  return (
    <section className="my-4 rounded-lg border border-primary/30 bg-card p-4" aria-labelledby={`${block.id}-flow-heading`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">判断フロー</p>
          <h3 id={`${block.id}-flow-heading`} className="mt-1 font-heading text-base font-bold">現在地</h3>
        </div>
        <button type="button" onClick={restart} className="min-h-11 rounded-md px-3 text-sm font-medium text-primary underline underline-offset-2 hover:bg-accent">
          最初からやり直す
        </button>
      </div>
      {path.length > 0 && (
        <p className="mt-3 rounded-md bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground" aria-label="選択した分岐">
          {path.join(' → ')}
        </p>
      )}
      <div className="mt-4 rounded-md border border-border bg-background p-4">
        <p className="text-[15px] leading-7">{errorText ?? current.text}</p>
        {!isTerminal && current.choices.length > 0 && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {current.choices.map((choice) => (
              <button
                key={`${choice.label}-${choice.nextId}`}
                type="button"
                onClick={() => choose(choice.label, choice.nextId)}
                className="min-h-11 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-ring"
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}
        {isTerminal && !errorText && <p className="mt-3 text-sm font-medium text-primary">この案内を確認してください。</p>}
      </div>
    </section>
  )
}
