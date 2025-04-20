import { createContext, useContext } from 'react';

type OriginGetter = () => {
  x: number;
  y: number;
};

export const OriginContext = createContext<OriginGetter | null>(null);

export const useOrigin = (): OriginGetter => {
  const context = useContext(OriginContext);

  if (context === null) {
    throw new Error(
      'useOrigin must be used within an OriginContext.Provider. ' +
        'Make sure you are using the SVG component from @lay-lay/core.',
    );
  }

  return context;
};
