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


async function getTheme(){
  const CodeDemo = typeof window === 'undefined' ? await import("../components/srrDemo.vue") : await import('../components/CodeDemo.vue')

  return  {
    ...Theme,
     enhanceApp({ app }: { app: any }) {
      app.component('CodeDemo', CodeDemo.default)
    },
  }
}

const theme =await getTheme()

export default theme
