import { useWindowSize } from '@react-hook/window-size/throttled';
import { useRefWithSize } from '@lay-lay/core';

export const AdaptiveRectDemo = () => {
  const ref = useRefWithSize<SVGSVGElement>();

  useWindowSize();

  return (
    <>
      <h2>Resizeable rect demo</h2>
      <p>rect height is 10% of its width</p>
      <svg
        height={ref.width * 0.1}
        style={{ background: '#585', width: '100%' }}
        ref={ref}
      /></>
  );
};
