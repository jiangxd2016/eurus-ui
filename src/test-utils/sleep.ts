/*
 * @Author: jiangxd
 * @Date: 2022-09-23 14:06:55
 * @LastEditTime: 2022-09-23 14:07:04
 * @LastEditors: jiangxd
 * @Description:
 * @FilePath: /eurus-ui/src/test-utils/sleep.ts
 */
const sleep = (time = 0) => new Promise(resolve => setTimeout(resolve, time));

export default sleep;
