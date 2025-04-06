import { createContext, useContext } from 'react';

export type Origin = {
  x: number;
  y: number;
};

export const OriginContext = createContext<Origin | null>(null);

export const useOrigin = (): Origin => {
  const context = useContext(OriginContext);

  if (context === null) {
    throw new Error(
      'useOrigin must be used within an OriginContext.Provider. ' +
        'Make sure you are using the SVG component from @lay-lay/core.',
    );
  }

  return context;
};
