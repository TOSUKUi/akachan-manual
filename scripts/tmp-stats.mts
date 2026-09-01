import { ITEMS_DATA } from '../src/generated/items-data';
const urls = new Set<string>();
for (const b of ITEMS_DATA.bands) {
  console.log(b.id, b.sources.length, b.items.length, b.support.length,
    JSON.stringify(b.items.map(i => `${i.id}:${i.startMonth}${i.endMonth !== undefined ? '-' + i.endMonth : ''}${i.price ? '¥' + i.price.low + '-' + i.price.high : 'noprice'}`)));
  for (const s of b.sources) urls.add(s.url);
}
console.log('bands', ITEMS_DATA.bands.length, 'items', ITEMS_DATA.items.length, 'sources', urls.size, 'priced', ITEMS_DATA.items.filter(i => i.price).length);
