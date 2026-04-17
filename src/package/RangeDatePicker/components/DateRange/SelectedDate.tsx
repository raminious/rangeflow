import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useDaysInRange } from '../../hooks/use-days-in-range'
import { useStore } from '../../hooks/use-store'

export function SelectedDate() {
  const range = useStore(state => state.range)
  const date = useStore(state => state.slider)
  const daysInRange = useDaysInRange(range)

  const { start, end } = useMemo(() => {
    const today = dayjs()

    const startDay = Math.abs((date.left / 100) * daysInRange)
    const totalDays = Math.max(daysInRange * (date.size / 100), 1)

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
  }, [daysInRange, date.left, date.size, range.start])

  return (
    <div className="hover:text-accent/90 text-accent flex items-center gap-2 text-xs font-medium select-none">
      {start}
      <span className="text-gray-400">—</span>
      {end}
    </div>
  )
}
