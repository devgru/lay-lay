import {
  Children,
  type FC,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { HtmlProps, StackLayoutProps, SvgProps } from './types.ts';
import { StackElement } from './internal/components.tsx';
import type { Position, Size } from './internal/types.ts';
import { positionAccumulator } from './internal/util.tsx';
import { useCachedCallback, useMergeRefs } from './internal/hooks.ts';
import { OriginContext } from './internal/contexts.ts';

export const SVG: FC<SvgProps> = ({ children, ref, ...props }) => {
  const innerRef = useRef<SVGSVGElement>(null);
  const mergedRef = useMergeRefs(ref, innerRef);

  const cb = useCallback((): Position => {
    const element = innerRef.current;
    if (!element) {
      return { x: 0, y: 0 };
    }
    return element.getBoundingClientRect()
  }, []);
  const getOrigin = useCachedCallback(cb);

  return (
    <svg {...props} ref={mergedRef}>
      <OriginContext.Provider value={getOrigin}>
        {children}
      </OriginContext.Provider>
    </svg>
  );
};

export const HTML: FC<HtmlProps> = ({ children, ref, ...props }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergeRefs(ref, innerRef);

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
