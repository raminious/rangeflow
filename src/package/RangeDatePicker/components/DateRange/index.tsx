import { useDatePickerStore } from '../../hooks/use-date-picker-store.ts'
import { RangeTabs } from '../RangeTabs/index.tsx'
import { CalendarDatePicker } from './CalendarDatePicker.tsx'
import { SelectedDate } from './SelectedDate.tsx'

export function DateRange() {
  const calendar = useDatePickerStore(state => state.calendar)

  return (
    <div className="flex h-full items-center justify-between px-2">
      {calendar ? (
        <CalendarDatePicker>
          <SelectedDate />
        </CalendarDatePicker>
      ) : (
        <SelectedDate />
      )}

      <RangeTabs />
    </div>
  )
}
