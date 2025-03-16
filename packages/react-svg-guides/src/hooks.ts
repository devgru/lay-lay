import { useLayoutEffect, useRef, useState } from 'react';

import type { NullableRef, RefObjectWithBox, RefObjectWithSize } from './types';
import {
  requestRootRectAccessor,
  RequestRootRectAccessorEvent,
} from './internal/events.ts';
import type { GetRootRect, SVGOrHTMLElement } from './internal/types.ts';
import { useCacheRef } from './internal/hooks.ts';
import { REQUEST_ROOT_RECT_ACCESSOR_EVENT } from './internal/constants.ts';

type RefProps = {
  initialValue: number;
};

export const useRootRef = <E extends SVGOrHTMLElement>(
  ref: NullableRef<E> = useRef(null),
): NullableRef<E> => {
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

  return ref;
};

export const useRefWithSize = <E extends SVGOrHTMLElement>(
  props?: Partial<RefProps>,
): RefObjectWithSize<E> => {
  const ref = useRef(null);
  const initialValue = props?.initialValue ?? 0;

  const [width, updateWidth] = useState<number>(initialValue);
  const [height, updateHeight] = useState<number>(initialValue);
  const internalRef: RefObjectWithSize<E> = ref as RefObjectWithSize<E>;
  internalRef.width = width;
  internalRef.height = height;

  useLayoutEffect(() => {
    const element = internalRef.current;
    if (element === null) {
      return;
    }

    const { width, height } = element.getBoundingClientRect();

    updateWidth(width);
    updateHeight(height);
  });

  return internalRef;
};

export const useRefWithBox = <E extends SVGOrHTMLElement>(
  props?: Partial<RefProps>,
): RefObjectWithBox<E> => {
  const ref = useRef(null);
  const initialValue = props?.initialValue ?? 0;

  const [width, updateWidth] = useState<number>(initialValue);
  const [height, updateHeight] = useState<number>(initialValue);
  const [left, updateLeft] = useState<number>(initialValue);
  const [top, updateTop] = useState<number>(initialValue);

  const getRootRectRef = useRef<GetRootRect | null>(null);
  const internalRef: RefObjectWithBox<E> = ref as RefObjectWithBox<E>;
  internalRef.width = width;
  internalRef.height = height;
  internalRef.left = left;
  internalRef.horizontalCenter = left + width / 2;
  internalRef.right = left + width;
  internalRef.top = top;
  internalRef.verticalCenter = top + height / 2;
  internalRef.bottom = top + height;

  useLayoutEffect(() => {
    const element = internalRef.current;
    if (element === null) {
      return;
    }

    if (getRootRectRef.current === null) {
      requestRootRectAccessor(element, (getRootRect) => {
        getRootRectRef.current = getRootRect;
      });
      if (getRootRectRef.current === null) {
        getRootRectRef.current = () => null;
      }
    }

    const { left, top, width, height } = element.getBoundingClientRect();
    const rootRect = getRootRectRef.current();
    const x = left - (rootRect?.left ?? 0);
    const y = top - (rootRect?.top ?? 0);

    updateWidth(width);
    updateHeight(height);
    updateLeft(x);
    updateTop(y);
  });

  return internalRef;
};
