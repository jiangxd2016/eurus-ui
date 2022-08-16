import type { App } from 'vue';
import ETable from './src/table.vue';

ETable.install = (app: App) => {
  app.component(ETable.name, ETable);
};

export { ETable };
export default ETable;
