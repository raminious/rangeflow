import dayjs from 'dayjs'

import { DoubleChevronLeftIcon } from '@/package/RangeDatePicker/icons/DoubleChevronLeftIcon'
import { DoubleChevronRightIcon } from '@/package/RangeDatePicker/icons/DoubleChevronRightIcon'

import { useDaysInRange } from '../../hooks/use-days-in-range'
import { useStore } from '../../hooks/use-store'
import { DateTickers } from './DateTickers'
import { RangeStepButton } from './RangeStepButton'
import { Slider } from './Slider'

interface Props {
  onHandleRef: (el: HTMLDivElement | null) => void
}

export function SliderTrack({ onHandleRef }: Props) {
  const update = useStore(state => state.update)
  const daysInRange = useDaysInRange(useStore(state => state.range))

  const handleMoveBackward = () => {
    update(draft => {
      draft.range.start = dayjs(draft.range.start)
        .subtract(daysInRange / 2, 'day')
        .toString()
    })
  }

  const handleMoveForward = () => {
    update(draft => {
      draft.range.end = dayjs(draft.range.end)
        .add(daysInRange / 2, 'day')
        .toString()
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
