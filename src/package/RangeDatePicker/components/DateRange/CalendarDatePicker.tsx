import type { ReactNode } from 'react'

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

  const {
    slider: { root: rootRef }
  } = useDatePickerRefs()

  const handleClose = () => {
    const { left, right, size } = createSliderValues(range, date)

    rootRef.current?.setLayout({
      ...rootRef.current.getLayout(),
      [SLIDER_THUMB]: size,
      [SLIDER_LEFT_SPACER]: left,
      [SLIDER_RIGHT_SPACER]: right
    })
  }

  return (
    <Popover
      modal
      onOpenChange={isOpen => {
        if (!isOpen) {
          handleClose()
        }
      }}
    >
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          defaultMonth={date.from}
          mode="range"
          numberOfMonths={2}
          selected={date}
          onSelect={nextDate => {
            if (!nextDate?.from || !nextDate?.to) {
              return
            }

            const nextSelected = {
              from: nextDate.from,
              to: nextDate.to
            }

            update(draft => {
              draft.selected_date = nextSelected
              draft.slider = createSliderValues(range, nextSelected)
            })
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
