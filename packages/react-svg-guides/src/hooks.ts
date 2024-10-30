import {
  MutableRefObject,
  RefObject,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Guide, GuideArgs, GuidesAttachment, SVGOrHTMLElement } from './types';
import { getCachedRootRect, getSvgRoot } from './util.ts';
import {
  HORIZONTAL_GUIDES_MAP,
  ROOT_RECT_MAP,
  VERTICAL_GUIDES_MAP,
} from './constants.ts';

const NOOP = () => {};

export const useSvgRootRef = <E extends SVGOrHTMLElement>(
  rootRef: RefObject<E> = useRef<E>(null),
): RefObject<E> => {
  ROOT_RECT_MAP.delete(rootRef.current as any);

  return rootRef;
};

export const useRefWithGuidesAttached = <E extends SVGOrHTMLElement>(
  guides: GuidesAttachment,
  ref: RefObject<E> = useRef<E>(null),
): RefObject<E> => {
  useLayoutEffect(() => {
    const element = ref.current;
    if (element == undefined) {
      return;
    }
    const root = getSvgRoot(element);
    const rootRect = getCachedRootRect(root);

    let verticalGuides: Set<Guide>;
    if (VERTICAL_GUIDES_MAP.has(root)) {
      verticalGuides = VERTICAL_GUIDES_MAP.get(root)!;
    } else {
      verticalGuides = new Set<Guide>();
      VERTICAL_GUIDES_MAP.set(root, verticalGuides);
    }
    let horizontalGuides: Set<Guide>;
    if (HORIZONTAL_GUIDES_MAP.has(root)) {
      horizontalGuides = HORIZONTAL_GUIDES_MAP.get(root)!;
    } else {
      horizontalGuides = new Set<Guide>();
      HORIZONTAL_GUIDES_MAP.set(root, horizontalGuides);
    }

    const { left, top, width, height } = element.getBoundingClientRect();
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
      nextGuides = nextGuides.more;
    }
  });

  return ref;
};

export const useGuide = (
  handle: string,
  { defaultValue, setValue }: Partial<GuideArgs> = {},
): Guide => {
  defaultValue = defaultValue ?? 0;
  setValue = setValue ?? NOOP;

  // store actual value
  const ref = useRef<number>(defaultValue);

  // force rerender when value changes
  const [, updateIfChanged] = useState<number>(defaultValue);

  const id = useId();

  const guideRef: MutableRefObject<Guide | null> = useRef<Guide>(null);

  if (guideRef.current === null) {
    function guide(): number;
    function guide(value: number): void;
    function guide(value?: number) {
      if (value === undefined) {
        return ref.current;
      }
      ref.current = value;
      if (setValue) {
        setValue(value, handle);
      }
      updateIfChanged(value);
    }

    guide.id = id;
    guide.handle = handle;
    guideRef.current = guide;
  }

  return guideRef.current;
};

export const useGuides = (
  args?: GuideArgs,
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
