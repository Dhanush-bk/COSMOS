/**
 * COSMOS — Application header / HUD bar
 * Purely presentational; no Three.js imports.
 */

import { colors, typography, spacing } from '../../data/designSystem'
import { Badge } from './UIKit'

export default function AppHeader({ mode = 'EXPLORATION', onModeToggle }) {
  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `1.25rem ${spacing.panelPadding}`,
        // subtle top gradient to anchor the HUD
        background: 'linear-gradient(to bottom, rgba(2,3,10,0.7) 0%, transparent 100%)',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        <h1
          style={{
            margin: 0,
            fontFamily: typography.fontDisplay,
            fontSize: typography.size['2xl'],
            fontWeight: 700,
            letterSpacing: typography.tracking.widest,
            color: colors.textPrimary,
            lineHeight: 1,
          }}
        >
          COSMOS
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: typography.fontMono,
            fontSize: typography.size.xs,
            letterSpacing: typography.tracking.widest,
            color: colors.textMuted,
          }}
        >
          SOLAR SYSTEM EXPLORER
        </p>
      </div>

      {/* Mode badge — tappable if handler provided */}
      <Badge
        style={{ cursor: onModeToggle ? 'pointer' : 'default' }}
        onClick={onModeToggle}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: colors.cosmicTeal,
            display: 'inline-block',
          }}
        />
        {mode}
      </Badge>
    </header>
  )
}
