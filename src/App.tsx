import dayjs from 'dayjs'

import { DatePicker } from './package/RangeDatePicker'

function App() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <DatePicker
        default_selected={{
          from: dayjs().toDate(),
          to: dayjs().add(7, 'day').toDate()
        }}
        onChange={date => console.log('[CHANGED]: ', date)}
      />
    </div>
  )
}

export default App
