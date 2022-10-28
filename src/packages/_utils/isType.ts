export const _toString = Object.prototype.toString;
export const _hasOwnProperty = Object.prototype.hasOwnProperty;

export function isArray(value: unknown): value is Array<any> {
  return Array.isArray(value);
}
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isPromise(value: unknown): value is Promise<any> {
  return _toString.call(value) === '[object Promise]';
}
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isEmpty(value: unknown): boolean {
  if (!value && value !== 0) { return true; }
  if (isString(value)) { return value.length === 0; }
  if (isArray(value)) { return value.length === 0; }
  if (isObject(value)) { return Object.keys(value).length === 0; }
  return false;
}

export function isObject(value: unknown): value is Record<string, any> {
  return _toString.call(value) === '[object Object]';
}

