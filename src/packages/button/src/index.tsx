import type { ButtonHTMLAttributes, PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import { isEmpty } from '@/packages/_utils/is';

import './style.scss';
import EIcon from '@/packages/icons';
import type { Size } from '@/packages/_utils/size';

export type Type =
  | 'default'
  | 'text'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'purple';

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
  native: {
    type: Object as PropType<ButtonHTMLAttributes>,
    default: {},
  },
};

export default defineComponent({
  name: 'EButton',
  props: BtnProps,
  emits: ['click'],
  setup(props, { slots, emit }) {
    const prefix = 'eu-button';
    const classNames = computed(() => ({
      disabled: props.disabled || props.loading,
      plain: props.plain,
      circle: props.circle,
      round: props.round,
      [`${prefix}--${props.size}`]: props.size
    }));

    const handleClick = (e: Event) => {
      if (props.disabled || props.loading) { return; }
      emit('click', e);
    };

    const ButtonElement = isEmpty(props.native) ? 'a' : 'button';

    return () => (
      <ButtonElement
        class={[
          `${prefix} ${prefix}--${props.type} bg-${props.type} ${props.type === 'default' ? 'text-black' : 'text-white'}`,
          classNames.value,
        ]}
        {...props.native} onClick={handleClick}>
        {props.loading && (
          <span class="loading"><EIcon name='loading'></EIcon></span>
        )}
        {slots?.icon && slots.icon()}
        {slots?.default && <span>{slots?.default?.()}</span>}
      </ButtonElement>
    );
  },
});
