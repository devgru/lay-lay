import { useLayoutEffect, useState } from 'react';
import type { FC } from 'react';
import { useRefWithSize } from '../hooks.ts';
import type { StackElementProps } from './types.ts';

const DOM_EPSILON = 0.01;

export const StackElement: FC<StackElementProps> = ({
  index,
  onSizeChange,
  children,
  position,
}) => {
  const ref = useRefWithSize<SVGGElement>();
  const { x, y } = position;

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
      onSizeChange(index, {
        width: ref.width,
        height: ref.height,
      });
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
      <g ref={ref}>
        {children}
      </g>
    </g>
  );
};
