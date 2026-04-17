import { useCallback } from 'react'
import type { Layout } from 'react-resizable-panels'

import { deriveSelectionFromLayout } from '../utils/derive-selection-from-layout'
import { useDatePickerStoreApi } from './use-date-picker-store-api'

export function useUpdateSelectedDate() {
  const store = useDatePickerStoreApi()

  return useCallback(
    (layout: Layout) => {
      const { range, update } = store.getState()
      const { size, left, right, from, to } = deriveSelectionFromLayout(layout, range)

      update(draft => {
        draft.slider.size = size
        draft.slider.left = left
        draft.slider.right = right
        draft.selected_date = { from, to }
      })
    },
    [store]
  )
}
