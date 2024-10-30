import { useWindowSize } from '@react-hook/window-size/throttled';
import {
  GuidesDebug,
  HTML,
  useGuides,
  useRefWithGuidesAttached,
  useSvgRootRef,
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
      <svg
        style={{ background: '#eee', width: '100%' }}
        height={height()}
        ref={useSvgRootRef(
          useRefWithGuidesAttached({
            horizontalCenter: hCenterGuide,
            verticalCenter: vCenterGuide,
          }),
        )}
      >
        <HTML
          guidesAttachment={{ bottom: height }}
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
            This is a some multiline text
            <br />
            that is centered in the SVG container within a foreignObject.
          </p>
        </HTML>
        <GuidesDebug />
      </svg>
    </>
  );
};
