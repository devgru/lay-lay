import type {
  RefObjectWithBox,
  RefObjectWithFilledBox,
  SVGOrHTMLElement,
} from '../types.ts';
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

  const refWithBox: RefObjectWithBox<E> = ref as RefObjectWithBox<E>;
  if (refWithBox.box === undefined) {
    if (
      width !== undefined &&
      height !== undefined &&
      left !== undefined &&
      top !== undefined
    ) {
      const filledRef = refWithBox as unknown as RefObjectWithFilledBox<E>;
      filledRef.size = { width, height };
      filledRef.box = {
        left: left,
        horizontalCenter: left + width / 2,
        right: left + width,
        top: top,
        verticalCenter: top + height / 2,
        bottom: top + height,
      };
    }
  } else {
    refWithBox.size.width = width!;
    refWithBox.size.height = height!;
    refWithBox.box.left = left!;
    refWithBox.box.horizontalCenter = left! + width! / 2;
    refWithBox.box.right = left! + width!;
    refWithBox.box.top = top!;
    refWithBox.box.verticalCenter = top! + height! / 2;
    refWithBox.box.bottom = top! + height!;
  }

  useLayoutEffect(() => {
    const element = refWithBox.current;
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

  return refWithBox;
};
