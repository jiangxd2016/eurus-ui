import { computed, defineComponent, provide, reactive, ref } from 'vue';
import { RadioGroupKey } from '@/packages/_utils/constants';
import { getPrefixCls } from '@/packages/_utils/global-config';

export default defineComponent({
  name: 'ERadioGroup',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: null
    },
    defaultValue: {
      type: [String, Number, Boolean],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('radio-group');
    const _value = ref(props.defaultValue);
    const computedValue = computed(() => props.modelValue ?? _value.value);

    const computedClassNames = computed(() => {
      return {
        [`${prefixCls}-disabled`]: props.disabled
      };
    });
    const updateValue = (value: string | boolean | number, e: Event) => {
      if (props.disabled) {
        return;
      }
      _value.value = value;
      emit('change', value, e);
      emit('update:modelValue', value);
    };
    provide(RadioGroupKey, reactive({
      handleChange: updateValue,
      name: 'EuRadioGroup',
      value: computedValue,
      disabled: props.disabled,
    } ));

    return () => (
			<div class={[prefixCls, computedClassNames.value]}>
				{slots.default && slots.default()}
			</div>
    );
  }
});