import React, { useId } from 'react';

interface ClipGProps {
  width: number;
  height: number;
  children?: React.ReactNode;
}

export const Clip: React.FC<ClipGProps> = ({
  width,
  height,
  children = null,
}) => {
  const clipId = useId();

  return (
    <svg>
      <defs>
        <clipPath id={clipId}>
          <rect width={width} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </svg>
  );
};
