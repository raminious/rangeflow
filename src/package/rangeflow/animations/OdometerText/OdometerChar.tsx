import { memo, useState } from 'react'

interface Props {
  value: string
  delay: number
}

interface CharState {
  current: string
  version: number
  exiting: { value: string; version: number } | null
}

export const OdometerChar = memo(({ value, delay }: Props) => {
  const [state, setState] = useState<CharState>({ current: value, version: 0, exiting: null })

  let { current, version, exiting } = state

  if (current !== value) {
    version = state.version + 1
    exiting = { value: current, version }
    current = value

    setState({ current, version, exiting })
  }

  const display = current === ' ' ? '\u00A0' : current
  const exitDisplay = exiting?.value === ' ' ? '\u00A0' : exiting?.value
  const delayStyle = { animationDelay: `${delay}ms` }

  return (
    <span className="relative inline-block overflow-hidden leading-none">
      <span className="invisible">{display}</span>
      <span
        key={`enter-${version}`}
        className="rangeflow-odometer-enter absolute inset-0"
        style={delayStyle}
      >
        {display}
      </span>

      {exiting && (
        <span
          key={`exit-${exiting.version}`}
          className="rangeflow-odometer-exit absolute inset-0"
          style={delayStyle}
          onAnimationEnd={() =>
            setState(prev => (prev.exiting === exiting ? { ...prev, exiting: null } : prev))
          }
        >
          {exitDisplay}
        </span>
      )}
    </span>
  )
})
