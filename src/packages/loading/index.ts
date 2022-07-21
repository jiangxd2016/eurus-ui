import type { App, DirectiveBinding } from 'vue';
import { h, createApp } from 'vue';
import ELoading from './src';
import { createGlobalNode, removeGlobalNode } from '@/composables/useGlobalNode';

const vLoading = {

  created(el: any, binding: DirectiveBinding<boolean> ) {

    if (!ELoading.instrace) {
      const loadingElement = createGlobalNode('e-loading', el);
      const app: App = createApp({
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
      ELoading.instrace = app;
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    const ele = el.querySelector('#e-loading') as HTMLElement;
    ele.style.display = binding.value === false ? 'none' : 'block';
  },
  unmounted(el: HTMLElement) {
    (ELoading.instrace as App).unmount();
    const ele = el.querySelector('#e-loading') as HTMLElement;
    removeGlobalNode(ele);
  },
};

ELoading.install = (app: App) => {
  app.component(ELoading.name, ELoading);
  app.directive('loading', vLoading);
};

export { ELoading, vLoading };
export default ELoading;

