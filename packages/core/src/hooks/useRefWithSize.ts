import type { RefObjectWithSize, SVGOrHTMLElement } from '../types.ts';
import { useLayoutEffect, useRef, useState } from 'react';

export const useRefWithSize = <
  E extends SVGOrHTMLElement,
>(): RefObjectWithSize<E> => {
  const ref = useRef(null);

  const [width, updateWidth] = useState<number | undefined>();
  const [height, updateHeight] = useState<number | undefined>();
  const refWithSize: RefObjectWithSize<E> = ref as RefObjectWithSize<E>;
  if (refWithSize.size === undefined) {
    if (width !== undefined && height !== undefined) {
      refWithSize.size = { width, height };
    }
  } else {
    refWithSize.size.width = width!;
    refWithSize.size.height = height!;
  }

  useLayoutEffect(() => {
    const element = refWithSize.current;
    if (element === null) {
      return;
    }

    const { width, height } = element.getBoundingClientRect();
    updateWidth(width);
    updateHeight(height);
  });

  return refWithSize;
};
