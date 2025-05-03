import {
  Children,
  type FC,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import type { Size, StackDirection, StackProps } from '../types.ts';
import { StackElement } from './StackElement.tsx';
import { DOM_EPSILON } from '../constants.ts';

const originAccumulator = (stackDirection: StackDirection, sizes: Size[]) => {
  let currentOffset = 0;

  return (index: number) => {
    const origin =
      stackDirection === 'horizontal'
        ? { x: currentOffset, y: 0 }
        : { x: 0, y: currentOffset };

    const size = sizes[index];
    if (size) {
      currentOffset +=
        stackDirection === 'horizontal' ? size.width : size.height;
    }

    return origin;
  };
};

export const Stack: FC<StackProps> = ({
  stackDirection,
  sizeState,
  children,
}) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const getOrigin = originAccumulator(stackDirection, sizes);

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
    if (sizeState) {
      if (stackDirection === 'horizontal') {
        sizeState.setSize({
          width: sumBy('width'),
          height: maxBy('height'),
        });
      } else {
        sizeState.setSize({
          width: maxBy('width'),
          height: sumBy('height'),
        });
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
