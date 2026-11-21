// src/contexts/AnimationContext.jsx
// Global animation provider component.

import { useState, useMemo } from 'react';
import { AnimationContext } from './animationContextDef';

export function AnimationProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  const value = useMemo(() => ({
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
  }), [isPlaying, speed]);

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
}

export default AnimationProvider;
