import {
  HTML,
  StackLayout,
  useRefWithSize,
} from 'react-svg-guides';

export const FitMe = () => {
  const gRef = useRefWithSize<SVGCircleElement>();
  const htmlRef = useRefWithSize<HTMLDivElement>();

  return (
    <svg width={gRef.width} height={gRef.height}>
      <g ref={gRef}>
        <StackLayout stackDirection="vertical">
          <HTML ref={htmlRef} width={300} height={htmlRef.height} style={{textAlign: 'center'}}>
            <p>
              This paragraph and these circles are positioned using <code>StackLayout</code>, based on their size.
            </p>
          </HTML>
          <StackLayout stackDirection="horizontal">
            <circle r={50} fill="red" />
            <circle r={50} fill="green" />
            <circle r={50} fill="blue" />
          </StackLayout>
        </StackLayout>
      </g>
    </svg>
  );
};
