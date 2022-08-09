import type { PropType, Ref } from 'vue';
import { defineComponent, onMounted, ref, Transition, } from 'vue';
import './style.scss';
import dayjs from 'dayjs';
import EInput from '../../input';
import EDivider from '../../divider';
import type { datePickerItem } from './utils';
import { genarateDayData } from './utils';
import DatePickerHead from './DatePickerHead';
import DateTable from './DateTable';
import type { dateValuePropsType } from '.';
const EDatePickerProps = {
  type: {
    type: String as PropType<'date' | 'month' | 'year' | 'daterange'>,
    default: 'false',
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
    type: Array as PropType<dateValuePropsType[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledDate: {
    type: Function as PropType<(date: string) => boolean>,
    default() {
      return () => { };
    }
  },

};

export default defineComponent({
  name: 'EDateRangePicker',
  props: EDatePickerProps,
  emits: ['change'],
  setup(props, { slots, emit }) {

    // 用于控制面包显示与隐藏
    const showDatePanel = ref(false);
    // 表格数据
    const startDateList = ref<any>([]);
    const endDateList = ref<any>([]);
    // 处理props时间为数组格式[年，月]
    let endDate = '';

    // 如果只有一个值，或两个值都在当月，则第二项为下月
    if (!props.modelValue[1] || (dayjs(props.modelValue[0]).month() === dayjs(props.modelValue[1]).month())) {
      endDate = dayjs(props.modelValue[0]).add(1, 'month').format('YYYY-MM-DD');
    }

    const startDate = dayjs(props.modelValue[0]).format('YYYY-MM-DD');

    const startDateFormatter = ref([dayjs(startDate).year(), dayjs(startDate).month() + 1]);
    const endDateFormatter = ref([dayjs(endDate).year(), dayjs(endDate).month() + 1]);
    // 用户input显示时间
    const currentDate = ref<string[]>([startDate, endDate]);
    // 通过props传递的时间，组装成长度为42的数组,具体看utils文件下下面的这个方法
    const getDateList = () => {
      startDateList.value = genarateDayData(startDateFormatter.value, props.disabledDate);
      endDateList.value = genarateDayData(endDateFormatter.value, props.disabledDate);
    };

    const pickerFocus = ref(false);
    const setDateListActive = (date: string[], list: Ref<any[]>) => {
      list.value = list.value.map((i: datePickerItem[]) => {
        return i.map((j: datePickerItem) => {
          j.active = date.includes(j.date);
          return j;
        });
      });
    };
    const setDateListHover = (date: string, list: Ref<any[]>, clear = false) => {
      list.value = list.value.map((i: datePickerItem[]) => {
        return i.map((j: datePickerItem) => {
          j.hover = clear ? false : dayjs(j.date).isBetween(dayjs(currentDate.value[0]), dayjs(date));
          j.active = dayjs(j.date).isSame(dayjs(date));
          return j;
        });
      });

    };
    // currentDate 是否只选择了，且只选择了一个
    const isSelectDateOne = (): boolean => {
      const [start, end] = currentDate.value;
      return !!(start || end) && !(start && end);
    };

    // 监听每个td时间项点击
    const dateChange = (date: string) => {
      const [start, end] = currentDate.value;
      if (!start && !end || start && end) {
        currentDate.value = [date, ''];
        setDateListHover(date, endDateList, true);
        setDateListHover(date, startDateList, true);

      } else if (isSelectDateOne()) {
        currentDate.value[1] = date;
        showDatePanel.value = false;
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

    const onInputClick = () => {
      if (props.disabled) { return; }
      showDatePanel.value = true;
    };

    const onInputFocus = () => {
      pickerFocus.value = true;
    };
    const onInputBlur = () => {
      pickerFocus.value = false;
      // showDatePanel.value = false;
    };

    const onDateHover = (date: string) => {
      if (props.disabled) { return; }
      const [start, end] = currentDate.value;
      if (!start && !end || start && end) {
        return;
      }
      setDateListHover(date, startDateList);
      setDateListHover(date, endDateList);
    };
    return () => (
      <div class="range-picker">
        <div class={['date-editor flex', pickerFocus.value && 'range-picker-focus']} onClick={onInputClick}>
          <EInput
            v-model={currentDate.value[0]}
            type="text"
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            disabled={props.disabled}
            placeholder="placeholder"
            class="range-picker-input"
          />
          {slots.suffix ? slots.suffix() : <span class="e-range-separator">至</span>}
          <EInput
            v-model={currentDate.value[1]}
            type="text"
            disabled={props.disabled}
            placeholder="placeholder"
            class="range-picker-input"
          />
        </div>
        <Transition name="date-range-picker">{
          showDatePanel.value && (
            <div class="date-range-picker-panel ">
              <div class="flex">
                <div class="date-picker-panel">
                  <DatePickerHead
                    date={startDateFormatter.value}
                    onDateRangeChange={dateRangeChange}
                  />
                  <DateTable list={startDateList.value} onDateHover={onDateHover} onDateChange={dateChange} />
                </div>
                <EDivider EDivider color='#eee'></EDivider>
                <div class="date-picker-panel">
                  <DatePickerHead
                    date={endDateFormatter.value}
                    onDateRangeChange={dateRangeChange}
                  />
                  <DateTable list={endDateList.value} onDateHover={onDateHover} onDateChange={dateChange} />
                </div>
              </div>
            </div>
          )
        }
        </Transition>
      </div>
    );
  },
});
