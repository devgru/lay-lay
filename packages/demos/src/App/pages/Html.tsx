import { useWindowSize } from '@react-hook/window-size/throttled';
import { useRefWithSize, useRootRef } from 'react-svg-guides';

export const Html = () => {
  const rootRef = useRootRef<HTMLDivElement>();

  const ref = useRefWithSize<HTMLDivElement>();

  useWindowSize();

  return (
    <div ref={rootRef} style={{ width: '100%', backgroundColor: '#333' }}>
      <div ref={ref} style={{ overflow: 'hidden' }}>
        <p>hello</p>
        <p>world</p>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <p>another</p>
        <p>one</p>
      </div>
    </div>
  );
};
