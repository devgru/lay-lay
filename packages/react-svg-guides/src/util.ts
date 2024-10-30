import { ROOT_RECT_MAP } from './constants.ts';
import { SVGOrHTMLElement } from './types.ts';

export const getSvgRoot = (element: SVGOrHTMLElement): SVGOrHTMLElement => {
  let parent: SVGOrHTMLElement | null = element;
  while (parent !== null && parent.tagName !== 'svg' && parent.dataset) {
    parent = parent.parentElement;
  }
  if (parent === null) {
    throw new Error(
      'Guide can be attached only to an SVG component or its children',
    );
  }
  return parent;
};

export const getCachedRootRect = (root: SVGOrHTMLElement): DOMRect => {
  if (ROOT_RECT_MAP.has(root)) {
    return ROOT_RECT_MAP.get(root)!;
  }

  const rootRect = root.getBoundingClientRect();
  ROOT_RECT_MAP.set(root, rootRect);
  return rootRect;
};
