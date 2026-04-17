import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useDatePickerStore } from '../../hooks/use-date-picker-store'
import { CalendarIcon } from '../../icons/CalendarIcon'

export function SelectedDate() {
  const date = useDatePickerStore(state => state.selected_date)

  const { start, end } = useMemo(() => {
    const today = dayjs()

    const start = dayjs(date.from)
    const end = dayjs(date.to)

    const formatter = start.isSame(end, 'year') ? 'DD MMM' : 'DD MMM YYYY'

    const labels = {
      start: start.format(formatter),
      end: end.format(formatter)
    }

    if (today.isSame(start, 'day')) {
      labels.start = 'Today'
    }

    if (today.isSame(end, 'day')) {
      labels.end = 'Today'
    }

    return labels
  }, [date.from, date.to])

  return (
    <div className="hover:text-accent/90 text-accent flex items-center gap-2 text-xs font-medium select-none">
      <CalendarIcon />
      {start}
      <span className="text-gray-400">—</span>
      {end}
    </div>
  )
}
