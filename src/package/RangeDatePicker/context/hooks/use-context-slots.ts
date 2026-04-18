import { useMemo } from 'react'

import type { Slots } from '../../types'

export function useContextSlots(slots?: Slots) {
  return useMemo<Slots>(() => ({ ...slots }), [slots])
}
