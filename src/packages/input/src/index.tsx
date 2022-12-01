import type { PropType } from 'vue';
import { ref, watch, computed, defineComponent, toRefs } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
import './style.scss';
// import { formItemProviderInjectionKey } from '@/packages/_utils/constants';
import { isUndefined, isNull } from '@/packages/_utils/is';
import EIcon from '@/packages/icons';
import type { Size } from '@/packages/_utils/size';

const EInputProps = {
  modelValue: {
    type: String,
    default: ''
  },
  defaultValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  placeholder: {
    type: String,
    default: ''
  },
  maxLength: {
    type: Number,
    default: 0
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  type: {
    // 不支持特殊的原生熟悉，如：Date, Time, Month, Week, Datetime, Datetime-local, Color
    // @see https://html.spec.whatwg.org/multipage/input.html#the-input-element
    type: String as PropType<'text' | 'search' | 'telephone' | 'url' | 'email' | 'password'>,
    default: 'text'
  }
};
export default defineComponent({
  name: 'EInput',
  inheritAttrs: false,
  props: EInputProps,
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'clear', 'input'],
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('input');
    const wrapperCls = getPrefixCls('input-wrapper');

    const { size, disabled, type, placeholder, modelValue, maxLength } = toRefs(props);
    // formItem
    // const formItemFields: any = inject(formItemProviderInjectionKey, undefined);

    const wrapperClassNames = computed(() => {
      return [wrapperCls, `${wrapperCls}--${size.value}`, props.disabled && `${wrapperCls}--disabled`];
    });

    const controlChangeEvent = (type: 'update:modelValue' | 'change' | 'focus' | 'blur' | 'clear' | 'input' = 'change', val: unknown, event: Event) => {
      emit(type, val, event);
      // if (formItemFields.triggerList.includes(type)) {
      //   formItemFields.validate(val);
      // }
    };

    // 值相关
    const _value = ref(props.defaultValue);
    const computedValue = computed(() => props.modelValue ?? _value.value);

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = '';
      }
    });
    let preValue = computedValue.value;
    const showClearBtn = computed(
      () =>
        props.clearable
        && Boolean(computedValue.value)
    );
    const updateValue = (value: string) => {
      if (
        maxLength.value
        && value.length > maxLength.value
      ) {
        value = value.slice(0, maxLength.value);
      }

      _value.value = value;
      emit('update:modelValue', value);
    };

    const emitChange = (value: string, event: Event) => {
      if (value !== preValue) {
        preValue = value;
        emit('change', value, event);
      }
    };

    const handleInput = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value;
      updateValue(targetValue);
      emitChange(targetValue, e);
      controlChangeEvent('input', targetValue, e);
    };

    const handleBlur = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      controlChangeEvent('blur', value, e);
    };

    const handleFocus = (e: Event) => {
      preValue = computedValue.value;
      controlChangeEvent('focus', preValue, e);
    };
    const handleClear = (e: Event) => {
      updateValue('');
      emitChange('', e);
      controlChangeEvent('clear', ' ', e);
    };

    return () => (
      <span class={wrapperClassNames.value}>
        {slots.prefix && (
          <span class={`${prefixCls}-prefix`}>{slots.prefix()}</span>
        )}
        <input
          value={computedValue.value}
          type={type.value}
          placeholder={placeholder.value}
          disabled={disabled.value}
          class={[prefixCls]}
          maxlength={maxLength.value}
          onInput={handleInput}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {showClearBtn.value && (
          <EIcon name="close" onClick={handleClear} size={size.value} class={`${prefixCls}-clearable`}></EIcon>
        )}
        {(slots.suffix || (Boolean(props.maxLength) && props.showWordLimit)) && (
          <span class={`${prefixCls}-suffix`}>
            {Boolean(props.maxLength) && props.showWordLimit && (
              <span class={`${prefixCls}-word-limit`}>
                {computedValue.value.length} / {maxLength.value}
              </span>
            )}{slots.suffix?.()}</span>

        )}
      </span>
    );
  },
});
