import { ITEMS_DATA } from '../src/generated/items-data';
const NEED: Record<string,string> = { must: '必須', useful: 'あると便利' };
for (const b of ITEMS_DATA.bands) {
  console.log(`\n== ${b.label} (${b.monthsFrom}〜${b.monthsTo}) items=${b.items.length} support=${b.support.length}`);
  for (const i of b.items) {
    console.log(`  [${i.category}/${NEED[i.need]}] ${i.name} | ${i.startMonth}${i.endMonth ?? ''} | ${i.size ?? '-'} | ${i.price ? `${i.price.low}〜${i.price.high}${i.price.unit ?? ''}` : '価格なし'}`);
  }
}
