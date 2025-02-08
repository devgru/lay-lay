import { RefObject } from 'react';

export type RefObjectWithSize<E> = RefObject<E | null> & {
  width: number;
  height: number;
};

export type RefObjectWithBox<E> = RefObjectWithSize<E> & {
  left: number;
  horizontalCenter: number;
  right: number;
  top: number;
  verticalCenter: number;
  bottom: number;
};

export type SVGOrHTMLElement = SVGElement | HTMLElement;

export type GetRootRect = () => DOMRect | null;

export type SetRootRectAccessor = (getRootRect: GetRootRect) => void;
