import type { PropType } from 'vue';
import { defineComponent, provide, reactive } from 'vue';
import { getPrefixCls } from '@/components/_utils/global-config';
import { CheckboxGroupKey } from '@/components/_utils/constants';

export default defineComponent({
  name: 'ECheckboxGroup',
  props: {
    modelValue: {
      type: Array as PropType<Array<string | number | boolean>>,
      default: undefined,
    },
    defaultChecked: {
      type: Array as PropType<Array<string | number | boolean>>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false
    },

  },
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('checkbox-group');
    const handleChange = (value: Array<string | number>, e: Event) => {
      emit('update:modelValue', value);
      emit('change', value, e);
    };
    provide(
      CheckboxGroupKey,
      reactive({
        name: 'EuCheckboxGroup',
        value: props.modelValue,
        disabled: props.disabled,
        handleChange,
      })
    );
    return () => (
						<div class={[prefixCls]}>
								{slots.default && slots.default()}
						</div>
    );
  }
});
