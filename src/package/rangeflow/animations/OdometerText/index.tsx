import clsx from 'clsx'
import { memo } from 'react'

import { OdometerChar } from './OdometerChar'

interface OdometerTextProps {
  children: string
  className?: string
}

export const OdometerText = memo(({ children, className }: OdometerTextProps) => {
  return (
    <span className={clsx('inline-flex tabular-nums', className)}>
      {[...children].map((char, index) => (
        <OdometerChar key={index} delay={index * 35} value={char} />
      ))}
    </span>
  )
})
