# BasicAxes

Renders axes and pseudo-grids in a `g` element.

Uses axes from `react-d3-components` that are similar to axes in `d3`.

D3 scales are used to determine positions and sizes of axes, ticks and grid lines.

## Children

This component accepts no children.

## Props

All props are **required**.

- [scale](https://github.com/d3/d3-scale#continuous-scales) `xScale` for X axis;
- [scale](https://github.com/d3/d3-scale#continuous-scales) `yScale` for Y axis;
- number `xPadding`, representing horizontal padding between ticks labels and axis line of Y axis;
- number `yPadding`, representing vertical padding between ticks labels and axis line of X axis;
- number `width`, width of chart content;
- number `height`, height of chart content.

You can use scales from `d3` v3 or v4.
