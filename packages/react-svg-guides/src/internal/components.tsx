import { useLayoutEffect, useState } from 'react';
import type { FC } from 'react';
import { useRefWithSize } from '../hooks.ts';
import type { StackElementProps } from './types.ts';

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
    if (ref.current) {
      const ctm = ref.current.getScreenCTM();
      if (ctm !== null) {
        const { left, top } = ref.current.getBoundingClientRect();

        setOffsetX(ctm.e - left);
        setOffsetY(ctm.f - top);
      }
    }
  });

  useLayoutEffect(() => {
    onSizeChange(index, {
      width: ref.width,
      height: ref.height,
    });
  }, [index, ref.width, ref.height, onSizeChange]);

  return (
    <g transform={`translate(${x} ${y})`}>
      <g ref={ref} transform={`translate(${offsetX} ${offsetY})`}>
        {children}
      </g>
    </g>
  );
};
