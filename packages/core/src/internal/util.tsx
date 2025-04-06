import { type StackDirection } from '../types.ts';
import { type Size } from './types.ts';

export const positionAccumulator = (
  stackDirection: StackDirection,
  sizes: Size[],
) => {
  let currentOffset = 0;

  return (index: number) => {
    const position =
      stackDirection === 'horizontal'
        ? { x: currentOffset, y: 0 }
        : { x: 0, y: currentOffset };

    const size = sizes[index];
    if (size) {
      currentOffset +=
        stackDirection === 'horizontal' ? size.width : size.height;
    }

    return position;
  };
};
