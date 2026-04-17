import { useContext } from 'react'
import { useStore } from 'zustand'

import { type Actions, DatePickerContext, type DatePickerState } from '../context/root'

type Selector<U> = (state: DatePickerState & Actions) => U

export function useDatePickerStore<U = Partial<DatePickerState & Actions>>(selector: Selector<U>) {
  return useStore(useContext(DatePickerContext)!.store, selector)
}
