import type {
  PropType
} from 'vue';
import {
  defineComponent,
  ref,
  onMounted,
  provide,
  computed,
  nextTick,
  onBeforeUnmount,
  watch
} from 'vue';
import RenderSlot from './renderSlot';

const tabspProps = {
  modelValue: {
    type: String,
    default: 'tab-1'
  },
  beforeLeave: Function,
  showContent: {
    type: Boolean,
    default: true,
  }, // 是否显示切换内容
  tabPosition: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: 'top'
  },
  closable: {
    type: Boolean,
    default: false
  } // 显示关闭标签
};
/**
 *     (e: ', index: string): void;
  (e: 'change', props: string, index: number): void;
 */
export default defineComponent({
  props: tabspProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {

    const activeKey = ref(props.modelValue);
    const tabsClick = (item: any, index: number) => {
      if (item.disabled) {
        return;
      }
      if (props.beforeLeave && !props.beforeLeave(item)) {
        return false;
      }
      activeKey.value = item.name || 'tab-' + (index + 1);
      emit('change', item, index);
      emit('update:modelValue', activeKey.value);
    };
    const paneSlots = ref<any[]>([]);
    provide('eu-ChildrenList', (slots: any) => {
      paneSlots.value.push(slots);
    });
    const getShow = (item: any, index: number) => {
      if (item.name) {
        return item.name === activeKey.value;
      } else {
        // 没有指定name时
        return activeKey.value === 'tab-' + (index + 1);
      }
    };
    const setActiveKey = () => {
      // 设置了name的值
      paneSlots.value.forEach((item: any) => {
        if (item.name === props.modelValue) {
          activeKey.value = item.name;
        }
      });
    };
    const tabsEl = ref();
    const tabsTabEl = ref();
    const tabsScrollEl = ref(); // 滚动区域
    const isScroll = ref<boolean>(false); // 是否需要滚动
    const moveWidth = ref<number>(0); // 已经移动的宽
    const tabsWidth = ref<number>();
    const prevDisabled = ref<boolean>(true);
    const nextDisabled = ref<boolean>(false);
    const transformStyle = computed(() => {
      return {
        transform: `translateX(-${moveWidth.value}px)`
      };
    });
    const scrollInit = () => {
      nextTick(() => {
        if (['top', 'bottom'].includes(props.tabPosition)) {
          const width = tabsEl.value.offsetWidth; // 可视宽
          const width2 = tabsTabEl.value.offsetWidth; // 实际宽
          isScroll.value = width <= width2;
          tabsWidth.value = width;
        }
      });
    };
    const prevNext = (type: number) => {
      if (['top', 'bottom'].includes(props.tabPosition)) {
        const scrollWidth = tabsScrollEl.value.offsetWidth;
        const sw = Math.abs(scrollWidth - 100); // 每次滚动的距离为可见宽减100左右
        const width2 = tabsTabEl.value.offsetWidth; // 实际宽
        let w = 0;
        if (type) {
          if (nextDisabled.value) {
            return;
          }
          prevDisabled.value = false;
          nextDisabled.value = false;
          // 移动次数＝当前已移动的距离+每次移动的距离
          w = moveWidth.value + sw;
          if (w > width2 - scrollWidth) {
            w = width2 - scrollWidth;
            nextDisabled.value = true;
          }
        } else {
          if (prevDisabled.value) {
            return;
          }
          nextDisabled.value = false;
          prevDisabled.value = false;
          w = moveWidth.value - sw;
          if (w < 0) {
            w = 0;
            prevDisabled.value = true;
          }
        }
        moveWidth.value = w;
      }
    };
    const delClick = (index: number, closable: boolean) => {
      if (!closable) {
        return;
      }
      paneSlots.value.splice(index, 1);
    };
    // 确保在动态切换时，清空上或下配置时设置的宽信息
    watch(
      () => props.tabPosition,
      (val: string) => {
        if (['left', 'right'].includes(val)) {
          moveWidth.value = 0;
          tabsWidth.value = 0;
        } else {
          scrollInit();
        }
      }
    );
    onMounted(() => {
      setActiveKey();
      scrollInit();
      window.addEventListener('resize', scrollInit, false);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', scrollInit, false);
    });

    return () => (
      <div ref={tabsEl} class={[`eu-tabs ${props.tabPosition}`]}>
        {slots?.default && slots.default()}
        <div class="tabs-nav" style={{ width: tabsWidth.value ? tabsWidth.value + 'px' : '' }}>
          <slot name="leftExtra" />
          {slots?.leftExtra && slots.leftExtra()}
          {
            isScroll.value && <a
              class={['tabs-prev icon-arrow', prevDisabled.value && 'disabled']}
              on-click={prevNext(0)}
            />
          }

          <div ref={tabsScrollEl} class="tabs-scroll">
            <div ref="tabsTabEl" class="tabs-tab" style={transformStyle.value}>
              {paneSlots.value.map((item, index) => {
                return <div
                  key={index}
                  class={{
                    'tabs-item': true,
                    'disabled': item.disabled,
                    'active': getShow(item, index),
                  }}
                  on-click={tabsClick(item, index)}
                >
                  {item.label ? <span>
                    {item.label}
                    {
                      (item.closable || props.closable)
                      && <i
                        class="icon-close"
                        on-click={delClick(index, item.closable || props.closable)}
                      />
                    }
                  </span> : item.slots?.label && <span >
                    <RenderSlot slots={item.slots?.label()} />
                  </span>}

                </div>;
              })}
            </div>
          </div>
          {
            isScroll.value && <a class={['tabs-next icon-arrow', nextDisabled.value && 'disabled']} on-click={prevNext(1)}
            />
          }

          {slots?.rightExtra && slots.rightExtra()}
        </div>
        {slots?.content && slots.content()}
        {props.showContent && <div class="tabs-content">
          {paneSlots.value.map((slot, index) => {
            return <div style={{ display: getShow(slot, index) ? 'block' : 'none' }}>
              <RenderSlot slots={slot.slots} />
            </div>;
          })}
       </div>}
      </div>
    );
  }
});
