import clsx from 'clsx'
import dayjs from 'dayjs'
import { memo, useMemo } from 'react'

import { OdometerText } from '../../animations/OdometerText'
import { useDaysInRange } from '../../hooks/use-days-in-range'
import { useDatePickerStore } from '../../hooks/use-date-picker-store'

function getLabelFormat(daysInRange: number): string {
  if (daysInRange > 120) {
    return 'MMM YYYY'
  }

  if (daysInRange > 7) {
    return 'MMM DD'
  }

  return 'ddd DD'
}

function getLabelCount(daysInRange: number): number {
  if (daysInRange > 120) {
    return 8
  }

  if (daysInRange > 30) {
    return 10
  }

  if (daysInRange > 7) {
    return 8
  }

  return Math.min(daysInRange + 1, 8)
}

export const DateLabelsTrack = memo(() => {
  const range = useDatePickerStore(state => state.range)
  const daysInRange = useDaysInRange(range)

  const labels = useMemo(() => {
    const format = getLabelFormat(daysInRange)
    const count = getLabelCount(daysInRange)
    const start = dayjs(range.start)
    const totalMs = dayjs(range.end).diff(start)

    return Array.from({ length: count }, (_, i) => {
      const ratio = i / (count - 1)

      return start.add(totalMs * ratio, 'ms').format(format)
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
