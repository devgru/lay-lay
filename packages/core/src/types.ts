import type {
  ReactNode,
  Ref,
  RefObject,
  SVGAttributes
} from 'react';
import type { Size } from './internal/types.ts';

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

export type SizeState = Size & {
  setSize: (size: Size) => void;
};
