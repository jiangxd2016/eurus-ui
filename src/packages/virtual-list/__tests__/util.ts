/*
 * @Author: jiangxd
 * @Date: 2022-09-22 13:34:22
 * @LastEditTime: 2022-09-22 17:22:07
 * @LastEditors: jiangxd
 * @Description:
 * @FilePath: /eurus-ui/src/packages/virtual-list/__tests__/util.ts
 */

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
