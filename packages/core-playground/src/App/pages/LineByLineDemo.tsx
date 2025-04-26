import { Stack, SvgOrigin, useSizeState } from '@lay-lay/core';
import { useWindowSize } from '@react-hook/window-size/throttled';

export const LineByLineDemo = () => {
  const sizeState = useSizeState();

  useWindowSize();

  return (
    <div>
      <h2>Stack demo — basic</h2>
      <p>
        This example verifies that <code>Stack</code> work as expected,
        positioning elements one after the other
      </p>
      <SvgOrigin width={sizeState.width} height={sizeState.height}>
        <Stack stackDirection="vertical" sizeState={sizeState}>
          <rect width={50} height={50} fill="red" />
          <rect width={50} height={50} fill="green" />
          <rect width={50} height={50} fill="blue" />
        </Stack>
      </SvgOrigin>
    </div>
  );
};
