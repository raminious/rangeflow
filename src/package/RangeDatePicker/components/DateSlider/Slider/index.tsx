import { KeyboardSensor, PointerSensor } from '@dnd-kit/dom'
import { useDragDropMonitor, useDraggable } from '@dnd-kit/react'
import { clsx } from 'clsx'
import { startTransition, useRef } from 'react'
import { Group, type Layout, Separator } from 'react-resizable-panels'

import { useUpdateSelectedDate } from '@/package/RangeDatePicker/hooks/use-update-selected-date'

import { SLIDER_LEFT_SPACER, SLIDER_RIGHT_SPACER } from '../../../constants/slider'
import { useDatePickerRefs } from '../../../hooks/use-date-picker-refs'
import { SliderLeftSpacer } from './SliderLeftSpacer'
import { SliderRightSpacer } from './SliderRightSpacer'
import { SliderThumb } from './SliderThumb'

interface Props {
  onHandleRef: (el: HTMLDivElement | null) => void
}

export function Slider({ onHandleRef }: Props) {
  const updateSelectedDate = useUpdateSelectedDate()

  const {
    slider: { root: rootRef }
  } = useDatePickerRefs()

  const groupElementRef = useRef<HTMLDivElement | null>(null)
  const layoutRef = useRef<Layout | null>(null)

  const separatorClassName = clsx(
    'h-3/4 w-0.75 self-center rounded-full transition-[background-color,opacity] duration-150',
    'bg-gray-500/70 hover:bg-gray-500 focus:outline-none',
    'data-[separator=active]:bg-gray-500',
    'opacity-0 group-has-[[data-track-handle-container]:hover]:opacity-100',
    'hover:opacity-100 data-[separator=active]:opacity-100 data-[separator=focus]:opacity-100'
  )

  const { ref } = useDraggable({
    id: 'track-handle-draggable',
    sensors: [
      PointerSensor.configure({
        preventActivation: e =>
          !(e.target instanceof HTMLDivElement) || !e.target.dataset['trackHandle']
      }),
      KeyboardSensor
    ]
  })

  useDragDropMonitor({
    onDragStart: () => {
      layoutRef.current = rootRef.current?.getLayout() ?? null
    },
    onDragMove: event => {
      if (
        !rootRef.current ||
        !layoutRef.current ||
        !groupElementRef.current ||
        !groupElementRef.current.clientWidth
      ) {
        return
      }

      const deltaPercent = (event.operation.transform.x / groupElementRef.current.clientWidth) * 100
      const layout = layoutRef.current

      // setLayout triggers Group.onLayoutChange, which drives updateSelectedDate.
      rootRef.current.setLayout({
        ...layout,
        [SLIDER_LEFT_SPACER]: layout[SLIDER_LEFT_SPACER] + deltaPercent,
        [SLIDER_RIGHT_SPACER]: layout[SLIDER_RIGHT_SPACER] - deltaPercent
      })
    },
    onDragEnd: () => {
      layoutRef.current = null
    }
  })

  return (
    <div
      ref={ref}
      className={clsx('absolute top-[50%] left-0 z-1 -translate-y-[50%]', 'h-7 w-full')}
    >
      <Group
        className="group h-full w-full"
        elementRef={groupElementRef}
        groupRef={rootRef}
        onLayoutChange={layout => {
          startTransition(() => updateSelectedDate(layout))
        }}
      >
        <SliderLeftSpacer />
        <Separator className={separatorClassName} />
        <SliderThumb onHandleRef={onHandleRef} />
        <Separator className={separatorClassName} />
        <SliderRightSpacer />
      </Group>
    </div>
  )
}
