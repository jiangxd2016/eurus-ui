import { isStringNumber } from '@/components/_utils/is';
import type { StringNumber } from '@/components/_utils/type';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const sizeToPx = (size: Size): number => {
  switch (size) {
    case 'xs':
      return 8;
    case 'sm':
      return 12;
    case 'md':
      return 16;
    case 'lg':
      return 20;
    case 'xl':
      return 24;
    default:
      return 16;
  }
};
export const getSize = (size: Size | number | StringNumber): string => {
  if (typeof size === 'number' || isStringNumber(size)) {
    return `${size}px`;
  }
  return `${sizeToPx(size)}px`;
};
