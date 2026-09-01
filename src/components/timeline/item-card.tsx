// 月齢タイムラインの1品目ぶん。チェック状態は親（ページ）から受領する。
// 販売先はビルド時に生成した検索URLのみ（特定商品の直リンクは持たない）。
import {
  CATEGORY_LABELS,
  NEED_LABELS,
  SHOP_SEARCH_LABELS,
  monthRangeLabel,
  sourceLabel,
  yen,
  type Item,
} from '@/lib/items-model'
import type { FactSource } from '@/lib/fact-model'
import type { ResolvedShopLink } from '@/lib/shop-links'

interface ItemCardProps {
  item: Item
  done: boolean
  onToggle: (id: string, done: boolean) => void
  /** この band の sources[]（URL → 表示名の解決に使う） */
  sources: readonly FactSource[]
  shops: ResolvedShopLink[]
}

function SourceLinks({ urls, sources }: { urls: readonly string[]; sources: readonly FactSource[] }) {
  if (urls.length === 0) return null
  return (
    <>
      {urls.map((url) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-primary underline underline-offset-2 hover:opacity-80"
        >
          {sourceLabel(sources, url)}
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      ))}
    </>
  )
}

export function ItemCard({ item, done, onToggle, sources, shops }: ItemCardProps) {
  return (
    <li
      className={`list-none rounded-xl border bg-card p-4 ${
        done ? 'border-border opacity-80' : 'border-primary/40'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* モバイルでのタップ目標を 44×44px 確保（視覚サイズは 24px のまま）。タップ領域を広げるための label で、
            品目名の表示ラベル（下記の label htmlFor）がアクセシブル名を提供する。 */}
        <label className="-my-2 flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center touch-manipulation lg:my-0 lg:min-h-0 lg:min-w-0 lg:justify-start lg:touch-auto">
          <input
            id={`item-${item.id}`}
            type="checkbox"
            checked={done}
            onChange={(e) => onToggle(item.id, e.target.checked)}
            className="mt-1 size-6 shrink-0 accent-[var(--primary)]"
          />
        </label>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {/* 品目名そのものもタップ対象（モバイルでは 44px 分の高さを持たせる） */}
            <label
              htmlFor={`item-${item.id}`}
              className="flex min-h-11 cursor-pointer items-center font-heading text-[16px] font-bold leading-snug text-foreground lg:min-h-0 lg:cursor-default"
            >
              {item.name}
            </label>
            <span
              className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                item.need === 'must' ? 'bg-gold/15 text-gold' : 'bg-muted text-muted-foreground'
              }`}
            >
              {NEED_LABELS[item.need]}
            </span>
            <span className="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-[hsl(var(--secondary-foreground))]">
              {CATEGORY_LABELS[item.category]}
            </span>
            {done && <span className="text-xs text-muted-foreground">準備OK</span>}
          </div>

          <dl className="mt-2 space-y-1 text-[13px] leading-relaxed">
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted-foreground">使い始め</dt>
              <dd className="text-foreground">{monthRangeLabel(item.startMonth, item.endMonth)}</dd>
            </div>
            {item.size && (
              <div className="flex gap-2">
                <dt className="shrink-0 text-muted-foreground">目安</dt>
                <dd className="text-foreground">{item.size}</dd>
              </div>
            )}
          </dl>

          {item.note && <p className="mt-2 text-sm leading-relaxed text-foreground">{item.note}</p>}

          {item.price && (
            <div className="mt-3 rounded-lg bg-secondary/70 p-3">
              <p className="text-sm">
                <span className="font-mono text-[17px] font-bold text-foreground">
                  {`${yen(item.price.low)}〜${yen(item.price.high)}`}
                </span>
                <span className="ml-1.5 text-xs text-muted-foreground">
                  {item.price.unit}・{item.price.checked} 調査の目安
                </span>
              </p>
              {item.price.high >= item.price.low * 2 && (
                <p className="mt-1 text-[11px] text-muted-foreground">
                  <span className="rounded-full border border-border bg-background px-2 py-0.5">
                    幅が大きい
                  </span>
                  クラスや容量で差が出ます。最初の1点を目立たない価格帯から選べば、たいてい足ります。
                </p>
              )}
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                価格の出典: <SourceLinks urls={item.price.sources} sources={sources} />
              </p>
            </div>
          )}

          {item.whySources.length > 0 && (
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              月齢・サイズの根拠: <SourceLinks urls={item.whySources} sources={sources} />
            </p>
          )}

          {shops.length > 0 && (
            <div className="mt-3 border-t border-border pt-2">
              <p className="text-[11px] text-muted-foreground">
                取り扱いの検索（価格・在庫は購入前に各店で確認）
              </p>
              <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {shops.map((shop) => (
                  <li key={`${shop.kind}:${shop.q}`}>
                    <a
                      href={shop.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-9 items-center text-[13px] text-primary underline underline-offset-2 hover:opacity-80 sm:min-h-0"
                    >
                      <span className="sr-only">{item.name}を</span>
                      {SHOP_SEARCH_LABELS[shop.kind]}
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default ItemCard
