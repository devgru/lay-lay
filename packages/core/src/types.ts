import type { HTMLAttributes, Ref, RefObject, SVGAttributes } from 'react';

export type NullableRefObject<E> = RefObject<E | null>;

export type RefObjectWithSize<E> = NullableRefObject<E> & {
  size?: Size;
};

export type RefObjectWithBox<E> = RefObjectWithSize<E> & {
  box?: Box;
};

export interface HtmlWrapperProps
  extends Omit<SVGAttributes<SVGForeignObjectElement>, 'height'> {
  ref?: Ref<HTMLDivElement>;
  width: number | string;
}

export interface HtmlOriginProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface SvgOriginProps extends SVGAttributes<SVGSVGElement> {
  ref?: Ref<SVGSVGElement>;
}

export interface Size {
  width: number;
  height: number;
}

export interface Box {
  left: number;
  horizontalCenter: number;
  right: number;
  top: number;
  verticalCenter: number;
  bottom: number;
}

export interface Origin {
  x: number;
  y: number;
}

export type SizeSetter = (width: number, height: number) => void;

export type SizeObserver = {
  width: number | undefined;
  height: number | undefined;
  setSize: SizeSetter;
};

export type SVGOrHTMLElement = SVGElement | HTMLElement;
