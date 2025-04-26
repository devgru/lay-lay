import { type FC, useCallback, useRef } from 'react';
import type { Position, SvgProps } from '../types.ts';
import { useMergeRefs } from '../hooks/useMergeRefs.ts';
import { OriginContext } from '../contexts.ts';
import { useCachedCallback } from '../hooks/useCachedCallback.ts';

export const SVG: FC<SvgProps> = ({ children, ref, ...props }) => {
  const innerRef = useRef<SVGSVGElement>(null);
  const mergedRef = useMergeRefs(ref, innerRef);

  const cb = useCallback((): Position => {
    const element = innerRef.current;
    if (!element) {
      return { x: 0, y: 0 };
    }
    return element.getBoundingClientRect();
  }, []);
  const getOrigin = useCachedCallback(cb);

  return (
    <svg {...props} ref={mergedRef}>
      <OriginContext.Provider value={getOrigin}>
        {children}
      </OriginContext.Provider>
    </svg>
  );
};
