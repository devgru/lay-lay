# FillParentSvg

Renders `svg` element filling its container.

On page resize `onSizeUpdate` callback will be called.

## Children

Children are rendered directly in `svg` element.

## Props

- callback `onSizeUpdate`, signature is `onSizeUpdate({width, height})`;
- all other props are passed to `svg` element.

## Side effects

This component listens for `resize` events on `window` object.
