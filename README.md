# react-svg-guides

> While HTML supports a variety of layout techniques, SVG is more limited in this regard.
>
> The library provides a set of React hooks and components to capture SVG elements' measurements and expose them via refs, enabling complex SVG-based layouts building.

Explore `demos` package for a glimpse of what this library can help with.

## Usage

### Size measurement

1. Use `useRefWithSize` hook to track element's width and height:

```typescript jsx
import { useRefWithSize } from 'react-svg-guides';

const circleRef = useRefWithSize<SVGCircleElement>();
return (
  <svg width={circleRef.width} height={circleRef.height}>
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

2. To combine `svg` and `html` elements, use `HTML` component. It renders as a `div` within a `foreignObject`, the `ref` is attached to the `div`:

```typescript jsx
import { HTML, useRefWithSize } from 'react-svg-guides';

const divRef = useRefWithSize<HTMLDivElement>();
return (
  <svg width={divRef.width} height={divRef.height}>
    <HTML ref={divRef}>
      foreignObject inside SVG
    </HTML>
  </svg>
);
```

### Position measurement

1. Use `useRefWithBox` hook to track both element's size and position:

```typescript jsx
import { useRefWithBox } from 'react-svg-guides';

const circleRef = useRefWithBox<SVGCircleElement>();
return (
  <svg width={circleRef.width} height={circleRef.height}>
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

2. Optionally use `SVG` component to switch the origin point for boxes, from the page's origin to the `SVG` element's origin:

```typescript jsx
import { SVG, HTML, useRefWithBox } from 'react-svg-guides';

const divRef = useRefWithBox<HTMLDivElement>();

return (
  <SVG>
    <HTML ref={divRef}>
      foreignObject inside SVG
    </HTML>
  </SVG>
);
```

## Types

```typescript
type RefObjectWithSize<E> = RefObject<E | null> & {
  width: number;
  height: number;
};

type RefObjectWithBox<E> = RefObjectWithSize<E> & {
  left: number;
  horizontalCenter: number;
  right: number;
  top: number;
  verticalCenter: number;
  bottom: number;
};

interface HtmlProps extends SVGAttributes<SVGForeignObjectElement> {
  ref?: RefObject<HTMLDivElement | null>;
}

interface SvgProps extends SVGAttributes<SVGSVGElement> {
  ref: RefObject<SVGSVGElement | null>;
}
```
