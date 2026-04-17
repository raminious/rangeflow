import { useContext } from 'react'

import { DatePickerContext } from '../context/root'

// Returns the raw zustand store. Use when you need `getState()` inside an
// event-triggered callback and don't want to subscribe (and re-create the
// callback) every time the selected state changes.
export function useDatePickerStoreApi() {
  return useContext(DatePickerContext)!.store
}
