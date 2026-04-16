import clsx from 'clsx'
import dayjs from 'dayjs'
import { memo, useMemo } from 'react'

import { OdometerText } from '../components/OdometerText'
import { useDaysInRange } from '../hooks/use-days-in-range'
import { useStore } from '../hooks/use-store'

const TOTAL_LABELS = 6

function getLabelFormat(daysInRange: number): string {
  if (daysInRange > 120) {
    return 'MMM YYYY'
  }

  if (daysInRange > 7) {
    return 'MMM DD'
  }

  return 'ddd DD'
}

export const DateTrail = memo(() => {
  const range = useStore(state => state.range)
  const daysInRange = useDaysInRange()

  const labels = useMemo(() => {
    const format = getLabelFormat(daysInRange)
    const start = dayjs(range.start)
    const totalMs = dayjs(range.end).diff(start)

    return Array.from({ length: TOTAL_LABELS }, (_, i) => {
      const ratio = i / (TOTAL_LABELS - 1)

      return start.add(Math.round(totalMs * ratio), 'ms').format(format)
    })
  }, [range.start, range.end, daysInRange])

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-between select-none',
        'absolute top-10 left-0 px-2',
        'text-xs tracking-tighter text-gray-400 uppercase'
      )}
    >
      {labels.map((label, index) => (
        <OdometerText
          key={index}
          className={clsx({
            'font-medium text-gray-700': index === 0 || index === labels.length - 1
          })}
        >
          {label}
        </OdometerText>
      ))}
    </div>
  )
})
