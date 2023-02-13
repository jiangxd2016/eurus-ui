import { computed, defineComponent, inject } from 'vue';
import './style.scss';

import { getPrefixCls } from '@/packages/_utils/global-config';
import { selectProviderInjectionKey } from '@/packages/_utils/constants';

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
  setup(props, { slots }) {

    const prefixCls = getPrefixCls('select-option');

    const Selected = inject(selectProviderInjectionKey, {});

    const computedSelected = computed(() => {
      if (Array.isArray(Selected.modelValue)) {
        return Selected.modelValue.includes(props.value);
      } else {
        return Selected.modelValue === props.value || props.selected;
      }
    });

    const computedCls = computed(() => ({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: props.disabled,
      [`${prefixCls}-selected`]: computedSelected.value,
    }));

    const handleHover = () => {
      if (props.disabled) {
        return;
      }
    };
    const handleClick = (e: Event) => {
      if (props.disabled) {
        return;
      }
      e.stopPropagation();

      Selected.selectItem && Selected.selectItem(props.value);

    };

    return () => (

      <li class={computedCls.value} role="option" aria-selected={computedSelected.value} onClick={handleClick}
          onMouseenter={handleHover}
      >
        {slots.default ? slots.default() : props.label || props.value}
      </li>

    );
  },
});
