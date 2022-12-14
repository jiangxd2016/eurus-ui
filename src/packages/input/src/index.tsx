import type { PropType } from 'vue';
import { ref, watch, computed, defineComponent, toRefs } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
import './style.scss';
import { isUndefined, isNull } from '@/packages/_utils/is';
import EIcon from '@/packages/icons';
import type { Size } from '@/packages/_utils/size';

const EInputProps = {
  type: {
    type: String as PropType<'text' | 'password' | 'number'>,
    default: 'text'
  },
  modelValue: {
    type: [String, Number] as PropType<string | number>,
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

};
export default defineComponent({
  name: 'EInput',
  inheritAttrs: false,
  props: EInputProps,
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'clear', 'input'],
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('input');
    const wrapperCls = getPrefixCls('input-wrapper');

    const { size, disabled, type, placeholder, modelValue } = toRefs(props);

    const wrapperClassNames = computed(() => {
      return [wrapperCls, `${wrapperCls}--${size.value}`, props.disabled && `${wrapperCls}--disabled`];
    });

    const _value = ref(props.defaultValue);

    const maxLength = computed(() => {
      return props.maxLength > 0 ? props.maxLength : undefined;
    });
    const computedValue = computed(() => {
      return (props.modelValue ?? _value.value) + '';
    });
    const showClearBtn = computed(() => props.clearable && Boolean(computedValue.value));

    let preValue = computedValue.value;
    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = '';
      }
    });

    // update value
    const updateValue = (value: string) => {
      if (maxLength.value && value.length > maxLength.value) {
        value = value.slice(0, maxLength.value);
      }
      _value.value = value;
      emit('update:modelValue', value);
    };
    const emitChange = (value: string | number, ev: Event) => {
      if (value !== preValue) {
        preValue = value + '';
        emit('change', value, ev);
      }
    };

    const handleInput = (ev: Event) => {
      const value = (ev.target as HTMLInputElement).value;

      updateValue(value);
      emit('input', value, ev);
    };
    const handleBlur = (ev: Event) => {
      emitChange(computedValue.value, ev);
      emit('blur', ev);
    };
    const handleFocus = (ev: Event) => {
      preValue = computedValue.value;
      emit('focus', ev);
    };
    const handleClear = (ev: MouseEvent) => {
      if (disabled.value) { return; }
      updateValue('');
      emitChange('', ev);
      emit('clear', ev);
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
          maxlength={maxLength.value}
          class={[prefixCls]}
          onInput={handleInput}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {showClearBtn.value && (
          <span onClick={handleClear} aria-hidden="true" class={`${prefixCls}-clearable`}>
            <EIcon name="close" size={size.value} ></EIcon>
          </span>
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
