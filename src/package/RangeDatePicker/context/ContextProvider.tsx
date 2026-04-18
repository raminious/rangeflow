import { type ReactNode, useMemo, useState } from 'react'

import { DefaultRangesList } from '../constants/date-ranges'
import type { DatePickerProps } from '../types'
import { createSliderValues } from '../utils/create-slider-values'
import { useContextEvents } from './hooks/use-context-events'
import { useContextRefs } from './hooks/use-context-refs'
import { createDatePickerStore, DatePickerContext } from './root'

interface Props extends DatePickerProps {
  children: ReactNode
}

export function ContextProvider({
  children,
  defaultRange,
  defaultSelected,
  disabled,
  duration,
  calendar = true,
  ranges = DefaultRangesList,
  CalendarProps,
  onChange
}: Props) {
  const contextRefs = useContextRefs()
  const contextEvents = useContextEvents({ onChange })

  const [store] = useState(() =>
    createDatePickerStore({
      ranges,
      disabled,
      duration,
      calendar,
      range: defaultRange,
      default_range: defaultRange,
      selected_date: defaultSelected,
      slider: createSliderValues(defaultRange, defaultSelected),
      CalendarProps
    })
  )

  const contextValue = useMemo(
    () => ({ store, events: contextEvents, refs: contextRefs }),
    [store, contextEvents, contextRefs]
  )

  return <DatePickerContext.Provider value={contextValue}>{children}</DatePickerContext.Provider>
}
