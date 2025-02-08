import { RefObject, useLayoutEffect, useRef, useState } from 'react';

import {
  GetRootRect,
  RefObjectWithBox,
  RefObjectWithSize,
  SVGOrHTMLElement,
} from './types';
import { requestRootRectAccessor } from './events.tsx';

export const useRefWithSize = <E extends SVGOrHTMLElement>(
  ref: RefObject<E | null> = useRef(null),
): RefObjectWithSize<E> => {
  const [width, updateWidth] = useState<number>(0);
  const [height, updateHeight] = useState<number>(0);
  const internalRef: RefObjectWithSize<E> =
    ref as any as RefObjectWithSize<E>;
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
  ref: RefObject<E | null> = useRef(null),
): RefObjectWithBox<E> => {
  const [width, updateWidth] = useState<number>(0);
  const [height, updateHeight] = useState<number>(0);
  const [left, updateLeft] = useState<number>(0);
  const [horizontalCenter, updateHorizontalCenter] = useState<number>(0);
  const [right, updateRight] = useState<number>(0);
  const [top, updateTop] = useState<number>(0);
  const [verticalCenter, updateVerticalCenter] = useState<number>(0);
  const [bottom, updateBottom] = useState<number>(0);

  const getRootRectRef = useRef<GetRootRect | null>(null);
  const internalRef: RefObjectWithBox<E> =
    ref as any as RefObjectWithBox<E>;
  internalRef.width = width;
  internalRef.height = height;
  internalRef.left = left;
  internalRef.horizontalCenter = horizontalCenter;
  internalRef.right = right;
  internalRef.top = top;
  internalRef.verticalCenter = verticalCenter;
  internalRef.bottom = bottom;

  useLayoutEffect(() => {
    const element = internalRef.current;
    if (element === null) {
      return;
    }

    if (getRootRectRef.current === null) {
      requestRootRectAccessor(element, getRootRect => {
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
    updateHorizontalCenter(x + width / 2);
    updateRight(x + width);
    updateTop(y);
    updateVerticalCenter(y + height / 2);
    updateBottom(y + height);
  });

  return internalRef;
};
