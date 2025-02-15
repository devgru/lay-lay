import { useLayoutEffect } from 'react';
import type { FC } from 'react';
import { useRefWithSize } from '../hooks.ts';
import { StackElementProps } from './types.ts';

export const StackElement: FC<StackElementProps> = ({
  index,
  onSizeChange,
  children,
  position,
}) => {
  const ref = useRefWithSize<SVGGElement>();
  const { x, y } = position;

  useLayoutEffect(() => {
    onSizeChange(index, {
      width: ref.width,
      height: ref.height,
    });
  }, [index, ref.width, ref.height, onSizeChange]);

  return (
    <g ref={ref} transform={`translate(${x} ${y})`}>
      {children}
    </g>
  );
};
