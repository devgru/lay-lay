import { type FC, isValidElement } from 'react';
import {
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
import { OriginContext } from './contexts.ts';
import { useMergeRefs } from './internal/hooks.ts';

export const SVG: FC<SvgProps> = ({
  children,
  ref,
  ...props
}) => {
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);

  const innerRef = useRef<SVGSVGElement>(null);
  const mergedRef = useMergeRefs([
    ref,
    innerRef,
  ]);

  useLayoutEffect(() => {
    if (innerRef.current === null) {
      return;
    }
    const rect = innerRef.current.getBoundingClientRect();
    setOriginX(rect.left);
    setOriginY(rect.top);
  });

  return (
    <svg {...props} ref={mergedRef}>
      <OriginContext.Provider value={{ x: originX, y: originY }}>
        {children}
      </OriginContext.Provider>
    </svg>
  );
};

export const HTML: FC<HtmlProps> = ({ children, ref, ...props }) => (
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
        if (!isValidElement(child)) return null;

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
