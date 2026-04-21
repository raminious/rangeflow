import { createContext, type RefObject } from 'react'
import type { DayPickerProps } from 'react-day-picker'
import type { GroupImperativeHandle } from 'react-resizable-panels'
import { createStore, type StoreApi } from 'zustand/vanilla'

import type { Bounds, DateDisabled, DateRange, RangeListItem, Slots } from '../types'

type Updater = Partial<RangeFlowState> | ((state: RangeFlowState) => Partial<RangeFlowState>)

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
  update: (updater: Updater) => void
  reset: () => void
}

export type RangeFlowStore = StoreApi<RangeFlowState & RangeFlowActions>

export const createRangeFlowStore = (initialState: RangeFlowState): RangeFlowStore => {
  return createStore<RangeFlowState & RangeFlowActions>()(set => ({
    ...initialState,
    update: updater => set(updater as Partial<RangeFlowState & RangeFlowActions>),
    reset: () => set(structuredClone(initialState))
  }))
}

interface RangeFlowContext {
  refs: RangeFlowRefs
  store: RangeFlowStore
  events: RangeFlowEvents
  slots: Slots
}

export const RangeFlowContext = createContext<RangeFlowContext | null>(null)
