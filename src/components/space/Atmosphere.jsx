// src/components/space/Atmosphere.jsx
// Atmospheric halo using a slightly larger semi‑transparent sphere.
// Uses raycast={() => null} so pointer clicks pass cleanly through to the planet.

import { memo } from 'react';
import { BackSide, AdditiveBlending } from 'three';

/**
 * Atmosphere – renders a thin translucent shell around a planet.
 * @param {object} props
 * @param {number} props.radius - base planet radius.
 * @param {string} [props.color] - hex color for the atmospheric glow.
 * @param {number} [props.opacity] - material opacity (0-1).
 */
export const Atmosphere = memo(function Atmosphere({
  radius,
  color = '#88ccee',
  opacity = 0.25,
}) {
  const outerRadius = radius * 1.06;

  return (
    <mesh raycast={() => null} name="planet-atmosphere-halo">
      <sphereGeometry args={[outerRadius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        side={BackSide}
        blending={AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
});

export default Atmosphere;
