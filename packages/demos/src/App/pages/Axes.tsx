import { SVG, useGuides, useRefWithGuidesAttached } from 'react-svg-guides';
import { Axis, Orient } from 'd3-axis-for-react';
import { scaleLinear } from 'd3-scale';

export const Axes = () => {
  const { widthGuide } = useGuides();

  const scale = scaleLinear().range([0, 50]);
  return (
    <SVG width="200" height="800" style={{ background: '#fff', color: 'red' }}>
      <g ref={useRefWithGuidesAttached({ left: widthGuide })}>
        <Axis scale={scale} orient={Orient.right} />
      </g>
    </SVG>
  );
};
