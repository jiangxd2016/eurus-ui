import { isArray, isObject } from '@vue/shared';

export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol,
} from '@vue/shared';
export { isVNode } from 'vue';

export const isUndefined = (val: any): boolean => val === undefined;

export function isBoolean(val: any): boolean {
  return typeof val === 'boolean';
}
export function isNumber(val: any): boolean {
  return typeof val === 'number';
}
export const isEmpty = (val: unknown) =>
  (!val && val !== 0)
  || (isArray(val) && val.length === 0)
  || (isObject(val) && Object.keys(val).length === 0);

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') { return false; }
  return e instanceof Element;
};

export function isStringNumber(o: any): boolean {
  return !Number.isNaN(Number(o));
}
export function isDayjs(time: any): boolean {
  return (
    isObject(time)
    && '$y' in time
    && '$M' in time
    && '$D' in time
    && '$d' in time
    && '$H' in time
    && '$m' in time
    && '$s' in time
  );
}

export function toPrecision (num: number, numPrecision = 2) {
  return Number.parseFloat(num.toFixed(numPrecision));
}
