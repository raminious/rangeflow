import './styles.css'

import { AppContextProvider } from './ContextProvider'
import { DateRange } from './DateRange'
import { DateSlider } from './DateSlider'

export function DatePicker() {
  return (
    <AppContextProvider>
      <div className="h-35 w-140 rounded-2xl border border-gray-200 shadow-md shadow-gray-200">
        <div className="h-10 border-b border-gray-200 p-2">
          <DateRange />
        </div>

        <div className="mx-2">
          <DateSlider />
        </div>
      </div>
    </AppContextProvider>
  )
}
