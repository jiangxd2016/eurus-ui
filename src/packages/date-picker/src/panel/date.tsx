import type { PropType } from 'vue';
import { onMounted, defineComponent, ref, Fragment } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DateHeader from '../compts/DateHeader';
import DateBody from '../compts/DateBody';
import DateFooter from '../compts/DateFooter';

import type { datePickerItem } from '@/packages/_utils/date';
import { generateDayList } from '@/packages/_utils/date';

const EDatePickerProps = {

  modelValue: {
    type: [String, Date, Number] as PropType<Date | string | number | Dayjs>,
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
      return () => {
      };
    }
  }
};

export default defineComponent({
  name: 'EDatePicker',
  props: EDatePickerProps,
  emits: ['change'],
  setup(props, { emit }) {

    const selectDownRef = ref();
    const _value = ref(props.modelValue || dayjs().valueOf());
    const currentDateList = ref([dayjs(_value.value).year(), dayjs(_value.value).month() + 1]);
    const dateList = ref<datePickerItem[][]>([]);

    const getDateList = () => {
      dateList.value = generateDayList(currentDateList.value, props.disabledDate);
    };

    onMounted(() => {
      getDateList();
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
      _value.value = date;
      const dateStr = dayjs(_value.value).format('YYYY-MM-DD');
      selectDownRef.value?.setModelValue(dateStr);
      setDateListActive(date);
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

    return () => <Fragment>
      <DateHeader date={currentDateList.value} onDateRangeChange={dateRangeChange}></DateHeader>
      <DateBody list={dateList.value} onDateChange={dateChange}/>
      <DateFooter onDateRangeChange={dateRangeChange}></DateFooter>
    </Fragment>;

  },
});
