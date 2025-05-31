import type { Origin } from '../types.ts';
import { useLayoutEffect, useRef, useState } from 'react';
import { useGetOrigin } from '../contexts.ts';

export const useOrigin = (): Origin | null => {
  const [x, setX] = useState<number | undefined>(undefined);
  const [y, setY] = useState<number | undefined>(undefined);
  const getOrigin = useGetOrigin();

  const ref = useRef<Origin>(null);
  if (ref.current === null) {
    if (x !== undefined && y !== undefined) {
      ref.current = { x, y };
    }
  } else {
    ref.current.x = x!;
    ref.current.y = y!;
  }

  useLayoutEffect(() => {
    const { x, y } = getOrigin();
    setX(x);
    setY(y);
  });

  return ref.current;
};
