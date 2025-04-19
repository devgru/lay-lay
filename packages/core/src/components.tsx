import {
  type FC,
  isValidElement,
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

export const SVG: FC<SvgProps> = ({ children, ref, ...props }) => {
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);

  const innerRef = useRef<SVGSVGElement>(null);
  const mergedRef = useMergeRefs([ref, innerRef]);

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

export const HTML: FC<HtmlProps> = ({ children, ref, ...props }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergeRefs([ref, innerRef]);

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

export const StackLayout: FC<StackLayoutProps> = ({
  stackDirection,
  sizeState,
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

  useLayoutEffect(() => {
    const sumBy = (key: keyof Size) => {
      let sum = 0;
      for (const size of sizes) {
        sum += size[key];
      }
      return sum;
    };

    const maxBy = (key: keyof Size) => {
      let max = 0;
      for (const size of sizes) {
        if (size[key] > max) {
          max = size[key];
        }
      }
      return max;
    };
    if (sizeState) {
      if (stackDirection === 'horizontal') {
        sizeState.setSize({
          width: sumBy('width'),
          height: maxBy('height'),
        });
      } else {
        sizeState.setSize({
          width: maxBy('width'),
          height: sumBy('height'),
        });
      }
    }
  });

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
