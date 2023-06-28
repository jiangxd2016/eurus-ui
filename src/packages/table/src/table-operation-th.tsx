import type { PropType } from 'vue';
import { computed, defineComponent, inject } from 'vue';
import type { TableOperationColumn } from './interface';
import { getOperationFixedCls, getOperationStyle } from './utils';
import type { TableContext } from './context';
import { tableInjectionKey } from './context';
import Checkbox from '@/packages/checkbox';
import { isFunction } from '@/packages/_utils/is';
import { getPrefixCls } from '@/packages/_utils/global-config';

export default defineComponent({
  name: 'OperationTh',
  props: {
    operationColumn: {
      type: Object as PropType<TableOperationColumn>,
      required: true,
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      required: true,
    },
    rowSpan: {
      type: Number,
      default: 1,
    },
    // for selection
    selectAll: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('table');
    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {});

    const checkboxStatus = computed(() => {
      let checked = false;
      let indeterminate = false;

      const currentSelectedEnabledRowKeys = tableCtx.currentSelectedRowKeys?.filter((key) => tableCtx.currentAllEnabledRowKeys?.includes(key) ?? true) ?? [];

      const selectedNumber = currentSelectedEnabledRowKeys.length;
      const totalEnabledNumber = tableCtx.currentAllEnabledRowKeys?.length ?? 0;
      if (selectedNumber > 0) {
        if (selectedNumber >= totalEnabledNumber) {
          checked = true;
        } else {
          indeterminate = true;
        }
      }
      return {
        checked,
        indeterminate,
      };
    });

    const renderContent = () => {
      if (props.selectAll) {
        return (
          <Checkbox
            v-slots={{
              default: isFunction(props.operationColumn.title) ? props.operationColumn.title() : props.operationColumn.title,
            }}
            modelValue={checkboxStatus.value.checked}
            onChange={(checked) => {
              tableCtx.onSelectAll?.(checked as boolean);
            }}
          />
        );
      }
      if (props.operationColumn.title) {
        return isFunction(props.operationColumn.title) ? props.operationColumn.title() : props.operationColumn.title;
      }
      return null;
    };

    const style = computed(() => getOperationStyle(props.operationColumn, props.operations));

    const cls = computed(() => [
      `${prefixCls}-th`,
      `${prefixCls}-operation`,
      {
        [`${prefixCls}-checkbox`]: props.selectAll,
      },
      ...getOperationFixedCls(prefixCls, props.operationColumn),
    ]);

    return () => (
      <th class={cls.value} style={style.value} rowspan={props.rowSpan > 1 ? props.rowSpan : undefined}>
        <span class={`${prefixCls}-cell`}>{renderContent()}</span>
      </th>
    );
  },
});
