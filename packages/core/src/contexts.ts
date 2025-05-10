import { createContext, useContext } from 'react';

import type { Origin } from './types.ts';

type OriginGetter = () => Origin;

export const GetOriginContext = createContext<OriginGetter | null>(null);

export const useGetOrigin = (): OriginGetter => {
  const contextValue = useContext(GetOriginContext);

  if (contextValue === null) {
    throw new Error(
      'useOrigin must be used within an OriginContext, e.g. SvgOrigin from @lay-lay/core.',
    );
  }

  return contextValue;
};
