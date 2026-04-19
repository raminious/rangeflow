import dayjs from 'dayjs'

import { RangeFlow, useRangeflow } from './package/rangeflow/entry'

function App() {
  const rangeflow = useRangeflow()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        gap: '2rem'
      }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() =>
            rangeflow.updateRange({
              from: dayjs().subtract(15, 'day').toDate(),
              to: dayjs().add(15, 'day').toDate()
            })
          }
        >
          Set range: 30 days
        </button>
        <button
          onClick={() =>
            rangeflow.updateSelectedDates({
              from: dayjs().toDate(),
              to: dayjs().add(15, 'day').toDate()
            })
          }
        >
          Select today → +15d
        </button>

        <button
          onClick={() =>
            rangeflow.updateSelectedDates({
              from: dayjs().subtract(10, 'days').toDate(),
              to: dayjs().subtract(10, 'days').add(3, 'days').toDate()
            })
          }
        >
          Select another date
        </button>
      </div>
      <RangeFlow
        api={rangeflow}
        Slots={{}}
        CalendarProps={{
          numberOfMonths: 2
        }}
        defaultRange={{
          from: dayjs().subtract(1, 'weeks').toDate(),
          to: dayjs().add(1, 'weeks').toDate()
        }}
        defaultSelected={{
          from: dayjs().subtract(1, 'day').toDate(),
          to: dayjs().add(3, 'day').toDate()
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
        onChange={date => console.log('[CHANGED]: ', date)}
      />
    </div>
  )
}

export default App
