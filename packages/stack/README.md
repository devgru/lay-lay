# @lay-lay/stack

Part of the [Layered layouts](https://github.com/devgru/lay-lay) project.

> The library provides a set of React components to implement a basic stack layout of SVG elements.

Explore `@lay-lay/playground` package for a demonstration of the library's features.

## Usage

### Stack layout

`VerticalStack` and `HorizontalStack` components are used to organize children into a stack.

Tracking stack's outer dimensions is possible via `onSizeCalculated` callback.

```tsx
import { useSizeObserver } from '@lay-lay/core';
import { VerticalStack } from '@lay-lay/stack';

const sizeObserver = useSizeObserver();
return (
  <svg width={sizeObserver.width ?? 0} height={sizeObserver.height ?? 0}>
    <VerticalStack onSizeCalculated={sizeObserver.setSize}>
      {/*...*/}
    </VerticalStack>
  </svg>
);
```

### Negate offset

`NegateOffset` component measures the distance between the [transformation matrix](https://svgwg.org/svg2-draft/types.html#__svg__SVGGraphicsElement__getScreenCTM) and children's rendered top-left corner pixel. This distance is then negated by corresponding offset, translating the children so that the rendered shape originates from the same coordinates as the group.

```tsx
import { useSizeObserver } from '@lay-lay/core';
import { NegateOffset, VerticalStack } from '@lay-lay/stack';

const sizeObserver = useSizeObserver();
return (
  <svg width={sizeObserver.width ?? 0} height={sizeObserver.height ?? 0}>
    <VerticalStack onSizeCalculated={sizeObserver.setSize}>
      <NegateOffset>
        {/*...*/}
      </NegateOffset>
    </VerticalStack>
  </svg>
);
```
