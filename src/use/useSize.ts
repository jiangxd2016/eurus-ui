import { isNumber, isStr } from '@estjs/tools';

export function useSize(size: number | string | undefined) {
  if (!size) {
    return size;
  }
  if (isNumber(size)) {
    return `${size}px`;
  }
  if (isStr(size)) {
    if ((size as string).endsWith('px')) {
      return size;
    } else {
      return `${size}px`;
    }
  }
  return size;
}
