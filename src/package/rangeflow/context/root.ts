import { createContext, type RefObject } from 'react'
import type { DayPickerProps } from 'react-day-picker'
import type { GroupImperativeHandle } from 'react-resizable-panels'
import { immer } from 'zustand/middleware/immer'
import { createStore, type StoreApi } from 'zustand/vanilla'

import type { Bounds, DateDisabled, DateRange, RangeListItem, Slots } from '../types'

type UpdaterFunction = (state: RangeFlowState) => void

export interface RangeFlowRefs {
  slider: {
    root: RefObject<GroupImperativeHandle | null>
  }
}

export interface RangeFlowState {
  range: DateRange
  ranges: RangeListItem[]
  selected_date: DateRange
  default_range: DateRange
  disabled?: DateDisabled
  duration?: Bounds
  calendar?: boolean
  slider: {
    left: number
    right: number
    size: number
  }
  CalendarProps?: DayPickerProps
}

export interface RangeFlowEvents {
  onChange: (date: DateRange) => void
}

export interface RangeFlowActions {
  update: (fn: UpdaterFunction) => void
  reset: () => void
}

export type RangeFlowStore = StoreApi<RangeFlowState & RangeFlowActions>

export const createRangeFlowStore = (initialState: RangeFlowState): RangeFlowStore => {
  return createStore<RangeFlowState & RangeFlowActions>()(
    immer(set => ({
      ...initialState,
      update: fn => set(fn),
      reset: () => set(() => structuredClone(initialState))
    }))
  )
}

interface RangeFlowContext {
  refs: RangeFlowRefs
  store: RangeFlowStore
  events: RangeFlowEvents
  slots: Slots
}

export const RangeFlowContext = createContext<RangeFlowContext | null>(null)
