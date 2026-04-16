import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { memo } from 'react'

type OdometerTextProps = {
  children: string
  className?: string
}

export const OdometerText = memo(({ children, className }: OdometerTextProps) => {
  return (
    <span className={clsx('inline-flex tabular-nums', className)}>
      {[...children].map((char, index) => {
        const display = char === ' ' ? '\u00A0' : char

        return (
          <span key={index} className="relative inline-block overflow-hidden leading-none">
            <span className="invisible">{display}</span>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={char}
                animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                className="absolute inset-0"
                exit={{ y: '-110%', filter: 'blur(6px)', opacity: 0 }}
                initial={{ y: '110%', filter: 'blur(6px)', opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.32, 0.72, 0, 1],
                  delay: index * 0.035
                }}
              >
                {display}
              </motion.span>
            </AnimatePresence>
          </span>
        )
      })}
    </span>
  )
})
