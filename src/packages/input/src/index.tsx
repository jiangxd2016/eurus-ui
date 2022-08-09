import type { SetupContext } from 'vue';
import { defineComponent, toRefs } from 'vue';
import classNames from '../../_hooks/useClassName';
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

    const { size, disabled, type, placeholder, modelValue } = toRefs(props);
    const inputClass = () => {
      return classNames(['e-input', size.value ? 'e-input-' + size.value : '', disabled.value ? 'e-input-disabled' : '']);
    };

    const inputHandle = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value;
      modelValue.value = targetValue;
      emit('update:modelValue', targetValue);
      emit('change', e);
    };

    const blurHandle = (e: Event) => {
      emit('blur', e);
    };

    const focusHandle = (e: Event) => {
      emit('focus', e);
    };

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

