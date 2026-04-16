import clsx from 'clsx'
import dayjs from 'dayjs'
import { ScrambleText } from 'motion-plus/react'
import { memo, useMemo } from 'react'

import { useDaysInRange } from '../hooks/use-days-in-range'
import { useStore } from '../hooks/use-store'

const TOTAL_LABELS = 6

function getLabelFormat(daysInRange: number): string {
  if (daysInRange > 120) {
    return 'MMM YYYY'
  }

  if (daysInRange > 7) {
    return 'MMM D'
  }

  return 'ddd D'
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
        'flex w-full items-center justify-between',
        'absolute top-8 left-0 px-2',
        'text-xs text-gray-500 uppercase'
      )}
    >
      {labels.map((label, index) => (
        <ScrambleText
          key={index}
          chars="◴◵◶◷"
          duration={0.2}
          className={clsx({
            'font-medium text-gray-700': index === 0 || index === labels.length - 1
          })}
        >
          {label}
        </ScrambleText>
      ))}
    </div>
  )
})
