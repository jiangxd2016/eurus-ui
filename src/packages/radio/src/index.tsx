import { computed, defineComponent, inject } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { RadioGroupKey } from '@/packages/_utils/constants';

const ERadioProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: false
  },
  defaultValue: {
    type: [String, Number, Boolean],
    default: false
  },
  value: {
    type: [String, Number, Boolean],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
};

export default defineComponent({
  name: 'ERadio',
  props: ERadioProps,
  setup(props, { slots, emit }) {

    const prefixCls = getPrefixCls('radio');
    const radioGroupInject = inject(RadioGroupKey, undefined);
    const isGroup = computed(() => !!radioGroupInject);

    const computedChecked = computed(() => {
      if (radioGroupInject) {
        return radioGroupInject.value === props.value;
      }
      return props.value === props.modelValue;
    });

    const computedDisabled = computed(() => {
      if (radioGroupInject) {
        return radioGroupInject.disabled || props.disabled;
      }

      return props.disabled;
    });
    const computedClassNames = computed(() => {
      return {
        [prefixCls]: true,
        [`${prefixCls}-checked`]: computedChecked.value,
        [`${prefixCls}-disabled`]: computedDisabled.value
      };
    });
    const updateValue = (e: Event) => {
      if (computedDisabled.value) {
        return;
      }
      if (isGroup.value && radioGroupInject) {
        const value = radioGroupInject.value === props.value ? '' : props.value ;
        radioGroupInject.handleChange(value, e);
      } else {
        const val = props.modelValue === props.value ? '' : props.value;
        emit('change', val, e);
        emit('update:modelValue', val);
      }
    };
    return () => (
						<div class={[prefixCls, computedClassNames.value]} onClick={updateValue} aria-hidden="true">
								<span class={`${prefixCls}-inner`}/>
								<div class={`${prefixCls}__label`}>
										{props.label || slots.default && slots.default()}
								</div>
						</div>

    );
  },
});
