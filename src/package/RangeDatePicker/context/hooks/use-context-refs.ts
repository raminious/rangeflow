import { useMemo, useRef } from 'react'
import type { GroupImperativeHandle } from 'react-resizable-panels'

import type { DatePickerRefs } from '../root'

export function useContextRefs() {
  const sliderRoot = useRef<GroupImperativeHandle | null>(null)

  return useMemo<DatePickerRefs>(() => {
    return {
      slider: {
        root: sliderRoot
      }
    }
  }, [])
}
