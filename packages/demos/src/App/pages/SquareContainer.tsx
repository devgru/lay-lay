import { useWindowSize } from '@react-hook/window-size/throttled';
import { SVG, useGuides } from 'react-svg-guides';

export const SquareContainer = () => {
  const { widthGuide } = useGuides();

  useWindowSize();

  return (
    <SVG
      height={widthGuide()}
      style={{ background: '#585', width: '100%' }}
      guidesAttachment={{ right: widthGuide }}
    />
  );
};
