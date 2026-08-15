import { useEffect, useMemo, useState } from 'react'
import type { ChecklistBlock } from '@/lib/fact-model'

interface ChecklistViewProps {
  chapterSlug: string
  block: ChecklistBlock
}

interface StoredChecklist {
  v: 1
  done: string[]
}

function isStoredChecklist(value: unknown): value is StoredChecklist {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  const candidate = value as Record<string, unknown>
  const keys = Object.keys(candidate).sort()
  return (
    keys.length === 2 &&
    keys[0] === 'done' &&
    keys[1] === 'v' &&
    candidate.v === 1 &&
    Array.isArray(candidate.done) &&
    candidate.done.every((item) => typeof item === 'string')
  )
}

export default function ChecklistView({ chapterSlug, block }: ChecklistViewProps) {
  const storageKey = `checklist:${chapterSlug}/${block.id}`
  const itemNames = useMemo(() => block.items.map((item) => item.text), [block.items])
  const authoredDone = useMemo(
    () => block.items.filter((item) => item.done).map((item) => item.text),
    [block.items],
  )
  const [done, setDone] = useState<readonly string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    let restored = authoredDone
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw)
        if (isStoredChecklist(parsed)) {
          const currentItems = new Set(itemNames)
          restored = [...new Set(parsed.done)].filter((item) => currentItems.has(item))
        }
      }
    } catch {
      restored = authoredDone
    }
    setDone(restored)
    setHydrated(true)
  }, [authoredDone, itemNames, storageKey])

  useEffect(() => {
    if (!hydrated) return
    try {
      const currentItems = new Set(itemNames)
      const validDone = [...new Set(done)].filter((item) => currentItems.has(item))
      window.localStorage.setItem(storageKey, JSON.stringify({ v: 1, done: validDone }))
    } catch {
      // localStorage unavailable, keep the checklist usable in memory.
    }
  }, [done, hydrated, itemNames, storageKey])

  const doneSet = new Set(done)
  const completed = itemNames.filter((item) => doneSet.has(item)).length
  const progress = itemNames.length === 0 ? 0 : (completed / itemNames.length) * 100

  const toggle = (item: string) => {
    setDone((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]))
  }

  return (
    <section className="my-4 rounded-lg border border-border bg-card p-4" aria-labelledby={`${storageKey}-heading`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id={`${storageKey}-heading`} className="font-heading text-base font-bold">チェックリスト</h3>
        <span className="text-sm font-medium text-muted-foreground" aria-live="polite">
          {completed}/{itemNames.length} 完了
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={itemNames.length} aria-valuenow={completed} aria-label="チェックリストの進捗">
        <div className="h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none" style={{ width: `${progress}%` }} />
      </div>
      <ul className="mt-3 space-y-1">
        {block.items.map((item) => {
          const checked = doneSet.has(item.text)
          return (
            <li key={item.text}>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 py-1 hover:bg-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(item.text)}
                  className="size-5 shrink-0 accent-primary"
                  aria-label={item.text}
                />
                <span className={checked ? 'text-[15px] leading-7 text-muted-foreground line-through' : 'text-[15px] leading-7'}>
                  {item.text}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
