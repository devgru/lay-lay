import { type FC } from 'react';
import type { HtmlOriginProps } from '../types.ts';
import { GetOriginContext } from '../contexts.ts';
import { useOriginRef } from '../hooks/useOriginRef.tsx';

export const HtmlOrigin: FC<HtmlOriginProps> = ({
  children,
  ref,
  ...props
}) => {
  const { originRef, getOrigin, refReady } = useOriginRef(ref);

  return (
    <div {...props} ref={originRef}>
      <GetOriginContext value={getOrigin}>
        {refReady && children}
      </GetOriginContext>
    </div>
  );
};
