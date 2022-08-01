import { defineComponent, onMounted, ref, Transition } from 'vue';
import './style.scss';
import { genarateDayData } from './utils';
import DatePickerHead from './DatePickerHead';
import DateTable from './DateTable';

const EDatePickerProps = {
  type: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default() {
      return new Date();
    },
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
    const currentDate = ref<string | Date>('');
    // 通过props传递的时间，组装成长度为42的数组,具体看utils文件下下面的这个方法
    const getDateList = () => {
      list.value = genarateDayData(curDate.value);
    };
    // 监听每个td时间项点击
    const dateChange = (date: Date) => {
      emit('dateChange', date);
      showDatePanel.value = false;
      currentDate.value = date;
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
      }
      getDateList();
    };

    onMounted(() => {
      getDateList();
    });

    const onInputClick = () => {

      showDatePanel.value = true;
    };

    return () => (
      <div>

        <div class="date-picker-wrap">

          <div class="date-editor" onClick={onInputClick}>
            <input
              v-model={currentDate.value}
              type="text"
              disabled
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
                <DateTable list={list} onDateChange={dateChange} />
              </div>
            )
          }
          </Transition>
        </div>
      </div>

    );
  },
});
