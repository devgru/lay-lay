import type { FC } from 'react';
import type { StackProps } from '../types.ts';
import { Stack } from './Stack.tsx';

export const VerticalStack: FC<Omit<StackProps, 'stackDirection'>> = (
  props,
) => <Stack {...props} stackDirection="vertical" />;
