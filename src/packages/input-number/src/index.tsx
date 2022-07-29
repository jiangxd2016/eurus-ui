import { defineComponent, ref, toRefs } from 'vue';
import type { SetupContext, PropType, ExtractPropTypes } from 'vue';

import './style.scss';
import { getPrefixCls } from '../../_utils/global-config';
import { isNumber } from '../../_utils';

export type ISize = 'lg' | 'md' | 'sm';

export const inputNumberProps = {
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY,
  },
  size: {
    type: String as PropType<ISize>,
    default: '',
  },
  modelValue: {
    type: Number,
  },
  precision: {
    type: Number,
  },
} as const;

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;

export default defineComponent({
  name: 'EInputNumber',
  props: inputNumberProps,
  emits: ['update:modelValue', 'change', 'input'],
  setup(props: InputNumberProps, ctx: SetupContext) {
    const { disabled } = toRefs(props);

    const prefix = getPrefixCls('input-number');

    const inputValue = ref(props.modelValue);

    const onInput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      inputValue.value = +value;
    };

    const onChange = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      const newVal = value !== '' ? Number(value) : '';
      if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
        return newVal;
      }
      return undefined;
    };

    return () => (
      <div class={prefix}>
        <div >
          <input
            ref="inputNumberRef"
            type="number"
            value={inputValue.value}
            placeholder={props.placeholder}
            disabled={disabled.value}
            onInput={onInput}
            onChange={onChange}
          />
        </div>
      </div>
    );
  },
});
