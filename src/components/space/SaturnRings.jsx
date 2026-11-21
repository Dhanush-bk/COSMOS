// src/components/space/SaturnRings.jsx
// Saturn ring system with radial UV projection and alpha ring texture.

import { useMemo, useEffect } from 'react';
import { DoubleSide, RingGeometry, TextureLoader, SRGBColorSpace } from 'three';
import { useLoader } from '@react-three/fiber';

/**
 * SaturnRings renders a realistic ring disc around Saturn.
 * @param {object} props
 * @param {number} [props.planetSize=0.85] - radius of the planet mesh.
 * @param {() => void} [props.onSelect] - selection callback when rings are clicked.
 */
export default function SaturnRings({ planetSize = 0.85, onSelect }) {
  const texture = useLoader(TextureLoader, '/textures/saturn_ring.png');

  useEffect(() => {
    if (texture) {
      // eslint-disable-next-line react-hooks/immutability
      texture.colorSpace = SRGBColorSpace;
    }
  }, [texture]);

  const inner = planetSize * 1.25;
  const outer = planetSize * 2.35;

  const ringGeometry = useMemo(() => {
    const geo = new RingGeometry(inner, outer, 128, 1);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const u = (dist - inner) / (outer - inner);
      const angle = Math.atan2(y, x);
      const v = (angle + Math.PI) / (2 * Math.PI);
      uv.setXY(i, u, v);
    }
    uv.needsUpdate = true;
    return geo;
  }, [inner, outer]);

  const handleClick = (e) => {
    e.stopPropagation();
    // Ignore drag movements
    if (e.delta && e.delta > 5) return;
    if (onSelect) onSelect();
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
  };

  return (
    // Saturn axial tilt: ~26.7 degrees (0.466 rad) along X / Z
    <mesh
      geometry={ringGeometry}
      rotation={[-Math.PI / 2 + 0.35, 0.1, 0.2]}
      name="saturn-rings"
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <meshStandardMaterial
        map={texture}
        side={DoubleSide}
        transparent
        opacity={0.85}
        depthWrite={false}
        roughness={0.7}
        metalness={0.0}
      />
    </mesh>
  );
}
