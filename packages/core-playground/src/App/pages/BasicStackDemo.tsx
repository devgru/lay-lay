import { SvgOrigin, useSizeState, VerticalStack } from '@lay-lay/core';
import { useWindowSize } from '@react-hook/window-size/throttled';
import { useMemo } from 'react';

const colors = ['red', 'yellow', 'lime', 'cyan', 'blue', 'magenta', 'white'];

export const BasicStackDemo = () => {
  const sizeState = useSizeState();

  const array = useMemo(() => {
    const length = 1000;
    return Array.from({ length }, (_, i) => i);
  }, []);

  useWindowSize();

  return (
    <div>
      <h2>Stack demo — basic</h2>
      <p>
        This example verifies that <code>Stack</code> work as expected,
        positioning {array.length} elements one after the other
      </p>
      <SvgOrigin width={sizeState.width} height={sizeState.height}>
        <VerticalStack sizeState={sizeState}>
          {array.map((i) => (
            <rect
              width={500}
              height={1}
              fill={colors[i % colors.length]}
              key={i}
            />
          ))}
        </VerticalStack>
      </SvgOrigin>
    </div>
  );
};
