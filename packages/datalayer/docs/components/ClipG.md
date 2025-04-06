# ClipG

Renders `g` element, used to clip chart contents. Prevents chart contents from 'overflow'.

## Children

Children will be rendered in `g` element, clipped by rectangular `clip-path` with `width` and `height` dimensions.

## Props

All props are **required**.

- string `id`, unique identifier;
- number `width`, chart contents width;
- number `height`, chart contents height.

## Side effects

`ClipG` renders `clip-path` element, identified by `id` being equal to `id` property. This `clip-path` can be used to clip other page elements.
