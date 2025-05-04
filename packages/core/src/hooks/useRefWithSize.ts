import type { RefObjectWithSize, SVGOrHTMLElement } from '../types.ts';
import { useLayoutEffect, useRef, useState } from 'react';

export const useRefWithSize = <
  E extends SVGOrHTMLElement,
>(): RefObjectWithSize<E> => {
  const ref = useRef(null);

  const [width, updateWidth] = useState<number | undefined>();
  const [height, updateHeight] = useState<number | undefined>();
  const internalRef: RefObjectWithSize<E> = ref as RefObjectWithSize<E>;
  if (internalRef.size === undefined) {
    if (width !== undefined && height !== undefined) {
      internalRef.size = { width, height };
    }
  } else {
    internalRef.size.width = width!;
    internalRef.size.height = height!;
  }

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
