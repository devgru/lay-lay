import {
  SvgOrigin,
  useRefWithBox,
  useRefWithSize,
  useSizeObserver,
  type SizeSetter,
} from '@lay-lay/core';
import { useWindowSize } from '@react-hook/window-size/throttled';
import { useLayoutEffect } from 'react';

function G({ setSize }: { setSize: SizeSetter }) {
  const ref = useRefWithSize<SVGGElement>();
  const rectARef = useRefWithBox<SVGRectElement>();
  const rectBRef = useRefWithBox<SVGRectElement>();
  const rectCRef = useRefWithBox<SVGRectElement>();

  useLayoutEffect(() => {
    if (ref.size) {
      setSize(ref.size.width, ref.size.height);
    }
  });

  return (
    <g ref={ref}>
      <rect width={50} height={50} ref={rectARef} fill="red" />
      {rectARef.box && (
        <rect
          width={50}
          height={50}
          y={rectARef.box.bottom}
          ref={rectBRef}
          fill="green"
        />
      )}
      {rectBRef.box && (
        <rect
          width={50}
          height={50}
          y={rectBRef.box.bottom}
          ref={rectCRef}
          fill="blue"
        />
      )}
    </g>
  );
}

export const ManualLayoutDemo = () => {
  useWindowSize();

  const { width, height, setSize } = useSizeObserver();

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
