import type { PropType } from 'vue';
import { computed, defineComponent, inject } from 'vue';
import './style.scss';
import EIcon from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { CheckboxGroupKey } from '@/packages/_utils/constants';

const ECheckboxProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  defaultChecked: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number] as PropType<string | number>,
  },
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false
  }
};

export default defineComponent({
  name: 'ECheckbox',
  props: ECheckboxProps,
  setup(props, { slots, emit }) {

    const prefixCls = getPrefixCls('checkbox');

    const checkboxGroupInject = inject(CheckboxGroupKey, undefined);
    const isGroup = computed(() => !!checkboxGroupInject);
    const computedChecked = computed(() => {
      if (checkboxGroupInject) {
        return checkboxGroupInject.value.includes(props.value || '');
      }
      return props.modelValue || props.defaultChecked;
    });

    const computedDisabled = computed(() => {
      if (checkboxGroupInject) {
        return checkboxGroupInject.disabled || props.disabled;
      }
      return props.disabled;
    });

    const classNames = computed(() => {
      return {
        [prefixCls + '-disabled']: computedDisabled.value,
        [prefixCls + '-checked']: computedChecked.value
      };
    });
    const updateValue = (e: Event) => {
      if (computedDisabled.value) {
        return;
      }
      if (isGroup.value && checkboxGroupInject) {
        const value = checkboxGroupInject.value;
        const index = value.indexOf(props.value || '');
        if (index === -1) {
          value.push(props.value || '');
        } else {
          value.splice(index, 1);
        }
        checkboxGroupInject.handleChange(value, e );
      } else {
        emit('change', !props.modelValue, e);
        emit('update:modelValue', !computedChecked.value);
      }

    };
    return () => (
						<div class={[prefixCls, classNames.value]} aria-hidden="true" onClick={updateValue}>
                <span class={[prefixCls + '-icon-wrapper']}>
								<EIcon name="checkedFill" class={`${prefixCls}-icon`} size={14}></EIcon>
                </span>
								<div class={`${prefixCls}__label`}>
										{props.label || slots.default && slots.default()}
								</div>
						</div>
    );
  },
});
