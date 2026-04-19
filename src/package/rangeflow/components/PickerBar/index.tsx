import { createElement } from 'react'

import { useRangeFlowSlots } from '../../hooks/use-rangeflow-slots'
import { useRangeFlowStore } from '../../hooks/use-rangeflow-store'
import { RangeTabs } from '../RangeTabs'
import { CalendarPopover } from './CalendarPopover'
import { SelectedDate } from './SelectedDate'

export function PickerBar() {
  const calendar = useRangeFlowStore(state => state.calendar)
  const { RangeTabs: RangeTabsSlot } = useRangeFlowSlots()

  return (
    <div className="flex h-full items-center justify-between px-2">
      {calendar ? (
        <CalendarPopover>
          <SelectedDate />
        </CalendarPopover>
      ) : (
        <SelectedDate />
      )}

      {RangeTabsSlot ? createElement(RangeTabsSlot) : <RangeTabs />}
    </div>
  )
}
