import type { StringNumber } from '@/components/_utils/type';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare const sizeToPx: (size: Size) => number;
export declare const getSize: (size: Size | number | StringNumber) => string;
