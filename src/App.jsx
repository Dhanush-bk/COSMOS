import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SolarSystem from './scenes/SolarSystem';
import AppHeader from './components/interface/AppHeader';
import AppFooter from './components/interface/AppFooter';
import ControlsPanel from './components/interface/ControlsPanel';
import PlanetInfoPanel from './components/interface/PlanetInfoPanel';
import { LoadingOverlay, ErrorBoundary } from './components/interface/UIKit';

export default function App() {
  return (
    <ErrorBoundary>
      <main
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: '#02030a',
          overflow: 'hidden',
        }}
      >
        {/* HUD and Navigation layer */}
        <AppHeader mode="EXPLORATION" />
        <AppFooter />
        <ControlsPanel />
        <PlanetInfoPanel />

        {/* 3D WebGL Canvas */}
        <Suspense fallback={<LoadingOverlay message="Rendering Universe…" />}>
          <Canvas
            camera={{ position: [0, 22, 30], fov: 55, near: 0.1, far: 1000 }}
          >
            <SolarSystem />
          </Canvas>
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}
