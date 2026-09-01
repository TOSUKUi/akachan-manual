// src/lib/__tests__/date.test.ts
import { describe, expect, it } from 'vitest'
import { daysFromIsoToJstDay, isoToUtcMs, jstDateISO } from '../date'

describe('jstDateISO', () => {
  it('ランナーのタイムゾーンに関係なく日本時間の日付を返す', () => {
    expect(jstDateISO(new Date('2026-09-01T14:59:59Z'))).toBe('2026-09-01') // JST 23:59:59
    expect(jstDateISO(new Date('2026-09-01T15:00:00Z'))).toBe('2026-09-02') // JST 00:00:00（日付境界）
    expect(jstDateISO(new Date('2026-09-02T09:00:00Z'))).toBe('2026-09-02') // JST 18:00
    expect(jstDateISO(new Date('2026-09-02T15:30:00Z'))).toBe('2026-09-03') // JST 00:30
  })
})

describe('isoToUtcMs / daysFromIsoToJstDay', () => {
  it('日付文字列を UTC 真夜中のタイムスタンプへ変換する', () => {
    expect(isoToUtcMs('2026-09-02')).toBe(Date.UTC(2026, 8, 2))
    expect(Number.isNaN(isoToUtcMs('2026/09/02'))).toBe(true)
    expect(Number.isNaN(isoToUtcMs('not-a-date'))).toBe(true)
  })

  it('日本時間の日付ベースで経過日数を数える（UTC 日付でズレない）', () => {
    // JST 2026-09-02 06:16（= UTC 2026-09-01 21:16）から見た JST 2026-09-02 は 0 日前
    const ciNow = new Date('2026-09-01T21:16:00Z')
    expect(daysFromIsoToJstDay('2026-09-02', ciNow)).toBe(0)
    expect(daysFromIsoToJstDay('2026-08-15', ciNow)).toBe(18)
    expect(daysFromIsoToJstDay('2026-09-03', ciNow)).toBe(-1)
    expect(Number.isNaN(daysFromIsoToJstDay('bad', ciNow))).toBe(true)
  })
})
