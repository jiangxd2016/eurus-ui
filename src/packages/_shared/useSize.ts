import { isNumber, isString, isStringNumber } from './isType';

export function useSize(size: number | string | undefined) {
  if (!size) {
    return size;
  }
  if (isNumber(size)) {
    return `${size > 12 ? size : 12}px`;
  }
  if (isString(size)) {
    if (isStringNumber(size)) {
      return `${size}px`;
    }
    if ((size as string).endsWith('px')) {
      return size;
    }
    return size;
  }
  return size;
}
