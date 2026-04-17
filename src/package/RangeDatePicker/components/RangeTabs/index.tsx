import clsx from 'clsx'
import dayjs from 'dayjs'
import { motion } from 'motion/react'
import { useMemo } from 'react'

import { DateRanges } from '../../constants/date-ranges'
import { useDatePickerStore } from '../../hooks/use-date-picker-store'
import { useApplySliderLayout } from './hooks/use-apply-slider-layout'

export function RangeTabs() {
  const update = useDatePickerStore(state => state.update)
  const range = useDatePickerStore(state => state.range)

  useApplySliderLayout()

  const activeIndex = useMemo(
    () =>
      DateRanges.findIndex(
        item => dayjs(item.from).isSame(range.from, 'day') && dayjs(item.to).isSame(range.to, 'day')
      ),
    [range.from, range.to]
  )

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center">
        {DateRanges.map((tab, index) => (
          <button
            key={tab.id}
            className={clsx('relative z-1 flex items-center px-1.5 py-1')}
            onClick={() => {
              update(draft => {
                draft.range.from = tab.from
                draft.range.to = tab.to
              })
            }}
          >
            <span
              className={clsx('relative z-1 text-xs tracking-tight text-gray-700', {
                'font-medium text-gray-900': activeIndex === index
              })}
            >
              {tab.label}
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
