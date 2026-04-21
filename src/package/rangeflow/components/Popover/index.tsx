import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'
import { type ComponentProps, memo } from 'react'

type ContentProps = ComponentProps<typeof PopoverPrimitive.Content>

export const PopoverContent = memo(
  ({ align = 'center', className, sideOffset = 6, children, ...props }: ContentProps) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          {...props}
          className={clsx(
            'rangeflow-date-picker-portal rangeflow-popover z-50 rounded-lg border border-(--rangeflow-border) bg-(--rangeflow-bg) p-2 text-(--rangeflow-text) shadow-md shadow-(color:--rangeflow-shadow-color) backdrop-blur-[10px] outline-none',
            className
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    )
  }
)

// eslint-disable-next-line
export const Popover = PopoverPrimitive.Root

// eslint-disable-next-line
export const PopoverTrigger = PopoverPrimitive.Trigger

// eslint-disable-next-line
export const PopoverAnchor = PopoverPrimitive.Anchor