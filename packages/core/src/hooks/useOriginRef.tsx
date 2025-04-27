import { useWrapRef } from './useWrapRef.ts';
import { type Ref, useCallback } from 'react';
import type { Position, SVGOrHTMLElement } from '../types.ts';
import { useCachedCallback } from './useCachedCallback.ts';

export const useOriginRef = <T extends SVGOrHTMLElement>(ref?: Ref<T>) => {
  const { innerRef, mergedRef } = useWrapRef(ref);

  const getOrigin = useCallback((): Position => {
    const element = innerRef.current;
    if (!element) {
      return { x: 0, y: 0 };
    }
    return element.getBoundingClientRect();
  }, []);
  const getOriginCached = useCachedCallback(getOrigin);

  return { originRef: mergedRef, getOrigin: getOriginCached };
};
