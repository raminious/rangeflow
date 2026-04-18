import { DateSlider } from './components/DateSlider'
import { PickerBar } from './components/PickerBar'
import { useEmitDateChange } from './hooks/use-emit-date-change'

export function Root() {
  useEmitDateChange()

  return (
    <div className="h-35 w-140 rounded-lg border border-gray-200 shadow-md shadow-gray-200">
      <div className="h-10 border-b border-gray-200 p-2">
        <PickerBar />
      </div>

      <div className="mx-2">
        <DateSlider />
      </div>
    </div>
  )
}
