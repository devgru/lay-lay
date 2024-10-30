import React, {
  MutableRefObject,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Guide, GuidesAttachment, SVGOrHTMLElement } from './types';
import { useRefWithGuidesAttached } from './hooks';
import {
  ardov,
  HORIZONTAL_GUIDES_MAP,
  VERTICAL_GUIDES_MAP,
} from './constants.ts';
import { getCachedRootRect, getSvgRoot } from './util.ts';

export const HTML = ({
  children,
  guidesAttachment,
  ...rest
}: {
  guidesAttachment: GuidesAttachment;
} & React.SVGAttributes<SVGForeignObjectElement>) => (
  <foreignObject {...rest}>
    <div ref={useRefWithGuidesAttached(guidesAttachment)}>{children}</div>
  </foreignObject>
);

const defaultAttributes = {
  stroke: 'color(display-p3 2 2 2)',
  strokeDasharray: '3 5',
};

export const GuidesDebug = ({
  attributes,
}: {
  attributes?: React.SVGAttributes<SVGLineElement>;
}) => {
  const ref = useRef(null);
  const rootRef: MutableRefObject<SVGOrHTMLElement | null> = useRef(null);

  let verticalGuides: Guide[] = [];
  let horizontalGuides: Guide[] = [];
  let body = null;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current === null) {
      return;
    }
    if (rootRef.current === null) {
      rootRef.current = getSvgRoot(ref.current);
    }
    const { width, height } = getCachedRootRect(rootRef.current);
    setWidth(width);
    setHeight(height);
  });

  if (rootRef.current !== null) {
    if (VERTICAL_GUIDES_MAP.has(rootRef.current)) {
      verticalGuides = Array.from(VERTICAL_GUIDES_MAP.get(rootRef.current)!);
    }
    if (HORIZONTAL_GUIDES_MAP.has(rootRef.current)) {
      horizontalGuides = Array.from(
        HORIZONTAL_GUIDES_MAP.get(rootRef.current)!,
      );
    }
    if (verticalGuides.length !== 0 || horizontalGuides.length !== 0) {
      body = (
        <g>
          <image width="1" height="1" href={ardov} x="-1" y="-1" />
          {horizontalGuides.map(guide => {
            const y = guide();
            return (
              <line
                {...defaultAttributes}
                {...attributes}
                key={guide.id}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
              />
            );
          })}
          {verticalGuides.map(guide => {
            const x = guide();
            return (
              <line
                {...defaultAttributes}
                {...attributes}
                key={guide.id}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
              />
            );
          })}
        </g>
      );
    }
  }

  return <g ref={ref}>{body}</g>;
};
