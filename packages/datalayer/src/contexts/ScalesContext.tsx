import React, { createContext, useContext } from 'react';
import type { Scale } from '../types.ts';

interface ScalesContextValue {
  xScale: Scale;
  yScale: Scale;
}

const ScalesContext = createContext<ScalesContextValue | null>(null);

export const useScales = () => {
  const context = useContext(ScalesContext);
  if (!context) {
    throw new Error('useScales must be used within a ScalesProvider');
  }
  return context;
};

interface ScalesProviderProps {
  children: React.ReactNode;
  xScale: Scale;
  yScale: Scale;
}

export const ScalesProvider: React.FC<ScalesProviderProps> = ({
  children,
  xScale,
  yScale,
}) => <ScalesContext value={{ xScale, yScale }}>{children}</ScalesContext>;
