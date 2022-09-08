import type { App } from 'vue';
import ETree from './src/Tree.vue';

ETree.install = (app: App) => {
  app.component(ETree.name, ETree);
};

export { ETree };
export default ETree;
