import { createElement } from 'react'

import { useDatePickerSlots } from '../../hooks/use-date-picker-slots.ts'
import { useDatePickerStore } from '../../hooks/use-date-picker-store.ts'
import { RangeTabs } from '../RangeTabs/index.tsx'
import { CalendarDatePicker } from './CalendarDatePicker.tsx'
import { SelectedDate } from './SelectedDate.tsx'

export function PickerBar() {
  const calendar = useDatePickerStore(state => state.calendar)
  const { RangeTabs: RangeTabsSlot } = useDatePickerSlots()

  return (
    <div className="flex h-full items-center justify-between px-2">
      {calendar ? (
        <CalendarDatePicker>
          <SelectedDate />
        </CalendarDatePicker>
      ) : (
        <SelectedDate />
      )}

      {RangeTabsSlot ? createElement(RangeTabsSlot) : <RangeTabs />}
    </div>
  )
}
