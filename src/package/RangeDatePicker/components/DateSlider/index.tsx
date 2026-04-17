import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import { useState } from 'react'

import { DateLabelsTrack } from './DateLabelsTrack'
import { SliderTrack } from './SliderTrack'
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
        <SliderTrack onHandleRef={setTrackHandleEl} />
        <DateLabelsTrack />
        <DragOverlay>{null}</DragOverlay>
      </DragDropProvider>
    </div>
  )
}
