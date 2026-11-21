// src/hooks/usePlanetMaterials.js
// Reusable hook to load planetary texture maps for React Three Fiber.

import { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, SRGBColorSpace } from 'three';

/**
 * Load planetary diffuse texture with proper color space and anisotropy.
 *
 * @param {object} params
 * @param {string} params.diffuse - Texture URL or asset path.
 * @returns {{ map: THREE.Texture }}
 */
export function usePlanetMaterials({ diffuse }) {
  const map = useLoader(TextureLoader, diffuse);

  useEffect(() => {
    if (map) {
      // eslint-disable-next-line react-hooks/immutability
      map.colorSpace = SRGBColorSpace;
      map.anisotropy = 8;
    }
  }, [map]);

  return { map };
}

export default usePlanetMaterials;
