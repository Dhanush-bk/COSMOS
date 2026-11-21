/**
 * COSMOS — Utility helpers
 */

// ─── Math ─────────────────────────────────────────────────────────────────────

/** Convert degrees to radians */
export const degToRad = (deg) => (deg * Math.PI) / 180

/** Linear interpolation */
export const lerp = (a, b, t) => a + (b - a) * t

/** Clamp a value between min and max */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

/** Format a large number with commas */
export const formatNumber = (n) =>
  new Intl.NumberFormat('en-US').format(n)

/** Format distance in AU or km depending on magnitude */
export const formatDistance = (km) => {
  if (km >= 1e9) return `${(km / 1.496e8).toFixed(2)} AU`
  return `${formatNumber(km)} km`
}

// ─── Color ────────────────────────────────────────────────────────────────────

/** Hex to [r,g,b] 0-1 tuple */
export const hexToRgb = (hex) => {
  const v = parseInt(hex.replace('#', ''), 16)
  return [(v >> 16 & 255) / 255, (v >> 8 & 255) / 255, (v & 255) / 255]
}

// ─── Three.js helpers ─────────────────────────────────────────────────────────

/**
 * Dispose a Three.js object and all its children recursively.
 * Call inside useEffect cleanup to prevent GPU memory leaks.
 */
export function disposeObject(obj) {
  if (!obj) return
  obj.traverse?.((child) => {
    child.geometry?.dispose()
    if (child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach(m => {
        Object.values(m).forEach(v => v?.isTexture && v.dispose())
        m.dispose()
      })
    }
  })
}
