import DefaultTheme from 'vitepress/theme'

import 'uno.css'
import '@unocss/reset/tailwind.css'

import '../style/main.css'
import '../style/vars.css'

import CodeDemo from '../components/ClientOnly.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodeDemo', CodeDemo)
  }
}
