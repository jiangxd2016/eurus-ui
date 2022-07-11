export function isString(o: any): boolean {
  return typeof o === 'string';
}
export function isNumber(o: any): boolean {
  return typeof o === 'number';
}
export function isStringNumber(o: any): boolean {
  return !Number.isNaN(Number(o));
}
