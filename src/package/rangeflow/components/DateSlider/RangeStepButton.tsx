import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick: () => void
}

export function RangeStepButton({ children, onClick }: Props) {
  return (
    <span
      className="rangeflow-step-button inline-block shrink-0 cursor-pointer text-(--rangeflow-text) transition-transform duration-150 ease-out select-none hover:scale-110 hover:text-(--rangeflow-text-muted)"
      onClick={onClick}
    >
      {children}
    </span>
  )
}
