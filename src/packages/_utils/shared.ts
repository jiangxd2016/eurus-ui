import type { RenderContent } from '@/packages/_utils/type';
import { isFunction } from '@/packages/_utils/is';

export const noop = () => {};
export const now = () => Date.now();
export const timestamp = () => +Date.now();
export const hasOwn = <T extends object, K extends keyof T>(val: T, key: K): key is K => Object.prototype.hasOwnProperty.call(val, key);

export const stopPropagation = (e: Event) => e.stopPropagation();
export const preventDefault = (e: Event) => e.preventDefault();

/**
 *  深度获取对象的值
 * @param object
 * @param path
 * @returns
 */
export function getValue(object: Record<string, any>, path: string): unknown {
  const paths = path.split('.');
  let result = object;
  for (const p of paths) {
    result = result[p];
  }
  return result;

}

export function throttle(fn: Function, stop: number) {
  let start = 0;
  return function (this: unknown, args?: unknown) {
    const end = Date.now();
    if (end - start >= stop) {
      const result = fn.call(this, args);
      start = end;
      return result;
    }
  };
}
export const getSlotFunction = (param: RenderContent | undefined) => {
  if (param) {
    if (isFunction(param)) { return param; }
    return () => param;
  }
  return undefined;
};
