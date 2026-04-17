import { type ReactNode, useMemo, useState } from 'react'

import { DateRanges } from '../constants/date-ranges'
import type { DatePickerProps } from '../types'
import { createSliderValues } from '../utils/create-slider-values'
import { useContextEvents } from './hooks/use-context-events'
import { useContextRefs } from './hooks/use-context-refs'
import { createDatePickerStore, DatePickerContext } from './root'

interface Props extends DatePickerProps {
  children: ReactNode
}

export function ContextProvider({ children, default_selected, onChange }: Props) {
  const range = DateRanges[0]

  const contextRefs = useContextRefs()
  const contextEvents = useContextEvents({ onChange })

  const [store] = useState(() =>
    createDatePickerStore({
      range: {
        from: range.from,
        to: range.to
      },
      selected_date: default_selected,
      slider: createSliderValues(range, default_selected)
    })
  )

  const contextValue = useMemo(
    () => ({ store, events: contextEvents, refs: contextRefs }),
    [store, contextEvents, contextRefs]
  )

  return <DatePickerContext.Provider value={contextValue}>{children}</DatePickerContext.Provider>
}
