import { useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_RIGHT_SPACER } from '../../../constants/slider'
import { useRangeFlowStore } from '../../../hooks/use-rangeflow-store'

export function SliderRightSpacer() {
  const size = useRangeFlowStore(state => state.slider.right)
  const [defaultSize] = useState(() => size)

  return (
    <Panel
      className="focus:outline-none"
      defaultSize={`${defaultSize}%`}
      id={SLIDER_RIGHT_SPACER}
      minSize={0}
    >
      &nbsp;
    </Panel>
  )
}
