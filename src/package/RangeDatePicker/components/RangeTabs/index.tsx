import clsx from 'clsx'
import dayjs from 'dayjs'
import { motion } from 'motion/react'
import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { DefaultRangesList } from '../../constants/date-ranges'
import { useDatePickerStore } from '../../hooks/use-date-picker-store'
import { useApplySliderLayout } from './hooks/use-apply-slider-layout'

export function RangeTabs() {
  const list = useDatePickerStore(state => state.ranges)
  const update = useDatePickerStore(state => state.update)
  const { from, to } = useDatePickerStore(
    useShallow(state => ({ from: state.range.from, to: state.range.to }))
  )

  useApplySliderLayout()

  const activeIndex = useMemo(
    () =>
      DefaultRangesList.findIndex(
        item => dayjs(item.from).isSame(from, 'day') && dayjs(item.to).isSame(to, 'day')
      ),
    [from, to]
  )

  return (
    <div className="flex items-center justify-center select-none">
      <div className="flex items-center">
        {list.map((item, index) => (
          <button
            key={`${item.from.getDate()}_${item.to.getDate()}`}
            className={clsx('relative z-1 flex items-center px-1.5 py-1')}
            onClick={() => {
              update(draft => {
                draft.range.from = item.from
                draft.range.to = item.to
              })
            }}
          >
            <span
              className={clsx('relative z-1 text-xs tracking-tight text-gray-700', {
                'font-medium text-gray-900': activeIndex === index
              })}
            >
              {item.label}
            </span>

            {activeIndex === index && (
              <motion.div
                className="absolute inset-0 rounded-sm bg-slate-300"
                layoutId="tab-indicator"
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
