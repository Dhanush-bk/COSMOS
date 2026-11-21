// src/components/space/OrbitPath.jsx
// Simple circular orbit visual using a thin line.

import { useMemo } from 'react';
import { Line } from '@react-three/drei';

/**
 * OrbitPath – renders a faint circular line at the given radius.
 * @param {number} radius - orbit radius (scene units).
 */
export default function OrbitPath({ radius }) {
  // Generate points for a circle in the XZ plane.
  const points = useMemo(() => {
    const seg = 128;
    const pts = [];
    for (let i = 0; i <= seg; i++) {
      const theta = (i / seg) * Math.PI * 2;
      pts.push([Math.cos(theta) * radius, 0, Math.sin(theta) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color="#555"
      lineWidth={1}
      transparent
      opacity={0.3}
      dashed={true}
      dashSize={0.2}
      gapSize={0.1}
    />
  );
}
