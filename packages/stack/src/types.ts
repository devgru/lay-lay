import type { ReactNode } from 'react';

export type StackOrientation = 'horizontal' | 'vertical';

export interface StackProps {
  children: ReactNode;
  stackOrientation: StackOrientation;
  onSizeCalculated?: (width: number, height: number) => void;
}
