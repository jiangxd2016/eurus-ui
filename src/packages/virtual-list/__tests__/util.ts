import fs from 'fs';
import jsonData from './data.json';
export function getDatas(counts: number) {
  if (jsonData) {
    return jsonData;
  }

  const data = [];
  for (let index = 0; index < counts; index++) {
    data.push({
      id: String(index),
      text: Math.random().toString(16).slice(8)
    });
  }

  fs.writeFileSync('./src/packages/virtual-list/__tests__/data.json', JSON.stringify(data));
  return data;
}
