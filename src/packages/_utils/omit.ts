import type { Data } from './types';

export const omit = <T extends Data, K extends keyof any>(
  object: T,
  path: Array<K extends keyof T ? K : never>
): Omit<T, K> => {
  const result = { ...object };

  for (const item of path) {
    if (item in result) {
      delete result[item];
    }
  }

  return result;
};
