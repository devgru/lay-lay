# react-svg-guides

> While HTML supports a variety of layout techniques, SVG is more limited in this regard.
> 
> To enable more complex SVG-based layouts, this library provides a set of React hooks and components to implement a concept of Guides in SVG.
>
> Guides are used to track SVG elements' measurements and expose them via React hooks.

Explore `demos` package for a glimpse of what this library can help with.

## How to use Guides

1. Use `SVG` component to create a root SVG element. It will provide a starting point for all measurements. It is also possible to attach Guides to `SVG` element via `guidesAttachment` property.

2. Use `HTML` component to create a `foreignObject` element that will support Guides attachment. This helps to build layouts utilizing both SVG and HTML elements.

2. Use `useGuide` or `useGuides` hook to create guides.

3. Attach guides to any SVG element via `useRefWithGuidesAttached` hook.

```typescript jsx
import { SVG, useGuides } from 'react-svg-guides';

// widthGuide() will return the width of the SVG element,
// following the attachment to its right side.
const { widthGuide } = useGuides();

return (
  <SVG
    height={widthGuide()}
    style={{ background: '#585', width: '100%' }}
    guidesAttachment={{ width: widthGuide }}
/>
);
```

## Types

A *Guide* is encapsulating a numeric value. It is implemented as a function that can be called with a value to update it, or without a value to read current value.


```typescript
type Guide = {
  (): number;
  (v: number): void;

  id: string;
  name: string;
};
```

A *guides attachment* lists Guides that are *attached* to an element. To attach several guides to one coordinate, use `more` property to chain another `GuidesAttachment`.

```typescript
type GuidesAttachment = {
  top?: Guide;
  verticalCenter?: Guide;
  bottom?: Guide;
  left?: Guide;
  horizontalCenter?: Guide;
  right?: Guide;
  width?: Guide;
  height?: Guide;
  more?: GuidesAttachment;
};
```

## Hooks

### Guide

A single guide can be obtained by calling `useGuide` hook:

```typescript
declare const useGuide: (defaultValue?: number) => Guide;

const guide = useGuide(0); // optionally set initial value

const moveThings = useCallback(() => {
  guide(100); // update value
}, []);

console.log(guide()); // read value
``` 

A designated way to use guide is to **attach** it via `useRefWithGuidesAttached` hook or, when used on `SVG` or `HTML` components, via `guidesAttachment`. Attached guide is updated when element's corresponding coordinate is changed.

### Named guide

While basic guide is replaceable with e.g. `useState`, named guide has its name set to a variable name it is assigned to.

Named guides are obtained by calling `useGuides` hook with a common initial value:

```typescript
type GuideArgs = {
  setValue: (value: number, handle: string) => void;
  defaultValue: number;
};

declare const useGuides: (args?: Partial<GuideArgs>) => {
  [key: string]: Guide;
};

const {
  rightGuide,
  bottomGuide,
  guideWithAFancyName,
} = useGuides({ defaultValue: 0 }); // optionally set initial value
```

Use `setValue` parameter to debug Guides updates.

## Components

### SVG

```typescript
declare const SVG: ({ children, guidesAttachment, ...props }: {
    guidesAttachment?: GuidesAttachment;
} & React.SVGAttributes<SVGSVGElement>) => JSX.Element;
```

SVG element which must be used as a root element for all elements with attached guides.

### HTML

```typescript
declare const HTML: ({ children, guidesAttachment, ...rest }: {
    guidesAttachment?: GuidesAttachment;
} & SVGAttributes<SVGForeignObjectElement>) => JSX.Element;
```

HTML element has similar API with `guidesAttachment` prop. Instead of attaching guides to actual `foreignObject` container, it attaches them to the `div` element inside allowing to follow its measurements.