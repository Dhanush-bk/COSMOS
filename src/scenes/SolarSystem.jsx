// src/scenes/SolarSystem.jsx
// Photorealistic, cinematic 3D Solar System with high-res textures and atmospheric shells.

import { Stars, OrbitControls } from '@react-three/drei';
import Planet from '../components/celestial/Planet';
import Sun from '../components/space/Sun';
import OrbitPath from '../components/space/OrbitPath';
import { planetsData } from '../data/planetsData';

export default function SolarSystem() {
  return (
    <>
      {/* Deep Space Background with Realistic Starfield */}
      <Stars
        radius={120}
        depth={60}
        count={8000}
        factor={5}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Subtle ambient light for dark side of planets */}
      <ambientLight intensity={0.12} />

      {/* Central Solar Illuminator */}
      <pointLight
        position={[0, 0, 0]}
        intensity={180}
        distance={150}
        decay={2}
        color="#fff6e8"
      />

      {/* Central Sun with Emissive Core & Corona */}
      <Sun radius={1.6} />

      {/* Orbit Paths and Celestial Bodies */}
      {planetsData.map((planet) => (
        <group key={planet.id || planet.name}>
          <OrbitPath radius={planet.distance} />
          <Planet planet={planet} />
        </group>
      ))}

      {/* Cinematic Orbital Camera Controls */}
      <OrbitControls
        makeDefault
        enablePan
        enableZoom
        minDistance={3.5}
        maxDistance={80}
        enableDamping
        dampingFactor={0.06}
      />
    </>
  );
}
