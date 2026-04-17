import { startTransition, useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_RIGHT_SPACER } from '../../../constants/slider'
import { useDatePickerStore } from '../../../hooks/use-date-picker-store'

export function SliderRightSpacer() {
  const update = useDatePickerStore(state => state.update)
  const size = useDatePickerStore(state => state.slider.right)

  const [defaultSize] = useState(() => size)

  return (
    <Panel
      defaultSize={`${defaultSize}%`}
      id={SLIDER_RIGHT_SPACER}
      minSize={0}
      onResize={({ asPercentage }) => {
        startTransition(() => {
          update(draft => {
            draft.slider.right = asPercentage
          })
        })
      }}
    >
      &nbsp;
    </Panel>
  )
}
