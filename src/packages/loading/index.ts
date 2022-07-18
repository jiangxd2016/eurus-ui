import type { App } from 'vue';
import { h, createApp } from 'vue';
import ELoading from './src';
import { createGlobalNode } from '@/composables/useGlobalNode';

ELoading.install = (app: App) => {
  app.component(ELoading.name, ELoading);
  app.directive('loading', {

    created(el, binding, vNode, prevVNode) {

      // console.log(el, binding, vNode, prevVNode);

      if (!ELoading.instrace) {
        const loadingElement = createGlobalNode('e-loading', el);
        app = createApp({
          name: 'ELoading',
          render() {
            return h(ELoading, {
              props: {
                text: '123',
                modelValue: true,
              },
            });
          }
        });
        el.style.position = 'relative';
        app.mount(loadingElement);
      }
    },
  });
};

export { ELoading };
export default ELoading;

