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
          left: {ref.box?.left ?? 0}
          <br />
          top: {ref.box?.top ?? 0}
        </div>
      </div>
      <svg style={style}>
        {ref.box && (
          <rect
            x={ref.box.left}
            y={ref.box.top}
            width={ref.size.width}
            height={ref.size.height}
            fill="red"
            style={{ opacity: 0.5 }}
          />
        )}
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
