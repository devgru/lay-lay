import type {
  GuideAttachment,
  RefObjectWithGuide,
  SVGOrHTMLElement,
} from '../types.ts';
import { useLayoutEffect, useRef, useState } from 'react';
import { useGetOrigin } from '../contexts.ts';

export const useRefWithGuide = <E extends SVGOrHTMLElement>(
  guideAttachment: GuideAttachment,
): RefObjectWithGuide<E> => {
  const ref = useRef(null);
  const getOrigin = useGetOrigin();

  const [guide, updateGuide] = useState<number | undefined>();

  const internalRef: RefObjectWithGuide<E> = ref as RefObjectWithGuide<E>;
  if (internalRef.guide === undefined) {
    if (guide !== undefined) {
      internalRef.guide = guide;
    }
  } else {
    internalRef.guide = guide;
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
    switch (guideAttachment) {
      case 'left':
        updateGuide(offsetLeft);
        break;
      case 'horizontalCenter':
        updateGuide(offsetLeft + width / 2);
        break;
      case 'right':
        updateGuide(offsetLeft + width);
        break;
      case 'top':
        updateGuide(offsetTop);
        break;
      case 'verticalCenter':
        updateGuide(offsetTop + height / 2);
        break;
      case 'bottom':
        updateGuide(offsetTop + height);
        break;
    }
  });

  return internalRef;
};
