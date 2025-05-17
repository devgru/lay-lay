# @lay-lay/core

Part of the [Layered layouts](https://github.com/devgru/lay-lay) project. 

> The library provides a set of React hooks and components to capture elements' measurements and expose them via refs, enabling coordinating HTML and SVG elements in complex multi-layered layouts.

Explore `@lay-lay/playground` package for a glimpse of the library's features.

## Usage

### Size measurement

1. Use `useRefWithSize` hook to track element's size:

```tsx
import { useRefWithSize } from '@lay-lay/core';

const circleRef = useRefWithSize<SVGCircleElement>();
return (
  <svg width={circleRef.size?.width ?? 0} height={circleRef.size?.height ?? 0}>
    <circle
      ref={circleRef}
      r={10}
      cx={10}
      cy={10}
      fill="currentColor"
    />
  </svg>
);
```

2. To render `html` elements in `svg` container, use `HtmlWrapper` component. It renders as a `foreignObject` containing a `div`, the `ref` is attached to the `div`. Width is required and height is omitted.

```tsx
import { HtmlWrapper, useRefWithSize } from '@lay-lay/core';

const divRef = useRefWithSize<HTMLDivElement>();
return (
  <svg width={200} height={divRef.size?.height}>
    <HtmlWrapper ref={divRef} width={200}>
      foreignObject inside SVG
    </HtmlWrapper>
  </svg>
);
```

### Position measurement

1. Use `SvgOrigin` or `HtmlOrigin` component to set the origin point for boxes, depending on the parent element type.

2. Use `useRefWithBox` hook to track both elements' size and box measurements:

```tsx
import { useRefWithBox, SvgOrigin } from '@lay-lay/core';

const circleRef = useRefWithBox<SVGCircleElement>();
console.log(circleRef.box?.right);

return (
  <svg width={circleRef.size?.width ?? 0} height={circleRef.size?.height ?? 0}>
    <SvgOrigin>
        <circle
          ref={circleRef}
          r={10}
          cx={10}
          cy={10}
          fill="currentColor"
        />
    </SvgOrigin>
  </svg>
);
```
