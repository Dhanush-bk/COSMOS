// src/state/simulationStore.js
// Centralized simulation and planet selection state store.
// Uses native useSyncExternalStore for zero-dependency synchronization across DOM and R3F.

import { useSyncExternalStore } from 'react';

let state = {
  isPlaying: true,
  speed: 1.0,
  selectedPlanet: null,
  hoveredPlanet: null,
};

const listeners = new Set();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export const simulationStore = {
  getState() {
    return state;
  },

  setState(updater) {
    const nextState =
      typeof updater === 'function' ? updater(state) : { ...state, ...updater };
    state = nextState;
    emitChange();
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Animation Actions
  togglePlay() {
    simulationStore.setState((s) => ({ ...s, isPlaying: !s.isPlaying }));
  },

  setIsPlaying(isPlaying) {
    simulationStore.setState((s) => ({ ...s, isPlaying }));
  },

  setSpeed(speedOrUpdater) {
    simulationStore.setState((s) => {
      const target =
        typeof speedOrUpdater === 'function'
          ? speedOrUpdater(s.speed)
          : speedOrUpdater;
      const clamped = Math.min(Math.max(Number(target.toFixed(2)), 0.25), 3.0);
      return { ...s, speed: clamped };
    });
  },

  // Selection Actions
  selectPlanet(planet) {
    simulationStore.setState((s) => ({
      ...s,
      selectedPlanet: planet || null,
    }));
  },

  clearSelection() {
    simulationStore.setState((s) => ({
      ...s,
      selectedPlanet: null,
    }));
  },

  setHoveredPlanet(planetId) {
    simulationStore.setState((s) => {
      if (s.hoveredPlanet === planetId) return s;
      return { ...s, hoveredPlanet: planetId || null };
    });
  },
};

/**
 * React hook to subscribe to state slices.
 * @param {(state: typeof state) => any} [selector]
 */
export function useSimulation(selector = (s) => s) {
  return useSyncExternalStore(
    simulationStore.subscribe,
    () => selector(simulationStore.getState()),
    () => selector(simulationStore.getState())
  );
}

export default simulationStore;
