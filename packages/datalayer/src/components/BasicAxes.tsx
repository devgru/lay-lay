import type { FC } from 'react';
import Axis from 'react-d3-components/lib/Axis';
import { useScales } from '../contexts/ScalesContext.tsx';

interface BasicAxesProps {
  width: number;
  height: number;
  xPadding: number;
  yPadding: number;
}

export const BasicAxes: FC<BasicAxesProps> = ({
  width,
  height,
  xPadding,
  yPadding,
}) => {
  const { xScale, yScale } = useScales();

  return (
    <g>
      <Axis
        scale={xScale}
        width={width}
        height={height}
        outerTickSize={0}
        innerTickSize={-height}
        orientation="bottom"
        tickPadding={yPadding}
      />
      <Axis
        scale={yScale}
        width={width}
        height={height}
        outerTickSize={0}
        innerTickSize={-width}
        orientation="left"
        tickPadding={xPadding}
      />
      <rect width={width} height={height} fill="none" pointerEvents="none" />
    </g>
  );
};
