import { useState } from 'react';
import { useRefWithSize, HTML, StackLayout } from '@lay-lay/core';

export const Rects = () => {
  const [foWidth, setFoWidth] = useState(200);

  const htmlRef = useRefWithSize<HTMLDivElement>();
  const rectsGRef = useRefWithSize<SVGSVGElement>();

  const width = Math.max(rectsGRef.width, htmlRef.width);
  const height = htmlRef.height + rectsGRef.height;

  return (
    <>
      <p>
        a <code>foreignObject</code> and three <code>rect</code>s, pushing to
        the right
      </p>
      <input
        type="range"
        min="80"
        max="320"
        step="10"
        value={foWidth}
        onChange={(e) => setFoWidth(parseInt(e.target.value))}
      />
      <br />
      <svg
        width={width}
        height={height}
        style={{ background: 'rgba(255, 0, 0, 0.1)' }}
      >
        <StackLayout stackDirection="vertical">
          <HTML
            ref={htmlRef}
            width={foWidth}
            height={htmlRef.height}
            fontSize={30}
          >
            <div style={{ border: '1px solid red' }}>
              The width is {width}
              <br />
              The height is {height}
            </div>
          </HTML>
          <g ref={rectsGRef}>
            <StackLayout stackDirection="horizontal">
              <Rect />
              <Rect />
              <Rect />
            </StackLayout>
          </g>
        </StackLayout>
      </svg>
    </>
  );
};

const Rect = () => (
  <rect
    width={100}
    height={100}
    stroke="blue"
    fill="transparent"
    strokeWidth={2}
  />
);
