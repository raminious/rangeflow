export type DateRange = {
  from: Date
  to: Date
}

export interface DatePickerProps {
  default_selected: DateRange
  onChange: (date: DateRange) => void
}
