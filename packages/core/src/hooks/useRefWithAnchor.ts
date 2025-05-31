import type {
  HorizontalAttachment,
  RefObjectWithAnchor,
  SVGOrHTMLElement,
  VerticalAttachment,
} from '../types.ts';
import { useLayoutEffect, useRef, useState } from 'react';
import { useGetOrigin } from '../contexts.ts';

export const useRefWithAnchor = <E extends SVGOrHTMLElement>(
  horizontalAttachment: HorizontalAttachment,
  verticalAttachment: VerticalAttachment,
): RefObjectWithAnchor<E> => {
  const ref = useRef(null);
  const getOrigin = useGetOrigin();

  const [x, updateX] = useState<number | undefined>();
  const [y, updateY] = useState<number | undefined>();

  const internalRef: RefObjectWithAnchor<E> = ref as RefObjectWithAnchor<E>;
  if (internalRef.anchor === undefined) {
    if (x !== undefined && y !== undefined) {
      internalRef.anchor = { x, y };
    }
  } else {
    internalRef.anchor.x = x!;
    internalRef.anchor.y = y!;
  }

  useLayoutEffect(() => {
    const element = internalRef.current;
    if (element === null) {
      return;
    }

    const { left, top, width, height } = element.getBoundingClientRect();
    const origin = getOrigin();
    const offsetLeft = left - origin.x;
    const offsetTop = top - origin.y;
    switch (horizontalAttachment) {
      case 'left':
        updateX(offsetLeft);
        break;
      case 'center':
        updateX(offsetLeft + width / 2);
        break;
      case 'right':
        updateX(offsetLeft + width);
        break;
    }
    switch (verticalAttachment) {
      case 'top':
        updateY(offsetTop);
        break;
      case 'center':
        updateY(offsetTop + height / 2);
        break;
      case 'bottom':
        updateY(offsetTop + height);
        break;
    }
  });

  return internalRef;
};
