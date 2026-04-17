import dayjs from 'dayjs'

import type { RangeListItem } from '../types'

export const DefaultRangesList: RangeListItem[] = [
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
  },
  {
    label: '6 Months',
    from: dayjs().subtract(3, 'months').toDate(),
    to: dayjs().add(3, 'months').toDate()
  },
  {
    label: '1 Year',
    from: dayjs().subtract(6, 'months').toDate(),
    to: dayjs().add(6, 'months').toDate()
  }
]
