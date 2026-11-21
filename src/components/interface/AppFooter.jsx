/**
 * COSMOS — Footer / navigation hint bar
 */

import { colors, typography, spacing } from '../../data/designSystem'

const HINTS = [
  'DRAG TO ROTATE',
  'SCROLL TO ZOOM',
  'CLICK PLANET TO INSPECT',
]

export default function AppFooter() {
  return (
    <footer
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        pointerEvents: 'none', // Allow clicks to pass cleanly through to ControlsPanel and 3D Canvas
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0.75rem ${spacing.panelPadding}`,
        background: 'linear-gradient(to top, rgba(2,3,10,0.6) 0%, transparent 100%)',
      }}
    >
      {/* Control hints */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {HINTS.map((hint) => (
          <span
            key={hint}
            style={{
              fontFamily: typography.fontMono,
              fontSize: typography.size.xs,
              letterSpacing: typography.tracking.wider,
              color: colors.textMuted,
            }}
          >
            {hint}
          </span>
        ))}
      </div>

      {/* Version pill */}
      <span
        style={{
          fontFamily: typography.fontMono,
          fontSize: typography.size.xs,
          letterSpacing: typography.tracking.wide,
          color: colors.textDisabled,
        }}
      >
        v0.2.0 · EXPLORATION
      </span>
    </footer>
  )
}
