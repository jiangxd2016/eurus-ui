import { computed, defineComponent, ref } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { useFormValidate } from '@/packages/_utils/form';

const ESwitchProps = {

  modelValue: {
    type: [String, Number, Boolean],
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  defaultChecked: {
    type: Boolean,
    default: false
  },
  checkedValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  uncheckedValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  checkedLabel: {
    type: String,
    default: ''
  },
  uncheckedLabel: {
    type: String,
    default: ''
  },
  checkedColor: {
    type: String,
  },
  uncheckedColor: {
    type: String,
  },
};

export default defineComponent({
  name: 'ESwitch',
  props: ESwitchProps,
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('switch');

    const { formItemFields, validateEvent } = useFormValidate();

    const computedDisabled = computed(() => {
      return props.disabled || formItemFields?.disabled;
    });

    const _checked = ref(
      props.defaultChecked ? props.checkedValue : props.uncheckedValue
    );
    const computedChecked = computed(() => {
      return (props.modelValue ?? _checked.value) === props.checkedValue;
    });

    const computedCls = computed(() => {
      return {
        [`${prefixCls}-checked`]: computedChecked.value,
        [`${prefixCls}-disabled`]: computedDisabled.value
      };
    });
    const computedStyles = computed(() => {
      if (computedChecked.value && props.checkedColor) {
        return {
          backgroundColor: props.checkedColor,
        };
      }
      if (!computedChecked.value && props.uncheckedColor) {
        return {
          backgroundColor: props.uncheckedColor,
        };
      }
      return undefined;
    });
    const handleClick = (ev: Event) => {
      ev.stopPropagation();
    };
    const handleChange = (ev: Event) => {
      if (computedDisabled.value) {
        return;
      }
      _checked.value = !computedChecked.value ? props.checkedValue : props.uncheckedValue;
      validateEvent(_checked.value);
      emit('update:modelValue', _checked.value);
      emit('change', _checked.value, ev);
    };
    return () => (
						<label class={[`${prefixCls}`, computedCls.value]}>
								<input
										class={`${prefixCls}__input`}
										checked={computedChecked.value}
										type="checkbox"
										role="switch"
										aria-checked={computedChecked.value}
										aria-disabled={computedDisabled.value}
										onClick={handleClick}
										disabled={computedDisabled.value}
										onChange={handleChange}
								/>
								{props.uncheckedLabel && <span class={`${prefixCls}__label-left`}>
										{props.uncheckedLabel}
								</span>}

								<span
										class={`${prefixCls}__inner`}
										style={computedStyles.value}
								/>
								{props.checkedLabel && <span class={`${prefixCls}__label-right`}>
										{props.checkedLabel}
								</span>}
						</label>
    );
  },
});
