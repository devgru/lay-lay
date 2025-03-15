import { useRefWithBox, useRefWithSize, useRootRef } from 'react-svg-guides';
import { useWindowSize } from '@react-hook/window-size/throttled';

export const LineByLine = () => {
  const rootRef = useRootRef<SVGSVGElement>();
  const gRef = useRefWithSize<SVGGElement>();

  const boxA = useRefWithBox<SVGRectElement>();
  const boxB = useRefWithBox<SVGRectElement>();
  const boxC = useRefWithBox<SVGRectElement>();

  useWindowSize();

  return (
    <svg ref={rootRef} width={gRef.width} height={gRef.height}>
      <g ref={gRef}>
        <rect width={50} height={50} ref={boxA} fill="red" />
        <rect width={50} height={50} y={boxA.bottom} ref={boxB} fill="green" />
        <rect width={50} height={50} y={boxB.bottom} ref={boxC} fill="blue" />
      </g>
    </svg>
  );
};
