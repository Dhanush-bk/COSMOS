/**
 * COSMOS — Custom React hooks
 *
 * useAnimationPause  — pause/resume useFrame when tab is hidden
 * useWindowSize      — reactive window dimensions
 */

import { useEffect, useState, useRef } from 'react'

// ─── useAnimationPause ───────────────────────────────────────────────────────

/**
 * Returns a ref<boolean> that is true while the page is visible.
 * Pass it to useFrame guards to avoid wasted GPU work in background tabs.
 *
 * @returns {React.MutableRefObject<boolean>}
 */
export function useAnimationPause() {
  const active = useRef(true)

  useEffect(() => {
    const onVisible = () => { active.current = !document.hidden }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return active
}

// ─── useWindowSize ────────────────────────────────────────────────────────────

export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

// ─── useIsMobile ─────────────────────────────────────────────────────────────

export function useIsMobile(breakpoint = 768) {
  const { width } = useWindowSize()
  return width < breakpoint
}
