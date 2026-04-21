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
  // left spacer). The right spacer is already unscaled, so no inversion there.
  const actualSize = fromVisual(size)
  const actualLeft = left + (size - actualSize)

  // Derive totalDays from the thumb width (the authoritative value), not from
  // the leftover between startDay and trailingDays — otherwise independent
  // rounding of the two spacers can flip the selection length by ±1 day
  // while the user is only translating the thumb across the track.
  const totalDays =
    Math.round(size) <= SLIDER_THUMB_MIN_SIZE
      ? 1
      : Math.max(Math.round((actualSize * daysInRange) / 100), 1)

  const startDay = clamp(
    Math.round((actualLeft * daysInRange) / 100),
    0,
    Math.max(daysInRange - totalDays, 0)
  )

  return {
    size,
    left,
    right,
    from: start.add(startDay, 'day').toDate(),
    to: start.add(startDay + totalDays - 1, 'day').toDate()
  }
}
