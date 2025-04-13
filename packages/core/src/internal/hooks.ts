import {
  type Ref,
  type RefCallback,
  type RefObject,
  useMemo,
  useRef
} from 'react';

export const useCacheRef = <E>(): RefObject<E | undefined> => {
  const cache = useRef<E>(undefined);
  cache.current = undefined;
  return cache;
};

type RefCleanup<T> = Exclude<ReturnType<RefCallback<T>>, void>;
export const useMergeRefs = <T>(
  refs: Array<Ref<T> | undefined>,
): RefCallback<T> =>
  useMemo(
    () => (value) => {
      const cleanups: RefCleanup<T>[] = [];

      for (const ref of refs) {
        if (ref == null) {
          continue;
        }
        if (typeof ref === 'function') {
          const cleanup = ref(value);
          if (typeof cleanup === 'function') {
            cleanups.push(cleanup);
          } else {
            cleanups.push(() => {
              ref(null);
            });
          }
          continue;
        }

        ref.current = value;
        cleanups.push(() => {
          ref.current = null;
        });
      }

      return () => {
        for (const cleanup of cleanups) {
          cleanup();
        }
      };
    },
    [refs],
  );
