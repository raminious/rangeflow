import clsx from 'clsx'
import { memo, useMemo } from 'react'

import { useDaysInRange } from '../hooks/use-days-in-range'
import { useStore } from '../hooks/use-store'

export const SliderValue = memo(() => {
  const daysInRange = useDaysInRange()
  const duration = useStore(state => state.date.duration)

  const label = useMemo(() => {
    const days = Math.max(Math.round(daysInRange * (duration / 100)), 1)

    if (duration < 10) {
      return `${days}D`
    }

    return days === 1 ? '1 Day' : `${days} Days`
  }, [daysInRange, duration])

  return (
    <div
      data-track-handle="true"
      className={clsx(
        'flex h-full w-[70%] cursor-grab items-center justify-center',
        'text-xs font-medium text-gray-900'
      )}
    >
      {label}
    </div>
  )
})
