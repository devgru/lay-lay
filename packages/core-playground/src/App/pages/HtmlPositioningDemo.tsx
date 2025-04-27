import { HtmlOrigin, useRefWithBox } from '@lay-lay/core';

const InnerComponent = () => {
  const ref = useRefWithBox<HTMLDivElement>();

  return (
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
    </div>
  );
};

export const HtmlPositioningDemo = () => {
  return (
    <>
      <h2>HTML Positioning demo</h2>
      <p>
        verifies that we are able to find a relative position of an HTML{' '}
        <code>div</code> element inside its <code>HtmlOrigin</code> parent
      </p>
      <HtmlOrigin>
        <InnerComponent />
      </HtmlOrigin>
    </>
  );
};
