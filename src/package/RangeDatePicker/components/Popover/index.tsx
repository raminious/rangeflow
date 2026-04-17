import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'
import { type ComponentProps, memo } from 'react'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor

type ContentProps = ComponentProps<typeof PopoverPrimitive.Content>

export const PopoverContent = memo(
  ({ align = 'center', className, sideOffset = 6, ...props }: ContentProps) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          className={clsx(
            'z-50 rounded-lg border border-gray-200 bg-white p-2 shadow-md shadow-gray-200 outline-none',
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    )
  }
)
