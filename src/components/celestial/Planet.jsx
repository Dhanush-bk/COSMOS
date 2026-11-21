// src/components/celestial/Planet.jsx
// Interactive, photorealistic celestial body with orbital motion, selection highlight, and pointer events.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { usePlanetMaterials } from '../../hooks/usePlanetMaterials';
import { useSimulation, simulationStore } from '../../state/simulationStore';
import Atmosphere from '../space/Atmosphere';
import SaturnRings from '../space/SaturnRings';

/**
 * Planet — interactive orbiting celestial body.
 *
 * @param {object} props
 * @param {object} props.planet - Complete planet configuration and factual data
 */
export default function Planet({ planet }) {
  const {
    id,
    name,
    size,
    distance,
    speed,
    rotationSpeed = 1.0,
    tilt = 0.0,
    materialParams,
    hasAtmosphere = false,
    atmosphereColor = '#88ccee',
    atmosphereOpacity = 0.25,
    hasRings = false,
  } = planet;

  const orbitRef = useRef(null);
  const planetMeshRef = useRef(null);

  // Subscribe to centralized simulation & selection state
  const isPlaying = useSimulation((s) => s.isPlaying);
  const animSpeed = useSimulation((s) => s.speed);
  const selectedPlanet = useSimulation((s) => s.selectedPlanet);
  const hoveredPlanet = useSimulation((s) => s.hoveredPlanet);

  const isSelected = selectedPlanet?.id === id || selectedPlanet?.name === name;
  const isHovered = hoveredPlanet === (id || name);

  // Load texture map with colorSpace management
  const { map } = usePlanetMaterials({
    diffuse: materialParams.diffuse,
  });

  useFrame((_, delta) => {
    if (!isPlaying) return;
    const timeDelta = delta * animSpeed;

    // Orbital revolution around central star
    if (orbitRef.current) {
      orbitRef.current.rotation.y += speed * timeDelta * 0.25;
    }

    // Diurnal self-rotation on axial tilt
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += rotationSpeed * timeDelta * 0.4;
    }
  });

  const handleSelect = () => {
    simulationStore.selectPlanet(planet);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    // Discriminate between intentional click and camera drag
    if (e.delta && e.delta > 5) return;
    handleSelect();
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    simulationStore.setHoveredPlanet(id || name);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    simulationStore.setHoveredPlanet(null);
    document.body.style.cursor = 'default';
  };

  return (
    <group ref={orbitRef} name={`${name}-orbit`}>
      {/* Positioned at orbital radius */}
      <group position={[distance, 0, 0]} name={`${name}-system`}>
        {/* Planet body with axial tilt */}
        <group rotation={[tilt, 0, 0]}>
          <mesh
            ref={planetMeshRef}
            name={`${name}-body`}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <sphereGeometry args={[size, 48, 48]} />
            <meshStandardMaterial
              map={map}
              roughness={0.85}
              metalness={0.05}
              color={map ? '#ffffff' : '#aaaaaa'}
            />
          </mesh>

          {/* Saturn Ring System */}
          {hasRings && (
            <SaturnRings planetSize={size} onSelect={handleSelect} />
          )}
        </group>

        {/* Selection HUD Targeting Indicator */}
        {isSelected && (
          <group rotation={[-Math.PI / 2, 0, 0]} name={`${name}-target-reticle`}>
            {/* Inner targeting ring */}
            <mesh raycast={() => null}>
              <ringGeometry args={[size * 1.32, size * 1.38, 64]} />
              <meshBasicMaterial
                color="#00e5ff"
                side={DoubleSide}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Outer secondary beacon ring */}
            <mesh raycast={() => null}>
              <ringGeometry args={[size * 1.48, size * 1.52, 64]} />
              <meshBasicMaterial
                color="#4a9eff"
                side={DoubleSide}
                transparent
                opacity={0.5}
              />
            </mesh>
          </group>
        )}

        {/* Hover Highlight Ring */}
        {isHovered && !isSelected && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
            <ringGeometry args={[size * 1.22, size * 1.25, 64]} />
            <meshBasicMaterial
              color="#ffffff"
              side={DoubleSide}
              transparent
              opacity={0.4}
            />
          </mesh>
        )}

        {/* Atmospheric halo (raycast disabled so clicks pass through) */}
        {hasAtmosphere && (
          <Atmosphere
            radius={size}
            color={atmosphereColor}
            opacity={atmosphereOpacity}
          />
        )}
      </group>
    </group>
  );
}
