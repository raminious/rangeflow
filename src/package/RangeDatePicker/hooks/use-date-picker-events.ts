import { useContext } from 'react'

import { DatePickerContext } from '../context/root'

export function useDatePickerEvents() {
  return useContext(DatePickerContext)!.events
}
