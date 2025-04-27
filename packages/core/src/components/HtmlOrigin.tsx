import { type FC } from 'react';
import type { HtmlOriginProps } from '../types.ts';
import { OriginContext } from '../contexts.ts';
import { useOriginRef } from '../hooks/useOriginRef.tsx';

export const HtmlOrigin: FC<HtmlOriginProps> = ({
  children,
  ref,
  ...props
}) => {
  const { originRef, getOrigin } = useOriginRef(ref);

  return (
    <div {...props} ref={originRef}>
      <OriginContext.Provider value={getOrigin}>
        {children}
      </OriginContext.Provider>
    </div>
  );
};
