import { defineComponent, ref, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import type { InputNumberProps } from './input-number-types';
import { inputNumberProps } from './input-number-types';
import { IncIcon, DecIcon } from './input-number-icons';
import './style.scss';
import { getPrefixCls } from '@/utils/global-config';
import { isNumber } from '@/utils';

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
          <span class={['control-button control-inc', { disabled: disabled.value }]} >
            <IncIcon />
          </span>
          <span class={['control-button control-dec', { disabled: disabled.value }]}>
            <DecIcon />
          </span>
        </div>
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
