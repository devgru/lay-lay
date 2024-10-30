import { useWindowSize } from '@react-hook/window-size/throttled';
import {
  useGuides,
  useRefWithGuidesAttached,
  useSvgRootRef,
} from 'react-svg-guides';

export const SquareContainer = () => {
  const { widthGuide } = useGuides();

  useWindowSize();

  return (
    <>
      <svg
        height={widthGuide()}
        style={{ background: '#585', width: '100%' }}
        ref={useSvgRootRef(useRefWithGuidesAttached({ right: widthGuide }))}
      ></svg>
    </>
  );
};
