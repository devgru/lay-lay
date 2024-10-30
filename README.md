# react-svg-guides

> This library provides a set of React hooks and components to implement a concept of guides in SVG.

Explore `demos` package for a glimpse of what this library can help with.

## Types

A *guide* is encapsulating a numeric value. It is implemented as a function that can be called with a value to update it, or without a value to read it.


```typescript
export type Guide = {
  (): number;
  (v: number): void;

  id: string;
  name: string;
};
```

A *guides attachment* lists guides that are *attached* to an element. To attach several guides to one coordinate, use `more` property to chain another `GuidesAttachment`.

```typescript
export type GuidesAttachment = {
  top?: Guide;
  verticalCenter?: Guide;
  bottom?: Guide;
  left?: Guide;
  horizontalCenter?: Guide;
  right?: Guide;
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
declare const useGuides: (defaultValue?: number) => {
  [key: string]: Guide;
};

const {
  rightGuide,
  bottomGuide,
  guideWithAFancyName,
} = useGuides(0); // optionally set initial value
```

## Components

### HTML

```typescript
declare function HTML({ children, guidesAttachment, ...rest }: {
    guidesAttachment?: GuidesAttachment;
} & SVGAttributes<SVGForeignObjectElement>): JSX.Element;
```

HTML element has similar API with `guidesAttachment` prop. Instead of attaching to actual `foreignObject` container, it attaches to the `div` element inside allowing to measure its coordinates.