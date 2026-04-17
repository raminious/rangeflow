import { createContext, type RefObject } from 'react'
import type { GroupImperativeHandle } from 'react-resizable-panels'
import { createStore } from 'zustand/vanilla'

type UpdaterFunction = (state: DatePickerState) => void

export interface DatePickerRefs {
  slider: {
    root: RefObject<GroupImperativeHandle | null>
  }
}

export interface DatePickerState {
  range: {
    start: string
    end: string
  }
  slider: {
    left: number
    right: number
    size: number
  }
  selected_date: {
    from: Date
    to: Date
  }
}

export interface Actions {
  update: (fn: UpdaterFunction) => void
  reset: () => void
}

export const createDatePickerStore = (initialState: DatePickerState) => {
  return createStore<DatePickerState & Actions>()(set => ({
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
}

export const DatePickerContext = createContext<DatePickerContext | null>(null)
