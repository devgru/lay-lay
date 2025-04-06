import React from 'react';

interface MarginGProps {
  left?: number;
  top?: number;
  children?: React.ReactNode;
}

export const MarginG: React.FC<MarginGProps> = ({
  left = 0,
  top = 0,
  children = null,
}) => <g transform={`translate(${left},${top})`}>{children}</g>;
