import React, { useLayoutEffect, useRef, useState } from 'react';
import { Guide, GuidesAttachment } from './types';
import { useRefWithGuidesAttached } from './hooks';
import { ardov } from './constants.ts';
import { GuidesStateRequestEvent, requestGuidesState } from './events.tsx';
import { GUIDES_STATE_REQUEST_EVENT } from './constants';

export const SVG = ({
  children,
  guidesAttachment = {},
  ...props
}: {
  guidesAttachment?: GuidesAttachment;
} & React.SVGAttributes<SVGSVGElement>) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [verticalGuides] = useState(() => new Set<Guide>());
  const [horizontalGuides] = useState(() => new Set<Guide>());

  const rectCache = useRef<DOMRect>(null);
  rectCache.current = null;

  useLayoutEffect(() => {
    const svg = svgRef.current!;

    const handleGuidesStateRequest = (e: Event) => {
      if (!(e instanceof GuidesStateRequestEvent)) {
        return;
      }

      e.callback({
        getRootRect: (force = false) => {
          if (!rectCache.current) {
            if (force) {
              return svg.getBoundingClientRect();
            }
            rectCache.current = svg.getBoundingClientRect();
          }

          return rectCache.current;
        },
        verticalGuides,
        horizontalGuides,
      });

      e.stopPropagation();
    };

    svg.addEventListener(GUIDES_STATE_REQUEST_EVENT, handleGuidesStateRequest);
    return () =>
      svg.removeEventListener(
        GUIDES_STATE_REQUEST_EVENT,
        handleGuidesStateRequest,
      );
  }, []);

  return (
    <svg {...props} ref={useRefWithGuidesAttached(guidesAttachment, svgRef)}>
      {children}
    </svg>
  );
};

export const HTML = ({
  children,
  guidesAttachment = {},
  ...rest
}: {
  guidesAttachment?: GuidesAttachment;
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
  const ref = useRef<SVGGElement>(null);
  const guidesRef = useRef<{
    getRootRect: (force?: boolean) => DOMRect | null;
    verticalGuides: Set<Guide>;
    horizontalGuides: Set<Guide>;
  }>({
    getRootRect: () => null,
    verticalGuides: new Set(),
    horizontalGuides: new Set(),
  });

  useLayoutEffect(() => {
    const element = ref.current;

    requestGuidesState(element!, guidesState => {
      guidesRef.current = guidesState;
    });
  });

  const { getRootRect, verticalGuides, horizontalGuides } = guidesRef.current;
  let body = null;
  const rootRect = getRootRect(true);

  if (rootRect && (verticalGuides.size > 0 || horizontalGuides.size > 0)) {
    body = (
      <g>
        <image width="1" height="1" href={ardov} x="-1" y="-1" />
        {Array.from(horizontalGuides).map(guide => {
          const y = guide();
          return (
            <line
              {...defaultAttributes}
              {...attributes}
              key={guide.id}
              x1={0}
              y1={y}
              x2={rootRect.width}
              y2={y}
            />
          );
        })}
        {Array.from(verticalGuides).map(guide => {
          const x = guide();
          return (
            <line
              {...defaultAttributes}
              {...attributes}
              key={guide.id}
              x1={x}
              y1={0}
              x2={x}
              y2={rootRect.height}
            />
          );
        })}
      </g>
    );
  }

  return <g ref={ref}>{body}</g>;
};
