import dayjs from 'dayjs'

interface Range {
  id: string
  label: string
  start: string
  end: string
}

export const DateRanges: Range[] = [
  {
    id: '2-weeks',
    label: '2 Weeks',
    start: dayjs().subtract(1, 'weeks').format(),
    end: dayjs().add(1, 'weeks').format()
  },
  {
    id: '1-month',
    label: '30 Days',
    start: dayjs().subtract(15, 'day').format(),
    end: dayjs().add(15, 'day').format()
  },
  {
    id: '3-month',
    label: '90 Days',
    start: dayjs().subtract(45, 'day').format(),
    end: dayjs().add(45, 'day').format()
  },
  {
    id: '6-month',
    label: '6 Months',
    start: dayjs().subtract(3, 'months').format(),
    end: dayjs().add(3, 'months').format()
  },
  {
    id: '1-year',
    label: '1 Year',
    start: dayjs().subtract(6, 'months').format(),
    end: dayjs().add(6, 'months').format()
  }
  // {
  //   id: 'ytd',
  //   label: 'Year to Date',
  //   start: Dayjs().startOf('year').format(),
  //   end: Dayjs().format()
  // }
]
