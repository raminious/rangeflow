import clsx from 'clsx'
import dayjs from 'dayjs'
import { motion } from 'motion/react'
import { useMemo } from 'react'

import { useDatePickerStore } from '../../hooks/use-date-picker-store'
import { useApplySliderLayout } from './hooks/use-apply-slider-layout'

export function RangeTabs() {
  useApplySliderLayout()

  const list = useDatePickerStore(state => state.ranges)
  const update = useDatePickerStore(state => state.update)

  const from = useDatePickerStore(state => state.range.from)
  const to = useDatePickerStore(state => state.range.to)

  const disabledBefore = useDatePickerStore(state => state.disabled?.before)
  const disabledAfter = useDatePickerStore(state => state.disabled?.after)

  const filteredList = useMemo(
    () =>
      list.filter(item => {
        if (disabledBefore && dayjs(item.from).isBefore(disabledBefore, 'day')) {
          return false
        }

        if (disabledAfter && dayjs(item.to).isAfter(disabledAfter, 'day')) {
          return false
        }

        return true
      }),
    [list, disabledBefore, disabledAfter]
  )

  const activeIndex = useMemo(
    () =>
      filteredList.findIndex(
        item => dayjs(item.from).isSame(from, 'day') && dayjs(item.to).isSame(to, 'day')
      ),
    [filteredList, from, to]
  )

  return (
    <div className="flex items-center justify-center select-none">
      <div className="flex items-center">
        {filteredList.map((item, index) => (
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
