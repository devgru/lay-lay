import type { ReactNode, Ref, RefObject, SVGAttributes } from 'react';

export type RefProps = {
  initialValue: number;
};

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

export interface HtmlProps extends SVGAttributes<SVGForeignObjectElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface SvgProps extends SVGAttributes<SVGSVGElement> {
  ref?: Ref<SVGSVGElement>;
}

export type StackDirection = 'horizontal' | 'vertical';

export interface StackLayoutProps {
  children: ReactNode;
  stackDirection: StackDirection;
  sizeState?: SizeState;
}

export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export type SizeState = Size & {
  setSize: (size: Size) => void;
};
export type SVGOrHTMLElement = SVGElement | HTMLElement;