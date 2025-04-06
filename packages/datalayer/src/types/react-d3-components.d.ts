declare module 'react-d3-components/lib/Axis' {
  import { FC } from 'react';
  import { ScaleLinear, ScaleTime } from 'd3-scale';

  type AxisScale = ScaleLinear<number, number> | ScaleTime<Date, number>;

  interface AxisProps {
    scale: AxisScale;
    width: number;
    height: number;
    outerTickSize?: number;
    innerTickSize?: number;
    orientation: 'top' | 'right' | 'bottom' | 'left';
    tickPadding?: number;
    ticks?: number;
    tickFormat?: (value: number | Date) => string;
    tickValues?: (number | Date)[];
    className?: string;
  }

  const Axis: FC<AxisProps>;

  export default Axis;
}
