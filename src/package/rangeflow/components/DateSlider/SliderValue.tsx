import clsx from 'clsx'
import dayjs from 'dayjs'
import { createElement, memo, useMemo } from 'react'

import { useRangeFlowSlots } from '../../hooks/use-rangeflow-slots'
import { useRangeFlowStore } from '../../hooks/use-rangeflow-store'

export const SliderValue = memo(() => {
  const { SliderValueLabel: LabelSlot } = useRangeFlowSlots()
  const size = useRangeFlowStore(state => state.slider.size)
  const selected = useRangeFlowStore(state => state.selected_date)

  const label = useMemo(() => {
    const days = dayjs(selected.to).diff(selected.from, 'day') + 1

    if (size < 10) {
      return `${days}D`
    }

    return days === 1 ? '1 Day' : `${days} Days`
  }, [selected.from, selected.to, size])

  return (
    <div
      data-track-handle="true"
      className={clsx(
        'rangeflow-thumb-label flex h-full w-full items-center justify-center',
        'mx-[clamp(0.5rem,5vw,5%)] cursor-grab',
        'text-xs font-medium text-nowrap text-(--rangeflow-text)'
      )}
    >
      {LabelSlot ? createElement(LabelSlot, { label }) : label}
    </div>
  )
})
