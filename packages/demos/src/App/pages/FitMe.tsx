import {
  HTML,
  StackLayout,
  useRefWithSize,
} from 'react-svg-guides';

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
              <rect
                width={71}
                height={71}
                fill="yellow"
                transform="scale(1.41)"
              />
            </StackLayout>
          </g>
        </StackLayout>
      </g>
    </svg>
  );
};
