import './styles.css'

import { DateRange } from './components/DateRange'
import { DateSlider } from './components/DateSlider'
import { ContextProvider } from './context/ContextProvider'
import type { DatePickerProps } from './types'

export function DatePicker(props: DatePickerProps) {
  return (
    <ContextProvider {...props}>
      <div className="h-35 w-140 rounded-lg border border-gray-200 shadow-md shadow-gray-200">
        <div className="h-10 border-b border-gray-200 p-2">
          <DateRange />
        </div>

        <div className="mx-2">
          <DateSlider />
        </div>
      </div>
    </ContextProvider>
  )
}
