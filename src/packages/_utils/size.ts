import { isStringNumber } from '@/packages/_utils/is';
import type { StringNumber } from '@/packages/_utils/types';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const sizeToPx = (size: Size): number => {
  switch (size) {
    case 'xs':
      return 12;
    case 'sm':
      return 16;
    case 'md':
      return 20;
    case 'lg':
      return 24;
    case 'xl':
      return 28;
    default:
      return 22;
  }
};
export const getSize = (size: Size | number | StringNumber): string => {
  if (typeof size === 'number' || isStringNumber(size)) {
    return `${size}px`;
  }
  return `${sizeToPx(size)}px`;
};
