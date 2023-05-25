import type { PropType } from 'vue';
import { computed, defineComponent, provide, reactive, ref } from 'vue';
import { RadioGroupKey } from '@/packages/_utils/constants';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { useFormValidate } from '@/packages/_utils/form';

export default defineComponent({
  name: 'ERadioGroup',
  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<string | number | boolean | undefined>,
      default: null
    },
    defaultValue: {
      type: [String, Number, Boolean] as PropType<string | number | boolean | undefined>,
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

    const { formItemFields, validateEvent } = useFormValidate();

    const computedDisabled = computed(() => {
      return props.disabled || formItemFields?.disabled;
    });
    const computedValue = computed(() => props.modelValue ?? _value.value);

    const computedCls = computed(() => {
      return {
        [`${prefixCls}-disabled`]: props.disabled
      };
    });
    const updateValue = (value: string | boolean | number | undefined, e: Event) => {
      if (computedDisabled.value) {
        return;
      }
      _value.value = value;
      validateEvent(_value.value);
      emit('change', value, e);
      emit('update:modelValue', value);
    };
    provide(RadioGroupKey, reactive({
      handleChange: updateValue,
      name: 'EuRadioGroup',
      value: computedValue,
      disabled: computedDisabled.value,
    }));

    return () => (
      <div class={[prefixCls, computedCls.value]}>
        {slots.default && slots.default()}
      </div>
    );
  }
});
