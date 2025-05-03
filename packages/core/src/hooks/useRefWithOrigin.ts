import type {
  RefObjectWithOrigin,
  RefProps,
  SVGOrHTMLElement,
} from '../types.ts';
import { useLayoutEffect, useRef, useState } from 'react';
import { useOrigin } from '../contexts.ts';

export const useRefWithOrigin = <E extends SVGOrHTMLElement>(
  props?: Partial<RefProps>,
): RefObjectWithOrigin<E> => {
  const ref = useRef(null);
  const initialValue = props?.initialValue ?? 0;
  const getOrigin = useOrigin();

  const [x, updateX] = useState<number>(initialValue);
  const [y, updateY] = useState<number>(initialValue);

  const internalRef: RefObjectWithOrigin<E> = ref as RefObjectWithOrigin<E>;
  internalRef.x = x;
  internalRef.y = y;

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
