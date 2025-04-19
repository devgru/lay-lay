import { SVG } from '@lay-lay/core';
import { useLayoutEffect, useRef } from 'react';

export const PositioningDemo = () => {
  const ref = useRef<SVGRectElement>(null);
  useLayoutEffect(() => {
    console.log('ref', ref);
  }, []);
  return (
    <>
      <h2>Positioning demo</h2>
      <p>
        verifies that we are able to find a relative position of an SVG{' '}
        <code>rect</code> element inside its <code>SVG</code> parent
      </p>
      <SVG style={{display: 'flex'}} width={400} height={400}>
        <rect ref={ref} width={100} height={100} x={100} y={100} />
      </SVG>
    </>
  );
};
