import { RangeTabs } from './RangeTabs'
import { SelectedDate } from './SelectedDate.tsx'

export function DateRange() {
  return (
    <div className="flex items-center justify-between px-2">
      <SelectedDate />
      <RangeTabs />
    </div>
  )
}
