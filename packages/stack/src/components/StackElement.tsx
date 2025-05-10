import { type FC, type ReactNode, useLayoutEffect } from 'react';
import { type Origin, type Size, useRefWithSize } from '@lay-lay/core';

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

  useLayoutEffect(() => {
    if (ref.size) {
      onSizeChange(index, {
        width: ref.size.width,
        height: ref.size.height,
      });
    }
  }, [index, ref.size, ref.size?.width, ref.size?.height, onSizeChange]);

  return (
    <g transform={`translate(${x} ${y})`}>
      <g ref={ref}>{children}</g>
    </g>
  );
};
