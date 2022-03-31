import type { DefineComponent } from 'vue'
import { defineComponent } from 'vue'

export const createDemoModule = (name: string, demos: DefineComponent[]): DefineComponent =>
  defineComponent({
    name: `${name}-demo`,
    setup() {
      return {
        demos,
      }
    },
  })
