import clsx from 'clsx'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useRangeFlowStore } from '../../hooks/use-rangeflow-store'
import { useApplySliderLayout } from './hooks/use-apply-slider-layout'
import { useTabIndicator } from './hooks/use-tab-indicator'

export function RangeTabs() {
  useApplySliderLayout()

  const list = useRangeFlowStore(state => state.ranges)
  const update = useRangeFlowStore(state => state.update)

  const from = useRangeFlowStore(state => state.range.from)
  const to = useRangeFlowStore(state => state.range.to)

  const disabledBefore = useRangeFlowStore(state => state.disabled?.before)
  const disabledAfter = useRangeFlowStore(state => state.disabled?.after)

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

  const { indicatorRef, registerButton } = useTabIndicator(activeIndex, filteredList)

  return (
    <div className="rangeflow-tabs flex items-center justify-center select-none">
      <div className="relative flex items-center overflow-hidden">
        <div
          ref={indicatorRef}
          aria-hidden
          className="rangeflow-tab-indicator pointer-events-none absolute top-0 left-0 rounded-sm bg-(--rangeflow-active-bg) duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{ opacity: 0 }}
        />

        {filteredList.map((item, index) => (
          <button
            key={`${item.from.getTime()}_${item.to.getTime()}`}
            ref={registerButton(index)}
            data-active={activeIndex === index || undefined}
            className={clsx(
              'rangeflow-tab relative z-1 flex items-center px-1.5 py-1 focus:outline-none'
            )}
            onClick={() => {
              update(draft => {
                draft.range.from = item.from
                draft.range.to = item.to
              })
            }}
          >
            <span
              className={clsx('relative z-1 text-xs tracking-tight text-(--rangeflow-text-muted)', {
                'font-medium text-(--rangeflow-text)': activeIndex === index
              })}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
