import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useDaysInRange } from '../hooks/use-days-in-range'
import { useStore } from '../hooks/use-store'

export function SelectedDate() {
  const range = useStore(state => state.range)
  const date = useStore(state => state.date)
  const daysInRange = useDaysInRange()

  const { start, end } = useMemo(() => {
    const today = dayjs()

    const startDay = Math.abs(Math.round((date.start / 100) * daysInRange))
    const totalDays = Math.max(Math.round(daysInRange * (date.duration / 100)), 1)

    const start = dayjs(range.start).add(startDay, 'day')
    const end = dayjs(range.start).add(startDay + totalDays, 'day')

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
  }, [daysInRange, date.start, date.duration, range.start])

  return (
    <div className="flex items-center gap-2 text-xs font-bold text-gray-700 select-none">
      {start}
      <span className="text-gray-400">—</span>
      {end}
    </div>
  )
}
