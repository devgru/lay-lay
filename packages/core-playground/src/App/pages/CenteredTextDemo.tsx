import { useWindowSize } from '@react-hook/window-size/throttled';
import { HtmlWrapper, SvgOrigin, useRefWithSize } from '@lay-lay/core';

export const CenteredTextDemo = () => {
  const svgRef = useRefWithSize<SVGSVGElement>();
  const htmlRef = useRefWithSize<HTMLDivElement>();

  useWindowSize();

  return (
    <>
      <h2>Centered text demo</h2>
      <p>
        SvgOrigin size is defined by HtmlWrapper contents, SvgOrigin container
        exposes its center via ref.
      </p>
      <SvgOrigin
        ref={svgRef}
        style={{ background: '#eee', width: '100%' }}
        height={htmlRef.size?.height}
      >
        <HtmlWrapper width="100%" ref={htmlRef}>
          <p style={{ margin: 0, color: 'black' }}>
            Hello!
            <br />
            This is a multiline text that is centered in the SvgOrigin container
            within a foreignObject.
          </p>
        </HtmlWrapper>
      </SvgOrigin>
      <p>
        SvgOrigin size: {svgRef.size?.width} × {svgRef.size?.height}
      </p>
    </>
  );
};
