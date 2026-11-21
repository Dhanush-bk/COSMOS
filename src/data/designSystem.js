/**
 * COSMOS Design System — Design tokens and constants
 *
 * This file is the single source of truth for all visual constants.
 * Use these values in both CSS-in-JS and Tailwind utilities via CSS vars.
 */

// ─── Color Palette ────────────────────────────────────────────────────────────

export const colors = {
  // Deep space backgrounds
  void:       '#020309',   // absolute black-blue background
  deepSpace:  '#02030a',   // primary canvas background
  nebula:     '#050c1a',   // subtle card/panel background
  cosmos:     '#0a0f1e',   // lifted surface

  // Accent / highlight
  starlight:  '#e8f4ff',   // near-white for headings
  stellarBlue:'#4a9eff',   // primary interactive blue
  nebulaViolet:'#7c5cfc',  // secondary accent purple
  cosmicTeal: '#00c9b1',   // success / orbital teal
  solarGold:  '#f5a623',   // sun / warning gold
  marsRed:    '#e05a3a',   // alert / danger red

  // Text hierarchy
  textPrimary:   '#e8f4ff',
  textSecondary: '#8899bb',
  textMuted:     '#445577',
  textDisabled:  '#2a3550',

  // Glass / panel surfaces
  glassBorder:    'rgba(255,255,255,0.08)',
  glassBg:        'rgba(5,12,26,0.72)',
  glassHighlight: 'rgba(255,255,255,0.04)',

  // Orbital ring color
  orbitRing: 'rgba(255,255,255,0.12)',
}

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  fontDisplay:  '"Space Grotesk", "Inter", system-ui, sans-serif',
  fontMono:     '"Space Mono", "JetBrains Mono", monospace',
  fontBody:     '"Inter", system-ui, sans-serif',

  // Scale (rem)
  size: {
    xs:   '0.625rem',  // 10px — labels
    sm:   '0.75rem',   // 12px — captions
    base: '0.875rem',  // 14px — body
    md:   '1rem',      // 16px — subheadings
    lg:   '1.25rem',   // 20px — headings
    xl:   '1.5rem',    // 24px — section titles
    '2xl':'2rem',      // 32px — display
    '3xl':'3rem',      // 48px — hero
  },

  // Letter spacing
  tracking: {
    tight:   '-0.02em',
    normal:  '0em',
    wide:    '0.08em',
    wider:   '0.15em',
    widest:  '0.3em',
  },
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  panelPadding:  '1.25rem',  // 20px
  sectionGap:    '1.5rem',   // 24px
  itemGap:       '0.75rem',  // 12px
  borderRadius: {
    sm:  '0.375rem',
    md:  '0.75rem',
    lg:  '1rem',
    xl:  '1.5rem',
    full:'9999px',
  },
}

// ─── Glass Panel Mixins (use as style objects) ───────────────────────────────

export const glassMixin = {
  background:   colors.glassBg,
  border:       `1px solid ${colors.glassBorder}`,
  backdropFilter: 'blur(16px) saturate(150%)',
  WebkitBackdropFilter: 'blur(16px) saturate(150%)',
  borderRadius: spacing.borderRadius.lg,
}

// ─── Z-Index Stack ────────────────────────────────────────────────────────────

export const zIndex = {
  canvas:   0,
  overlay:  10,
  panel:    20,
  hud:      30,
  modal:    40,
  tooltip:  50,
}

// ─── Animation ────────────────────────────────────────────────────────────────

export const animation = {
  fast:   '150ms ease',
  normal: '300ms ease',
  slow:   '600ms ease',
  spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
}
