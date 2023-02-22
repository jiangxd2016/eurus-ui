import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import Date from './panel/date';
import Range from './panel/range';
import Month from './panel/month';
import { getPrefixCls } from '@/packages/_utils/global-config';
import SelectDown from '@/packages/select-down';
import { ESelectDownProps } from '@/packages/select-down/src';

export type dateType = Date | string | number | Dayjs;

const EDatePickerProps = {
  ...ESelectDownProps,
  type: {
    type: String as PropType<'date' | 'month' | 'range'>,
    default: 'date',
  },
  placeholder: {
    type: String,
    default: '',
  },
  startPlaceholder: {
    type: String,
    default: '',
  },
  endPlaceholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Date, Number, Array] as PropType<dateType>,
    default() {
      return dayjs().valueOf();
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

    const dateChange = (date: number) => {
      emit('change', date);
      emit('update:modelValue', date);
    };

    const handleChange = (val: string) => {
      emit('update:modelValue', val);
      emit('change', val);
    };

    const handleClear = () => {
      emit('update:modelValue', '');
      emit('change', '');
    };

    return () => {
      let panel = null;
      switch (props.type) {
        case 'date':
          panel = <Date onChange={dateChange} />;
          break;
        case 'month':
          panel = <Month onChange={dateChange} />;
          break;
        case 'range':
          panel = <Range onChange={dateChange} />;
          break;
        default:
          break;
      }

      return <SelectDown class={prefixCls} {...props} scrollpanel={false}
                         onUpdate:modelValue={handleChange} onClear={handleClear}
      >
        {panel}
      </SelectDown>;
    };

  },
});
