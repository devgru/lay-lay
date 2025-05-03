import type { FC } from 'react';
import { type ReactNode, useLayoutEffect, useState } from 'react';
import { useRefWithSize } from '../hooks/useRefWithSize.ts';
import type { Origin, Size } from '../types.ts';
import { DOM_EPSILON } from '../constants.ts';

export interface StackElementProps {
  index: number;
  onSizeChange: (index: number, size: Size) => void;
  children: ReactNode;
  origin: Origin;
}

export const StackElement: FC<StackElementProps> = ({
  index,
  onSizeChange,
  children,
  origin,
}) => {
  const ref = useRefWithSize<SVGGElement>();
  const { x, y } = origin;

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
    const { left, top } = ref.current.getBoundingClientRect();
    const isOffsetXDeltaSmall = Math.abs(left - ctm.e - offsetX) < DOM_EPSILON;
    const isOffsetYDeltaSmall = Math.abs(top - ctm.f - offsetY) < DOM_EPSILON;
    if (!isOffsetXDeltaSmall || !isOffsetYDeltaSmall) {
      setOffsetX(left - ctm.e);
      setOffsetY(top - ctm.f);
    }
  });

  useLayoutEffect(() => {
    onSizeChange(index, {
      width: ref.width,
      height: ref.height,
    });
  }, [index, ref.width, ref.height, onSizeChange]);

  return (
    <g transform={`translate(${x} ${y}) translate(${-offsetX} ${-offsetY})`}>
      <g ref={ref}>{children}</g>
    </g>
  );
};
