import { HtmlWrapper, Stack, useSizeState } from '@lay-lay/core';

export const AutoStackLayoutDemo = () => {
  const rootSizeState = useSizeState();
  const shapesSizeState = useSizeState();

  return (
    <>
      <h2>Stack demo — both directions</h2>
      <p>
        Verifies that both vertical and horizontal stacking is working as
        expected.
      </p>
      <svg width={rootSizeState.width} height={rootSizeState.height}>
        <Stack stackDirection="vertical" sizeState={rootSizeState}>
          <HtmlWrapper
            width={shapesSizeState.width}
            style={{ textAlign: 'center', fontSize: '16pt' }}
          >
            <p>
              This paragraph and these elements are positioned using{' '}
              <code>&lt;Stack&gt;</code>,<br />
              based on their size.
            </p>
          </HtmlWrapper>
          <Stack stackDirection="horizontal" sizeState={shapesSizeState}>
            <circle r={50} fill="red" />
            <rect
              width={71}
              height={71}
              fill="green"
              transform="translate(100 -1000) rotate(45) translate(100)"
            />
            <circle r={50} fill="blue" />
            <HtmlWrapper
              width={71}
              height={71}
              transform="translate(100 -1000) rotate(45) translate(100)"
            >
              <div
                style={{
                  backgroundColor: 'yellow',
                  color: 'black',
                  fontSize: '17pt',
                  textAlign: 'center',
                }}
              >
                <div>some</div>
                <div>
                  <code>html</code>
                </div>
              </div>
            </HtmlWrapper>
          </Stack>
        </Stack>
      </svg>
    </>
  );
};
