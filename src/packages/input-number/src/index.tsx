import { defineComponent, ref } from 'vue';
import './style.scss';
import EIcon from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { isNumber } from '@/packages/_utils/is';
import EButton from '@/packages/button';
import EInput from '@/packages/input';

const EInputNumberProps = {
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
  modelValue: {
    type: Number,
    default: 0,
  },
  precision: {
    type: Number,
  },
  controls: {
    type: Boolean,
    default: true,
  }
};

export default defineComponent({
  name: 'EInputNumber',
  props: EInputNumberProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('input-number');
    const _value = ref(props.modelValue);
    const onInput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      _value.value = +value;
    };
    const emitComm = (val: number) => {
      emit('change', val);
      emit('update:modelValue', val);
    };
    const numberControl = (type: number) => {
      const inputValue = props.modelValue || 0;
      if (!Number.isNaN(inputValue) && !props.disabled) {
        let val = 0;
        if (type > 0) {
          // add
          if (props.max && !Number.isNaN(props.max) && inputValue + props.step > props.max) {
            // 设有最大值时，且没超出设置时
            val = props.max;
          } else {
            // 没有设置最大值，直接相加
            val = inputValue + props.step;
          }
        } else if (props.min && !Number.isNaN(props.min) && inputValue - props.step < props.min) {
          // 设有最小值时
          val = props.min;
        } else {
          val = inputValue - props.step;
        }
        const stepString = props.step + '';
        if (stepString.includes('.')) {
          // 表示有小数字点，小数点相加有时精度会丢失 0.2+0.1=0.300000000  或0.29999999999之类的
          const num = stepString.slice(Math.max(0, stepString.indexOf('.') + 1)).length; // 取几位小数
          val = Number(val.toFixed(num));
        }
        emitComm(val);
      }
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
      <div class={prefixCls}>
        {
          props.controls
          && <span class={`${prefixCls}-minus`} aria-hidden="true" onClick={() => numberControl(-1)}>
            {
              slots['minus-icon']
                ? slots['minus-icon']()
                : <EButton><EIcon name="plus" color="#888888" /></EButton>
            }
          </span>
        }
        <EInput
          ref="inputNumberRef"
          type="number"
          modelValue={_value.value}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onInput={onInput}
          onChange={onChange}
        />
        {
          props.controls
          && <span class={`${prefixCls}-plus`} aria-hidden="true" onClick={() => numberControl(1)}>
            {slots['plus-icon'] ? slots['plus-icon']() : <EButton>
              <EIcon name="minus" color="#888888" />
            </EButton>}
          </span>
        }
      </div>

    );
  },
});
