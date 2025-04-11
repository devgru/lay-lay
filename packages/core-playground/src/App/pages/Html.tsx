import { useWindowSize } from '@react-hook/window-size/throttled';

export const Html = () => {
  useWindowSize();

  return (
    <div style={{ width: '100%', backgroundColor: '#333' }}>
      <div style={{ overflow: 'hidden' }}>
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
