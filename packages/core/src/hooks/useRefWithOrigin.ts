import type { RefObjectWithOrigin, SVGOrHTMLElement } from '../types.ts';
import { useLayoutEffect, useRef, useState } from 'react';
import { useOrigin } from '../contexts.ts';

export const useRefWithOrigin = <
  E extends SVGOrHTMLElement,
>(): RefObjectWithOrigin<E> => {
  const ref = useRef(null);
  const getOrigin = useOrigin();

  const [x, updateX] = useState<number | undefined>(undefined);
  const [y, updateY] = useState<number | undefined>(undefined);

  const internalRef: RefObjectWithOrigin<E> = ref as RefObjectWithOrigin<E>;
  if (internalRef.origin === undefined) {
    if (x !== undefined && y !== undefined) {
      internalRef.origin = { x, y };
    }
  } else {
    internalRef.origin.x = x!;
    internalRef.origin.y = y!;
  }

  useLayoutEffect(() => {
    const element = internalRef.current;
    if (element === null) {
      return;
    }

    const { left, top } = element.getBoundingClientRect();
    const { x, y } = getOrigin();
    updateX(left - x);
    updateY(top - y);
  });

  return internalRef;
};
