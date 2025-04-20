import { useWindowSize } from '@react-hook/window-size/throttled';
import { HTML, SVG, useRefWithSize } from '@lay-lay/core';

export const CenteredTextDemo = () => {
  const svgRef = useRefWithSize<SVGSVGElement>();
  const htmlRef = useRefWithSize<HTMLDivElement>();

  useWindowSize();

  return (
    <>
      <h2>Centered text demo</h2>
      <p>
        SVG size is defined by HTML contents, SVG container exposes its center
        via ref.
      </p>
      <SVG
        ref={svgRef}
        style={{ background: '#eee', width: '100%' }}
        height={htmlRef.height}
      >
        <HTML width="100%" ref={htmlRef} height={htmlRef.height}>
          <p style={{ margin: 0, color: 'black' }}>
            Hello!
            <br />
            This is a multiline text that is centered in the SVG container
            within a foreignObject.
          </p>
        </HTML>
      </SVG>
      <p>
        SVG size: {svgRef.width} × {svgRef.height}
      </p>
    </>
  );
};
