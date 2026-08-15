// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import FlowChartView from '../flow-chart-view'
import type { FlowBlock } from '@/lib/fact-model'

const block: FlowBlock = {
  kind: 'flow',
  id: 'crying-response',
  nodes: [
    {
      id: 'f1',
      text: '赤ちゃんが泣き止まない',
      choices: [
        { label: '安全な場所に寝かせる', nextId: 'f2' },
        { label: '症状がある', nextId: 'f3' },
      ],
    },
    { id: 'f2', text: '大人がいったん離れます', choices: [] },
    { id: 'f3', text: '小児科を受診します', choices: [] },
  ],
}

describe('FlowChartView', () => {
  afterEach(() => cleanup())

  it('moves through a branch, shows the path and restarts', () => {
    render(<FlowChartView block={block} />)
    expect(screen.getByText('赤ちゃんが泣き止まない')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: '安全な場所に寝かせる' }))
    expect(screen.getByText('大人がいったん離れます')).toBeTruthy()
    expect(screen.getByText('安全な場所に寝かせる')).toBeTruthy()
    expect(screen.getByText('この案内を確認してください。')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: '最初からやり直す' }))
    expect(screen.getByText('赤ちゃんが泣き止まない')).toBeTruthy()
  })

  it('shows terminal text and restarts from a terminal node', () => {
    render(<FlowChartView block={block} />)
    fireEvent.click(screen.getByRole('button', { name: '安全な場所に寝かせる' }))
    // 終端（choices: []）でも text が表示され、やり直せる
    expect(screen.getByText('大人がいったん離れます')).toBeTruthy()
    expect(screen.getByText('この案内を確認してください。')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: '最初からやり直す' }))
    expect(screen.getByText('赤ちゃんが泣き止まない')).toBeTruthy()
  })

  it('is defensive against an unknown nextId and keeps the UI usable', () => {
    const broken: FlowBlock = {
      ...block,
      nodes: [
        { ...block.nodes[0], choices: [{ label: '壊れた行き先', nextId: 'nope' }] },
        ...block.nodes.slice(1),
      ],
    }
    render(<FlowChartView block={broken} />)
    fireEvent.click(screen.getByRole('button', { name: '壊れた行き先' }))
    expect(screen.getByText(/次の案内を表示できません/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: '最初からやり直す' }))
    expect(screen.getByText('赤ちゃんが泣き止まない')).toBeTruthy()
  })
})
