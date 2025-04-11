import { HTML, StackLayout, useRefWithSize } from '@lay-lay/core';

export const FitMe = () => {
  const rootRef = useRefWithSize<SVGCircleElement>();
  const shapesRef = useRefWithSize<SVGCircleElement>();
  const htmlRef = useRefWithSize<HTMLDivElement>();

  return (
    <svg width={rootRef.width} height={rootRef.height}>
      <g ref={rootRef}>
        <StackLayout stackDirection="vertical">
          <HTML
            ref={htmlRef}
            width={shapesRef.width}
            height={htmlRef.height}
            style={{ textAlign: 'center' }}
          >
            <p>
              This paragraph and these elements are positioned using{' '}
              <code>StackLayout</code>, based on their size.
            </p>
          </HTML>
          <g ref={shapesRef}>
            <StackLayout stackDirection="horizontal">
              <circle r={50} fill="red" />
              <rect
                width={71}
                height={71}
                fill="green"
                transform="translate(100 -1000) rotate(45) translate(100)"
              />
              <circle r={50} fill="blue" />
              <HTML
                width={71}
                height={71}
                style={{
                  backgroundColor: 'yellow',
                  color: 'black',
                  fontSize: '17pt',
                  textAlign: 'center',
                }}
                transform="translate(100 -1000) rotate(45) translate(100)"
              >
                <div>some</div>
                <div>
                  <code>html</code>
                </div>
              </HTML>
            </StackLayout>
          </g>
        </StackLayout>
      </g>
    </svg>
  );
};
