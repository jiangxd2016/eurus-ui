export const _toString = Object.prototype.toString;

export function isString(o: any): boolean {
  return typeof o === 'string';
}
export function isNumber(o: any): boolean {
  return typeof o === 'number';
}
export function isPlainObject(o: any): boolean {
  return _toString.call(o) === '[object Object]';
}
export function isArray(o: any): boolean {
  return Array.isArray(o);
}
export function isStringNumber(o: any): boolean {
  return !Number.isNaN(Number(o));
}
