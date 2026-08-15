import type { ListBlock, ListItem } from '@/lib/fact-model'
import { InlineSpans } from './inline-spans'

interface ListItemsProps {
  items: readonly ListItem[]
  ordered: boolean
}

function ListItems({ items, ordered }: ListItemsProps) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className="my-2 space-y-1 pl-5" type={ordered ? '1' : undefined}>
      {items.map((item, index) => (
        <li key={`${index}-${item.inline.map((span) => span.text).join('')}`} className="leading-7">
          <InlineSpans spans={item.inline} />
          {item.children.length > 0 && <ListItems items={item.children} ordered={false} />}
        </li>
      ))}
    </Tag>
  )
}

export default function ListBlockView({ block }: { block: ListBlock }) {
  return <ListItems items={block.items} ordered={block.ordered} />
}
