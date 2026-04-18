import { createElement, memo } from 'react'

import { useDatePickerSlots } from '../../hooks/use-date-picker-slots'
import { useDatePickerStore } from '../../hooks/use-date-picker-store'
import { useDaysInRange } from '../../hooks/use-days-in-range'

export const DateTickers = memo(() => {
  const { DateTickers: DateTickersSlot } = useDatePickerSlots()

  const tickers = Math.min(
    Math.max(70, useDaysInRange(useDatePickerStore(state => state.range))),
    100
  )

  if (DateTickersSlot) {
    return createElement(DateTickersSlot)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex w-full justify-between">
        {Array.from({ length: tickers }).map((_, index) => (
          <div key={index} className="h-3 w-0.5 rounded-xs bg-slate-300"></div>
        ))}
      </div>
    </div>
  )
})
