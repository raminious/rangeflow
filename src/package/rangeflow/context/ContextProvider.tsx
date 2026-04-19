import { type ReactNode, useMemo, useState } from 'react'

import { DefaultRangesList } from '../constants/date-ranges'
import type { RangeFlowProps } from '../types'
import { createSliderValues } from '../utils/create-slider-values'
import { useContextApi } from './hooks/use-context-api'
import { useContextEvents } from './hooks/use-context-events'
import { useContextRefs } from './hooks/use-context-refs'
import { useContextSlots } from './hooks/use-context-slots'
import { createRangeFlowStore, RangeFlowContext } from './root'

interface Props extends RangeFlowProps {
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
  Slots,
  api,
  onChange
}: Props) {
  const contextRefs = useContextRefs()
  const contextEvents = useContextEvents({ onChange })
  const contextSlots = useContextSlots(Slots)

  const [store] = useState(() =>
    createRangeFlowStore({
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

  // create context api
  useContextApi(store, contextRefs, api)

  const contextValue = useMemo(
    () => ({
      store,
      events: contextEvents,
      refs: contextRefs,
      slots: contextSlots
    }),
    [store, contextEvents, contextRefs, contextSlots]
  )

  return <RangeFlowContext.Provider value={contextValue}>{children}</RangeFlowContext.Provider>
}
