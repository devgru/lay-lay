import React from 'react';

interface OffsetProps {
  left?: number;
  top?: number;
  children?: React.ReactNode;
}

export const Offset: React.FC<OffsetProps> = ({
  left = 0,
  top = 0,
  children = null,
}) => <g transform={`translate(${left},${top})`}>{children}</g>;
