import { KeyboardSensor, PointerSensor } from '@dnd-kit/dom'
import { useDragDropMonitor, useDraggable } from '@dnd-kit/react'
import { clsx } from 'clsx'
import { useRef } from 'react'
import {
  Group,
  type GroupImperativeHandle,
  type Layout,
  Panel,
  Separator
} from 'react-resizable-panels'

import { useStore } from '../hooks/use-store'
import { SliderValue } from './SliderValue'

const LEFT_SPACER = 'left-spacer'
const RIGHT_SPACER = 'right-spacer'
const HANDLE = 'track-handler'

const HANDLE_MIN_SIZE = 10

interface Props {
  onHandleRef: (el: HTMLDivElement | null) => void
}

export function SliderHandle({ onHandleRef }: Props) {
  const update = useStore(state => state.update)

  const groupRef = useRef<GroupImperativeHandle | null>(null)
  const groupElementRef = useRef<HTMLDivElement | null>(null)
  const layoutRef = useRef<Layout | null>(null)

  const interpolate = (x: number) =>
    1 + ((x - HANDLE_MIN_SIZE) * (100 - 1)) / (100 - HANDLE_MIN_SIZE)

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
      layoutRef.current = groupRef.current?.getLayout() ?? null
    },
    onDragMove: event => {
      if (
        !groupRef.current ||
        !layoutRef.current ||
        !groupElementRef.current ||
        !groupElementRef.current.clientWidth
      ) {
        return
      }

      const deltaPercent = (event.operation.transform.x / groupElementRef.current.clientWidth) * 100

      const data = {
        ...layoutRef.current,
        [LEFT_SPACER]: layoutRef.current[LEFT_SPACER] + deltaPercent,
        [RIGHT_SPACER]: layoutRef.current[RIGHT_SPACER] - deltaPercent
      }

      groupRef.current.setLayout(data)

      update(draft => {
        draft.date.start = data[LEFT_SPACER]
        draft.date.end = data[RIGHT_SPACER]
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
      <Group className="group h-full w-full" elementRef={groupElementRef} groupRef={groupRef}>
        <Panel
          defaultSize="40%"
          id={LEFT_SPACER}
          minSize={0}
          onResize={data => {
            update(draft => {
              draft.date.start = Math.round(data.asPercentage)
            })
          }}
        >
          &nbsp;
        </Panel>

        <Separator className={separatorClassName} />

        <Panel
          defaultSize="20%"
          elementRef={onHandleRef}
          id={HANDLE}
          minSize={`${HANDLE_MIN_SIZE}%`}
          onResize={data => {
            update(draft => {
              draft.date.duration = interpolate(Math.round(data.asPercentage))
            })
          }}
        >
          <div
            data-track-handle-container=""
            className={clsx(
              'flex items-center justify-center',
              'h-full rounded-sm border border-gray-400 shadow shadow-slate-200',
              'backdrop-blur-[1.5px]',
              'cursor-default select-none'
            )}
          >
            <SliderValue />
          </div>
        </Panel>

        <Separator className={separatorClassName} />

        <Panel
          defaultSize="40%"
          id={RIGHT_SPACER}
          minSize={0}
          onResize={data => {
            update(draft => {
              draft.date.end = Math.round(data.asPercentage)
            })
          }}
        >
          &nbsp;
        </Panel>
      </Group>
    </div>
  )
}
