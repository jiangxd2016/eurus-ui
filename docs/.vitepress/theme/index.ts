import Theme from 'vitepress/theme'

import Demo from '../components/CodeDemo.vue'

const theme = {
  ...Theme,
  enhanceApp({ app }: { app: any }) {
    app.component('Demo', Demo)
  },
}

export default theme
