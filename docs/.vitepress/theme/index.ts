/*
 * @Author: jiangxd
 * @Date: 2022-06-04 12:51:55
 * @LastEditTime: 2022-06-04 23:09:56
 * @LastEditors: jiangxd
 * @Description:
 * @FilePath: /eurus-ui/docs/.vitepress/theme/index.ts
 */
import Theme from 'vitepress/theme'

import Demo from '../components/CodeDemo.vue'

import '../style/main.css'
import '../style/vars.css'
const theme = {
  ...Theme,
  enhanceApp({ app }: { app: any }) {
    app.component('Demo', Demo)
  },
}

export default theme
