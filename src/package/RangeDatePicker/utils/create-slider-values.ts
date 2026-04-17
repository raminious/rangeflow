import dayjs from 'dayjs'

import { SLIDER_THUMB_MIN_SIZE } from '../constants/slider'
import { interpolate } from '../utils/interpolate'

export function createSliderValues(
  range: { start: string; end: string },
  selected: {
    from: Date
    to: Date
  }
) {
  const fromDay = dayjs(selected.from).startOf('day')
  const toDay = dayjs(selected.to).startOf('day')

  const rangeStart = dayjs(range.start).startOf('day')
  const rangeEnd = dayjs(range.end).startOf('day')
  const daysInRange = rangeEnd.diff(rangeStart, 'day')

  const pastDays = Math.max(fromDay.diff(rangeStart, 'day'), 0)
  const selectedDays = Math.max(toDay.diff(fromDay, 'day'), 0)

  const sizePercent = (selectedDays * 100) / daysInRange
  const leftPercent = (pastDays * 100) / daysInRange

  const toVisual = interpolate([1, 100], [SLIDER_THUMB_MIN_SIZE, 100])
  const size = Math.max(toVisual(sizePercent), SLIDER_THUMB_MIN_SIZE)
  const inflation = size - sizePercent

  const left = Math.min(Math.max(leftPercent - inflation, 0), Math.max(100 - size, 0))
  const right = Math.max(100 - (left + size), 0)

  return { size, left, right }
}
