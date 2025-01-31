import { useState } from 'react';
import {
  Guide,
  GuidesDebug,
  HTML,
  SVG,
  useGuides,
  useRefWithGuidesAttached,
} from 'react-svg-guides';

export const Rects = () => {
  const {
    rect1Guide,
    rect2Guide,
    wGuide,
    hGuide,
    bottomGuide,
    svgRight,
    svgBottom,
  } = useGuides();

  const [foWidth, setFoWidth] = useState(200);

  const width = Math.max(rect2Guide(), wGuide(), 200);
  const height = Math.max(bottomGuide(), hGuide());

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
      <SVG
        guidesAttachment={{ width: svgRight, height: svgBottom }}
        width={width}
        height={height}
        style={{ background: 'rgba(255, 0, 0, 0.1)' }}
      >
        <HTML
          width={foWidth}
          height={hGuide()}
          fontSize={30}
          guidesAttachment={{ width: wGuide, height: hGuide }}
        >
          <div style={{ border: '1px solid red' }}>
            The width is {width}
            <br />
            The height is {height}
          </div>
        </HTML>
        <g
          ref={useRefWithGuidesAttached({ bottom: bottomGuide })}
          transform={`translate(0 ${hGuide()})`}
        >
          <Rect left={0} top={0} rightGuide={rect1Guide} />
          <Rect left={rect1Guide()} top={0} rightGuide={rect2Guide} />
        </g>
        <GuidesDebug />
      </SVG>
    </>
  );
};

const Rect = ({
  left,
  top,
  rightGuide,
}: {
  left: number;
  top: number;
  rightGuide: Guide;
}) => (
  <rect
    ref={useRefWithGuidesAttached({ right: rightGuide })}
    x={left}
    y={top}
    width={100}
    height={100}
    stroke="blue"
    fill="transparent"
    strokeWidth={2}
  />
);
