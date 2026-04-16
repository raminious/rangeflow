import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useStore } from './use-store'

export function useDaysInRange() {
  const range = useStore(state => state.range)

  return useMemo(() => dayjs(range.end).diff(dayjs(range.start), 'day'), [range.start, range.end])
}
