import type { PropType } from 'vue';
import { onMounted, defineComponent, ref, Fragment } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DateHeader from '../compts/DateHeader';
import Month from '../compts/calendar';
import type { datePickerItem } from '@/packages/_utils/date';
import { generateMonthList } from '@/packages/_utils/date';

export type dateType = Date | string | number | Dayjs;

const EDatePickerProps = {
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
    type: Function as PropType<(date: number) => boolean>,
    default() {
      return () => {};
    },
  },
};

export default defineComponent({
  name: 'EDatePicker',
  props: EDatePickerProps,
  emits: ['change'],
  setup(props, { emit }) {
    const _value = ref(props.modelValue || dayjs().valueOf());
    const currentDateList = ref([dayjs(_value.value).year(), dayjs(_value.value).month() + 1]);
    const dateList = ref<datePickerItem[][]>([]);

    const getDateList = () => {
      dateList.value = generateMonthList(currentDateList.value, props.disabledDate);
    };

    onMounted(() => {
      getDateList();
    });
    const dateChange = (date: number) => {
      emit('change', date);
    };

    const dateRangeChange = (type: string) => {
      const [year, month] = currentDateList.value;
      switch (type) {
        // 上一年点击
        case 'lastYear':
          currentDateList.value = [year - 1, month];
          break;
        // 下一年点击
        case 'nextYear':
          currentDateList.value = [year + 1, month];
          break;
      }
      getDateList();
    };

    return () => (
      <Fragment>
        <DateHeader date={currentDateList.value} type="month" onDateRangeChange={dateRangeChange}></DateHeader>
        <Month list={dateList.value} onDateChange={dateChange}></Month>
      </Fragment>
    );
  },
});
