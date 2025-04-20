import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import type { RefObjectWithBox, RefObjectWithSize, SizeState } from './types';
import type { Size, SVGOrHTMLElement } from './internal/types.ts';
import { useOrigin } from './internal/contexts.ts';

type RefProps = {
  initialValue: number;
};

export const useSizeState = (): SizeState => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const setSize = useCallback(
    (size: Size) => {
      setWidth(size.width);
      setHeight(size.height);
    },
    [setWidth, setHeight],
  );
  return {
    width,
    height,
    setSize,
  };
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
  const getOrigin = useOrigin();

  const [width, updateWidth] = useState<number>(initialValue);
  const [height, updateHeight] = useState<number>(initialValue);
  const [left, updateLeft] = useState<number>(initialValue);
  const [top, updateTop] = useState<number>(initialValue);

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

    const { left, top, width, height } = element.getBoundingClientRect();
    const { x, y } = getOrigin();
    updateWidth(width);
    updateHeight(height);
    updateLeft(left - x);
    updateTop(top - y);
  });

  return internalRef;
};
