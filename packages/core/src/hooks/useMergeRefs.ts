import { type Ref, type RefCallback, useMemo } from 'react';

type RefCleanup<T> = Exclude<ReturnType<RefCallback<T>>, void>;

const setRefValueAndReturnCleanup = <T>(
  ref: Ref<T>,
  value: T | null,
): RefCleanup<T> | undefined => {
  if (ref == null) {
    return;
  }
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

const setRefValue = <T>(ref: Ref<T>, value: T | null): void => {
  if (ref == null) {
    return;
  }
  if (typeof ref === 'function') {
    ref(value);
    return;
  }
  ref.current = value;
};

export const useMergeRefs = <T>(
  refA: Ref<T> | undefined,
  refB: Ref<T> | undefined,
): Ref<T> =>
  useMemo(
    () => (value) => {
      if (value === null) {
        if (refA) {
          setRefValue(refA, null);
        }
        if (refB) {
          setRefValue(refB, null);
        }
        return;
      }

      const noA = refA == null;
      const noB = refB == null;
      if (noA) {
        if (noB) {
          return;
        }
        return setRefValueAndReturnCleanup(refB, value);
      }

      if (noB) {
        return setRefValueAndReturnCleanup(refA, value);
      }

      const cleanupA = setRefValueAndReturnCleanup(refA, value);
      const cleanupB = setRefValueAndReturnCleanup(refB, value);

      if (cleanupA) {
        if (cleanupB) {
          return () => {
            cleanupA();
            cleanupB();
          };
        }
        return cleanupA;
      }
      return cleanupB;
    },
    [refA, refB],
  );
