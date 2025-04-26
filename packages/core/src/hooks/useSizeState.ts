import type { Size, SizeState } from '../types.ts';
import { useCallback, useState } from 'react';

export const useSizeState = (): SizeState => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const setSize = useCallback(
    (size: Size) => {
      setWidth(size.width);
      setHeight(size.height);
    },
    [setWidth, setHeight]
  );
  return {
    width,
    height,
    setSize
  };
};