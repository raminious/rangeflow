import clsx from 'clsx'
import { useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_THUMB, SLIDER_THUMB_MIN_SIZE } from '../../../constants/slider'
import { useDatePickerStore } from '../../../hooks/use-date-picker-store'
import { SliderValue } from '../SliderValue'

interface Props {
  onHandleRef: (el: HTMLDivElement | null) => void
}

export function SliderThumb({ onHandleRef }: Props) {
  const size = useDatePickerStore(state => state.slider.size)
  const [defaultSize] = useState(() => size)

  return (
    <Panel
      defaultSize={`${defaultSize}%`}
      elementRef={onHandleRef}
      id={SLIDER_THUMB}
      minSize={`${SLIDER_THUMB_MIN_SIZE}%`}
    >
      <div
        data-track-handle-container=""
        className={clsx(
          'flex items-center justify-center',
          'h-full rounded-sm border border-gray-300 inset-shadow-sm shadow-gray-300',
          'backdrop-blur-[2.5px]',
          'cursor-default select-none'
        )}
      >
        <SliderValue />
      </div>
    </Panel>
  )
}
