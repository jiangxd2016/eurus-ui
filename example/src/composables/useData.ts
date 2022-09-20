// gen a simple unique id.
function genUniqueId(prefix: number) {
  return `${prefix}$${Math.random().toString(16).slice(9)}`;
}

export default function getRandomData(TOTAL_COUNT = 1000) {
  const DataItems = [];
  let count = TOTAL_COUNT;
  while (count--) {
    const index = TOTAL_COUNT - count;
    DataItems.push({
      index,
      name: Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15) + 'name',
      id: genUniqueId(index),
      desc: Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15) + 'desc',
    });
  }
  return DataItems;

}
