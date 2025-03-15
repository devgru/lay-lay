import type { FC } from 'react';
import React, { Children, useCallback, useRef, useState } from 'react';
import type { HtmlProps, StackLayoutProps, SvgProps } from './types.ts';
import { StackElement } from './internal/components.tsx';
import type { Size } from './internal/types.ts';
import { positionCounter } from './internal/util.tsx';
import { useRootRef } from './hooks.ts';

export const SVG: FC<SvgProps> = ({
  children,
  ref = useRef(null),
  ...props
}) => {
  useRootRef(ref);

  return (
    <svg {...props} ref={ref}>
      {children}
    </svg>
  );
};

export const HTML: FC<HtmlProps> = ({
  children,
  ref = useRef(null),
  ...props
}) => (
  <foreignObject {...props}>
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  </foreignObject>
);

export const StackLayout: FC<StackLayoutProps> = ({
  stackDirection,
  children,
}) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const getPosition = positionCounter(stackDirection, sizes);

  const handleSizeChange = useCallback((index: number, newSize: Size) => {
    setSizes((prev) => {
      const next = [...prev];
      next[index] = newSize;
      return next;
    });
  }, []);

  return (
    <>
      {Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        return (
          <StackElement
            key={index}
            index={index}
            onSizeChange={handleSizeChange}
            position={getPosition(index)}
          >
            {child}
          </StackElement>
        );
      })}
    </>
  );
};
