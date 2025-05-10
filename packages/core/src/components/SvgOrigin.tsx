import { type FC } from 'react';
import type { SvgOriginProps } from '../types.ts';
import { GetOriginContext } from '../contexts.ts';
import { useOriginRef } from '../hooks/useOriginRef.tsx';

export const SvgOrigin: FC<SvgOriginProps> = ({ children, ref, ...props }) => {
  const { originRef, getOrigin, refReady } = useOriginRef(ref);

  return (
    <svg {...props} ref={originRef}>
      <GetOriginContext value={getOrigin}>
        {refReady && children}
      </GetOriginContext>
    </svg>
  );
};
