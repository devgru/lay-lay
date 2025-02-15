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
import {
  HtmlProps,
  StackDirection,
  StackLayoutProps,
  SvgProps,
} from './types.ts';
import { useCacheRef } from './internal/hooks.ts';
import { StackElement } from './internal/components.tsx';
import { Size } from './internal/types.ts';

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
    <div ref={ref}>{children}</div>
  </foreignObject>
);

const positionCounter = (stackDirection: StackDirection, sizes: Size[]) => {
  let currentOffset = 0;

  return (index: number) => {
    const position =
      stackDirection === 'horizontal'
        ? { x: currentOffset, y: 0 }
        : { x: 0, y: currentOffset };

    const size = sizes[index];
    if (size) {
      currentOffset +=
        stackDirection === 'horizontal' ? size.width : size.height;
    }

    return position;
  };
};

export const StackLayout: FC<StackLayoutProps> = ({
  stackDirection,
  children,
  ...props
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
    <svg {...props}>
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
    </svg>
  );
};
