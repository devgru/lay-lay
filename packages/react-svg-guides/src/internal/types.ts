import type { ReactNode } from 'react';

export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface StackElementProps {
  index: number;
  onSizeChange: (index: number, size: Size) => void;
  children: ReactNode;
  position: Position;
}

export type SVGOrHTMLElement = SVGElement | HTMLElement;

export type GetRootRect = () => DOMRect | null;

export type SetRootRectAccessor = (getRootRect: GetRootRect) => void;
