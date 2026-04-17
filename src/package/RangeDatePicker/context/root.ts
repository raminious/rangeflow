import { createContext, type RefObject } from 'react'
import type { GroupImperativeHandle } from 'react-resizable-panels'
import { createStore } from 'zustand/vanilla'

import type { DateRange } from '../types'

type UpdaterFunction = (state: DatePickerState) => void

export interface DatePickerRefs {
  slider: {
    root: RefObject<GroupImperativeHandle | null>
  }
}

export interface DatePickerState {
  range: DateRange
  selected_date: DateRange
  slider: {
    left: number
    right: number
    size: number
  }
}

export interface DatePickerEvents {
  onChange: (date: DateRange) => void
}

export interface DatePickerActions {
  update: (fn: UpdaterFunction) => void
  reset: () => void
}

export const createDatePickerStore = (initialState: DatePickerState) => {
  return createStore<DatePickerState & DatePickerActions>()(set => ({
    ...initialState,
    update: fn =>
      set(({ update: _, reset: __, ...state }) => {
        const draft = structuredClone(state)

        fn(draft)

        return draft
      }),
    reset: () => set(structuredClone(initialState))
  }))
}

export type DatePickerStore = ReturnType<typeof createDatePickerStore>

interface DatePickerContext {
  refs: DatePickerRefs
  store: DatePickerStore
  events: DatePickerEvents
}

export const DatePickerContext = createContext<DatePickerContext | null>(null)
