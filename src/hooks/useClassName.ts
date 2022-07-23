import { isArray, isString, isObject } from '@/utils';
function classNames (...args: any[]): string {
  const classes = [];
  for (const value of args) {
    if (!value) { continue; }
    if (isString(value)) {
      classes.push(value);
    } else if (isArray(value)) {
      for (const element of value) {
        const inner = classNames(element);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }
  return classes.join(' ');
}

export default classNames;