import clsx from 'clsx'
import dayjs from 'dayjs'
import { memo, useMemo } from 'react'

import { useDatePickerStore } from '../../hooks/use-date-picker-store'

export const SliderValue = memo(() => {
  const size = useDatePickerStore(state => state.slider.size)
  const selected = useDatePickerStore(state => state.selected_date)

  const label = useMemo(() => {
    const days = Math.max(dayjs(selected.to).diff(selected.from, 'day'), 1)

    if (size < 10) {
      return `${days}D`
    }

    return days === 1 ? '1 Day' : `${days} Days`
  }, [selected.from, selected.to, size])

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
