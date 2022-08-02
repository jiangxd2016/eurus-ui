import type { PropType } from 'vue';
import { defineComponent, onMounted, ref, Transition, } from 'vue';
import './style.scss';
import type { datePickerItem } from './utils';
import { genarateDayData } from './utils';
import DatePickerHead from './DatePickerHead';
import DateTable from './DateTable';
import DatePickerFooter from './DatePickerFooter';
import { dayjs } from '@/packages/_utils/date';
import EInput from '@/packages/input';
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
  date: {
    type: Date,
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
      return () => { };
    }
  },

};

export default defineComponent({
  name: 'EDatePicker',
  props: EDatePickerProps,
  setup(props, { slots, emit }) {

    // 用于控制面包显示与隐藏
    const showDatePanel = ref(false);
    // 表格数据
    const list = ref<any>([]);
    // 处理props时间为数组格式[年，月]
    const curDate = ref([props.date.getFullYear(), props.date.getMonth() + 1]);
    // 用户input显示时间
    const currentDate = ref<string>('');
    // 通过props传递的时间，组装成长度为42的数组,具体看utils文件下下面的这个方法
    const getDateList = () => {
      list.value = genarateDayData(curDate.value, props.disabledDate);
    };

    const setDateListActive = (date: string) => {
      list.value = list.value.map((i: datePickerItem[]) => {
        return i.map((j: datePickerItem) => {
          j.active = j.date === date;
          return j;
        });
      });
    };
    // 监听每个td时间项点击
    const dateChange = (date: string) => {
      emit('dateChange', date);
      showDatePanel.value = false;

      currentDate.value = date;

      setDateListActive(currentDate.value);

    };

    // 头部年月切换
    const dateRangeChange = (type: string) => {

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
        case 'today':
          curDate.value = [new Date().getFullYear(), new Date().getMonth() + 1];
          dateChange(dayjs().format('YYYY-MM-DD'));
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

    return () => (
      <div>

        <div class="date-picker-wrap">

          <div class="date-editor" onClick={onInputClick}>
            <EInput
              v-model={currentDate.value}
              type="text"
              disabled={props.disabled}
              placeholder="placeholder"
              class="date-edit-input"
            />
          </div>
          <Transition name="date-picker">{
            showDatePanel.value && (
              <div class="date-picker-panel">
                <DatePickerHead
                  date={curDate.value}
                  onDateRangeChange={dateRangeChange}
                />
                <DateTable list={list.value} onDateChange={dateChange} />
                <DatePickerFooter onDateRangeChange={dateRangeChange}></DatePickerFooter>
              </div>
            )
          }
          </Transition>
        </div>
      </div>

    );
  },
});
