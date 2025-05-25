# @lay-lay/z-order

Part of the [Layered layouts](https://github.com/devgru/lay-lay) project.

> The library provides a React component that orders its children.

Explore `@lay-lay/playground` package for a demonstration of the library's features.

## Usage

Use `ZOrder` wrapper to order elements in SVG container, mimicking `z-index` property.

`z` property is removed from children before rendering.

```tsx
import React from 'react';
import { ZOrder } from '@lay-lay/z-order';

<ZOrder>
  <g z={1}>
    {/*...*/}
  </g>
  <g z={2}>
    {/*...*/}
  </g>
  <g z={3}>
    {/*...*/}
  </g>
</ZOrder>
```

If you want to avoid creating extra `g`, use `Z` component:

```tsx
import React from 'react';
import { ZOrder, Z } from '@lay-lay/z-order';

<ZOrder>
  <Z z={1}>
    {/*...*/}
  </Z>
  <Z z={2}>
    {/*...*/}
  </Z>
  <Z z={3}>
    {/*...*/}
  </Z>
</ZOrder>
```

## Legacy

The library was originally published under `react-z-order` name.
