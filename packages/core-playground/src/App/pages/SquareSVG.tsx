import { useWindowSize } from '@react-hook/window-size/throttled';
import { useRefWithSize } from '@lay-lay/core';

export const SquareSVG = () => {
  const ref = useRefWithSize<SVGSVGElement>();

  useWindowSize();

  return (
    <svg
      height={ref.width}
      style={{ background: '#585', width: '100%' }}
      ref={ref}
    />
  );
};
