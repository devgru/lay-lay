import { SvgOrigin, useSizeObserver } from '@lay-lay/core';
import { useWindowSize } from '@react-hook/window-size/throttled';
import { useMemo } from 'react';
import { VerticalStack } from '@lay-lay/stack';

const colors = ['red', 'yellow', 'lime', 'cyan', 'blue', 'magenta', 'white'];

export const BasicStackDemo = () => {
  const sizeObserver = useSizeObserver();

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
      <SvgOrigin
        width={sizeObserver.width ?? 0}
        height={sizeObserver.height ?? 0}
      >
        <VerticalStack onSizeCalculated={sizeObserver.setSize}>
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
