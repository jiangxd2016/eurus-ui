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
    const computedCls = computed(() => {
      return {
        [`${prefixCls}-checked`]: computedChecked.value,
        [`${prefixCls}-disabled`]: computedDisabled.value
      };
    });
    const handleClick = (ev: Event) => {
      ev.stopPropagation();
    };

    const updateValue = (e: Event) => {
      if (computedDisabled.value) {
        return;
      }
      if (isGroup.value && radioGroupInject) {
        const value = radioGroupInject.value === props.value ? '' : props.value;
        radioGroupInject.handleChange(value, e);
      } else {
        const val = props.modelValue === props.value ? '' : props.value;
        emit('change', val, e);
        emit('update:modelValue', val);
      }
    };
    return () => (
						<label class={[prefixCls, computedCls.value]} aria-hidden="true">
								<input
                    type="radio"
                    checked={computedChecked.value}
                    value={props.value}
                    onClick={handleClick}
                    onChange={updateValue}
                    disabled={computedDisabled.value}
                    class={[`${prefixCls}__input`]}
								/>
								<span class={`${prefixCls}-inner`}/>
								<div class={[`${prefixCls}__label`, props.disabled && 'disabled']}>
										{props.label || slots.default && slots.default()}
								</div>
						</label>

    );
  },
});
