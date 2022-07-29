import { defineComponent } from 'vue';
import Icon from '../../icons';
const pickerHeadProps = {
  // 时间
  date: {
    type: Array,
    default() {
      return [new Date().getFullYear(), new Date().getMonth() + 1];
    },
  },
};

export default defineComponent({
  name: 'DatePickerHead',
  props: pickerHeadProps,
  setup(props, { emit }) {
    const toggleDate = (type: any) => {
      emit('dateRangeChange', type);
    };
    return () => (
      <div class="date-picker-head">
        <div class="arrow-left">
          <Icon name="doubleLeft" size="16" class="arrow" onClick={()=>toggleDate('lastYear')}></Icon>
          <Icon name="chevronLeft" size="16" class="arrow" onClick={()=>toggleDate('lastMonth')}></Icon>
        </div>
        <div class="date-content">{props.date[0] + '-' + props.date[1] }</div>
        <div class="arrow-right">
          <Icon name="chevronRight" size="16" class="arrow" onClick={()=>toggleDate('nextYear')}></Icon>
        <Icon name="doubleRight" size="16" class="arrow" onClick={()=>toggleDate('nextMonth')}></Icon>

        </div>
      </div>
    );
  }
});
