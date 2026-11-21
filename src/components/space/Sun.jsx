// src/components/space/Sun.jsx
// Sun component with emissive material and a soft radial corona glow.

import { memo, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CanvasTexture, AdditiveBlending } from 'three';
import { useAnimation } from '../../hooks/useAnimation';

function createCoronaTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255, 245, 220, 1.0)');
  gradient.addColorStop(0.2, 'rgba(255, 200, 100, 0.7)');
  gradient.addColorStop(0.5, 'rgba(255, 140, 40, 0.25)');
  gradient.addColorStop(0.8, 'rgba(255, 80, 20, 0.08)');
  gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  return new CanvasTexture(canvas);
}

export const Sun = memo(function Sun({ radius = 1.6, color = '#ffaa33' }) {
  const sunMeshRef = useRef(null);
  const { isPlaying, speed } = useAnimation();
  const coronaTexture = useMemo(() => createCoronaTexture(), []);

  useFrame((_, delta) => {
    if (!isPlaying || !sunMeshRef.current) return;
    sunMeshRef.current.rotation.y += delta * 0.1 * speed;
  });

  return (
    <group name="sun-system">
      {/* Central emissive Sun sphere */}
      <mesh ref={sunMeshRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color="#ffcc66"
          emissive={color}
          emissiveIntensity={2.8}
          roughness={0.8}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Soft Corona Halo Sprite */}
      {coronaTexture && (
        <sprite scale={radius * 5.5}>
          <spriteMaterial
            map={coronaTexture}
            transparent
            opacity={0.7}
            blending={AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      )}
    </group>
  );
});

export default Sun;
