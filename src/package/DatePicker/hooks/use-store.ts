import { useContext } from 'react'
import { useStore as useBaseStore } from 'zustand'

import { type Actions, AppContext, type AppState } from '../context'

type Selector<U> = (state: AppState & Actions) => U

export function useStore<U = Partial<AppState & Actions>>(selector: Selector<U>) {
  return useBaseStore(useContext(AppContext)!.store, selector)
}
