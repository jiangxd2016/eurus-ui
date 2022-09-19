import { reactive, inject, watch, ref, defineComponent } from 'vue';
import TableHeader from './headerSlot';
import { ECheckbox } from '@/packages/checkbox';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { numberToArr } from '@/packages/_utils/common';

export default defineComponent({
  props: {
    showHeader: { type: Boolean, default: true },
    drag: { type: Boolean },
    title: { type: Boolean },
    selectChecked: { default: 0 },
    sortSingle: { type: Boolean },
    headMaxLayer: { default: 1 }
  },
  emits: ['event'],
  setup(props, { emit: emits, expose }) {
    const el = ref();
    const prefixCls = getPrefixCls('table');

    const getColumns = inject(`${prefixCls}GetColumns`, []) as any;
    const state = reactive<any>({
      checkboxChecked: props.selectChecked.toString(),
      // columns: getColumns,
      sortBy: {}
    });
    watch(
      () => props.selectChecked,
      (v: number) => {
        state.checkboxChecked = v.toString();
      }
    );
    const getColumnsFilter = (index: number) => {
      return getColumns.value.filter((item: any) => {
        return item.type !== 'extend' && item._layer === index;
      });
    };
    // 鼠标滑过单元格时显示title提示，当设置为false时不显示，否则使用父级table的设置
    const getShowHoverTitle = (item: any) => {
      if (!item.title) {
        return null; // 当前设置了false不显示
      } else if (props.title) {
        return item.label;
      }
      return null;
    };
    const emitEvent = (type: string, obj: any) => {
      emits('event', type, obj);
    };
    // 表头拖动
    const headMouseMove = (evt: MouseEvent, index: number) => {
      emitEvent('mouseMove', { evt, index });
    };
    const headMouseDown = (evt: MouseEvent, index: number) => {
      emitEvent('mouseDown', { evt, index });
    };
    // checkbox勾选事件
    const checkboxChange = (val: number | boolean) => {
      emitEvent('checkboxChange', !!val);
    };
    // 排序事件
    const sortClick = (prop: string, order: string) => {
      if (props.sortSingle) {
        // 只支持单个，先清空
        state.sortBy = {};
      }
      state.sortBy[prop] = order;
      emitEvent('sortClick', state.sortBy);
    };

    // 由table组件调用，固定表头滚动时
    const scrollTop = (scrollTop: number) => {
      if (scrollTop) {
        el.value.style.transform = `translateY(${scrollTop}px) translateZ(100px)`;
        el.value.className = 'transform';
      } else {
        el.value.style.transform = '';
        el.value.className = '';
      }
    };
    expose({ scrollTop });
    return () => (
      props.showHeader && (
        <thead ref={el}>
          {
            numberToArr(props.headMaxLayer, 1).map((thLayer: number) => (
              <tr key={thLayer} class={{ drag: props.drag }}>
                {
                  getColumnsFilter(thLayer).map((th: any, thIndex: number) => (
                    <th
                      key={thIndex}
                      class={[th.fixed, th.className]}
                      style={{ textAlign: th.align }}
                      title={getShowHoverTitle(th)}
                      colspan={th._colspan}
                      rowspan={th._rowspan}
                      onMousemove={$event => headMouseMove($event, thIndex)}
                    >
                      {th.type === 'selection' ? <ECheckbox
                        v-model={state.checkboxChecked}
                        class={{ 'some-select': props.selectChecked === 2 }}
                        onChange={checkboxChange}
                      /> : [th.slots && th.slots.header ? <TableHeader
                        data={th}
                        index={thIndex}
                      />
                        : <span >{th.label}</span>,
                      th.sortBy
                      && <span class="caret-wrapper">
                        <i
                          class={{ 'active': state.sortBy[th.prop] === 'asc', 'sort-caret asc': true }}
                          onClick={() => sortClick(th.prop, 'asc')}
                        ></i>
                        <i
                          class={{ 'active': state.sortBy[th.prop] === 'desc', 'sort-caret desc': true }}
                          onClick={() => sortClick(th.prop, 'desc')}
                        ></i>
                      </span>]

                      }

                      {
                        props.drag && th.drag !== false && <a
                          class="drag-line"
                          onMousedown={$event => headMouseDown($event, thIndex)}
                        ></a>
                      }
                    </th >
                  ))
                }
              </tr >
            ))
          }

        </thead >
      )

    );
  }
});
