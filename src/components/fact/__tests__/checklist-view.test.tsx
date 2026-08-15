// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import ChecklistView from '../checklist-view'
import type { ChecklistBlock } from '@/lib/fact-model'

const block: ChecklistBlock = {
  kind: 'checklist',
  id: 'birth-registration',
  items: [
    { text: '出生届を提出する', done: false },
    { text: '健康保険を確認する', done: false },
  ],
}

describe('ChecklistView', () => {
  afterEach(() => cleanup())
  beforeEach(() => window.localStorage.clear())

  it('toggles an item, updates progress, and persists the exact storage shape', async () => {
    render(<ChecklistView chapterSlug="day-of-birth" block={block} />)
    expect(screen.getByText('0/2 完了')).toBeTruthy()

    fireEvent.click(screen.getByRole('checkbox', { name: '出生届を提出する' }))
    expect(screen.getByText('1/2 完了')).toBeTruthy()

    await waitFor(() => {
      expect(window.localStorage.getItem('checklist:day-of-birth/birth-registration')).toBe(
        JSON.stringify({ v: 1, done: ['出生届を提出する'] }),
      )
    })
  })

  it('restores valid stored items and ignores unknown items and versions', async () => {
    const key = 'checklist:day-of-birth/birth-registration'
    window.localStorage.setItem(key, JSON.stringify({ v: 1, done: ['健康保険を確認する', '存在しない項目'] }))
    const { unmount } = render(<ChecklistView chapterSlug="day-of-birth" block={block} />)
    await waitFor(() => expect(screen.getByText('1/2 完了')).toBeTruthy())
    unmount()

    window.localStorage.setItem(key, JSON.stringify({ v: 2, done: ['出生届を提出する'] }))
    render(<ChecklistView chapterSlug="day-of-birth" block={block} />)
    await waitFor(() => expect(screen.getByText('0/2 完了')).toBeTruthy())
  })

  it('rejects malformed or extra-key payloads and keeps deterministic initial render', async () => {
    const key = 'checklist:day-of-birth/birth-registration'
    for (const payload of [
      'not json',
      JSON.stringify({ v: 1, done: 'not-array' }),
      JSON.stringify({ v: 1, done: ['出生届を提出する'], extra: true }),
      JSON.stringify({ v: '1', done: [] }),
    ]) {
      window.localStorage.setItem(key, payload)
      const { unmount } = render(<ChecklistView chapterSlug="day-of-birth" block={block} />)
      // 不正ペイロードは読み捨て → 初期（未チェック）のまま
      await waitFor(() => expect(screen.getByText('0/2 完了')).toBeTruthy())
      unmount()
    }
  })
})
