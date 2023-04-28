import type { App } from 'vue';
import _Table from './src/table';
import _Thead from './src/table-thead';
import _Tbody from './src/table-tbody';
import _Tr from './src/table-tr';
import _Th from './src/table-th';
import _Td from './src/table-td';
import _Column from './src/table-column';
import { getComponentPrefix } from '@/packages/_utils';
import type { EuOptions } from '@/packages/_utils';
import { setGlobalConfig } from '@/packages/_utils/global-config';

const Table = Object.assign(_Table, {
  Thead: _Thead,
  Tbody: _Tbody,
  Tr: _Tr,
  Th: _Th,
  Td: _Td,
  Column: _Column,
  install: (app: App, options?: EuOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Table.name, _Table);
    app.component(componentPrefix + _Thead.name, _Thead);
    app.component(componentPrefix + _Tbody.name, _Tbody);
    app.component(componentPrefix + _Tr.name, _Tr);
    app.component(componentPrefix + _Th.name, _Th);
    app.component(componentPrefix + _Td.name, _Td);
    app.component(componentPrefix + _Column.name, _Column);
  },
});

export type TableInstance = InstanceType<typeof _Table>;
export type TheadInstance = InstanceType<typeof _Thead>;
export type TbodyInstance = InstanceType<typeof _Tbody>;
export type TrInstance = InstanceType<typeof _Tr>;
export type ThInstance = InstanceType<typeof _Th>;
export type TdInstance = InstanceType<typeof _Td>;
export type TableColumnInstance = InstanceType<typeof _Column>;

export type {
  TableData,
  TableSortable,
  TableFilterData,
  TableFilterable,
  TableColumnData,
  TableBorder,
  TableRowSelection,
  TableExpandable,
  TableDraggable,
  TableChangeExtra,
} from './src/interface';

export {
  _Thead as Thead,
  _Tbody as Tbody,
  _Tr as Tr,
  _Th as Th,
  _Td as Td,
  _Column as TableColumn,
};

export default Table;
