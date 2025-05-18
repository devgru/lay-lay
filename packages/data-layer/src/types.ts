import type { ScaleLinear, ScaleTime } from 'd3-scale';
import type { ReactNode } from 'react';

export type Scale = ScaleLinear<number, number> | ScaleTime<Date, number>;

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ChartProps {
  children: ReactNode;
  width?: number;
  height?: number;
  margin?: Margin;
  xDomain?: [number, number];
  yDomain?: [number, number];
}
