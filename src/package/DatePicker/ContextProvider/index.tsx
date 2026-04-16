import { type ReactNode, useState } from 'react'

import { DateRanges } from '../constants/date-ranges'
import { AppContext, createAppStore } from '../context'

interface Props {
  children: ReactNode
}

export function AppContextProvider({ children }: Props) {
  const [store] = useState(() =>
    createAppStore({
      range: {
        start: DateRanges[0].start,
        end: DateRanges[0].end
      },
      date: {
        start: 0,
        end: 0,
        duration: 50
      }
    })
  )

  return <AppContext.Provider value={{ store }}>{children}</AppContext.Provider>
}
