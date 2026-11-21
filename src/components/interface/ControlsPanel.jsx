// src/components/interface/ControlsPanel.jsx
// Bottom‑fixed translucent mission deck with playback controls, speed slider, and scale indicator.

import { useSimulation, simulationStore } from '../../state/simulationStore';
import { GlassPanel, IconButton, Badge } from './UIKit';
import { Play, Pause, Plus, Minus, RotateCcw } from 'lucide-react';
import { colors } from '../../data/designSystem';

export default function ControlsPanel() {
  const isPlaying = useSimulation((s) => s.isPlaying);
  const speed = useSimulation((s) => s.speed);
  const selectedPlanet = useSimulation((s) => s.selectedPlanet);

  const togglePlay = () => simulationStore.togglePlay();
  const increaseSpeed = () => simulationStore.setSpeed((s) => s + 0.25);
  const decreaseSpeed = () => simulationStore.setSpeed((s) => s - 0.25);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2.75rem',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      <GlassPanel
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          pointerEvents: 'auto',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(74, 158, 255, 0.08)',
          padding: '0.65rem 1.25rem',
        }}
      >
        {/* Play / Pause Toggle */}
        <IconButton
          onClick={togglePlay}
          title={isPlaying ? 'Pause simulation' : 'Resume simulation'}
          active={isPlaying}
          aria-label={isPlaying ? 'Pause simulation' : 'Resume simulation'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </IconButton>

        {/* Speed Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <IconButton
            onClick={decreaseSpeed}
            title="Decrease speed (-0.25x)"
            aria-label="Decrease speed"
          >
            <Minus size={16} />
          </IconButton>

          <Badge style={{ minWidth: '4.5rem', justifyContent: 'center' }}>
            {speed.toFixed(2)}×
          </Badge>

          <IconButton
            onClick={increaseSpeed}
            title="Increase speed (+0.25x)"
            aria-label="Increase speed"
          >
            <Plus size={16} />
          </IconButton>
        </div>

        {/* Scale Disclaimer Badge */}
        <Badge style={{ borderStyle: 'dashed' }}>
          VISUAL SCALE: NOT TO SCALE
        </Badge>

        {/* Selected Planet Status Chip */}
        {selectedPlanet && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginLeft: '0.25rem',
              paddingLeft: '0.75rem',
              borderLeft: `1px solid ${colors.glassBorder}`,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: colors.cosmicTeal,
                fontWeight: 600,
              }}
            >
              {selectedPlanet.name.toUpperCase()}
            </span>
            <IconButton
              onClick={() => simulationStore.clearSelection()}
              title="Deselect planet"
              style={{ width: '1.65rem', height: '1.65rem' }}
            >
              <RotateCcw size={13} />
            </IconButton>
          </div>
        )}
      </GlassPanel>
    </div>
  );
}
