import Layout from './Layout.vue'
import NotFound from './NotFound.vue'

import 'windi-base.css'
import 'windi-components.css'
import './styles/vars.css'
import './styles/layout.css'
import './styles/code.css'
import './styles/prism.css'
import './styles/custom-blocks.css'
import './styles/sidebar-links.css'
import 'windi-utilities.css'

import Content from '../components/Content'
import ClientOnly from '../components/ClientOnly'

import Demo from '../components/CodeDemo.vue'
import Demos from '../components/CodeDemos.vue'


const theme = {
  Layout,
  NotFound,
  enhanceApp({ app }: { app: any }) {
    app.component('Content', Content)
    app.component('ClientOnly', ClientOnly)
    app.component('Demo', Demo)
    app.component('DemoWrapper', Demos)
  },
}

export default theme
