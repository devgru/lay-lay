import { HtmlOrigin, useRefWithBox } from '@lay-lay/core';

const InnerComponent = () => {
  const ref = useRefWithBox<HTMLDivElement>();

  const style = {
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
    left: '0',
    top: '0',
  };
  return (
    <>
      <div style={style}>
        <div
          ref={ref}
          style={{
            backgroundColor: 'blue',
            width: 200,
            height: 200,
            margin: '0 auto',
          }}
        >
          left: {ref.left}
          <br />
          top: {ref.top}
        </div>
      </div>
      <svg style={style}>
        <rect
          x={ref.left}
          y={ref.top}
          width={ref.width}
          height={ref.height}
          fill="red"
          style={{ opacity: 0.5 }}
        />
      </svg>
    </>
  );
};

export const LayersPositioningDemo = () => {
  return (
    <>
      <h2>Layered Positioning demo</h2>
      <p>verifies that we are able to align HTML and SVG elements</p>
      <HtmlOrigin style={{ position: 'relative', width: 400, height: 400 }}>
        <InnerComponent />
      </HtmlOrigin>
    </>
  );
};
