import { useState } from 'react';
import { HtmlWrapper, useRefWithSize, useSizeObserver } from '@lay-lay/core';
import { HorizontalStack, VerticalStack } from '@lay-lay/stack';

export const ConfigurableStackLayoutDemo = () => {
  const [foWidth, setFoWidth] = useState(200);

  const htmlRef = useRefWithSize<HTMLDivElement>();
  const rootSizeObserver = useSizeObserver();

  return (
    <>
      <h2>Configurable stack demo</h2>
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
        width={rootSizeObserver.width}
        height={rootSizeObserver.height}
        style={{ background: 'rgba(255, 0, 0, 0.1)' }}
      >
        <VerticalStack onSizeCalculated={rootSizeObserver.setSize}>
          <HtmlWrapper ref={htmlRef} width={foWidth} fontSize={30}>
            <div style={{ border: '1px solid red' }}>
              The width is {rootSizeObserver.width}
              <br />
              The height is {rootSizeObserver.height}
            </div>
          </HtmlWrapper>
          <HorizontalStack>
            <Rect />
            <Rect />
            <Rect />
          </HorizontalStack>
        </VerticalStack>
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
