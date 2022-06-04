/*
 * @Author: jiangxd
 * @Date: 2022-06-04 12:51:55
 * @LastEditTime: 2022-06-04 23:09:56
 * @LastEditors: jiangxd
 * @Description:
 * @FilePath: /eurus-ui/docs/.vitepress/theme/index.ts
 */


import Theme from 'vitepress/theme'


import '../style/main.css'
import '../style/vars.css'
const theme = {
  ...Theme,
  async enhanceApp({ app }: { app: any }) {
    const Demo = typeof window === 'undefined' ? await import("../components/srrDemo.vue") : await import('../components/CodeDemo.vue')
    app.component('Demo', Demo)

  },
}
export default theme
