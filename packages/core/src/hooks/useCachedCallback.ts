import { useCallback, useRef } from 'react';

export const useCachedCallback = <E>(cb: () => E): (() => E) => {
  const cache = useRef<E>(undefined);
  cache.current = undefined;
  return useCallback(() => {
    if (cache.current === undefined) {
      cache.current = cb();
    }
    return cache.current;
  }, [cb]);
};