import { reactive, inject, computed, ref, defineComponent, h, unref } from 'vue';
import TableTd from './tableTd';
import type { RowColSpan } from './types';
import { getPrefixCls } from '@/packages/_utils/global-config';
/**
 * const props = withDefaults(
    defineProps<{
      data?: any
      rowColSpan?: RowColSpan[]
      hasChild?: boolean
      lazyLoad?: Function
      extendToggle?: boolean // 默认展开或收起状态
      title?: boolean
      selectedRows?: any
    }>(),
    {}
  )
  const emits = defineEmits<{
    (e: 'rowClick', row: any, index: number): void
    (
      e: 'cellClick',
      row: any,
      column: any,
      rowIndex: number,
      columnIndex: number
    ): void
  }>()
 */

export default defineComponent({
  props: {
    data: null,
    rowColSpan: null,
    hasChild: { type: Boolean },
    lazyLoad: null,
    extendToggle: { type: Boolean },
    title: { type: Boolean },
    selectedRows: null
  },
  emits: ['rowClick', 'cellClick'],
  setup(props, { emit: emits }) {
    const prefixCls = getPrefixCls('table');

    const getColumns = inject(`${prefixCls}GetColumns`) as any;
    const state = reactive<any>({
      toggle: {}, // {1: true, 2: false, 0: false} // 对应每行展开或收起状态
      rowspanColspanList: []
    });
    const dataList = ref(props.data); // 这里要转一下，加载子级时才能同步展示
    const colsExtend = computed(() => {
      return getColumns.value.filter((item: any) => {
        return item.type === 'extend' && !item.children;
      });
    });
    const colsNoExtend = computed(() => {
      // 不带扩展的
      return getColumns.value.filter((item: any) => {
        return item.type !== 'extend' && !item.children;
      });
    });
    const getToggle = (rowIndex: number) => {
      return state.toggle[rowIndex] === undefined
        ? props.extendToggle
        : state.toggle[rowIndex];
    };
    // 展开或收起扩展行
    const toggleExtend = (index: number, row: any) => {
      // 存在扩展时或有子级时
      if (colsExtend.value.length > 0 || props.hasChild) {
        if (typeof state.toggle[index] === 'undefined') {
          state.toggle[index] = !props.extendToggle;
        } else {
          state.toggle[index] = !state.toggle[index];
        }
        // 展开时，如果是懒加载
        if (state.toggle[index] && props.lazyLoad) {
          props.lazyLoad(row, (child: any) => {
            if (child && child.length > 0) {
              row.children = child;
            }
          });
        }
      }
    };
    const rowClick = (row: any, index: number) => {
      emits('rowClick', row, index);
    };
    const cellClick = (
      row: any,
      column: any,
      rowIndex: number,
      columnIndex: number
    ) => {
      emits('cellClick', row, column, rowIndex, columnIndex);
    };
    // 处理合并数理
    const formatRowColSpan = computed(() => {
      const temp: RowColSpan[] = [];
      if (props.rowColSpan && props.rowColSpan.length > 0) {
        props.rowColSpan.forEach((item: RowColSpan) => {
          temp.push(item);
          if (item.colSpan && item.colSpan > 1) {
            // 计算不需要显示的列
            for (let i = 1; i < item.colSpan; i++) {
              temp.push({
                row: item.row,
                col: item.col + i,
                colSpan: 0
              });
            }
          }
          // 计算不需要显示的行
          if (item.rowSpan && item.rowSpan > 1) {
            for (let i = 1; i < item.rowSpan; i++) {
              temp.push({
                row: item.row + i,
                col: item.col,
                rowSpan: 0
              });
            }
          }
        });
      }
      return temp;
    });
    const getRowColSpan = (row: number, col: number) => {
      const newRow = formatRowColSpan.value.filter((item: RowColSpan) => {
        return item.row === row && col === item.col;
      });
      if (newRow.length > 0) {
        return newRow[0];
      } else {
        return [];
      }
    };

    return () => (
      <tbody>
        {
          dataList.value.map((row: any, rowIndex: number) => {
            return [
              <tr
                class={{
                  warning: props.selectedRows.includes(row),
                  [row.trClass]: row.trClass
                }}
                onClick={() => rowClick(row, rowIndex)}
              >
                {
                  colsNoExtend.value.map((column: any, indexTd: number) => {
                    return h(TableTd, {
                      'key': indexTd,
                      'checked': props.selectedRows.includes(row),
                      column,
                      row,
                      'index': rowIndex,
                      'column-index': indexTd,
                      'title': props.title,
                      'toggle': getToggle(rowIndex),
                      'row-col-span': getRowColSpan(rowIndex, indexTd),
                      'rowspan-colspan-list': unref(state).rowspanColspanList,
                      'onToggleExtend': $event => toggleExtend(rowIndex, row),
                      'onCellClick': cellClick
                    });
                  })}
              </tr>,
              getToggle(rowIndex) && colsExtend.value.length > 0 && <tr class={{ warning: props.selectedRows.includes(row), extend: true }}>
                {h(TableTd, {
                  column: unref(colsExtend)[0],
                  row,
                  index: rowIndex,
                  colspan: unref(colsNoExtend).length
                })}
              </tr>,
              props.hasChild && row.children.map((item: any, index: number) => {
                return <tr v-show={getToggle(rowIndex)} key={'child' + index} class={{ [row.trClass]: row.trClass, 'tr-child': true }} onClick={() => rowClick(item, index)}>
                  {colsNoExtend.value.map((child: any, childIndex: number) => {
                    return h(TableTd, {
                      'key': 'childTd' + childIndex,
                      'column': child,
                      'row': item,
                      index,
                      'column-index': childIndex,
                      'title': props.title,
                      'parent-row': row,
                      'onCellClick': cellClick
                    });
                  })}
                </tr>;
              })
            ];
          })
        }
      </tbody>
    );
  }
});
