import React, { useRef, useLayoutEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size/throttled';
import { useContainerSize } from '../contexts/ContainerSizeContext.tsx';

interface FillParentSvgProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'children'> {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const FillParentSvg: React.FC<FillParentSvgProps> = props => {
  const { children = null, ...svgProps } = props;
  const nodeRef = useRef<SVGSVGElement | null>(null);

  const { setWidth, setHeight } = useContainerSize();

  useWindowSize();

  useLayoutEffect(() => {
    if (nodeRef.current) {
      setWidth(nodeRef.current.clientWidth);
      setHeight(nodeRef.current.clientHeight);
    }
  });

  return (
    <svg
      {...svgProps}
      ref={nodeRef}
      style={{
        width: '100%',
        height: '100%',
        ...(svgProps.style || {}),
      }}
    >
      {nodeRef.current && children}
    </svg>
  );
};
