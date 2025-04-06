# BasicChart

Renders basic chart in `svg` element with axes, borders, pseudo-grid and paddings.

[Component usage example](../../../demos/src/RDVE/examples/BasicChartDemo.jsx).

## Children

This component accepts single child, which should be a function with signature `generateChart({id, xScale, yScale, width, height})`. This function should return React-element with rendered chart contents.

This function is required.

## Props

All props has defaults, so you can play with `BasicChart` right away.

- string `id` is used to create identifiers for several elements within chart, default value is random string;
- array of two numbers `xDomain`, data domain for X axis;
- array of two numbers `yDomain`, data domain for Y axis;
- number `xPadding`, representing horizontal padding between ticks labels and axis line of Y axis;
- number `yPadding`, representing vertical padding between ticks labels and axis line of X axis;
- object `margin`, containing fields `left`, `top`, `right` and `bottom`, representing chart margins.
