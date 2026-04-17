import clsx from 'clsx'
import { memo, useMemo } from 'react'

import { SLIDER_THUMB_MIN_SIZE } from '../../constants/slider'
import { useDaysInRange } from '../../hooks/use-days-in-range'
import { useStore } from '../../hooks/use-store'
import { interpolate } from '../../utils/interpolate'

export const SliderValue = memo(() => {
  const size = useStore(state => state.slider.size)
  const range = useStore(state => state.range)
  const daysInRange = useDaysInRange(range)

  const label = useMemo(() => {
    const interpolated = interpolate([SLIDER_THUMB_MIN_SIZE, 100], [1, 100])(Math.ceil(size))
    const days = Math.max(Math.round(daysInRange * (interpolated / 100)), 1)

    if (size < 10) {
      return `${days}D`
    }

    return days === 1 ? '1 Day' : `${days} Days`
  }, [daysInRange, size])

  return (
    <div
      data-track-handle="true"
      className={clsx(
        'flex h-full w-full items-center justify-center',
        'mx-[clamp(0.5rem,5vw,5%)] cursor-grab',
        'text-xs font-medium text-nowrap text-gray-900'
      )}
    >
      {label}
    </div>
  )
})
