import { createContext } from 'react'
import { createStore } from 'zustand/vanilla'

type UpdaterFunction = (state: AppState) => void

export interface AppState {
  range: {
    start: string
    end: string
  }
  date: {
    start: number
    end: number
    duration: number
  }
}

export interface Actions {
  update: (fn: UpdaterFunction) => void
  reset: () => void
}

export const createAppStore = (initialState: AppState) => {
  return createStore<AppState & Actions>()(set => ({
    ...initialState,
    update: fn =>
      set(({ update: _, reset: __, ...state }) => {
        const draft = structuredClone(state)

        fn(draft)

        return draft
      }),
    reset: () => set(structuredClone(initialState))
  }))
}

export type AppStore = ReturnType<typeof createAppStore>

interface AppContext {
  store: AppStore
}

export const AppContext = createContext<AppContext | null>(null)
