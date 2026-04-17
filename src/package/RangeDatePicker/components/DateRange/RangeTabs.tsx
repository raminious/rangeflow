import clsx from 'clsx'
import { motion } from 'motion/react'
import { useState } from 'react'

import { DateRanges } from '../../constants/date-ranges'
import { useDatePickerStore } from '../../hooks/use-date-picker-store'

export function RangeTabs() {
  const update = useDatePickerStore(state => state.update)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleTabChange = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center">
        {DateRanges.map((tab, index) => (
          <button
            key={tab.id}
            className={clsx('relative z-1 flex items-center px-1.5 py-1')}
            onClick={() => {
              update(draft => {
                draft.range.start = tab.start
                draft.range.end = tab.end
              })

              handleTabChange(index)
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
