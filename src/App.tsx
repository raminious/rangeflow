import dayjs from 'dayjs'

import { DatePicker } from './package/RangeDatePicker'

function App() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <DatePicker
        defaultRange={{
          from: dayjs().subtract(1, 'weeks').toDate(),
          to: dayjs().add(1, 'weeks').toDate()
        }}
        defaultSelected={{
          from: dayjs().toDate(),
          to: dayjs().add(7, 'day').toDate()
        }}
        ranges={[
          {
            label: '2 Weeks',
            from: dayjs().subtract(1, 'weeks').toDate(),
            to: dayjs().add(1, 'weeks').toDate()
          },
          {
            label: '30 Days',
            from: dayjs().subtract(15, 'day').toDate(),
            to: dayjs().add(15, 'day').toDate()
          },
          {
            label: '90 Days',
            from: dayjs().subtract(45, 'day').toDate(),
            to: dayjs().add(45, 'day').toDate()
          }
        ]}
        onChange={() => {}}
        // onChange={date => console.log('[CHANGED]: ', date)}
      />
    </div>
  )
}

export default App
