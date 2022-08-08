import type { PropType, Ref } from 'vue';
import { nextTick, defineComponent, onMounted, ref, Transition, } from 'vue';
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
  setup(props, { slots, emit }) {

    // 用于控制面包显示与隐藏
    const showDatePanel = ref(false);
    // 表格数据
    const startDateList = ref<any>([]);
    const endDateList = ref<any>([]);
    // 处理props时间为数组格式[年，月]
    const [startDate, endDate] = props.modelValue?.length ? props.modelValue : [dayjs().format('YYYY-MM'), dayjs().year() + '' + (dayjs().month() + 2) + ''];
    const startDateFormatter = ref([dayjs(startDate).year(), dayjs(startDate).month() + 1]);
    const endDateFormatter = ref([dayjs(endDate).year(), dayjs(endDate).month() + 1]);
    // 用户input显示时间
    const currentDate = ref<string[]>([]);
    // 通过props传递的时间，组装成长度为42的数组,具体看utils文件下下面的这个方法
    const getDateList = () => {
      startDateList.value = genarateDayData(startDateFormatter.value, props.disabledDate);
      endDateList.value = genarateDayData(endDateFormatter.value, props.disabledDate);
    };

    const pickerFocus = ref(false);
    const setDateListActive = (date: string, list: Ref<any[]>) => {
      list.value = list.value.map((i: datePickerItem[]) => {
        return i.map((j: datePickerItem) => {
          j.active = j.date === date;
          return j;
        });
      });
    };
    const setDateListHover = (date: string, list: Ref<any[]>) => {
      list.value = list.value.map((i: datePickerItem[]) => {
        return i.map((j: datePickerItem) => {
          // .add(1, 'day')
          j.hover = dayjs(j.date).isBetween(dayjs(currentDate.value[0]), dayjs(date));
          return j;
        });
      });

    };
    const isSelectTwo = () => {
      // console.log(currentDate);

      if (currentDate.value[0] && currentDate.value[1]) {
        showDatePanel.value = false;
      }
    };

    // 监听每个td时间项点击
    const dateStartChange = (date: string) => {
      emit('dateChange', date);
      currentDate.value[0] = date;
      setDateListActive(date, startDateList);

      nextTick(() => {
        isSelectTwo();

      });
    };
    const dateEndChange = (date: string) => {
      emit('dateChange', date);
      currentDate.value[1] = date;
      setDateListActive(date, endDateList);
      nextTick(() => {
        isSelectTwo();

      });

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

    // currentDate 是否只选择了，且只选择了一个
    const isSelectDateOne = () => {
      const [start, end] = currentDate.value;
      return (start || end) && !(start && end);
    };

    const onDateHover = (date: string) => {
      if (isSelectDateOne()) {
        setDateListHover(date, startDateList);
        setDateListHover(date, endDateList);
      }
    };
    return () => (
      <div>

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
                    <DateTable list={startDateList.value} onDateHover={onDateHover} onDateChange={dateStartChange} />
                  </div>
                  <EDivider EDivider color='#eee'></EDivider>
                  <div class="date-picker-panel">
                    <DatePickerHead
                      date={endDateFormatter.value}
                      onDateRangeChange={dateRangeChange}
                    />
                    <DateTable list={endDateList.value} onDateHover={onDateHover} onDateChange={dateEndChange} />
                  </div>
                </div>
              </div>
            )
          }
          </Transition>
        </div>
      </div>

    );
  },
});
