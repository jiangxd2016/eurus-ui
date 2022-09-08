import type { App } from 'vue';
import ETree from './Transition';

ETree.install = (app: App) => {
  app.component(ETree.name, ETree);
};

export { ETree };
export default ETree;
