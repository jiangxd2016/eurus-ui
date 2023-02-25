import type { PropType, Ref } from 'vue';
import { onMounted, defineComponent, ref } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DateHeader from '../compts/DateHeader';
import DateBody from '../compts/DateBody';

import type { datePickerItem } from '@/packages/_utils/date';
import { generateDayList, isBetween } from '@/packages/_utils/date';
import { getPrefixCls } from '@/packages/_utils/global-config';

export type dateType = Array<Date | string | number | Dayjs>;

const EDatePickerProps = {

  modelValue: {
    type: Array as PropType<dateType>,
    default() {
      return () => [];
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

    const prefixCls = getPrefixCls('date-picker-range');

    // 表格数据
    const startDateList = ref<any>([]);
    const endDateList = ref<any>([]);

    const startDate = dayjs(props.modelValue[0] || dayjs()).valueOf();
    const endDate = dayjs(props.modelValue[1] || dayjs().add(1, 'month')).valueOf();

    const startDateFormatter = ref([dayjs(startDate).year(), dayjs(startDate).month() + 1]);
    const endDateFormatter = ref([dayjs(endDate).year(), dayjs(endDate).month() + 1]);
    // 用户input显示时间
    const currentDate = ref<number[]>([]);
    // 通过props传递的时间，组装成长度为42的数组,具体看utils文件下下面的这个方法
    const getDateList = () => {
      startDateList.value = generateDayList(startDateFormatter.value, props.disabledDate);
      endDateList.value = generateDayList(endDateFormatter.value, props.disabledDate);
    };

    const setDateListActive = (date: number[], list: Ref<any[]>) => {
      list.value = list.value.map((i: datePickerItem[]) => {
        return i.map((j: datePickerItem) => {
          j.active = date.includes(j.date);
          return j;
        });
      });
    };

    // currentDate 是否只选择了，且只选择了一个
    const isSelectDateOne = (): boolean => {
      const [start, end] = currentDate.value;
      return !!(start || end) && !(start && end);
    };
    const setDateListHover = (date: number, list: Ref<any[]>, clear = false) => {
      if (!isSelectDateOne()) {
        return;
      }
      list.value = list.value.map((i: datePickerItem[]) => {
        return i.map((j: datePickerItem) => {
          j.hover = clear ? false : isBetween(j.date, currentDate.value[0], date);
          return j;
        });
      });

    };
    // 监听每个td时间项点击
    const dateChange = (date: number) => {
      const [start, end] = currentDate.value;
      if (!start && !end || start && end) {
        currentDate.value = [date];
        setDateListHover(date, endDateList, true);
        setDateListHover(date, startDateList, true);

      } else if (isSelectDateOne()) {
        currentDate.value[1] = date;
        emit('change', currentDate.value);
      }
      setDateListActive(currentDate.value, startDateList);
      setDateListActive(currentDate.value, endDateList);

    };

    // 头部年月切换
    const dateRangeChange = (type: string, curDate: Ref<number[]>) => {

      const [year, month] = curDate.value;
      switch (type) {
        // 上一年点击
        case 'lastYear':
          curDate.value = [year - 1, month];
          break;
        // 上一月点击（月份<1,就要返回到上一年的12月份）
        case 'lastMonth':
          curDate.value = [
            month - 1 <= 0 ? year - 1 : year,
            month - 1 <= 0 ? 12 : month - 1,
          ];
          break;
        // 下一年点击
        case 'nextYear':
          curDate.value = [year + 1, month];
          break;
        case 'nextMonth':
          // 下一月点击（月份>12,就要到下一年的一月份）
          curDate.value = [
            month + 1 > 12 ? year + 1 : year,
            month + 1 > 12 ? 1 : month + 1,
          ];
          break;
      }
      getDateList();
    };

    onMounted(() => {
      getDateList();
      setDateListHover(currentDate.value[1], endDateList);
      setDateListHover(currentDate.value[1], startDateList);
      setDateListActive(currentDate.value, startDateList);
      setDateListActive(currentDate.value, endDateList);
    });

    const onDateHover = (date: number) => {
      if (props.disabled) {
        return;
      }
      const [start, end] = currentDate.value;
      if (!start && !end || start && end) {
        return;
      }

      setDateListHover(date, startDateList);
      setDateListHover(date, endDateList);
    };

    const onDateClick = (e: Event) => {
      if (currentDate.value.length === 1) {
        e.stopPropagation();
      }
    };
    return () => <div class={prefixCls} role="listbox" tabindex="0" onClick={onDateClick}>
      <div class="date-picker-panel">
        <DateHeader
          date={startDateFormatter.value}
          onDateRangeChange={(type: string) => dateRangeChange(type, startDateFormatter)}
        />
        <DateBody list={startDateList.value} onDateHover={onDateHover} onDateChange={dateChange}/>
      </div>
      <div class="date-picker-panel">
        <DateHeader
          date={endDateFormatter.value}
          onDateRangeChange={(type: string) => dateRangeChange(type, endDateFormatter)}
        />
        <DateBody list={endDateList.value} onDateHover={onDateHover} onDateChange={dateChange}/>
      </div>
    </div>;

  },
});
