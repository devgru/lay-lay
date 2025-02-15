import { RefObject, useRef } from 'react';

export const useCacheRef = <E>(): RefObject<E | undefined> => {
  const cache = useRef<E>(undefined);
  cache.current = undefined;
  return cache;
};
