import {
  type RefObjectWithSize,
  SvgOrigin,
  useRefWithBox,
  useRefWithSize,
} from '@lay-lay/core';
import { useWindowSize } from '@react-hook/window-size/throttled';

function G({ ref }: { ref: RefObjectWithSize<SVGGElement> }) {
  const boxA = useRefWithBox<SVGRectElement>();
  const boxB = useRefWithBox<SVGRectElement>();
  const boxC = useRefWithBox<SVGRectElement>();

  return (
    <g ref={ref}>
      <rect width={50} height={50} ref={boxA} fill="red" />
      <rect width={50} height={50} y={boxA.bottom} ref={boxB} fill="green" />
      <rect width={50} height={50} y={boxB.bottom} ref={boxC} fill="blue" />
    </g>
  );
}

export const ManualLayoutDemo = () => {
  const gRef = useRefWithSize<SVGGElement>();

  useWindowSize();

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
        width={gRef.width}
        height={gRef.height}
        style={{ backgroundColor: 'yellow' }}
      >
        <G ref={gRef} />
      </SvgOrigin>
    </div>
  );
};
