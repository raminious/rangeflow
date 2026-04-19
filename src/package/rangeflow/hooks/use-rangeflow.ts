import { useCallback, useRef } from 'react'

import { SLIDER_LEFT_SPACER, SLIDER_RIGHT_SPACER, SLIDER_THUMB } from '../constants/slider'
import type { RangeFlowRefs, RangeFlowStore } from '../context/root'
import type { DateRange, RangeFlowApi } from '../types'
import { createSliderValues } from '../utils/create-slider-values'

export function useRangeflow(): RangeFlowApi {
  const storeRef = useRef<RangeFlowStore | null>(null)
  const refsRef = useRef<RangeFlowRefs | null>(null)

  const updateRange = useCallback((range: DateRange) => {
    const store = storeRef.current

    if (!store) {
      return
    }

    const { selected_date, update } = store.getState()
    const { size, left, right } = createSliderValues(range, selected_date)

    update(draft => {
      draft.range.from = range.from
      draft.range.to = range.to
      draft.slider = { size, left, right }
    })

    refsRef.current?.slider.root.current?.setLayout({
      [SLIDER_LEFT_SPACER]: left,
      [SLIDER_THUMB]: size,
      [SLIDER_RIGHT_SPACER]: right
    })
  }, [])

  const updateSelectedDates = useCallback((dates: DateRange) => {
    const store = storeRef.current

    if (!store) {
      return
    }

    const { range } = store.getState()
    const { size, left, right } = createSliderValues(range, dates)

    refsRef.current?.slider.root.current?.setLayout({
      [SLIDER_LEFT_SPACER]: left,
      [SLIDER_THUMB]: size,
      [SLIDER_RIGHT_SPACER]: right
    })
  }, [])

  return {
    __internal: {
      store: storeRef,
      refs: refsRef
    },
    updateRange,
    updateSelectedDates
  }
}
