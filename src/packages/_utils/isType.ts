export const _toString = Object.prototype.toString;
export const _hasOwnProperty = Object.prototype.hasOwnProperty;
export function isArray(o: any): boolean {
  return Array.isArray(o);
}
export function isBlob(o: any): boolean {
  return _toString.call(o) === '[object Blob]';
}
export function isBool(value: any): boolean {
  return typeof value === 'boolean';
}
export function isDate(d: any): boolean {
  return d instanceof Date;
}
export function isFn(o: any): boolean {
  return typeof o === 'function';
}
export function isMap(o: any): boolean {
  return _toString.call(o) === '[object Map]';
}
export function isNaN(o: any): boolean {
  return (Number.isNaN || function isNaN(input) {
    return typeof input === 'number' && input !== input;
  })(o);
}
export function isNull(o: any): boolean {
  return o === null;
}

export function isObject(o: any): boolean {
  return _toString.call(o) === '[object Object]';
}
export function isPromise(o: any): boolean {
  return _toString.call(o) === '[object Promise]';
}
export function isReg(o: any): boolean {
  return typeof o === 'object' && o.constructor === RegExp;
}
export function isSet(o: any): boolean {
  return _toString.call(o) === '[object Set]';
}
export function isString(o: any): boolean {
  return typeof o === 'string';
}
export function isSymbol(o: any): boolean {
  return typeof o === 'symbol';
}

export function isWeakMap(o: any): boolean {
  return _toString.call(o) === '[object WeakMap]';
}
export function isWeakSet(o: any): boolean {
  return _toString.call(o) === '[object WeakSet]';
}
export function isFile(o: any): boolean {
  return _toString.call(o) === '[object File]';
}

export const isUndefined = (val: any): boolean => val === undefined;

export function isBoolean(val: any): boolean {
  return typeof val === 'boolean';
}
export function isNumber(val: any): boolean {
  return typeof val === 'number';
}
export const isEmpty = (val: any) =>
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

export function toPrecision(num: number, numPrecision = 2) {
  return Number.parseFloat(num.toFixed(numPrecision));
}
