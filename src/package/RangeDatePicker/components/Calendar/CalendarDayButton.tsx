import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import type { DayButtonProps } from 'react-day-picker'

export function CalendarDayButton({ className, day: _day, modifiers, ...props }: DayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus()
    }
  }, [modifiers.focused])

  const isSingleSelected =
    modifiers.selected && !modifiers.range_start && !modifiers.range_middle && !modifiers.range_end

  return (
    <button
      ref={ref}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-selected={isSingleSelected || undefined}
      data-today={modifiers.today || undefined}
      className={clsx(
        'flex h-9 w-9 items-center justify-center rounded-sm leading-none',
        'text-xs text-gray-700 transition-colors',
        'hover:bg-slate-100',
        'focus-visible:ring-1 focus-visible:ring-slate-400 focus-visible:outline-none',
        'data-[today=true]:font-bold data-[today=true]:text-slate-500',
        'data-[selected=true]:bg-slate-800 data-[selected=true]:text-white data-[selected=true]:hover:bg-slate-800',
        'data-[range-start=true]:bg-slate-800 data-[range-start=true]:text-white',
        'data-[range-end=true]:bg-slate-800 data-[range-end=true]:text-white',
        className
      )}
      {...props}
    />
  )
}
