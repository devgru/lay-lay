import type { ReactElement, ReactNode } from 'react';

export type ZType = { z: number };

export type ZOrderProps = {
  children: ReactElement<ZType> | ReactElement<ZType>[];
};

export type ZProps = ZType & {
  children?: ReactNode;
};
