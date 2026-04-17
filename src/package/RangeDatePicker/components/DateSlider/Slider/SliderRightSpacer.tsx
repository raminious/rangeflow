import { useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_RIGHT_SPACER } from '../../../constants/slider'
import { useDatePickerStore } from '../../../hooks/use-date-picker-store'

export function SliderRightSpacer() {
  const size = useDatePickerStore(state => state.slider.right)
  const [defaultSize] = useState(() => size)

  return (
    <Panel defaultSize={`${defaultSize}%`} id={SLIDER_RIGHT_SPACER} minSize={0}>
      &nbsp;
    </Panel>
  )
}
