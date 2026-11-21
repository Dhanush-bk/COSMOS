/**
 * COSMOS — Reusable UI primitives built on the design system.
 *
 * All components are purely presentational; no Three.js imports here.
 */

import { colors, glassMixin, spacing, typography } from '../../data/designSystem'

// ─── GlassPanel ──────────────────────────────────────────────────────────────

/**
 * Base glass-morphism container used by all info panels and HUD elements.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {React.CSSProperties} [props.style]
 * @param {React.ReactNode} props.children
 */
export function GlassPanel({ className = '', style = {}, children, ...rest }) {
  return (
    <div
      className={className}
      style={{
        ...glassMixin,
        padding: spacing.panelPadding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

/**
 * Monospaced label badge — used for mode indicators, status chips, etc.
 */
export function Badge({ children, style = {}, className = '' }) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontFamily: typography.fontMono,
        fontSize: typography.size.xs,
        letterSpacing: typography.tracking.widest,
        color: colors.textSecondary,
        border: `1px solid ${colors.glassBorder}`,
        borderRadius: spacing.borderRadius.full,
        padding: '0.3rem 0.85rem',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

// ─── Divider ─────────────────────────────────────────────────────────────────

export function Divider({ style = {} }) {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: `1px solid ${colors.glassBorder}`,
        margin: `${spacing.itemGap} 0`,
        ...style,
      }}
    />
  )
}

// ─── DataRow ─────────────────────────────────────────────────────────────────

/**
 * Key/value row for factual data inside info panels.
 */
export function DataRow({ label, value, unit = '' }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '0.5rem',
        fontSize: typography.size.sm,
        lineHeight: '1.6',
      }}
    >
      <span style={{ color: colors.textMuted, fontFamily: typography.fontMono, letterSpacing: typography.tracking.wide }}>
        {label}
      </span>
      <span style={{ color: colors.textPrimary, fontFamily: typography.fontMono }}>
        {value}
        {unit && (
          <span style={{ color: colors.textSecondary, marginLeft: '0.25rem', fontSize: typography.size.xs }}>
            {unit}
          </span>
        )}
      </span>
    </div>
  )
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

export function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontFamily: typography.fontMono,
        fontSize: typography.size.xs,
        letterSpacing: typography.tracking.widest,
        color: colors.textMuted,
        textTransform: 'uppercase',
        margin: 0,
      }}
    >
      {children}
    </p>
  )
}

// ─── IconButton ──────────────────────────────────────────────────────────────

export function IconButton({ children, onClick, title, active = false, style = {} }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2rem',
        height: '2rem',
        borderRadius: spacing.borderRadius.sm,
        border: `1px solid ${active ? colors.stellarBlue : colors.glassBorder}`,
        background: active ? `${colors.stellarBlue}22` : 'transparent',
        color: active ? colors.stellarBlue : colors.textSecondary,
        cursor: 'pointer',
        transition: 'all 150ms ease',
        ...style,
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = colors.stellarBlue + '66'
          e.currentTarget.style.color = colors.textPrimary
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = colors.glassBorder
          e.currentTarget.style.color = colors.textSecondary
        }
      }}
    >
      {children}
    </button>
  )
}

// ─── LoadingOverlay ───────────────────────────────────────────────────────────

export function LoadingOverlay({ message = 'Initializing…' }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.deepSpace,
        gap: '1.5rem',
      }}
    >
      {/* Pulsing ring */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: `2px solid ${colors.glassBorder}`,
          borderTopColor: colors.stellarBlue,
          animation: 'cosmos-spin 1s linear infinite',
        }}
      />
      <p
        style={{
          fontFamily: typography.fontMono,
          fontSize: typography.size.sm,
          letterSpacing: typography.tracking.widest,
          color: colors.textSecondary,
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {message}
      </p>
    </div>
  )
}

// ─── ErrorBoundary ────────────────────────────────────────────────────────────

import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: colors.deepSpace,
            gap: '1rem',
            padding: '2rem',
          }}
        >
          <p style={{ color: colors.marsRed, fontFamily: typography.fontMono, fontSize: typography.size.sm, letterSpacing: typography.tracking.wide }}>
            RENDER ERROR
          </p>
          <p style={{ color: colors.textSecondary, fontSize: typography.size.sm, maxWidth: '32rem', textAlign: 'center' }}>
            {this.state.error.message}
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            style={{
              padding: '0.5rem 1.5rem',
              background: 'transparent',
              border: `1px solid ${colors.stellarBlue}`,
              borderRadius: spacing.borderRadius.sm,
              color: colors.stellarBlue,
              cursor: 'pointer',
              fontFamily: typography.fontMono,
              fontSize: typography.size.xs,
              letterSpacing: typography.tracking.wide,
            }}
          >
            RETRY
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
