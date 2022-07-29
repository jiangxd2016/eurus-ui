import type { App, DirectiveBinding } from 'vue';
import { h, createApp } from 'vue';
import { createGlobalNode, removeGlobalNode } from '../_hooks/useGlobalNode';
import ELoading from './src';

const vLoading = {

  created(el: any, binding: DirectiveBinding<boolean> ) {
    if (!ELoading.instrace && binding.value) {
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
    if (ELoading.instrace) {
      const ele = el.querySelector('#e-loading') as HTMLElement;
      ele.style.display = binding.value === false ? 'none' : 'flex';
    } else if (binding.value) {
      vLoading.created(el, binding);
    }
  },
  unmounted(el: HTMLElement) {
    if (!ELoading.instrace) {
      return;
    }
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

