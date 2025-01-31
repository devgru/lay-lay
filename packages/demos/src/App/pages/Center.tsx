import { useWindowSize } from '@react-hook/window-size/throttled';
import {
  GuidesDebug,
  HTML,
  SVG,
  useGuides,
} from 'react-svg-guides';

export const Center = () => {
  const { hCenterGuide, vCenterGuide, height } = useGuides();

  useWindowSize();

  return (
    <>
      <p>
        SVG size is defined by HTML contents, SVG container exposes its center
        via two guides
      </p>
      <SVG
        style={{ background: '#eee', width: '100%' }}
        height={height()}
        guidesAttachment={{
          horizontalCenter: hCenterGuide,
          verticalCenter: vCenterGuide,
        }}
      >
        <HTML
          guidesAttachment={{ height }}
          width="100%"
          height={height()}
        >
          <p
            style={{
              margin: 0,
              color: 'black',
            }}
          >
            Hello!
            <br />
            This is a multiline text
            that is centered in the SVG container within a foreignObject.
          </p>
        </HTML>
        <GuidesDebug />
      </SVG>
    </>
  );
};
