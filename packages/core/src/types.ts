import type {
  HTMLAttributes,
  ReactNode,
  Ref,
  RefObject,
  SVGAttributes,
} from 'react';

export type RefProps = {
  initialValue: number;
};

export type NullableRefObject<E> = RefObject<E | null>;

export type RefObjectWithSize<E> = NullableRefObject<E> & Size;

export type RefObjectWithBox<E> = NullableRefObject<E> & Box;

export interface HtmlWrapperProps
  extends SVGAttributes<SVGForeignObjectElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface HtmlOriginProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface SvgOriginProps extends SVGAttributes<SVGSVGElement> {
  ref?: Ref<SVGSVGElement>;
}

export type StackDirection = 'horizontal' | 'vertical';

export interface StackProps {
  children: ReactNode;
  stackDirection: StackDirection;
  sizeState?: SizeState;
}

export interface Size {
  width: number;
  height: number;
}

export interface Position {
  left: number;
  horizontalCenter: number;
  right: number;
  top: number;
  verticalCenter: number;
  bottom: number;
}

export interface Box extends Size, Position {}

export interface Origin {
  x: number;
  y: number;
}

export type SizeState = Size & {
  setSize: (size: Size) => void;
};
export type SVGOrHTMLElement = SVGElement | HTMLElement;
