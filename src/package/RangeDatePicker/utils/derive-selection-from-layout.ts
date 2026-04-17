import dayjs from 'dayjs'
import type { Layout } from 'react-resizable-panels'

import {
  SLIDER_LEFT_SPACER,
  SLIDER_RIGHT_SPACER,
  SLIDER_THUMB,
  SLIDER_THUMB_MIN_SIZE
} from '../constants/slider'
import type { DateRange } from '../types'
import { clamp } from './clamp'
import { interpolate } from './interpolate'

// Inverse of the `toVisual` mapping in createSliderValues: [MIN, 100] → [1, 100].
const fromVisual = interpolate([SLIDER_THUMB_MIN_SIZE, 100], [1, 100])

// Inverse of createSliderValues: given a slider layout and the active range,
// compute the slider percentages and the calendar-day selection they imply.
export function deriveSelectionFromLayout(layout: Layout, range: DateRange) {
  const size = layout[SLIDER_THUMB]
  const left = layout[SLIDER_LEFT_SPACER]
  const right = layout[SLIDER_RIGHT_SPACER]

  const start = dayjs(range.from).startOf('day')
  const daysInRange = dayjs(range.to).startOf('day').diff(start, 'day')

  // Undo the inflation createSliderValues applied to size (absorbed by the
  // left spacer). The right spacer is already raw, so no inversion there.
  const rawLeft = left + (size - fromVisual(size))

  const startDay = clamp(Math.round((rawLeft * daysInRange) / 100), 0, daysInRange - 1)
  const trailingDays = Math.round((right * daysInRange) / 100)

  // At the thumb's minimum visual size the selection is always one day,
  // regardless of range length.
  const totalDays =
    Math.round(size) <= SLIDER_THUMB_MIN_SIZE
      ? 1
      : Math.max(daysInRange - startDay - trailingDays, 1)

  return {
    size,
    left,
    right,
    from: start.add(startDay, 'day').toDate(),
    to: start.add(startDay + totalDays, 'day').toDate()
  }
}
