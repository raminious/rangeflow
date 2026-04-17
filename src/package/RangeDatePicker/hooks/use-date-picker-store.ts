import { useContext } from 'react'
import { useStore } from 'zustand'

import { type DatePickerActions, DatePickerContext, type DatePickerState } from '../context/root'

type Selector<U> = (state: DatePickerState & DatePickerActions) => U

export function useDatePickerStore<U = Partial<DatePickerState & DatePickerActions>>(
  selector: Selector<U>
) {
  return useStore(useContext(DatePickerContext)!.store, selector)
}
