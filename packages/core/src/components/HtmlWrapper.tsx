import { type FC, useLayoutEffect, useState } from 'react';
import type { HtmlProps } from '../types.ts';
import { useWrapRef } from '../hooks/useWrapRef.ts';

export const HtmlWrapper: FC<HtmlProps> = ({ children, ref, ...props }) => {
  const { innerRef, mergedRef } = useWrapRef(ref);

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
