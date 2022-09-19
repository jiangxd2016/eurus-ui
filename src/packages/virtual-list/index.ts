import type { App } from 'vue';
import EVirtualList from './src';

EVirtualList.install = (app: App) => {
  app.component(EVirtualList.name, EVirtualList);
};

export { EVirtualList };
export default EVirtualList;
