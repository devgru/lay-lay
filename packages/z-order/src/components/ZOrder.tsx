import { Children, type ReactElement } from 'react';
import type { ZOrderProps, ZType } from '../types.ts';

const sortByZProp = (a: { props: ZType }, b: { props: ZType }): number =>
  a.props.z - b.props.z;

const removeZProp = (child: ReactElement<ZType>) => {
  const { z, ...props } = child.props;

  if (!Number.isFinite(z)) {
    throw new Error('Children in ZOrder must have `z`, a finite Number.');
  }

  return { ...child, props };
};

const sort = (children: ReactElement<ZType>[]) =>
  children.sort(sortByZProp).map(removeZProp);

export const ZOrder = ({ children }: ZOrderProps): ReactElement[] | null => {
  const array = Children.toArray(children) as ReactElement<ZType>[];
  if (array.length === 0) {
    return null;
  }

  return sort(array);
};
