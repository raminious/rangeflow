import { startTransition, useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_LEFT_SPACER } from '../../../constants/slider'
import { useDatePickerStore } from '../../../hooks/use-date-picker-store'

export function SliderLeftSpacer() {
  const size = useDatePickerStore(state => state.slider.left)
  const update = useDatePickerStore(state => state.update)

  const [defaultSize] = useState(() => size)

  return (
    <Panel
      defaultSize={`${defaultSize}%`}
      id={SLIDER_LEFT_SPACER}
      minSize={0}
      onResize={({ asPercentage }) => {
        startTransition(() => {
          update(draft => {
            draft.slider.left = asPercentage
          })
        })
      }}
    >
      &nbsp;
    </Panel>
  )
}
