import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useDaysInRange } from '../hooks/use-days-in-range'
import { useStore } from '../hooks/use-store'

export function SelectedDate() {
  const range = useStore(state => state.range)
  const date = useStore(state => state.date)
  const daysInRange = useDaysInRange()

  const { start, end } = useMemo(() => {
    const start = Math.abs(Math.round((date.start / 100) * daysInRange))
    const days = Math.max(Math.round(daysInRange * (date.duration / 100)), 1)

    return {
      start: dayjs(range.start).add(start, 'day').format('DD MMM'),
      end: dayjs(range.start)
        .add(start + days, 'day')
        .format('DD MMM')
    }
  }, [daysInRange, date.start, date.duration, range.start])

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-gray-700 select-none">
      <span>{start}</span>
      <span className="text-gray-400">—</span>
      <span>{end}</span>
    </div>
  )
}
