import { useLayoutEffect, useRef } from 'react'

/**
 * Positions an absolute indicator over the active tab using FLIP-lite:
 * the first placement is instant; subsequent moves animate via CSS transition.
 */
export function useTabIndicator(activeIndex: number, layoutKey: unknown) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const hasPositionedRef = useRef(false)

  useLayoutEffect(() => {
    const indicator = indicatorRef.current

    if (!indicator) {
      return
    }

    const button = buttonRefs.current[activeIndex]

    if (!button) {
      indicator.style.opacity = '0'
      hasPositionedRef.current = false

      return
    }

    Object.assign(indicator.style, {
      opacity: '1',
      transitionProperty: hasPositionedRef.current ? 'transform, width, height' : 'none',
      transform: `translate(${button.offsetLeft}px, ${button.offsetTop}px)`,
      width: `${button.offsetWidth}px`,
      height: `${button.offsetHeight}px`
    })

    hasPositionedRef.current = true
  }, [activeIndex, layoutKey])

  const registerButton = (index: number) => (element: HTMLButtonElement | null) => {
    buttonRefs.current[index] = element
  }

  return {
    indicatorRef,
    registerButton
  }
}
