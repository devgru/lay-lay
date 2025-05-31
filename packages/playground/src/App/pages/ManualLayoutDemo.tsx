import {
  SvgOrigin,
  useRefWithGuide,
  useRefWithSize,
  useSizeObserver,
  type SizeSetter,
} from '@lay-lay/core';
import { useWindowSize } from '@react-hook/window-size/throttled';
import { useLayoutEffect } from 'react';

function G({ setSize }: { setSize: SizeSetter }) {
  const ref = useRefWithSize<SVGGElement>();
  const rectARef = useRefWithGuide<SVGRectElement>('bottom');
  const rectBRef = useRefWithGuide<SVGRectElement>('bottom');

  useLayoutEffect(() => {
    if (ref.size) {
      setSize(ref.size.width, ref.size.height);
    }
  });

  return (
    <g ref={ref}>
      <rect width={50} height={50} ref={rectARef} fill="red" />
      {rectARef.guide !== undefined && (
        <rect
          width={50}
          height={50}
          y={rectARef.guide}
          ref={rectBRef}
          fill="green"
        />
      )}
      {rectBRef.guide !== undefined && (
        <rect width={50} height={50} y={rectBRef.guide} fill="blue" />
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
