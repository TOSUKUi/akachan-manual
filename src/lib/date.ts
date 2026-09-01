// 「今日」の定義を一元化する。このサイトのデータ（調査日・最終確認日）は日本時間で書かれているため、
// ランナーのタイムゾーンで計算すると CI（UTC）と開発機（JST）で判定がズレる。
// 実例: JST 早朝に 2026-09-02 とStamped した出典を、UTC 基準の CI が「未来日」と誤判定した。

const JST_DATE = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** 指定日時の日本時間での日付を YYYY-MM-DD で返す（en-CA は YYYY-MM-DD 形式）。 */
export function jstDateISO(at: Date = new Date()): string {
  return JST_DATE.format(at)
}

/** YYYY-MM-DD（日本時間基準の日付）を UTC 基準のタイムスタンプへ変換する。無効な値は NaN。 */
export function isoToUtcMs(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number)
  if (!iso.match(/^\d{4}-\d{2}-\d{2}$/) || !y || !m || !d) return Number.NaN
  return Date.UTC(y, m - 1, d)
}

/** fromIso から見た「今日（JST）」までの日数。未来日なら負数。 */
export function daysFromIsoToJstDay(fromIso: string, now: Date): number {
  const from = isoToUtcMs(fromIso)
  const today = isoToUtcMs(jstDateISO(now))
  if (Number.isNaN(from) || Number.isNaN(today)) return Number.NaN
  return Math.floor((today - from) / 86_400_000)
}
