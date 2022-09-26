import { isFunction } from './isType';
import type { RenderContent } from './types';

export const getSlotFunction = (param: RenderContent | undefined) => {
  if (param) {
    if (isFunction(param)) { return param; }
    return () => param;
  }
  return undefined;
};
