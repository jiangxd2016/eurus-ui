import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import './style.scss';
import type { Dayjs } from 'dayjs';
import { getPrefixCls } from '@/packages/_utils/global-config';
import SelectDown from '@/packages/select-down';

export type dateType = Date | string | number | typeof Dayjs;

const EDatePickerProps = {
  type: {
    type: String as PropType<'date' | 'month' | 'year' | 'range'>,
    default: 'false',
  },
  placeholder: { type: String, default: '', },
  startPlaceholder: { type: String, default: '', },
  endPlaceholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Date as PropType<dateType>,
    default() {
      return new Date();
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledDate: {
    type: Function as PropType<(date: string) => boolean>,
    default() {
      return () => {
      };
    }
  }
};

export default defineComponent({
  name: 'EDatePicker',
  props: EDatePickerProps,
  setup(props, { emit }) {

    const prefixCls = getPrefixCls('date-picker');

    const _value = ref(props.modelValue);

    const handleChange = (e: any) => {
      _value.value = e.target.value;
      emit('update:modelValue', e.target.value);
      emit('change', e.target.value);
    };

    return () => (
      <SelectDown class={prefixCls} onChange={handleChange}>

      </SelectDown>

    );
  },
});
