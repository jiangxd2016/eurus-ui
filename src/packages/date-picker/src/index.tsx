import { defineComponent, onMounted, provide, reactive, ref, watchEffect } from 'vue';
import './style.scss';
import useLocaleTransform from '../hooks/locale-transform';
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
    const t = useLocaleTransform();

    // 用于控制面包显示与隐藏
    const showDatePannel = ref(false);
    // 表格数据
    let list: any = reactive([]);
    // 处理props时间为数组格式[年，月]
    let curDate = reactive([props.date.getFullYear(), props.date.getMonth() + 1]);
    // 用户input显示时间
    const currentDate = ref<string | Date>('');
    // 通过props传递的时间，组装成长度为42的数组,具体看utils文件下下面的这个方法
    const getDateList = () => {
      list = genarateDayData(curDate);
    };
    // 监听每个td时间项点击
    const dateChange = (date: Date) => {
      emit('dateChange', date);
      showDatePannel.value = false;
      currentDate.value = date;
    };
    // 头部年月切换
    const dateRangeChange = (type: any) => {
      switch (type) {
        // 上一年点击
        case 'lastYear':
          curDate = [curDate[0] - 1, curDate[1]];
          break;
        // 上一月点击（月份<1,就要返回到上一年的12月份）
        case 'lastMonth':
          curDate = [
            curDate[1] - 1 <= 0 ? curDate[0] - 1 : curDate[0],
            curDate[1] - 1 <= 0 ? 12 : curDate[1] - 1,
          ];
          break;
        // 下一年点击
        case 'nextYear':
          curDate = [curDate[0] + 1, curDate[1]];
          break;
        case 'nextMonth':
          // 下一月点击（月份>12,就要到下一年的一月份）
          curDate = [
            curDate[1] + 1 > 12 ? curDate[0] + 1 : curDate[0],
            curDate[1] + 1 > 12 ? 1 : curDate[1] + 1,
          ];
          break;
      }
      getDateList();
    };

    onMounted(() => {
      getDateList();
    });

    const onInputClick = () => {

      showDatePannel.value = true;
    };

    watchEffect(() => {
      provide('list', list);
    });

    return () => (
      <div>
        {t('date-picker.today')}

        <div class="date-picker-wrap">

          <div class="date-eidtor" onClick={onInputClick}>
            <input
              v-model={currentDate.value}
              type="text"
              disabled
              placeholder="placeholder"
              class="date-edit-input"
            />
          </div>
          <transition name="date-picker">{
            showDatePannel.value && (
              <div class="date-pocker-panel">
                <DatePickerHead
                  date={curDate}
                  onDateRangeChange={dateRangeChange}
                />
                <DateTable onDateChange={dateChange} />
              </div>
            )
          }
          </transition>
        </div>
      </div>

    );
  },
});
