// src/components/interface/PlanetInfoPanel.jsx
// Contextual telemetry and factual information panel for the selected celestial body.

import { useSimulation, simulationStore } from '../../state/simulationStore';
import { GlassPanel, Badge, Divider, DataRow, SectionLabel, IconButton } from './UIKit';
import { X, Orbit, Compass, Thermometer } from 'lucide-react';
import { colors, spacing, typography } from '../../data/designSystem';

export default function PlanetInfoPanel() {
  const selectedPlanet = useSimulation((s) => s.selectedPlanet);

  if (!selectedPlanet) return null;

  const { name, type, overview, stats, tilt } = selectedPlanet;
  const tiltDeg = ((tilt * 180) / Math.PI).toFixed(1);

  return (
    <aside
      aria-label={`${name} telemetry`}
      style={{
        position: 'fixed',
        top: '5.5rem',
        right: '1.5rem',
        width: '23rem',
        maxWidth: 'calc(100vw - 3rem)',
        maxHeight: 'calc(100vh - 11rem)',
        zIndex: 40,
        pointerEvents: 'auto',
        overflowY: 'auto',
      }}
    >
      <GlassPanel
        style={{
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(74, 158, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.itemGap,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Badge style={{ borderColor: 'rgba(74, 158, 255, 0.3)', color: colors.stellarBlue }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.stellarBlue }} />
                TARGET ACQUIRED
              </Badge>
              <span
                style={{
                  fontFamily: typography.fontMono,
                  fontSize: typography.size.xs,
                  color: colors.textMuted,
                  letterSpacing: typography.tracking.wide,
                }}
              >
                {type}
              </span>
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: typography.fontDisplay,
                fontSize: typography.size.xl,
                fontWeight: 700,
                letterSpacing: typography.tracking.wide,
                color: colors.textPrimary,
              }}
            >
              {name}
            </h2>
          </div>

          <IconButton
            onClick={() => simulationStore.clearSelection()}
            title="Close telemetry panel"
            style={{ marginTop: '0.25rem' }}
          >
            <X size={18} />
          </IconButton>
        </div>

        {/* Overview Narrative */}
        <p
          style={{
            margin: '0.25rem 0 0 0',
            fontSize: typography.size.sm,
            color: colors.textSecondary,
            lineHeight: 1.6,
          }}
        >
          {overview}
        </p>

        <Divider />

        {/* Physical Characteristics */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <Compass size={14} color={colors.stellarBlue} />
            <SectionLabel>Physical Metrics</SectionLabel>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <DataRow label="Equatorial Diameter" value={stats.diameter} />
            <DataRow label="Surface Gravity" value={stats.gravity} />
            <DataRow label="Known Moons" value={stats.moons} />
            <DataRow label="Axial Tilt" value={`${tiltDeg}°`} />
          </div>
        </div>

        <Divider />

        {/* Orbital Mechanics */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <Orbit size={14} color={colors.cosmicTeal} />
            <SectionLabel>Orbital Dynamics</SectionLabel>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <DataRow label="Distance from Sun" value={stats.distanceFromSun} />
            <DataRow label="Orbital Period" value={stats.orbitalPeriod} />
            <DataRow label="Rotation Period" value={stats.rotationPeriod} />
          </div>
        </div>

        <Divider />

        {/* Atmosphere & Climate */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <Thermometer size={14} color={colors.solarGold} />
            <SectionLabel>Atmosphere & Temperature</SectionLabel>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <DataRow label="Surface Temp" value={stats.surfaceTemp} />
          </div>
          <p
            style={{
              margin: '0.5rem 0 0 0',
              fontSize: typography.size.xs,
              fontFamily: typography.fontMono,
              color: colors.textSecondary,
              lineHeight: 1.5,
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '0.5rem 0.65rem',
              borderRadius: spacing.borderRadius.sm,
              border: `1px solid ${colors.glassBorder}`,
            }}
          >
            {stats.atmosphere}
          </p>
        </div>

        {/* Panel Footer */}
        <div style={{ marginTop: '0.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => simulationStore.clearSelection()}
            style={{
              background: 'transparent',
              border: `1px solid ${colors.glassBorder}`,
              borderRadius: spacing.borderRadius.sm,
              padding: '0.35rem 0.85rem',
              color: colors.textSecondary,
              fontFamily: typography.fontMono,
              fontSize: typography.size.xs,
              letterSpacing: typography.tracking.wide,
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.stellarBlue;
              e.currentTarget.style.color = colors.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.glassBorder;
              e.currentTarget.style.color = colors.textSecondary;
            }}
          >
            DISMISS TELEMETRY
          </button>
        </div>
      </GlassPanel>
    </aside>
  );
}
