import dayjs from 'dayjs'

import { SLIDER_THUMB_MIN_SIZE } from '../constants/slider'
import type { DateRange } from '../types'
import { clamp } from './clamp'
import { interpolate } from './interpolate'

const toVisual = interpolate([1, 100], [SLIDER_THUMB_MIN_SIZE, 100])

export function createSliderValues(
  range: DateRange,
  selected: {
    from: Date
    to: Date
  }
) {
  const rangeStart = dayjs(range.from).startOf('day')
  const daysInRange = dayjs(range.to).startOf('day').diff(rangeStart, 'day')

  const fromDay = dayjs(selected.from).startOf('day')
  const toDay = dayjs(selected.to).startOf('day')

  const pastDays = Math.max(fromDay.diff(rangeStart, 'day'), 0)
  const selectedDays = toDay.diff(fromDay, 'day') + 1

  const rawSize = (selectedDays * 100) / daysInRange
  const rawLeft = (pastDays * 100) / daysInRange

  const size = Math.max(toVisual(rawSize), SLIDER_THUMB_MIN_SIZE)
  const inflation = size - rawSize

  // Visual right stays raw (inflation is absorbed entirely by the left spacer).
  const left = clamp(rawLeft - inflation, 0, Math.max(100 - size, 0))
  const right = Math.max(100 - left - size, 0)

  return {
    size,
    left,
    right
  }
}
