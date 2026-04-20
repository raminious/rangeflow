import { useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_LEFT_SPACER } from '../../../constants/slider'
import { useRangeFlowStore } from '../../../hooks/use-rangeflow-store'

export function SliderLeftSpacer() {
  const size = useRangeFlowStore(state => state.slider.left)
  const [defaultSize] = useState(() => size)

  return (
    <Panel
      className="focus:outline-none"
      defaultSize={`${defaultSize}%`}
      id={SLIDER_LEFT_SPACER}
      minSize={0}
    >
      &nbsp;
    </Panel>
  )
}
