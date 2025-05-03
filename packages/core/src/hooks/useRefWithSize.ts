import type {
  RefObjectWithSize,
  RefProps,
  SVGOrHTMLElement,
} from '../types.ts';
import { useLayoutEffect, useRef, useState } from 'react';

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
