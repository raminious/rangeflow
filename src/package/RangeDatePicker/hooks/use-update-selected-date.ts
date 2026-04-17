import dayjs from 'dayjs'
import { useCallback } from 'react'

import { useDatePickerStore } from './use-date-picker-store'
import { useDaysInRange } from './use-days-in-range'

export function useUpdateSelectedDate() {
  const update = useDatePickerStore(state => state.update)
  const slider = useDatePickerStore(state => state.slider)
  const range = useDatePickerStore(state => state.range)
  const daysInRange = useDaysInRange(range)

  return useCallback(
    (sliderSize: number) => {
      const startDay = Math.abs((slider.left / 100) * daysInRange)
      const totalDays = Math.max(daysInRange * (sliderSize / 100), 1)

      const from = dayjs(range.start).add(startDay, 'day').toDate()
      const to = dayjs(range.start)
        .add(startDay + totalDays, 'day')
        .toDate()

      update(draft => {
        draft.slider.size = sliderSize
        draft.selected_date = { from, to }
      })
    },
    [update, range.start, daysInRange, slider.left]
  )
}
