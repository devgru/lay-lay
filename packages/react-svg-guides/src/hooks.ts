import { RefObject, useId, useLayoutEffect, useRef, useState } from 'react';

import {
  Guide,
  GuideArgs,
  GuidesAttachment,
  GuidesState,
  SVGOrHTMLElement,
} from './types';
import { requestGuidesState } from './events.tsx';

export const useRefWithGuidesAttached = <E extends SVGOrHTMLElement>(
  guides: GuidesAttachment,
  ref: RefObject<E | null> = useRef<E>(null),
): RefObject<E | null> => {
  const guidesStateRef = useRef<GuidesState | null>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (element === null) {
      return;
    }
    if (guidesStateRef.current === null) {
      requestGuidesState(element, guidesState => {
        guidesStateRef.current = guidesState;
      });
      if (guidesStateRef.current === null) {
        return;
      }
    }

    const { getRootRect, verticalGuides, horizontalGuides } = guidesStateRef.current;
    const rootRect = getRootRect();
    const elementRect = element.getBoundingClientRect();
    const { left, top, width, height } = elementRect;
    const x = left - rootRect.left;
    const y = top - rootRect.top;

    let nextGuides: GuidesAttachment | undefined = guides;
    while (nextGuides !== undefined) {
      if (nextGuides.left) {
        nextGuides.left(x);
        verticalGuides.add(nextGuides.left);
      }
      if (nextGuides.horizontalCenter) {
        nextGuides.horizontalCenter(x + width / 2);
        verticalGuides.add(nextGuides.horizontalCenter);
      }
      if (nextGuides.right) {
        nextGuides.right(x + width);
        verticalGuides.add(nextGuides.right);
      }
      if (nextGuides.top) {
        nextGuides.top(y);
        horizontalGuides.add(nextGuides.top);
      }
      if (nextGuides.verticalCenter) {
        nextGuides.verticalCenter(y + height / 2);
        horizontalGuides.add(nextGuides.verticalCenter);
      }
      if (nextGuides.bottom) {
        nextGuides.bottom(y + height);
        horizontalGuides.add(nextGuides.bottom);
      }
      if (nextGuides.width) {
        nextGuides.width(width);
        verticalGuides.add(nextGuides.width);
      }
      if (nextGuides.height) {
        nextGuides.height(height);
        horizontalGuides.add(nextGuides.height);
      }
      nextGuides = nextGuides.more;
    }
  });

  return ref;
};

export const useGuide = (
  handle: string,
  { setValue, defaultValue = 0 }: Partial<GuideArgs> = {},
): Guide => {
  const ref = useRef<number>(defaultValue);
  const [, updateIfChanged] = useState<number>(defaultValue);
  const id = useId();
  const guideRef: RefObject<Guide | null> = useRef<Guide>(null);

  if (guideRef.current === null) {
    function guide(): number;
    function guide(value: number): void;
    function guide(value?: number) {
      if (value === undefined) {
        return ref.current;
      }
      ref.current = value;
      setValue?.(value, handle);
      updateIfChanged(value);
    }

    guide.id = id;
    guide.handle = handle;
    guideRef.current = guide;
  }

  return guideRef.current;
};

export const useGuides = (
  args?: Partial<GuideArgs>,
): {
  [key: string]: Guide;
} =>
  new Proxy(
    {},
    {
      get(_, name) {
        return typeof name === 'string' ? useGuide(name, args) : undefined;
      },
    },
  );
