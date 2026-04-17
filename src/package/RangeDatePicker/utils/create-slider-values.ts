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
  const daysInRange = dayjs(range.end).diff(dayjs(range.start), 'day')

  const daysCount = dayjs(selected.to).diff(dayjs(selected.from), 'day')
  const daysAsPercentage = Math.round((daysCount * 100) / daysInRange)

  const toVisual = interpolate([1, 100], [SLIDER_THUMB_MIN_SIZE, 100])
  const sliderSize = Math.max(toVisual(daysAsPercentage), SLIDER_THUMB_MIN_SIZE)
  const interpolateDiff = sliderSize - daysAsPercentage

  const leftDiff = dayjs(selected.from).diff(range.start, 'day')
  const leftSizeAsPercentage = Math.round((leftDiff * 100) / daysInRange) - interpolateDiff

  console.log(selected, range, {
    size: sliderSize,
    left: leftSizeAsPercentage,
    right: Math.max(100 - Math.min(leftSizeAsPercentage + sliderSize, 100), 0)
  })

  return {
    size: sliderSize,
    left: leftSizeAsPercentage,
    right: Math.max(100 - Math.min(leftSizeAsPercentage + sliderSize, 100), 0)
  }
}
