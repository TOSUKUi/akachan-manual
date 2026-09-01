import { readFileSync, writeFileSync } from 'node:fs';

const today = '2026-09-02';

/** Insert new source rows before `support:` and new support entries right after it. */
const patch = (file: string, sources: string, entries: string, mustNotContain: string) => {
  let s = readFileSync(file, 'utf8');
  if (s.includes(mustNotContain)) {
    console.log('already patched:', file);
    return;
  }
  const i = s.indexOf('\nsupport:\n');
  if (i < 0) throw new Error(`no support: block in ${file}`);
  const head = s.slice(0, i);
  const tail = s.slice(i + '\nsupport:\n'.length);
  if (!tail.startsWith('  - id: ')) throw new Error(`unexpected support block in ${file}`);
  s = `${head}\n${sources}\nsupport:\n${entries}${tail}`;
  writeFileSync(file, s);
  console.log('patched', file);
};

// ---------------------------------------------------------------- 10-12か月
patch(
  'items/05-m10-12.md',
  `  - name: 品川区 一時預かり事業
    url: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoikukentei/kyufu/hpg000000639.html
    checked: "${today}"`,
  `  - id: ichiji-prep
    title: 一時預かりの会員登録を済ませておく
    detail: 品川区の一時預かりは「小規模保育事業等の一時保育室（2歳児未満対象）」と「保育所等の一時保育（満1歳以上就学前）」の2種類。利用は保護者の就労・疾病・冠婚葬祭・介護などが条件で、養育の疲労や病気の軽減を図る「予防的預かり」も同じ窓口です。事前の会員登録が必要で、区外に所在する施設の利用は料金が1.5倍になります。復職前に1〜2回ならしておくと、子どもも環境に慣れられます。
    source: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoikukentei/kyufu/hpg000000639.html
`,
  'ichiji-prep',
);

// ---------------------------------------------------------------- 13-18か月
patch(
  'items/06-m13-18.md',
  `  - name: 品川区 ファミリー・サポート・センター
    url: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000020024.html
    checked: "${today}"`,
  `  - id: famsup-register
    title: ファミリー・サポート・センター会員登録
    detail: 地域活動支援員と利用会員が親子を送迎や預かりでつなぎ合う有償の互助制度。入会手続きは北部・南部・荏原の各子育て支援センターで、当日は登録申込書・健康保険証・住所が確認できる書類（免許証やマイナンバーカード等）と入会金が必要です。事前に登録しておくと、病後児や急な用事のときにすぐ頼めます。
    source: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000020024.html
`,
  'famsup-register',
);

// ---------------------------------------------------------------- 19-24か月
patch(
  'items/07-m19-24.md',
  `  - name: 品川区 父母からの独立（食事・睡眠・排泄・着用）
    url: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-seikatu/20240912142113.html
    checked: "${today}"`,
  `  - id: dokuritu-yoyaku
    title: 2歳児の「独立予約」を誕生月の前月から
    detail: 食育・睡眠・排せつ・着用の4テーマについて、子どもが親から独立していく時期の目安を親子で学ぶ仕組みです。予約は2歳のお誕生月の前月から3か月間で、2〜3歳児児童相談のときに受付。2歳代のうちに順番を押さえておけます。
    source: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-seikatu/20240912142113.html
`,
  'dokuritu-yoyaku',
);
