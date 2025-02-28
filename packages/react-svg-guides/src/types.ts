import type { ReactNode, RefObject, SVGAttributes } from 'react';

export type NullableRef<E> = RefObject<E | null>;

export type RefObjectWithSize<E> = NullableRef<E> & {
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
  ref?: NullableRef<HTMLDivElement>;
}

export interface SvgProps extends SVGAttributes<SVGSVGElement> {
  ref?: NullableRef<SVGSVGElement>;
}

export type StackDirection = 'horizontal' | 'vertical';

export interface StackLayoutProps {
  children: ReactNode;
  stackDirection: StackDirection;
}
