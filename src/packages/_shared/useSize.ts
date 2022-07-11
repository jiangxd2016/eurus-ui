import { isNumber, isString } from './isType';

export function useSize(size: number | string | undefined) {
  if (!size) {
    return size;
  }
  if (isNumber(size)) {
    return `${size}px`;
  }
  if (isString(size)) {
    if ((size as string).endsWith('px')) {
      return size;
    } else {
      return `${size}px`;
    }
  }
  return size;
}
