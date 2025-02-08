import { useState } from 'react';
import { useRefWithSize, HTML, RefObjectWithSize } from 'react-svg-guides';

export const Rects = () => {
  const [foWidth, setFoWidth] = useState(200);

  const foRef = useRefWithSize<HTMLDivElement>();
  const svgRef = useRefWithSize<SVGSVGElement>();
  const gRef = useRefWithSize<SVGGElement>();
  const rect1Ref = useRefWithSize<SVGRectElement>();
  const rect2Ref = useRefWithSize<SVGRectElement>();

  const width = Math.max(rect1Ref.width + rect2Ref.width, foRef.width);
  const height = foRef.height + gRef.height;

  return (
    <>
      <p>
        a <code>foreignObject</code> and two <code>rect</code>s, pushing to the
        right
      </p>
      <input
        type="range"
        min="80"
        max="320"
        step="10"
        value={foWidth}
        onChange={e => setFoWidth(parseInt(e.target.value))}
      />
      <br />
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ background: 'rgba(255, 0, 0, 0.1)' }}
      >
        <HTML ref={foRef} width={foWidth} height={foRef.height} fontSize={30}>
          <div style={{ border: '1px solid red' }}>
            The width is {width}
            <br />
            The height is {height}
          </div>
        </HTML>
        <g ref={gRef} transform={`translate(0 ${foRef.height})`}>
          <Rect ref={rect1Ref} left={0} top={0} />
          <Rect ref={rect2Ref} left={rect1Ref.width} top={0} />
        </g>
      </svg>
    </>
  );
};

const Rect = ({
  left,
  top,
  ref,
}: {
  left: number;
  top: number;
  ref: RefObjectWithSize<SVGRectElement>;
}) => (
  <rect
    ref={ref}
    x={left}
    y={top}
    width={100}
    height={100}
    stroke="blue"
    fill="transparent"
    strokeWidth={2}
  />
);
