import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  Transition
} from 'vue';
import './style.scss';
import { getOffset, getWindow } from '@/packages/_utils/dom';
import { getPrefixCls } from '@/packages/_utils/global-config';
const prefixCls = getPrefixCls('tooltip');

interface CssStyle {
  maxWidth: string;
  left?: string;
  bottom?: string;
  transform?: string;
  top?: string;
  right?: string;
}

const props = {
  content: { type: String, default: null },
  direction: { default: 'top-left', type: String },
  maxWidth: { default: 500, type: Number },
  delay: { default: 0, type: Number },
  always: { type: Boolean, default: false },
  appendToBody: { type: Boolean, default: true },
  transition: { default: 'fade', type: String },
  x: { default: 0, type: Number },
  y: { default: 0, type: Number },
  className: { type: String, default: null },
  trigger: { default: 'hover', type: String },
  style: { type: Object, default: () => { } },
  disabled: { type: Boolean, default: false }
};
export default defineComponent({
  name: 'ETooltip',
  props,
  emits: ['click'],
  setup(props, { slots, emit, expose }) {
    const el = ref();
    const tooltipEl = ref();
    const hasAppendToBody = ref(false);

    const state = reactive({
      clearTime: 0,
      visible: false,
      tooltipStyle: {}
    });
    const translate = (px: number) => {
      // 通过transform平移标签时，如平移的单位为非偶数，会出现字体模糊，这里强制取偶
      if (px % 2 === 0) {
        // 偶数
        return px;
      } else {
        return px + 1;
      }
    };
    const setPosition = () => {
      const space = props.y + 8; // 当前标签与提示语之间的距离
      const style: CssStyle = {
        maxWidth: props.maxWidth + 'px'
      };
      if (props.appendToBody) {
        const { width: windowWidth, height: windowHeight } = getWindow();
        const offset = getOffset(el.value);
        const bottom = windowHeight - offset.top + space + 'px';
        switch (props.direction) {
          case 'top-left':
            style.left = offset.left + props.x + 'px';
            style.bottom = bottom;
            break;
          case 'top':
            // 先让提示左边和当前标签中间对齐（偏移位置+标签宽的一半），再向左移50%
            style.transform = 'translateX(-50%)';
            style.left
              = translate(offset.left + offset.width / 2 + props.x) + 'px';
            style.bottom = bottom;
            break;
          case 'top-right':
            style.right
              = windowWidth - (offset.left + offset.width + props.x) + 'px';
            style.bottom = bottom;
            break;
          case 'left':
            // top先让提示语顶部跟标签中间对齐，再上移50%
            style.right = windowWidth - (offset.left - 8 + props.x) + 'px';
            style.top = translate(offset.top + offset.height / 2) + 'px';
            style.transform = 'translateY(-50%)';
            break;
          case 'right':
            // top和左边一样
            style.left = offset.left + offset.width + 8 + props.x + 'px';
            style.top = translate(offset.top + offset.height / 2) + 'px';
            style.transform = 'translateY(-50%)';
            break;
          case 'bottom-left':
            style.left = offset.left + props.x + 'px';
            style.top = offset.top + offset.height + space + 'px';
            break;
          case 'bottom':
            style.left
              = translate(offset.left + offset.width / 2 + props.x) + 'px';
            style.transform = 'translateX(-50%)';
            style.top = offset.top + offset.height + space + 'px';
            break;
          case 'bottom-right':
            style.right
              = windowWidth - (offset.left + offset.width + props.x) + 'px';
            style.top = offset.top + offset.height + space + 'px';
            break;
        }
      }
      state.tooltipStyle = Object.assign({}, props.style, style);
    };
    const mouseLeave = () => {
      state.clearTime = window.setTimeout(() => {
        state.visible = false;
      }, props.delay);
    };
    const toolTipEnter = () => {
      window.clearTimeout(state.clearTime);
    };
    const toolTipLeave = () => {
      mouseLeave();
    };
    const mouseClick = (e: MouseEvent) => {
      if (!props.always) {
        if (e && el.value.contains(e.target)) {
          setPosition();
          state.visible = true;
        } else {
          state.visible = false;
        }
      }
      emit('click', state.visible);
    };
    const mouseEnter = () => {
      if (props.disabled) {
        return;
      }
      if (!props.always) {
        setPosition();
        window.clearTimeout(state.clearTime);
        state.visible = true;
      }
    };

    watch(
      () => props.disabled,
      (val: boolean) => {
        nextTick(() => {
          if (
            !val
            && props.appendToBody
            && tooltipEl.value
            && !hasAppendToBody.value
          ) {
            document.body.append(tooltipEl.value);
            hasAppendToBody.value = true;
          }
        });
      }
    );
    onMounted(() => {
      nextTick(() => {
        if (props.always) {
          // 一直显示的
          state.visible = true;
          setPosition();
        }
        if (props.trigger === 'click') {
          document.addEventListener('click', mouseClick, false);
        }
        if (props.appendToBody && tooltipEl.value) {
          document.body.append(tooltipEl.value);
          hasAppendToBody.value = true;
        }
      });
    });
    onBeforeUnmount(() => {
      if (props.trigger === 'click') {
        document.removeEventListener('click', mouseClick, false);
      }
      if (props.appendToBody && tooltipEl.value) {
        tooltipEl.value.remove();
      }
    });
    const getIf = (slot: any): boolean => {
      if (props.disabled) {
        // 不可用状态
        return false;
      }
      return props.content || slot.content;
    };
    // 提供一个关闭的方法
    const close = () => {
      state.visible = false;
    };
    expose({ close });
    return () => (
      <span ref={el} class={`${prefixCls}-box`} onMouseenter={mouseEnter} onMouseleave={mouseLeave}>
        {slots?.default && slots.default()}
        <Transition name={`tooltip-${props.transition}`}>
          {
            getIf(slots) && <div
              v-show={state.visible}
              ref={tooltipEl}
              class={[`${prefixCls}`, props.direction, props.className]}
              style={state.tooltipStyle}
              onMouseenter={toolTipEnter}
              onMouseleave={toolTipLeave}
              onClick={e => e.stopPropagation()}
            >
              <i class="arrow" />
              {props.content ? <span v-html={props.content} /> : (slots?.content && slots.content())}
            </div>
          }
        </Transition>
      </span>

    );
  },
});
