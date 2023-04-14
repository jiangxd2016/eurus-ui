import type { Data } from './types';

export const omit = <T extends Data, K extends keyof any>(
  object: T,
  path: Array<K>
): Omit<T, K> => {
  const result = { ...object };

  for (const item of path) {
    // @ts-expect-error
    if (item in result) {
      // @ts-expect-error
      delete result[item];
    }
  }

  return result;
};
