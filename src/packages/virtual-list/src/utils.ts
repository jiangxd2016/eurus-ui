export class Accumulate<T> {
  arr: T[] = [];
  cache: number[] = [];
  constructor(arr: T[]) {
    this.arr = arr;
  }

  getValue(item: T): number {
    // @ts-expect-error
    return item;
  }

  sum(index: number) {
    if (this.cache[index] == null) {
      const prev = index > 0 ? this.sum(index - 1) : 0;
      this.cache[index] = this.getValue(this.arr[index]) + prev;
    }
    return this.cache[index];
  }
}

/**
 * If n greater than `max`, return `max`, else n.
 * 如果n大于max, 返回max, 否则n.
 * @param n
 * @param max
 * @returns
 */
export function notGreaterThan<T>(n: T, max: T) {
  return n < max ? n : max;
}

/**
 * get last of array
 * 返回数组末项
 * @param arr
 * @returns
 */
export function arrayLast<T>(arr: T[]) {
  return arr[arr.length - 1];
}
/**
 * like jquery $(el).css(), but only can read
 * @param el
 * @param name
 * @returns
 */
export function css(el: Element, name: keyof CSSStyleDeclaration ): string {
  const stl = getComputedStyle(el);
  return stl[name] as string;
}

// ## advanced

export type BinarySearchReturn<T> = {
  index: number;
  value: T;
  count: number;
  hit: boolean;
  greater?: boolean;
} | null;
export interface BinarySearchOptions {
  start?: number;
  end?: number;
  returnNearestIfNoHit?: boolean;
  maxTimes?: number;
}
/**
 * binarySearch, 二分查找
 * @param arr
 * @param callback return `mid - your_value` for ascending array
 * @param opt
 * @returns
 */
export function binarySearch<T>(
  arr: T[],
  callback: (mid: T, index: number, count: number) => number,
  opt: BinarySearchOptions = {}
): BinarySearchReturn<T> {

  let { start = 0, end = arr.length - 1 } = opt;
  const { returnNearestIfNoHit, maxTimes = 100 } = opt;
  let midNum;
  let mid;
  if (start == null) {
    start = 0;
    end = arr.length - 1;
  }
  let i = 0;
  let r = 0;
  while (start >= 0 && start <= end) {
    if (i >= maxTimes) {
      throw new Error(
        `binarySearch: loop times is over ${maxTimes}, you can increase the limit.`
      );
    }
    midNum = Math.floor((end - start) / 2 + start);
    mid = arr[midNum];
    const count = i + 1;
    r = callback(mid, midNum, count);
    if (r > 0) {
      end = midNum - 1;
    } else if (r < 0) {
      start = midNum + 1;
    } else {
      return { index: midNum as number, value: mid as T, count, hit: true };
    }
    i++;
  }
  return returnNearestIfNoHit
    ? {
        index: midNum as number,
        value: mid as T,
        count: i + 1,
        hit: false,
        greater: r > 0,
      }
    : null;
}

// source: http://youmightnotneedjquery.com/
export function hasClass(el: Element, className: string) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}
