import { computed, defineComponent } from 'vue';
import './style.scss';

import { getPrefixCls } from '@/packages/_utils/global-config';

const EOptionProps = {
  value: {
    type: [String, Number, Boolean, Object],
    default: undefined,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  label: String,
  disabled: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EOption',
  props: EOptionProps,
  emits: ['click', 'hover'],
  setup(props, { slots, emit }) {

    const prefixCls = getPrefixCls('select-option');

    const computedCls = computed(() => ({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: props.disabled,
      [`${prefixCls}-selected`]: props.selected,
    }));

    const handleHover = () => {
      if (props.disabled) {
        return;
      }
      emit('hover', props.value);
    };
    const handleClick = (e: Event) => {
      if (props.disabled) {
        return;
      }
      e.stopPropagation();
      emit('click', props.value);
    };

    return () => (

      <li class={computedCls.value} role="option" aria-selected={props.selected} onClick={handleClick}
          onMouseenter={handleHover}
      >
        {slots.default ? slots.default() : props.label || props.value}
      </li>

    );
  },
});
