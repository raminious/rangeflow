import { createContext, type RefObject } from 'react'
import type { DayPickerProps } from 'react-day-picker'
import type { GroupImperativeHandle } from 'react-resizable-panels'
import { immer } from 'zustand/middleware/immer'
import { createStore } from 'zustand/vanilla'

import type { Bounds, DateDisabled, DateRange, RangeListItem } from '../types'

type UpdaterFunction = (state: DatePickerState) => void

export interface DatePickerRefs {
  slider: {
    root: RefObject<GroupImperativeHandle | null>
  }
}

export interface DatePickerState {
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

export interface DatePickerEvents {
  onChange: (date: DateRange) => void
}

export interface DatePickerActions {
  update: (fn: UpdaterFunction) => void
  reset: () => void
}

export const createDatePickerStore = (initialState: DatePickerState) => {
  return createStore<DatePickerState & DatePickerActions>()(
    immer(set => ({
      ...initialState,
      update: fn => set(fn),
      reset: () => set(() => structuredClone(initialState))
    }))
  )
}

export type DatePickerStore = ReturnType<typeof createDatePickerStore>

interface DatePickerContext {
  refs: DatePickerRefs
  store: DatePickerStore
  events: DatePickerEvents
}

export const DatePickerContext = createContext<DatePickerContext | null>(null)
