import { renderHook, act } from '@testing-library/react'
import { useKpt } from './useKpt'
import { describe, it, expect } from 'vitest'

describe('useKpt', () => {
  it('初期状態では空の配列を持つ', () => {
    const { result } = renderHook(() => useKpt())

    expect(result.current.items.keep).toHaveLength(0)
    expect(result.current.items.problem).toHaveLength(0)
    expect(result.current.items.try).toHaveLength(0)
  })

  it('アイテムを追加できる', () => {
    const { result } = renderHook(() => useKpt())

    act(() => {
      result.current.handleAddItem('keep')('テストアイテム')
    })

    expect(result.current.items.keep).toHaveLength(1)
    expect(result.current.items.keep[0].content).toBe('テストアイテム')
  })

  it('アイテムを削除できる', () => {
    const { result } = renderHook(() => useKpt())

    act(() => {
      result.current.handleAddItem('keep')('テストアイテム')
    })

    const itemId = result.current.items.keep[0].id

    act(() => {
      result.current.handleDeleteItem('keep')(itemId)
    })

    expect(result.current.items.keep).toHaveLength(0)
  })

  it('アイテムを別のカラムに移動できる', () => {
    const { result } = renderHook(() => useKpt())

    act(() => {
      result.current.handleAddItem('keep')('移動するアイテム')
    })

    const itemId = result.current.items.keep[0].id

    act(() => {
      result.current.handleMoveItem(itemId, 'keep', 'try')
    })

    expect(result.current.items.keep).toHaveLength(0)
    expect(result.current.items.try).toHaveLength(1)
    expect(result.current.items.try[0].content).toBe('移動するアイテム')
  })

  it('存在しないアイテムの移動は無視される', () => {
    const { result } = renderHook(() => useKpt())

    act(() => {
      result.current.handleMoveItem('non-existent-id', 'keep', 'try')
    })

    expect(result.current.items.keep).toHaveLength(0)
    expect(result.current.items.try).toHaveLength(0)
  })
})