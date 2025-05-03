import { useWrapRef } from './useWrapRef.ts';
import { type Ref, useCallback, useLayoutEffect, useState } from 'react';
import type { Origin, SVGOrHTMLElement } from '../types.ts';
import { useCachedCallback } from './useCachedCallback.ts';

export const useOriginRef = <T extends SVGOrHTMLElement>(ref?: Ref<T>) => {
  const { innerRef, mergedRef } = useWrapRef(ref);

  const getOrigin = useCallback((): Origin => {
    const element = innerRef.current;
    if (!element) {
      throw new Error('getOrigin called before element is available in ref');
    }
    return element.getBoundingClientRect();
  }, []);
  const getOriginCached = useCachedCallback(getOrigin);

  const [refReady, setRefReady] = useState(false);
  useLayoutEffect(() => {
    setRefReady(true);
  }, []);

  return {
    originRef: mergedRef,
    getOrigin: getOriginCached,
    refReady,
  };
};
