import Theme from 'vitepress/theme'

import '../style/main.css'
import '../style/vars.css'

async function getTheme() {
  const CodeDemo = typeof window === 'undefined'
    ? await import('../components/ssrDemo.vue')
    : await import('../components/CodeDemo.vue')

  return {
    ...Theme,
    enhanceApp({ app }: { app: any }) {
      app.component('CodeDemo', CodeDemo.default)
    },
  }
}

const theme = await getTheme()

export default theme
