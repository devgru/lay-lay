# @lay-lay/data-layer

Part of the [Layered layouts](https://github.com/devgru/lay-lay) project.

> Data layer lays elements out to visualize a dataset. Create React-based charts using [d3](https://d3js.org) utilities encapsulated in React elements.

Exported components are described in [docs/components](./docs/components) directory.

## Usage

```tsx
import React from 'react';
import { BasicChart } from '@lay-lay/data-layer';
import { scaleLinear } from 'd3-scale';

const MyChart = () => {
  const xScale = scaleLinear().domain([0, 100]).range([0, 500]);
  const yScale = scaleLinear().domain([0, 100]).range([500, 0]);

  return (
    <BasicChart
      xDomain={[0, 100]}
      yDomain={[0, 100]}
      margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
    >
      {/*...*/}
    </BasicChart>
  );
};
```

## Legacy

Versions prior to 0.0.23 are published under `react-chart-engine` name.
