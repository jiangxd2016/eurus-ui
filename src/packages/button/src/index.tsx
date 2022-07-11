import type { ButtonHTMLAttributes, PropType } from 'vue';
import { renderSlot, defineComponent, reactive } from 'vue';
import { EIcon } from '../../icons';
import './style.scss';

export type Size = 'sx' | 'sm' | 'md' | 'lg' | 'xl';
export type Padding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Type =
  | 'default'
  | 'text'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'purple'
  | undefined;

const defineIconSize: { [key in Size]: number } = {
  sx: 16,
  sm: 18,
  md: 20,
  lg: 22,
  xl: 24,
};

const BtnProps = {
  type: {
    type: String as PropType<Type>,
    default: 'default',
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  round: {
    // 是否为圆角按钮
    type: Boolean,
    default: false,
  },
  plain: {
    // 是否为朴素按钮
    type: Boolean,
    default: false,
  },
  circle: {
    // 是否圆形按钮
    type: Boolean,
    default: false,
  },
  link: {
    // 是否圆形按钮
    type: Boolean,
    default: false,
  },
  native: {
    type: Object as PropType<ButtonHTMLAttributes>,
    default: {},
  },
};

export default defineComponent({
  name: 'EButton',
  props: BtnProps,
  setup(props, { slots, emit }) {
    const classNames = reactive({
      disabled: props.disabled || props.loading,
      plain: props.plain,
      circle: props.circle,
      round: props.round,
      [`e-button--${props.size}`]: props.size
    });

    const handleClick = (e: Event) => {
      if (props.disabled || props.loading) { return false; }

      emit('click', e);
    };
    return () => (
      <button
        class={[
          `e-button e-button--${props.type} bg-${props.type} ${props.type === 'default' ? 'text-black' : 'text-white'
          }`,
          classNames,
        ]}
        {...props.native}
        disabled={props.disabled || props.loading}
        on-click={handleClick}>
        {props.loading && (
          <span class="loading">
            <EIcon name='loading' size={defineIconSize[props.size]}></EIcon>
          </span>
        )}
        {slots?.icons && renderSlot(slots, 'icon')}
        {slots?.default && <span>{slots?.default?.()}</span>}
      </button>
    );
  },
});
