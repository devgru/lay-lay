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

const positionAccumulator = (stackDirection: StackDirection, sizes: Size[]) => {
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

export const Stack: FC<StackProps> = ({
  stackDirection,
  sizeState,
  children,
}) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const getPosition = positionAccumulator(stackDirection, sizes);

  const handleSizeChange = useCallback((index: number, newSize: Size) => {
    setSizes((prev) => {
      const next = [...prev];
      next[index] = newSize;
      return next;
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
            position={getPosition(index)}
          >
            {child}
          </StackElement>
        );
      })}
    </>
  );
};
