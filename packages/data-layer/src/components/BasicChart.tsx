import React from 'react';
import { scaleLinear } from 'd3-scale';

import { Clip } from './Clip.tsx';
import { Offset } from './Offset.tsx';
import { BasicAxes } from './BasicAxes.tsx';
import { ScalesProvider } from '../contexts/ScalesContext.tsx';

import type { ChartProps } from '../types.ts';
import { useContainerSize } from '../contexts/ContainerSizeContext.tsx';

interface BasicChartProps extends ChartProps {
  xPadding?: number;
  yPadding?: number;
  children: React.ReactNode;
}

export const BasicChart: React.FC<BasicChartProps> = ({
  margin = {
    left: 30,
    right: 15,
    top: 10,
    bottom: 40,
  },
  xDomain = [0, 72] as [number, number],
  yDomain = [0, 31] as [number, number],
  xPadding = 3,
  yPadding = 10,
  children,
}) => {
  const { width, height } = useContainerSize();
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear().domain(xDomain).range([0, innerWidth]);
  const yScale = scaleLinear().domain(yDomain).range([innerHeight, 0]);

  return (
    <Offset left={margin.left} top={margin.top}>
      <ScalesProvider xScale={xScale} yScale={yScale}>
        <BasicAxes
          xPadding={xPadding}
          yPadding={yPadding}
          width={innerWidth}
          height={innerHeight}
        />
        <Clip width={innerWidth} height={innerHeight}>
          {children}
        </Clip>
      </ScalesProvider>
    </Offset>
  );
};
