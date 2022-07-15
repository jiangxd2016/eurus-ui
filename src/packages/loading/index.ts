import type { App } from 'vue';
import { h, createApp } from 'vue';
import ELoading from './src';
import { createGlobalNode } from '@/composables/useGlobalNode';

ELoading.install = (app: App) => {
  app.component(ELoading.name, ELoading);
  app.directive('loading', {

    created(el, binding, vNode) {

      if (!ELoading.instrace) {
        const el = createGlobalNode('e-loading');
        app = createApp({
          name: 'ELoading',
          render() {
            return h(ELoading, {
              props: {
                modelValue: true,
              },
              // style: `    width: 100%;
              // height: 100%;
              // position: absolute;
              // top: 0;
              // left: 0;
              // display: flex;
              // align-items: center;
              // justify-content: center;
              // background: rgba(0,0,0,0.3);`
            });
          }
        });
        app.mount(el);
      }
    },
  });
};

export { ELoading };
export default ELoading;

