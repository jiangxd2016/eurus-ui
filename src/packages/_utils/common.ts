export function getValue(object: Record<string, any>, path: string): unknown {
  const paths = path.split('.');
  let result = object;
  for (const p of paths) {
    result = result[p];
  }
  return result;

}
