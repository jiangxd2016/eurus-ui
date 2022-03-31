import { defineComponent, h } from 'vue'
import { useRoute } from 'vitepress'

 const Content = defineComponent({
  name: 'VitePressContent',
  setup() {
    const route = useRoute()
    return () =>
      h('div', { style: { position: 'relative' } }, [
        route.component ? h(route.component) : null
      ])
  }
})


export default Content