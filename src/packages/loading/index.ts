import type { App, DirectiveBinding } from 'vue';
import { h, createApp } from 'vue';
import ELoading from './src';
import { createGlobalNode } from '@/composables/useGlobalNode';

const vLoading = {

  created(el: any, binding: DirectiveBinding<any> ) {

    // console.log(el, binding, vNode, prevVNode);

    if (!ELoading.instrace) {
      const loadingElement = createGlobalNode('e-loading', el);
      const app = createApp({
        name: 'ELoading',
        render() {
          return h(ELoading, {
            props: {
              text: '123',
              modelValue: binding.value,
            },
          });
        }
      });
      el.style.position = 'relative';
      app.mount(loadingElement);
    }
  },
};

ELoading.install = (app: App) => {
  app.component(ELoading.name, ELoading);
  app.directive('loading', vLoading);
};

export { ELoading, vLoading };
export default ELoading;

