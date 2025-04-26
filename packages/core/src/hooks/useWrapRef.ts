import { type Ref, type RefCallback, useMemo, useRef } from 'react';
import type { NullableRefObject } from '../types.ts';

type RefCleanup = () => void;

type WrappedRef<T> = {
  innerRef: NullableRefObject<T>;
  mergedRef: RefCallback<T>;
};

const setRefValueAndReturnCleanup = <T>(
  ref: NonNullable<Ref<T>>,
  value: T | null,
): RefCleanup => {
  if (typeof ref === 'function') {
    const cleanup = ref(value);

    if (typeof cleanup === 'function') {
      return cleanup;
    }
    return () => {
      ref(null);
    };
  }
  ref.current = value;
  return () => {
    ref.current = null;
  };
};

export const useWrapRef = <T>(outerRef: Ref<T> | undefined): WrappedRef<T> => {
  const innerRef: NullableRefObject<T> = useRef<T>(null);
  const mergedRef: RefCallback<T> = useMemo(
    () => (value) => {
      if (value === null) {
        innerRef.current = null;
        if (outerRef != null) {
          if (typeof outerRef === 'function') {
            outerRef(null);
          } else {
            outerRef.current = null;
          }
        }
        return;
      }

      innerRef.current = value;
      const innerCleanup = () => {
        innerRef.current = null;
      };

      if (outerRef == null) {
        return innerCleanup;
      }

      const outerCleanup = setRefValueAndReturnCleanup(outerRef, value);

      return () => {
        innerCleanup();
        outerCleanup();
      };
    },
    [outerRef],
  );
  return {
    innerRef,
    mergedRef,
  };
};
