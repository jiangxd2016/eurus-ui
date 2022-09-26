import type { CSSProperties } from 'vue';
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { getPrefixCls } from '@/packages/_hooks/use-global-config';
import './style.scss';
export interface circleStyleAttr extends CSSProperties {
  width?: string;
  height?: string;
  borderWidth?: string;
  borderColor?: string;
  left?: string;
  top?: string;
  clip?: string;
  transform?: string;
}

const EProgressProps = {
  type: { default: 'line' },
  modelValue: { default: 0 },
  radius: { default: 0 },
  border: { default: 0 },
  color: null,
  borderColor: null,
  duration: { default: 1e3 },
  showText: { type: Boolean, default: true },
  followText: { type: Boolean, default: true },
  className: null,
  status: null
};

export default defineComponent({
  name: 'EProgress',
  props: EProgressProps,
  setup(props, { slots, emit }) {

    const clsPrefix = getPrefixCls('progress');

    const state = reactive({
      percent: 0
    });
    const lineStyle = computed(() => {
      return {
        height: props.border ? props.border + 'px' : '',
        width: state.percent + '%',
        background: props.borderColor,
        transition: `all ${props.duration / 1000}s`
      };
    });
    const animation = () => {
      // 这里还是用js控制，css控制不了，因为大于50%后还要处理其他
      let clearTime = -1;
      clearTime = window.setInterval(() => {
        if (state.percent < props.modelValue && state.percent < 100) {
          state.percent++;
        } else {
          clearInterval(clearTime);
        }
      }, props.duration / props.modelValue);
    };
    const circleStyle = (type: string) => {
      const style: circleStyleAttr = {};
      style.width = props.radius * 2 + 'px';
      style.height = props.radius * 2 + 'px';
      if (type === 'pro') {
        // style.border = `${props.border}px solid ${props.color || 'transparent'}`
        style.borderWidth = `${props.border}px`;
        style.borderColor = props.color;
      } else if (type === 'circle') {
        style.left = `-${props.border}px`;
        style.top = `-${props.border}px`;
        if (state.percent > 50) {
          style.clip = 'rect(auto,auto,auto,auto)';
        } else {
          style.clip = `rect(0,${props.radius * 2}px,${props.radius * 2}px,${props.radius
            }px)`;
        }
      } else if (type === 'left') {
        // style.border = `${props.border}px solid ${borderColor}`
        style.borderWidth = `${props.border}px`;
        style.borderColor = props.borderColor;
        style.clip = `rect(0, ${props.radius}px, ${props.radius * 2}px, 0px)`;
        style.transform = 'rotate(' + 3.6 * state.percent + 'deg)';
      } else if (type === 'right') {
        // style.border = `${props.border}px solid ${borderColor}`
        style.borderWidth = `${props.border}px`;
        style.borderColor = props.borderColor;
        style.clip = `rect(0, ${props.radius * 2}px, ${props.radius * 2}px, ${props.radius
          }px)`;
      }
      return style;
    };
    onMounted(() => {
      if (props.type === 'circle') {
        animation();
      } else if (props.type === 'line') {
        // 这里用css3动画的transition，设置下延时
        setTimeout(() => {
          state.percent = props.modelValue;
        }, 10);
      }
    });
    return () => (
      <div class={[clsPrefix, state]}>
        {
          props.type === 'line' ? (
            <div class={[props.className, clsPrefix + '-line']} style={{
              width: props.radius ? props.radius + 'px' : '',
              background: props.color,
              minHeight: props.border ? props.border + 'px' : ''
            }}>
              {slots?.default && slots.default()}
              <span class="progress-bar" style={lineStyle.value}>
                {props.showText && props.followText
                  && <span class="progress-text">
                    <b>{state.percent}</b>%
                  </span>
                }
              </span>
              {props.showText && !props.followText
                && <span class="progress-text progress-fixed-text">
                  <b>{state.percent}</b>%
                </span>
              }
            </div>
          ) : (
            props.type === 'circle' ? (
              <div class={[props.className, clsPrefix + '-circle']} style={circleStyle('pro')}>
                <div class="customer-content">
                  {slots?.default && slots.default()}
                </div>
                {
                  props.showText && <span class="progress-text">
                    <b>{state.percent}</b>%
                  </span>
                }
                <div style={circleStyle('circle')} class="circle-circle">
                  <span style={circleStyle('left')} class="circle-left"></span>
                  {
                    state.percent >= 50 && <span
                      style={circleStyle('right')}
                      class="circle-right"
                    ></span>
                  }

                </div>
              </div>
            ) : ''
          )
        }
      </div>

    );
  },
});
