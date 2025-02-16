import type { FC } from 'react';
import React, {
  Children,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { RequestRootRectAccessorEvent } from './internal/events.ts';
import { REQUEST_ROOT_RECT_ACCESSOR_EVENT } from './internal/constants.ts';
import { HtmlProps, StackLayoutProps, SvgProps } from './types.ts';
import { useCacheRef } from './internal/hooks.ts';
import { StackElement } from './internal/components.tsx';
import { Size } from './internal/types.ts';
import { positionCounter } from './internal/util.tsx';

export const SVG: FC<SvgProps> = ({
  children,
  ref = useRef(null),
  ...props
}) => {
  const rootRectCache = useCacheRef<DOMRect>();

  useLayoutEffect(() => {
    const rootSvg = ref.current!;

    const handleGuidesStateRequest = (e: Event) => {
      if (!(e instanceof RequestRootRectAccessorEvent)) {
        return;
      }

      e.callback(() => {
        if (!rootRectCache.current) {
          rootRectCache.current = rootSvg.getBoundingClientRect();
        }

        return rootRectCache.current;
      });

      e.stopPropagation();
    };

    rootSvg.addEventListener(
      REQUEST_ROOT_RECT_ACCESSOR_EVENT,
      handleGuidesStateRequest,
    );
    return () =>
      rootSvg.removeEventListener(
        REQUEST_ROOT_RECT_ACCESSOR_EVENT,
        handleGuidesStateRequest,
      );
  }, []);

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
    setSizes(prev => {
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
