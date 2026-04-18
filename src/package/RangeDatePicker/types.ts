import type { ComponentProps, ComponentType } from 'react'
import type { DayPickerProps } from 'react-day-picker'

import type { RangeTabs } from './components/RangeTabs'

export interface RangeListItem {
  label: string
  from: Date
  to: Date
}

export type DateRange = {
  from: Date
  to: Date
}

export type Bounds = {
  min: number
  max: number
}

export type DateDisabled = { before: Date; after?: Date } | { before?: Date; after: Date }

export interface Slots {
  RangeTabs: ComponentType<ComponentProps<typeof RangeTabs>>
}

export interface DatePickerProps {
  defaultSelected: DateRange
  defaultRange: DateRange
  ranges?: RangeListItem[]
  duration?: Bounds
  disabled?: DateDisabled
  calendar?: boolean
  CalendarProps?: DayPickerProps
  Slots?: Slots
  onChange: (date: DateRange) => void
}
