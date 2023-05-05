import type { App } from 'vue';
import ETable from './src/table';
import EThead from './src/table-thead';
import ETbody from './src/table-tbody';
import ETr from './src/table-tr';
import ETh from './src/table-th';
import ETd from './src/table-td';
import EColumn from './src/table-column';

const Table = Object.assign(ETable, {
  Thead: EThead,
  Tbody: ETbody,
  Tr: ETr,
  Th: ETh,
  Td: ETd,
  Column: EColumn,
  install: (app: App) => {
    app.component( ETable.name, ETable);
    app.component( EThead.name, EThead);
    app.component( ETbody.name, ETbody);
    app.component( ETr.name, ETr);
    app.component( ETh.name, ETh);
    app.component( ETd.name, ETd);
    app.component( EColumn.name, EColumn);
  },
});

export type TableInstance = InstanceType<typeof ETable>;
export type TheadInstance = InstanceType<typeof EThead>;
export type TbodyInstance = InstanceType<typeof ETbody>;
export type TrInstance = InstanceType<typeof ETr>;
export type ThInstance = InstanceType<typeof ETh>;
export type TdInstance = InstanceType<typeof ETd>;
export type TableColumnInstance = InstanceType<typeof EColumn>;

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
  Table as ETable,
  EThead,
  ETbody,
  ETr,
  ETh,
  ETd,
  EColumn,
};

