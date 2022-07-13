import type { App } from 'vue';
import ELoading from './src';

ELoading.install = (app: App) => {
  app.component(ELoading.name, ELoading);
  // app.directive('loading', {

  //   created(el, binding, vNode, prevVnode) {
  //     // see below for details on arguments
  //     console.log(el, binding);

  //   },

  // });
};

export { ELoading };
export default ELoading;
