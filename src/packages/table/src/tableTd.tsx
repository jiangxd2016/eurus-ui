import { h, defineComponent, ref, computed, inject, watch } from 'vue';
import { ECheckbox } from '@/packages/checkbox';
import { ETooltip } from '@/packages/tooltip';
import { ETag } from '@/packages/tag';
import { getPrefixCls } from '@/packages/_hooks/use-global-config';

export default defineComponent({
  name: 'TableTd',
  props: {
    column: {
      type: Object,
      default: () => {
        return {};
      }
    },
    columnIndex: {
      type: Number,
      default: 0
    }, // 当前列号
    row: {
      type: Object,
      default: () => {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    }, // 当前行号
    toggle: Boolean, // 扩展或子级展开收起状态
    parentRow: Object, // 子级下拉时，包含的父级信息
    title: Boolean,
    checked: Boolean,
    colspan: {
      type: Number,
      default: 0
    }, // 扩展列时才有传
    rowColSpan: {
      type: Object,
      default: () => {
        return {};
      }
    },
    rowspanColspanList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: ['cellClick', 'toggleExtend'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('table');

    const setSelectedRows = inject(`${prefixCls}SetSelectedRows`) as any;

    const classNameTd = ref(props.column.fixed);
    const pcl = ref(props.column.className);
    if (pcl.value && props.column.fixed) {
      classNameTd.value += ' ' + pcl.value;
    } else if (pcl.value) {
      classNameTd.value = pcl.value;
    }
    let display = false;
    let rowspan = 0;
    let colspan = ref(props.colspan).value;
    if (Object.keys(props.rowColSpan).length > 0) {
      // 有合并项
      // 不显示
      display
        = props.rowColSpan.rowSpan === 0 || props.rowColSpan.colSpan === 0;
      rowspan = props.rowColSpan && props.rowColSpan.rowSpan;
      colspan = props.rowColSpan && props.rowColSpan.colSpan;
    }
    // 鼠标滑过单元格时显示title提示，当设置为false时不显示，否则使用父级table的设置 todo 待优化
    const hoverTitle = computed(() => {
      if (
        !props.column.title
        || props.column.tooltip === true
        || (props.column.tooltip && props.column.tooltip.show)
      ) {
        return null; // 当前设置了false不显示，或者是使用了tooltip时不显示
      } else if (props.title) {
        return props.row[props.column.prop];
      }
      return null;
    });
    const onCellClick = () => {
      emit(
        'cellClick',
        props.row,
        props.column,
        props.index,
        props.columnIndex
      );
      // 单元格点击
      // evt.stopPropagation()
    };
    const checkValue = ref(props.checked);
    watch(
      () => props.checked,
      (val: boolean) => {
        checkValue.value = val;
      }
    );
    const extendToggle = () => {
      emit('toggleExtend');
    };
    const defaultSlots = () => {
      const val = props.row[props.column.prop];
      if (props.column.slots && props.column.slots.default) {
        return props.column.slots.default({
          row: props.row,
          index: props.index,
          extend: extendToggle,
          toggle: props.toggle,
          parentRow: props.parentRow
        });
      } else if (props.column.formatter) {
        return props.column.formatter(
          props.row,
          props.column,
          val,
          props.index
        );
      } else if (props.column.type === 'selection') {
        return h(ECheckbox, {
          modelValue: checkValue.value,
          onChange: (val: boolean) => {
            setSelectedRows(val, props.row, props.index);
            checkValue.value = val; // 这里要手动更新，暂不清楚原因
          }
        });
      } else if (
        props.column.tooltip === true
        || (props.column.tooltip && !props.column.tooltip.disabled)
      ) {
        let obj = { content: val, direction: 'top' };
        if (props.column.tooltip.disabled) {
          obj = Object.assign(obj, props.column.tooltip);
        }
        // return h(Tooltip, obj, h('span', { class: 'td-tooltip' }, val))
        /* return h(
          Tooltip,
          obj,
          h('span', { class: 'td-tooltip' }, () => {
            return val
          })
        ) */
        return h(ETooltip, obj, () => {
          return val;
        });
      } else if (typeof props.column.tag === 'object') {
        const obj = Object.assign({ size: 'small' }, props.column.tag, {
          type: props.column.tag.dict[val]
        });
        return h(ETag, obj, () => {
          return val;
        });
      } else if (props.column.type === 'index') {
        return props.index + 1;
      } else {
        return val;
      }
    };

    if (!display) {
      return () => [
        h(
          'td',
          {
            class: classNameTd.value,
            rowspan: rowspan > 1 ? rowspan : null,
            colspan: colspan > 1 ? colspan : null,
            style: 'text-align:' + props.column.align,
            title: hoverTitle.value,
            onClick: onCellClick
          },
          defaultSlots()
        )
      ];
    } else {
      return () => [];
    }
  }
});
