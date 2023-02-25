import type { PropType } from 'vue';
import { defineComponent, computed, ref } from 'vue';
import './style.scss';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import Date from './panel/date';
import Range from './panel/range';
import Month from './panel/month';
import { getPrefixCls } from '@/packages/_utils/global-config';
import SelectDown from '@/packages/select-down';
import { ESelectDownProps } from '@/packages/select-down/src';
import { warnOnce } from '@/packages/_utils/warn';
import { isArray } from '@/packages/_utils/is';
import useLocaleTransform from '@/packages/_hooks/localeTransform';

export type dateType = Date | string | number | Dayjs | Array<Date | string | number | Dayjs>;

const EDatePickerProps = {
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
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledDate: {
    type: Function as PropType<(date: number) => boolean>,
    default() {
      return () => {
      };
    }
  }
};

export default defineComponent({
  name: 'EDatePicker',

  props: { ...ESelectDownProps, ...EDatePickerProps },
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('date-picker');

    const t = useLocaleTransform();
    const selectDownRef = ref();

    if (__DEV__ && props.modelValue) {
      if (props.type === 'range' && !Array.isArray(props.modelValue)) {
        warnOnce(prefixCls, 'modelValue must be an array when type is range');
      }
      if (props.type !== 'range' && Array.isArray(props.modelValue)) {
        warnOnce(prefixCls, 'modelValue must be a string when type is not range');
      }
    }

    const modelValue = computed(() => {
      return isArray(props.modelValue) ? props.modelValue : props.modelValue ? [props.modelValue] : [];
    });
    const computedDisabled = computed(() => {
      return props.disabled;
    });

    const computedPlaceholder = computed(() => {
      if (props.type === 'month') {
        return props.placeholder || t('datePicker.placeholder.month');
      }
      return props.placeholder || t('datePicker.placeholder.date');
    });
    const computedRangePlaceholder = computed(() => {
      if (props.startPlaceholder || props.endPlaceholder) {
        return [props.startPlaceholder || '', props.endPlaceholder || ''];
      } else {
        return t('datePicker.rangePlaceholder.date');
      }
    });

    const dateChange = (date: number | number[]) => {
      emit('change', date);
      emit('update:modelValue', date);
      const dateStr = Array.isArray(date) ? date.map(item => dayjs(item).format('YYYY-MM-DD')) : dayjs(date).format('YYYY-MM-DD');
      selectDownRef.value?.setModelValue(dateStr);

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
      if (props.type === 'date') {
        panel = <Date onChange={dateChange} disabled={computedDisabled.value} disabledDate={props.disabledDate}
                      modelValue={modelValue.value[0]}
        />;
      } else if (props.type === 'month') {
        panel = <Month onChange={dateChange} disabled={computedDisabled.value} disabledDate={props.disabledDate}
                       modelValue={modelValue.value[0]}
        />;
      } else if (props.type === 'range') {
        panel = <Range onChange={dateChange} disabled={computedDisabled.value} disabledDate={props.disabledDate}
                       modelValue={modelValue.value}
        />;
      }

      return <SelectDown class={prefixCls} {...props} scrollPanel={false} placeholder={computedPlaceholder.value}
                         startPlaceholder={computedRangePlaceholder.value[0]}
                         endPlaceholder={computedRangePlaceholder.value[1]}
                         range={props.type === 'range'}
                         ref={selectDownRef}
                         modelValue={modelValue.value}
                         onUpdate:modelValue={handleChange} onClear={handleClear}
      >
        {panel}
      </SelectDown>;
    };

  },
});
