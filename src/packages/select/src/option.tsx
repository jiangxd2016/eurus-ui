import { computed, defineComponent, inject, onMounted } from 'vue';
import './style.scss';

import { getPrefixCls } from '@/packages/_utils/global-config';
import { selectKey } from '@/packages/_utils/constants';
import type { SelectOptionItem } from '@/packages/select/src/index';

const EOptionProps = {
  value: {
    type: [String, Number, Boolean, Object],
    default: undefined,
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

    const Selected = inject(selectKey, {});

    onMounted(() => {
      Selected.setOption && Selected.setOption(props as SelectOptionItem);
    });

    const computedSelected = computed(() => {
      if (Array.isArray(Selected.modelValue)) {
        return Selected.modelValue.includes(props.value);
      } else {
        return Selected.modelValue === props.value;
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
    const handleClick = () => {
      if (props.disabled) {
        return;
      }
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
