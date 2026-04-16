import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import { useState } from 'react'

import { DateTickers } from './DateTickers'
import { DateTrail } from './DateTrail'
import { SliderHandle } from './SliderHandle'
import { RestrictInnerToElement } from './utils/restrict-inner-to-element'

export function DateSlider() {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const [trackHandleEl, setTrackHandleEl] = useState<HTMLDivElement | null>(null)

  return (
    <div ref={setContainerEl} className="relative my-8 h-3 w-full px-2">
      <DragDropProvider
        modifiers={[
          RestrictInnerToElement.configure({
            inner: trackHandleEl,
            container: containerEl
          }),
          RestrictToHorizontalAxis
        ]}
      >
        <SliderHandle onHandleRef={setTrackHandleEl} />
        <DateTickers />
        <DateTrail />

        <DragOverlay>{null}</DragOverlay>
      </DragDropProvider>
    </div>
  )
}
