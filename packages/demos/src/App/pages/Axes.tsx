import { useRefWithSize } from 'react-svg-guides';
import { Axis, Orient } from 'd3-axis-for-react';
import { scaleLinear } from 'd3-scale';

export const Axes = () => {
  const gRef = useRefWithSize<SVGGElement>();

  const scale = scaleLinear().range([0, 50]);
  return (
    <svg width="200" height="800" style={{ background: '#fff', color: 'red' }}>
      <g ref={gRef}>
        <Axis scale={scale} orient={Orient.right} />
      </g>
    </svg>
  );
};
