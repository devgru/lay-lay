import type { SizeObserver } from '../types.ts';
import { useCallback, useState } from 'react';

export const useSizeObserver = (): SizeObserver => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const setSize = useCallback(
    (width: number, height: number) => {
      setWidth(width);
      setHeight(height);
    },
    [setWidth, setHeight],
  );
  return {
    width,
    height,
    setSize,
  };
};
