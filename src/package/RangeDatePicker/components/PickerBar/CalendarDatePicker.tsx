import dayjs from 'dayjs'
import { type ReactNode } from 'react'

import { SLIDER_LEFT_SPACER, SLIDER_RIGHT_SPACER, SLIDER_THUMB } from '../../constants/slider'
import { useDatePickerRefs } from '../../hooks/use-date-picker-refs'
import { useDatePickerStore } from '../../hooks/use-date-picker-store'
import { createSliderValues } from '../../utils/create-slider-values'
import { Calendar } from '../Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'

interface Props {
  children: ReactNode
}

export function CalendarDatePicker({ children }: Props) {
  const update = useDatePickerStore(state => state.update)
  const range = useDatePickerStore(state => state.range)
  const date = useDatePickerStore(state => state.selected_date)
  const disabled = useDatePickerStore(state => state.disabled)
  const duration = useDatePickerStore(state => state.duration)
  const CalendarProps = useDatePickerStore(state => state.CalendarProps)

  const {
    slider: { root: rootRef }
  } = useDatePickerRefs()

  const extendRange = () => {
    let rangeFrom = dayjs(range.from)
    let rangeTo = dayjs(range.to)

    if (dayjs(date.from).isBefore(rangeFrom)) {
      rangeFrom = dayjs(date.from).subtract(10, 'day')
    }

    if (dayjs(date.to).isAfter(rangeTo)) {
      rangeTo = dayjs(date.to).add(10, 'day')
    }

    return {
      from: rangeFrom.toDate(),
      to: rangeTo.toDate()
    }
  }

  const sync = () => {
    const range = extendRange()
    const { size, left, right } = createSliderValues(range, date)

    rootRef.current?.setLayout({
      [SLIDER_LEFT_SPACER]: left,
      [SLIDER_THUMB]: size,
      [SLIDER_RIGHT_SPACER]: right
    })

    update(draft => {
      draft.range = range
    })
  }

  return (
    <Popover
      modal
      onOpenChange={isOpen => {
        if (isOpen === false) {
          sync()
        }
      }}
    >
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
      <PopoverContent align="start" sideOffset={10}>
        <Calendar
          defaultMonth={date.from}
          numberOfMonths={2}
          showOutsideDays={false}
          {...CalendarProps}
          disabled={disabled}
          max={duration?.max}
          min={duration?.min}
          mode="range"
          selected={date}
          onSelect={nextDate => {
            if (!nextDate?.from || !nextDate?.to) {
              return
            }

            const fromDay = dayjs(nextDate.from).startOf('day')
            const toDay = dayjs(nextDate.to).startOf('day')

            const nextSelected = {
              from: fromDay.toDate(),
              to: toDay.toDate()
            }

            update(draft => {
              draft.selected_date = nextSelected
            })
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
