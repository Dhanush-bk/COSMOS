// src/hooks/useAnimation.js
// Animation hook interfacing with the centralized simulationStore.

import { useSimulation, simulationStore } from '../state/simulationStore';

export function useAnimation() {
  const isPlaying = useSimulation((s) => s.isPlaying);
  const speed = useSimulation((s) => s.speed);

  return {
    isPlaying,
    setIsPlaying: simulationStore.setIsPlaying,
    togglePlay: simulationStore.togglePlay,
    speed,
    setSpeed: simulationStore.setSpeed,
  };
}

export default useAnimation;
