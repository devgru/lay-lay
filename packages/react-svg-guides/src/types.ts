import type { ReactNode, RefObject, SVGAttributes } from 'react';

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
  ref?: RefObject<HTMLDivElement | null>;
}

export interface SvgProps extends SVGAttributes<SVGSVGElement> {
  ref?: RefObject<SVGSVGElement | null>;
}

export type StackDirection = 'horizontal' | 'vertical';

export interface StackLayoutProps {
  children: ReactNode;
  stackDirection: StackDirection;
}
