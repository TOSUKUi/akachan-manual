import { readFileSync, writeFileSync } from 'node:fs';

const today = '2026-09-02';

const patch = (file: string, pairs: Array<[string, string]>) => {
  let s = readFileSync(file, 'utf8');
  for (const [oldText, newText] of pairs) {
    if (!s.includes(oldText)) throw new Error(`anchor missing in ${file}: ${oldText.slice(0, 60)}`);
    s = s.replace(oldText, newText);
  }
  writeFileSync(file, s);
  console.log('patched', file);
};

// ---------------------------------------------------------------- 00 pregnancy
patch('items/00-pregnancy.md', [
  [
    `    url: https://shop.akachan.jp/shop/c/cb028/
    checked: "2026-09-01"
support:`,
    `    url: https://shop.akachan.jp/shop/c/cb028/
    checked: "2026-09-01"
  - name: 品川区 出産育児一時金
    url: https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-kenkouhoken/procedure-kenkouhoken-hokenkyuuhu/hpg000001524.html
    checked: "${today}"
support:`,
  ],
  [
    `support:
  - id: shinpu-kyufu-5man`,
    `support:
  - id: shussan-ichikikin
    title: 出産育児一時金（出生1人あたり50万円）
    detail: 品川区の国民健康保険に加入して出産した場合は、出生児1人あたり50万円。「直接支払制度」「受取代理制度」（出産予定日の2か月前から受付）を使うと、退院時に窓口で支払う差額だけを済ませられます。妊娠4か月（85日）以上の死産・流産・人工妊娠中絶も対象。申請は出産日の翌日から2年以内で、担当は国保医療年金課給付係（03-5742-6677）。会社の健康保険組合に加入している人は組合の基準（原則同額）を先に確認してください。
    source: https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-kenkouhoken/procedure-kenkouhoken-hokenkyuuhu/hpg000001524.html
  - id: shinpu-kyufu-5man`,
  ],
]);

// ---------------------------------------------------------------- 01 newborn
patch('items/01-newborn.md', [
  [
    `support:
  - id: sukurabu-shiho`,
    `support:
  - id: nb-mimamori
    title: 見守りおむつ定期便（0歳児・満1歳まで月1回）
    detail: 品川区在住の0歳児と養育者が対象で、満1歳になる月まで月1回程度（最大12回）、見守り支援員が家庭を訪問し、対面で見守りをしたうえでオムツ等の育児用品を無償で受け取れます。妊娠届を提出すると案内書類一式が郵送され、記載の二次元コードから登録し、出生届の提出後に訪問日と育児用品を選びます。育児用品だけの申請や配達、玄関先より奥への入室はできません。毎月オムツ代が浮く計算になるので、他の出費に回せます。
    source: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-service/20231002181840.html
  - id: nb-iryofu-shosei
    title: 子ども医療証（窓口の自己負担が不要に）
    detail: 「子どもすこやか医療費助成」は0歳〜18歳（高校3年生相当年齢）が対象。都内の医療機関の窓口で健康保険証（マイナ保険証）といっしょに医療証を提示すると、医療費の自己負担分（未就学児は2割）の支払いが不要になります。健康診断・予防接種・薬の容器代・入院の差額ベッド代は対象外で、入院時の食事の標準負担額は支給申請で戻ります。出生日（転入日）から6か月以内に申請すれば出生日にさかのぼって資格が発生するので、出生届と同じタイミングで手続きすると損しません。医療証の有効期間は毎年9月30日までで、9月下旬頃に新しい医療証が郵送されます。
    source: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html
  - id: nb-jidouteate
    title: 児童手当（0〜3歳未満は月15,000円）
    detail: 0歳〜3歳未満は児童1人あたり月額15,000円、第3子以降は月額30,000円。初めての子は受給資格が生じた日の翌日から15日以内に申請します（出生日や転入日が月末に近い場合、翌月になっても15日以内ならその翌月分から支給される「15日特例」あり）。品川区では子育て応援課 手当医療助成担当（区役所本庁舎7階、03-5742-6721）へ窓口・郵送・電子申請のいずれかで申請できます。0歳期は月15,000円が入るため、ベビーベッドやチャイルドシートなどの大きな出費と相殺できます。
    source: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000027168.html
  - id: sukurabu-shiho`,
  ],
  [
    `    url: https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E6%97%A5%E7%84%BC%E3%81%91%E6%AD%A2%E3%82%81%200%E3%81%8B%E6%9C%88
    checked: "2026-09-01"
support:`,
    `    url: https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E6%97%A5%E7%84%BC%E3%81%91%E6%AD%A2%E3%82%81%200%E3%81%8B%E6%9C%88
    checked: "2026-09-01"
  - name: 品川区 0歳児見守り・子育てサポート事業（見守りおむつ定期便）
    url: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-service/20231002181840.html
    checked: "${today}"
  - name: 品川区 子どもすこやか医療費助成
    url: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html
    checked: "${today}"
  - name: 品川区 児童手当
    url: https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000027168.html
    checked: "${today}"
support:`,
  ],
]);

// ---------------------------------------------------------------- 02 m2-3
patch('items/02-m2-3.md', [
  [
    `    url: https://www.city.shinagawa.tokyo.jp/PC/kodomo/oashisuroom/hpg000033303.html
    checked: "2026-09-02"
  - name: ピジョン はじめての育児 首がすわってくる頃（3〜4か月）`,
    `    url: https://www.city.shinagawa.tokyo.jp/PC/kodomo/oashisuroom/hpg000033303.html
    checked: "2026-09-02"
  - name: 品川区 児童福祉課（保育所等の入園案内）
    url: https://www.city.shinagawa.tokyo.jp/004/kodomo/kodomo-hoikukentei/kodomo-hoiku/hpg000033853.html
    checked: "${today}"
  - name: ピジョン はじめての育児 首がすわってくる頃（3〜4か月）`,
  ],
  [
    `  - id: oasis
    title: オアシスルーム（ポップンルーム）`,
    `  - id: hoiku-nyuen-yoyaku
    title: 保育所入園の予約は10月下旬の申込から
    detail: 4月一括入所の受付は例年10月下旬から11月中旬で、申込書の提出順ではなく、申請期間内に出したものは同一順位として不足数に応じて調整選考します。内定は2月上旬、入園準備は2〜3月。区の「入園のしおり」に申込書類（指数計算シートなど）と持ち回保育の仕組みが載っているので、この時期に目を通しておきます。見守りおむつ定期便は満1歳になる月まで続くため、翌月分の申請も忘れずに。
    source: https://www.city.shinagawa.tokyo.jp/004/kodomo/kodomo-hoikukentei/kodomo-hoiku/hpg000033853.html
  - id: oasis
    title: オアシスルーム（ポップンルーム）`,
  ],
]);
