import { CalendarDatePicker } from './CalendarDatePicker.tsx'
import { RangeTabs } from './RangeTabs.tsx'
import { SelectedDate } from './SelectedDate.tsx'

export function DateRange() {
  return (
    <div className="flex items-center justify-between px-2">
      <CalendarDatePicker>
        <SelectedDate />
      </CalendarDatePicker>

      <RangeTabs />
    </div>
  )
}
