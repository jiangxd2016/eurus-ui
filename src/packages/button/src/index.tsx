import type { ButtonHTMLAttributes, PropType } from 'vue';
import { computed, defineComponent, inject } from 'vue';

import './style.scss';
import EIcon from '@/packages/icons';
import type { Size } from '@/packages/_utils/size';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { buttonGroupProviderTypeInjectionKey, configProviderInjectionKey } from '@/packages/_utils/constants';

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
    default: '',
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
    const prefixCls = getPrefixCls('button');

    const buttonGroupInject = inject(buttonGroupProviderTypeInjectionKey, null);
    const globalConfigInject = inject(configProviderInjectionKey, null);

    // props size > buttonGroup size > globalConfig size
    const size = computed(() => {
      const buttonGroupSize = buttonGroupInject?.size;
      const globalConfigSize = globalConfigInject?.size;
      return props.size || buttonGroupSize || globalConfigSize || 'md';
    });

    const classNames = computed(() => ({
      disabled: props.disabled || props.loading,
      plain: props.plain,
      circle: props.circle,
      round: props.round,
    }));

    const handleClick = (e: Event) => {
      if (props.disabled || props.loading) {
        return;
      }
      emit('click', e);
    };

    return () => (
      <button
        class={[
          `${prefixCls}  bg-${props.type} ${prefixCls}--${size.value} ${props.type === 'default' ? 'text-black' : 'text-white'}`,
          classNames.value,
        ]}
        {...props.native} onClick={handleClick}
      >
        {props.loading && (
          <span class="loading"><EIcon name="loading" size={size.value}></EIcon></span>
        )}
        {slots?.icon && <span class="inner">{slots.icon?.()}</span>}
        {slots?.default && <span class="inner">{slots.default?.()}</span>}
      </button>
    );
  },
});
