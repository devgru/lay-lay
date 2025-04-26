import { type FC, useCallback } from 'react';
import type { Position, SvgProps } from '../types.ts';
import { useWrapRef } from '../hooks/useWrapRef.ts';
import { OriginContext } from '../contexts.ts';
import { useCachedCallback } from '../hooks/useCachedCallback.ts';

export const SvgOrigin: FC<SvgProps> = ({ children, ref, ...props }) => {
  const { innerRef, mergedRef } = useWrapRef(ref);

  const getOrigin = useCallback((): Position => {
    const element = innerRef.current;
    if (!element) {
      return { x: 0, y: 0 };
    }
    return element.getBoundingClientRect();
  }, []);
  const getOriginCached = useCachedCallback(getOrigin);

  return (
    <svg {...props} ref={mergedRef}>
      <OriginContext.Provider value={getOriginCached}>
        {children}
      </OriginContext.Provider>
    </svg>
  );
};
