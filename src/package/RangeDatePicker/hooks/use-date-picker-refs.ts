import { useContext } from 'react'

import { DatePickerContext } from '../context/root'

export function useDatePickerRefs() {
  return useContext(DatePickerContext)!.refs
}
