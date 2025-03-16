import type { FC } from 'react';
import React, {
  Children,
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import type { HtmlProps, StackLayoutProps, SvgProps } from './types.ts';
import { StackElement } from './internal/components.tsx';
import type { Size } from './internal/types.ts';
import { positionAccumulator } from './internal/util.tsx';
import { useCacheRef } from './internal/hooks.ts';
import { OriginContext } from './contexts.ts';

export const SVG: FC<SvgProps> = ({
  children,
  ref = useRef(null),
  ...props
}) => {
  const rectCache = useCacheRef<DOMRect>();
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);

  useLayoutEffect(() => {
    if (ref.current === null || rectCache.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    rectCache.current = rect;
    setOriginX(rect.left);
    setOriginY(rect.top);
  });

  return (
    <svg {...props} ref={ref}>
      <OriginContext.Provider value={{ x: originX, y: originY }}>
        {children}
      </OriginContext.Provider>
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
  const getPosition = positionAccumulator(stackDirection, sizes);

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
