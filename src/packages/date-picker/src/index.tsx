import type { PropType, VNode } from 'vue';
import { onMounted, computed, defineComponent, ref } from 'vue';
import './style.scss';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DateHeader from './DateHeader';
import DateBody from './DateBody';
import DateFooter from './DateFooter';
import Month from './month';
import { getPrefixCls } from '@/packages/_utils/global-config';
import SelectDown from '@/packages/select-down';
import type { datePickerItem } from '@/packages/_utils/date';
import { generateList } from '@/packages/_utils/date';
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
    type: [String, Date, Number] as PropType<dateType>,
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

    const formatRule = props.type === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD';

    const selectDownRef = ref();
    const _value = ref(props.modelValue);
    const currentDateList = ref([dayjs(_value.value).year(), dayjs(_value.value).month() + 1]);
    const dateList = ref<datePickerItem[][]>([]);

    const getDateList = () => {
      dateList.value = generateList(props.type, currentDateList.value, props.disabledDate);
    };

    onMounted(() => {
      getDateList();
    });

    const computedLabel = computed(() => {
      return dayjs(_value.value).format(formatRule);
    });

    const setDateListActive = (date: number) => {
      dateList.value = dateList.value.map((i: datePickerItem[]) => {
        const t = i.map((j: datePickerItem) => {
          j.active = dayjs(date).isSame(j.date, 'day');
          return j;
        });
        return t;
      });

    };

    const dateChange = (date: number) => {
      emit('change', date);
      emit('update:modelValue', date);
      _value.value = date;
      const dateStr = dayjs(_value.value).format(formatRule);
      selectDownRef.value?.setModelValue(dateStr);
      setDateListActive(date);
    };

    const handleChange = (val: string) => {
      _value.value = val;
      emit('update:modelValue', val);
      emit('change', val);
    };

    const handleClear = () => {
      _value.value = '';
      emit('update:modelValue', '');
      emit('change', '');
    };

    const dateRangeChange = (type: string) => {

      const [year, month] = currentDateList.value;
      switch (type) {
        // 上一年点击
        case 'lastYear':
          currentDateList.value = [year - 1, month];
          break;
        // 上一月点击（月份<1,就要返回到上一年的12月份）
        case 'lastMonth':
          currentDateList.value = [
            month - 1 <= 0 ? year - 1 : year,
            month - 1 <= 0 ? 12 : month - 1,
          ];
          break;
        // 下一年点击
        case 'nextYear':
          currentDateList.value = [year + 1, month];
          break;
        case 'nextMonth':
          // 下一月点击（月份>12,就要到下一年的一月份）
          currentDateList.value = [
            month + 1 > 12 ? year + 1 : year,
            month + 1 > 12 ? 1 : month + 1,
          ];
          break;
        case 'today':
          currentDateList.value = [new Date().getFullYear(), new Date().getMonth() + 1];
          dateChange(dayjs().valueOf());
          return;
      }
      getDateList();
    };

    return () => {
      let Range: VNode[] = [];
      switch (props.type) {
        case 'date':
          Range = [
            <DateHeader date={currentDateList.value} onDateRangeChange={dateRangeChange}></DateHeader>,
            <DateBody list={dateList.value} onDateChange={dateChange}/>,
            <DateFooter onDateRangeChange={dateRangeChange}></DateFooter>,
          ];
          break;
        case 'month':
          Range = [
            <DateHeader date={currentDateList.value} type={props.type} onDateRangeChange={dateRangeChange}></DateHeader>,
            <Month list={dateList.value} onDateChange={dateChange}></Month>
          ];

      }
      return <SelectDown class={prefixCls} {...props} modelValue={computedLabel.value} scrollPane={false}
                         onUpdate:modelValue={handleChange} onClear={handleClear} ref={selectDownRef}
      >
        {Range}
      </SelectDown>;
    };

  },
});
