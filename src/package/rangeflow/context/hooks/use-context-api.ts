import { useEffect } from 'react'

import type { RangeFlowApi } from '../../types'
import type { RangeFlowRefs, RangeFlowStore } from '../root'

export function useContextApi(store: RangeFlowStore, refs: RangeFlowRefs, api?: RangeFlowApi) {
  useEffect(() => {
    if (!api) {
      return
    }

    const storeRef = api.__internal.store
    const refsRef = api.__internal.refs

    storeRef.current = store
    refsRef.current = refs

    return () => {
      storeRef.current = null
      refsRef.current = null
    }
  }, [api, store, refs])
}
