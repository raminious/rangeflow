import { useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_LEFT_SPACER } from '../../../constants/slider'
import { useDatePickerStore } from '../../../hooks/use-date-picker-store'

export function SliderLeftSpacer() {
  const size = useDatePickerStore(state => state.slider.left)
  const [defaultSize] = useState(() => size)

  return (
    <Panel defaultSize={`${defaultSize}%`} id={SLIDER_LEFT_SPACER} minSize={0}>
      &nbsp;
    </Panel>
  )
}
