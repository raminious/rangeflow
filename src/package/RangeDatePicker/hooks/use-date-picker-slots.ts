import { useContext } from 'react'

import { DatePickerContext } from '../context/root'

export function useDatePickerSlots() {
  return useContext(DatePickerContext)!.slots
}
