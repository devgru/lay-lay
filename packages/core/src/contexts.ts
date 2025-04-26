import { createContext, useContext } from 'react';

import type { Position } from './types.ts';

type OriginGetter = () => Position;

export const OriginContext = createContext<OriginGetter | null>(null);

export const useOrigin = (): OriginGetter => {
  const context = useContext(OriginContext);

  if (context === null) {
    throw new Error(
      'useOrigin must be used within an OriginContext.Provider, e.g. SvgOrigin from @lay-lay/core.'
    );
  }

  return context;
};
