import {
  Children,
  type FC,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import type { StackOrientation, StackProps } from '../types.ts';
import { StackElement } from './StackElement.tsx';
import { DOM_EPSILON } from '../constants.ts';
import type { Origin, Size } from '@lay-lay/core';

const originAccumulator = (
  stackOrientation: StackOrientation,
  sizes: Size[],
) => {
  let currentOffset = 0;

  return (index: number): Origin => {
    const size = sizes[index];
    if (stackOrientation === 'horizontal') {
      const origin = { x: currentOffset, y: 0 };
      if (size) {
        currentOffset += size.width;
      }
      return origin;
    } else {
      const origin = { x: 0, y: currentOffset };
      if (size) {
        currentOffset += size.height;
      }
      return origin;
    }
  };
};

export const Stack: FC<StackProps> = ({
  stackOrientation,
  onSizeCalculated,
  children,
}) => {
  if (stackOrientation !== 'horizontal' && stackOrientation !== 'vertical') {
    throw new Error(`Invalid stack orientation: ${stackOrientation}`);
  }

  const [sizes, setSizes] = useState<Size[]>([]);
  const getOrigin = originAccumulator(stackOrientation, sizes);

  const handleSizeChange = useCallback((index: number, newSize: Size) => {
    setSizes((prevSizes) => {
      const prev = prevSizes[index];
      const isXDeltaSmall =
        prev && Math.abs(newSize.width - prev.width) < DOM_EPSILON;
      const isYDeltaSmall =
        prev && Math.abs(newSize.height - prev.height) < DOM_EPSILON;

      if (isXDeltaSmall && isYDeltaSmall) {
        return prevSizes;
      }

      const newSizes = [...prevSizes];
      newSizes[index] = newSize;
      return newSizes;
    });
  }, []);

  useLayoutEffect(() => {
    const sumBy = (key: keyof Size) => {
      let sum = 0;
      for (const size of sizes) {
        sum += size[key];
      }
      return sum;
    };

    const maxBy = (key: keyof Size) => {
      let max = 0;
      for (const size of sizes) {
        if (size[key] > max) {
          max = size[key];
        }
      }
      return max;
    };
    if (onSizeCalculated) {
      if (stackOrientation === 'horizontal') {
        onSizeCalculated(sumBy('width'), maxBy('height'));
      } else {
        onSizeCalculated(maxBy('width'), sumBy('height'));
      }
    }
  });

  return (
    <>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return null;

        return (
          <StackElement
            key={index}
            index={index}
            onSizeChange={handleSizeChange}
            origin={getOrigin(index)}
          >
            {child}
          </StackElement>
        );
      })}
    </>
  );
};
