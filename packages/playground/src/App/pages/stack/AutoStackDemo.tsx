import { HtmlWrapper, useSizeObserver } from '@lay-lay/core';
import { useWindowSize } from '@react-hook/window-size/throttled';
import { NegateOffset, HorizontalStack, VerticalStack } from '@lay-lay/stack';

export const AutoStackDemo = () => {
  const rootSizeObserver = useSizeObserver();
  const shapesSizeObserver = useSizeObserver();

  useWindowSize();

  return (
    <>
      <h2>Stack demo — both directions</h2>
      <p>
        Verifies that both vertical and horizontal stacking is working as
        expected.
      </p>
      <svg width={rootSizeObserver.width} height={rootSizeObserver.height}>
        <VerticalStack onSizeCalculated={rootSizeObserver.setSize}>
          <HtmlWrapper
            width={shapesSizeObserver.width ?? 0}
            style={{ textAlign: 'center', fontSize: '16pt' }}
          >
            <p>
              This paragraph and these elements are positioned using{' '}
              <code>&lt;Stack&gt;</code>,<br />
              based on their size.
            </p>
          </HtmlWrapper>
          <HorizontalStack onSizeCalculated={shapesSizeObserver.setSize}>
            <NegateOffset>
              <circle r={50} fill="red" />
            </NegateOffset>
            <NegateOffset>
              <rect
                width={71}
                height={71}
                fill="green"
                transform="translate(100 -1000) rotate(45) translate(100)"
              />
            </NegateOffset>
            <NegateOffset>
              <circle r={50} fill="blue" />
            </NegateOffset>
            <NegateOffset>
              <HtmlWrapper
                width={71}
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
            </NegateOffset>
          </HorizontalStack>
        </VerticalStack>
      </svg>
    </>
  );
};
