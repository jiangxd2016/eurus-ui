import type { SetupContext } from 'vue';
import { onMounted, inject, defineComponent, toRefs } from 'vue';
import classNames from '../../_hooks/useClassName';
import { getPrefixCls } from '@/packages/_utils/global-config';
import './style.scss';
const InputProps = {
  modelValue: {
    type: [String, Number],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md'
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
};

export default defineComponent({
  name: 'EInput',
  props: InputProps,
  setup (props, { emit }: SetupContext) {
    const formPrefix = getPrefixCls('form');
    const clsPrefix = getPrefixCls('input');
    // formItem
    const controlChange: any = inject(`${formPrefix}ControlChange`, '');
    const controlChangeEvent = (val: any, type?: string) => {
      controlChange && controlChange(val, type);
    };
    const { size, disabled, type, placeholder, modelValue } = toRefs(props);
    const inputClass = () => {
      return classNames([clsPrefix, size.value ? clsPrefix + '-' + size.value : '', disabled.value ? clsPrefix + '-' + 'disabled' : '']);
    };

    const inputHandle = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value;
      modelValue.value = targetValue;
      emit('update:modelValue', targetValue);
      emit('change', e);

      controlChangeEvent(targetValue);
    };

    const blurHandle = (e: Event) => {
      emit('blur', e);
      const { value } = e.target as HTMLInputElement;
      controlChangeEvent(value, 'blur');
    };

    const focusHandle = (e: Event) => {
      emit('focus', e);
      const { value } = e.target as HTMLInputElement;
      controlChangeEvent(value, 'focus');
    };

    onMounted(() => {
      controlChangeEvent(props.modelValue, 'mounted');
    });

    return () => (
      <input
        value={ modelValue.value}
        type={type.value}
        placeholder={placeholder.value}
        disabled={disabled.value}
        class={inputClass()}
        onInput={inputHandle}
        onBlur={blurHandle}
        onFocus={focusHandle}
      />
    );
  }
});

