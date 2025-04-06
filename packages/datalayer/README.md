# @lay-lay/datalayer

> Create React-based charts using [d3](https://d3js.org) utilities encapsulated in React elements.

## Installing

```sh
$ npm install @lay-lay/datalayer
# or
$ yarn add @lay-lay/datalayer
# or
$ bun add @lay-lay/datalayer
```

Versions prior to 0.0.23 were published under name `react-chart-engine`.

## Features

- TypeScript support
- Modern React (18+) compatibility
- D3 integration for powerful data visualization
- Responsive SVG components

## Usage

```tsx
import React from 'react';
import { BasicChart } from '@lay-lay/datalayer';
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
      {({ id, xScale, yScale, width, height }) => (
        <g>
          <circle cx={xScale(50)} cy={yScale(50)} r={5} fill="red" />
        </g>
      )}
    </BasicChart>
  );
};
```

## Components

Exported components are described in [docs/components](./docs/components) directory.

## Development

```sh
# Install dependencies
$ npm install

# Start development server
$ npm run dev

# Build for production
$ npm run build
```

## License

MIT
