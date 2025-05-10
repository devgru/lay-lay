import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { DOM_EPSILON } from '../constants.ts';

export const NegateOffset = ({ children }: { children: ReactNode }) => {
  const ref = useRef<SVGGElement | null>(null);

  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);

  useLayoutEffect(() => {
    if (ref.current === null) {
      return;
    }

    const ctm = ref.current.getScreenCTM();
    if (ctm === null) {
      return;
    }
    const { x, y } = ref.current.getBoundingClientRect();
    const newOffsetX = ctm.e - x;
    const newOffsetY = ctm.f - y;
    const isOffsetXDeltaSmall = Math.abs(offsetX - newOffsetX) < DOM_EPSILON;
    const isOffsetYDeltaSmall = Math.abs(offsetY - newOffsetY) < DOM_EPSILON;
    if (!isOffsetXDeltaSmall || !isOffsetYDeltaSmall) {
      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
    }
  });

  return (
    <g ref={ref} transform={`translate(${offsetX} ${offsetY})`}>
      {children}
    </g>
  );
};
