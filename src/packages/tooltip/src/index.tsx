import type { PropType } from 'vue';
import { defineComponent, nextTick, onBeforeUnmount, onMounted, reactive, ref, Transition, watch } from 'vue';
import { getOffset, getPrefixCls, getWindow } from '@/packages/_utils';
import './style.scss';
import EIcons from '@/packages/icons';

const ETooltipProps = {
  content: {
    type: String,
    default: '',
  },
  direction: {
    type: String,
    default: 'top-left',
  },
  maxWidth: {
    type: Number,
    default: 500,
  },
  delay: {
    type: Number,
    default: 0,
  },
  always: {
    type: Boolean,
    default: false,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: 'fade',
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  trigger: {
    type: String,
    default: 'hover',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  }
};

export default defineComponent({
  name: 'ETooltip',
  props: ETooltipProps,
  emits: ['click'],
  setup(props, { slots, emit, expose }) {

    const prefixCls = getPrefixCls('tooltip');

    const tooltipRef = ref<HTMLElement>();
    const wrapperRef = ref();

    const state = reactive({
      clearTime: 0,
      visible: false,
      tooltipStyle: {}
    });
    const hasAppendToBody = ref(false);
    // const instance = getCurrentInstance()
    watch(
      () => props.disabled,
      (val: boolean) => {
        nextTick(() => {
          if (
            !val
						&& props.appendToBody
						&& tooltipRef.value
						&& !hasAppendToBody.value
          ) {
            document.body.append(tooltipRef.value);
            hasAppendToBody.value = true;
          }
        });
      }
    );

    const getIf = (slot: any) => {
      if (props.disabled) {
        // 不可用状态
        return false;
      }
      return props.content || slot.content;
    };
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
      const offset = getOffset(wrapperRef.value);
      const windowWidth = getWindow().width;
      const space = props.y + 8; // 当前标签与提示语之间的距离
      const style: any = {
        maxWidth: props.maxWidth + 'px'
      };
      if (props.appendToBody) {
        const windowHeight = getWindow().height;
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
    const toolTipEnter = () => {
      window.clearTimeout(state.clearTime);
    };
    const mouseLeave = () => {
      state.clearTime = window.setTimeout(() => {
        state.visible = false;
      }, props.delay);
    };

    const toolTipLeave = () => {
      mouseLeave();
      // 同时移除事件
      tooltipRef.value && tooltipRef.value.removeEventListener('mouseenter', toolTipEnter, false);
      tooltipRef.value && tooltipRef.value.removeEventListener('mouseleave', toolTipLeave, false);
    };
    const mouseEnter = () => {
      if (props.disabled) {
        return;
      }
      if (!props.always) {
        setPosition();
        window.clearTimeout(state.clearTime);
        state.visible = true;
        // 提示内容上添加鼠标事件
        if (props.delay && tooltipRef.value) {
          tooltipRef.value.addEventListener('mouseenter', toolTipEnter, false);
          tooltipRef.value.addEventListener('mouseleave', toolTipLeave, false);
        }
      }
    };

    const mouseClick = (e: MouseEvent) => {
      if (!props.always) {
        if (e && wrapperRef.value.contains(e.target)) {
          setPosition();
          state.visible = true;
        } else {
          state.visible = false;
        }
      }
      emit('click', state.visible);
    };
    // 提供一个关闭的方法
    const close = () => {
      state.visible = false;
    };
    expose({ close });
    onMounted(() => {
      nextTick(() => {
        if (props.always) {
          // 一直显示的
          state.visible = true;
          setPosition();
        }
        if (props.trigger === 'click') {
          document.addEventListener('click', mouseClick, false);
        } else {
          wrapperRef.value.addEventListener('mouseenter', mouseEnter, false);
          wrapperRef.value.addEventListener('mouseleave', mouseLeave, false);
        }
        if (props.appendToBody && tooltipRef.value) {
          document.body.append(tooltipRef.value);
          hasAppendToBody.value = true;
        }
      });
    });
    onBeforeUnmount(() => {
      if (props.trigger === 'click') {
        document.removeEventListener('click', mouseClick, false);
      } else {
        wrapperRef.value.removeEventListener('mouseenter', mouseEnter, false);
        wrapperRef.value.removeEventListener('mouseleave', mouseLeave, false);
      }
      if (props.appendToBody && tooltipRef.value) {
        tooltipRef.value.remove();
      }
    });
    return () => (
				<div ref={wrapperRef} class={`${prefixCls}-wrapper`}>

					{
						slots?.default?.()
					}

					<Transition name={`tooltip-${props.transition}`}>
						{
							getIf(slots) && state.visible && (
								<div

									ref={tooltipRef}
									class={[prefixCls, props.direction]}
									style={state.tooltipStyle}
								>
									<EIcons name="arrow" class="arrow"></EIcons>
									{
										props.content ? <span v-html={props.content}></span>	: slots.content?.()
									}
								</div>

							)}
					</Transition>
				</div>

    );
  },
});
