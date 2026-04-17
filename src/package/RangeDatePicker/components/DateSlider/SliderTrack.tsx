import dayjs from 'dayjs'

import { useDatePickerStore } from '../../hooks/use-date-picker-store'
import { useDaysInRange } from '../../hooks/use-days-in-range'
import { DoubleChevronLeftIcon } from '../../icons/DoubleChevronLeftIcon'
import { DoubleChevronRightIcon } from '../../icons/DoubleChevronRightIcon'
import { DateTickers } from './DateTickers'
import { RangeStepButton } from './RangeStepButton'
import { Slider } from './Slider'

interface Props {
  onHandleRef: (el: HTMLDivElement | null) => void
}

export function SliderTrack({ onHandleRef }: Props) {
  const update = useDatePickerStore(state => state.update)
  const daysInRange = useDaysInRange(useDatePickerStore(state => state.range))

  const handleMoveBackward = () => {
    update(draft => {
      draft.range.from = dayjs(draft.range.from)
        .subtract(daysInRange / 2, 'day')
        .toDate()
    })
  }

  const handleMoveForward = () => {
    update(draft => {
      draft.range.to = dayjs(draft.range.to)
        .add(daysInRange / 2, 'day')
        .toDate()
    })
  }

  return (
    <div className="flex items-center">
      <RangeStepButton onClick={handleMoveBackward}>
        <DoubleChevronLeftIcon />
      </RangeStepButton>

      <div className="relative flex-1 px-2">
        <Slider onHandleRef={onHandleRef} />
        <DateTickers />
      </div>

      <RangeStepButton onClick={handleMoveForward}>
        <DoubleChevronRightIcon />
      </RangeStepButton>
    </div>
  )
}
