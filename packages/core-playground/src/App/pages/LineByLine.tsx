import {
  type RefObjectWithSize,
  SVG,
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

export const LineByLine = () => {
  const gRef = useRefWithSize<SVGGElement>();

  useWindowSize();

  return (
    <SVG width={gRef.width} height={gRef.height}>
      <G ref={gRef} />
    </SVG>
  );
};
