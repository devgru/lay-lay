import type { RefObjectWithBox, SVGOrHTMLElement } from '../types.ts';
import { useLayoutEffect, useRef, useState } from 'react';
import { useGetOrigin } from '../contexts.ts';

export const useRefWithBox = <
  E extends SVGOrHTMLElement,
>(): RefObjectWithBox<E> => {
  const ref = useRef(null);
  const getOrigin = useGetOrigin();

  const [width, updateWidth] = useState<number | undefined>();
  const [height, updateHeight] = useState<number | undefined>();
  const [left, updateLeft] = useState<number | undefined>();
  const [top, updateTop] = useState<number | undefined>();

  const internalRef: RefObjectWithBox<E> = ref as RefObjectWithBox<E>;
  if (internalRef.box === undefined || internalRef.size === undefined) {
    if (
      width !== undefined &&
      height !== undefined &&
      left !== undefined &&
      top !== undefined
    ) {
      internalRef.size = { width, height };
      internalRef.box = {
        left: left,
        horizontalCenter: left + width / 2,
        right: left + width,
        top: top,
        verticalCenter: top + height / 2,
        bottom: top + height,
      };
    }
  } else {
    internalRef.size.width = width!;
    internalRef.size.height = height!;
    internalRef.box.left = left!;
    internalRef.box.horizontalCenter = left! + width! / 2;
    internalRef.box.right = left! + width!;
    internalRef.box.top = top!;
    internalRef.box.verticalCenter = top! + height! / 2;
    internalRef.box.bottom = top! + height!;
  }

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
