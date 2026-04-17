import { type ReactNode, useRef, useState } from 'react'
import type { GroupImperativeHandle } from 'react-resizable-panels'

import { DateRanges } from '../constants/date-ranges'
import type { DatePickerProps } from '../types'
import { createSliderValues } from '../utils/create-slider-values'
import { createDatePickerStore, DatePickerContext, type DatePickerRefs } from './root'

interface Props extends DatePickerProps {
  children: ReactNode
}

export function ContextProvider({ children, default_selected }: Props) {
  const range = DateRanges[0]

  const refs: DatePickerRefs = {
    slider: {
      root: useRef<GroupImperativeHandle | null>(null)
    }
  }

  const [store] = useState(() =>
    createDatePickerStore({
      range,
      selected_date: default_selected,
      slider: createSliderValues(range, default_selected)
    })
  )

  return <DatePickerContext.Provider value={{ store, refs }}>{children}</DatePickerContext.Provider>
}
