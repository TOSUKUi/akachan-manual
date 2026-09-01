// 販売先リンクの組み立て。特定商品への直リンクは持たず、検索ページのみを生成する。
// 書式は docs/research/item-timeline/03-links-and-disclosure.md で 2026-09-02 に実測確認済み。
// 生データ（items/*.md）には { kind, q } だけを持たせ、URL はここでの組み立て結果のみを画面に出す。
import { SHOP_KINDS, type ShopKind, type ShopLink } from './items-model.ts'

export interface ResolvedShopLink extends ShopLink {
  url: string
}

function query(value: string): string {
  return encodeURIComponent(value.trim())
}

const TEMPLATES: Record<ShopKind, (q: string) => string> = {
  amazon: (q) => `https://www.amazon.co.jp/s?k=${query(q)}`,
  rakuten: (q) => `https://search.rakuten.co.jp/search/mall/${query(q)}/`,
  nishimatyaya: (q) => `https://www.24028-net.jp/item_list.html?searchbox=1&q=${query(q)}`,
  akachan: (q) => `https://shop.akachan.jp/shop/goods/search.aspx?keyword=${query(q)}`,
  uniqlo: (q) => `https://www.uniqlo.com/jp/ja/search/?q=${query(q)}`,
}

export function shopUrl(shop: ShopLink): string {
  const template = TEMPLATES[shop.kind]
  if (!template) {
    throw new Error(`未知の販売先 kind です: ${String(shop.kind)}`)
  }
  const q = shop.q.trim()
  if (!q) throw new Error(`検索語が空です（kind: ${shop.kind}）`)
  return template(q)
}

export function resolveShopLinks(shops: readonly ShopLink[]): ResolvedShopLink[] {
  return shops.map((shop) => ({ kind: shop.kind, q: shop.q, url: shopUrl(shop) }))
}

export function isShopKind(value: unknown): value is ShopKind {
  return typeof value === 'string' && (SHOP_KINDS as readonly string[]).includes(value)
}
