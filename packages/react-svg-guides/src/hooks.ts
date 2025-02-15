import { RefObject, useLayoutEffect, useRef, useState } from 'react';

import {
  RefObjectWithBox,
  RefObjectWithSize,

} from './types';
import { requestRootRectAccessor } from './internal/events.ts';
import { GetRootRect, SVGOrHTMLElement } from './internal/types.ts';

type RefProps<E> = {
  ref: RefObject<E | null>;
  initialValue: number;
};

export const useRefWithSize = <E extends SVGOrHTMLElement>(
  props?: Partial<RefProps<E>>,
): RefObjectWithSize<E> => {
  const ref = props?.ref ?? useRef(null);
  const initialValue = props?.initialValue ?? 0;

  const [width, updateWidth] = useState<number>(initialValue);
  const [height, updateHeight] = useState<number>(initialValue);
  const internalRef: RefObjectWithSize<E> = ref as any as RefObjectWithSize<E>;
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
  props?: Partial<RefProps<E>>,
): RefObjectWithBox<E> => {
  const ref = props?.ref ?? useRef(null);
  const initialValue = props?.initialValue ?? 0;

  const [width, updateWidth] = useState<number>(initialValue);
  const [height, updateHeight] = useState<number>(initialValue);
  const [left, updateLeft] = useState<number>(initialValue);
  const [horizontalCenter, updateHorizontalCenter] =
    useState<number>(initialValue);
  const [right, updateRight] = useState<number>(initialValue);
  const [top, updateTop] = useState<number>(initialValue);
  const [verticalCenter, updateVerticalCenter] = useState<number>(initialValue);
  const [bottom, updateBottom] = useState<number>(initialValue);

  const getRootRectRef = useRef<GetRootRect | null>(null);
  const internalRef: RefObjectWithBox<E> = ref as any as RefObjectWithBox<E>;
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
