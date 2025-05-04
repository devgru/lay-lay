import {
  type Size,
  SvgOrigin,
  useRefWithBox,
  useRefWithSize,
  useSizeState,
} from '@lay-lay/core';
import { useWindowSize } from '@react-hook/window-size/throttled';
import { useLayoutEffect } from 'react';

function G({ setSize }: { setSize: (size: Size) => void }) {
  const ref = useRefWithSize<SVGGElement>();
  const boxA = useRefWithBox<SVGRectElement>();
  const boxB = useRefWithBox<SVGRectElement>();
  const boxC = useRefWithBox<SVGRectElement>();

  useLayoutEffect(() => {
    if (ref.size) {
      setSize(ref.size);
    }
  });

  return (
    <g ref={ref}>
      <rect width={50} height={50} ref={boxA} fill="red" />
      {boxA.position && (
        <rect
          width={50}
          height={50}
          y={boxA.position.bottom}
          ref={boxB}
          fill="green"
        />
      )}
      {boxB.position && (
        <rect
          width={50}
          height={50}
          y={boxB.position.bottom}
          ref={boxC}
          fill="blue"
        />
      )}
    </g>
  );
}

export const ManualLayoutDemo = () => {
  useWindowSize();

  const { width, height, setSize } = useSizeState();

  return (
    <div>
      <h2>Manual stack layout demo</h2>
      <p>
        This example verifies that <code>useRefWithBox</code> and{' '}
        <code>useRefWithSize</code> work as expected, positioning elements one
        after the other. If yellow background is visible under the blue rect,
        hooks are returning incorrect values.
      </p>
      <SvgOrigin
        width={width}
        height={height}
        style={{ backgroundColor: 'yellow' }}
      >
        <G setSize={setSize} />
      </SvgOrigin>
    </div>
  );
};
