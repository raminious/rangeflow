import { useEffect, useMemo, useRef } from 'react'

import type { DatePickerProps } from '../../types'
import type { DatePickerEvents } from '../root'

export function useContextEvents({ onChange }: Partial<DatePickerProps>) {
  const eventsRef = useRef({ onChange })

  useEffect(() => {
    eventsRef.current.onChange = onChange
  })

  return useMemo<DatePickerEvents>(
    () => ({
      onChange: date => eventsRef.current.onChange?.(date)
    }),
    []
  )
}
