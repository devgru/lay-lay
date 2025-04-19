import { StackLayout, SVG, useSizeState } from '@lay-lay/core';
import { useWindowSize } from '@react-hook/window-size/throttled';

export const LineByLineDemo = () => {
  const sizeState = useSizeState();

  useWindowSize();

  return (
    <div>
      <h2>Line by line demo</h2>
      <p>
        This example verifies that <code>StackLayout</code> work as expected,
        positioning elements one after the other
      </p>
      <SVG width={sizeState.width} height={sizeState.height}>
        <StackLayout stackDirection="vertical" sizeState={sizeState}>
          <rect width={50} height={50} fill="red" />
          <rect width={50} height={50} fill="green" />
          <rect width={50} height={50} fill="blue" />
        </StackLayout>
      </SVG>
    </div>
  );
};
