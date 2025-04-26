import { type FC, useLayoutEffect, useRef, useState } from 'react';
import type { HtmlProps } from '../types.ts';
import { useMergeRefs } from '../hooks/useMergeRefs.ts';

export const HtmlWrapper: FC<HtmlProps> = ({ children, ref, ...props }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergeRefs(ref, innerRef);

  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (innerRef.current === null) {
      return;
    }
    setHeight(innerRef.current.offsetHeight);
  });

  return (
    <foreignObject {...props} height={height}>
      <div ref={mergedRef} style={{ overflow: 'hidden' }}>
        {children}
      </div>
    </foreignObject>
  );
};