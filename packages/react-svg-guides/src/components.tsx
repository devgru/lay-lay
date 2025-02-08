import React, { RefObject, useLayoutEffect, useRef } from 'react';
import { RequestRootRectAccessorEvent } from './events.tsx';
import { REQUEST_ROOT_RECT_ACCESSOR_EVENT } from './constants';

export const SVG = ({
  children,
  ref = useRef(null),
  ...props
}: {
  ref: RefObject<SVGSVGElement | null>;
} & React.SVGAttributes<SVGSVGElement>) => {
  const rootRectCache = useRef<DOMRect>(null);
  rootRectCache.current = null;

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

    rootSvg.addEventListener(REQUEST_ROOT_RECT_ACCESSOR_EVENT, handleGuidesStateRequest);
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

export const HTML = ({
  children,
  ref = useRef(null),
  ...props
}: {
  ref?: RefObject<HTMLDivElement | null>;
} & React.SVGAttributes<SVGForeignObjectElement>) => (
  <foreignObject {...props}>
    <div ref={ref}>{children}</div>
  </foreignObject>
);
