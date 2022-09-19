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
/**
 *
 * @param num 数组长度
 * @param start 初始值
 * @returns
 */
export function numberToArr(num: number, start = 0): number[] {
  return Array.from({ length: num }, (_, index)=>start + index);
}
