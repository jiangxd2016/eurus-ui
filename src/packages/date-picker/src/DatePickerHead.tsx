import { defineComponent } from 'vue';

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
    const toogleDate = (type: any) => {
      emit('dateRangeChange', type);
    };
    return () => (
      <div class="date-picker-head">
        <div class="arrow-left">
          <span class="last-year arrow" onClick={()=>toogleDate('lastYear')}>&lt;&lt;&lt;</span>
          <span class="last-month arrow" onClick={()=>toogleDate('lastMonth')}>&lt;&lt;</span>
        </div>
        <div class="date-content">{props.date[0] + '年' + props.date[1] + '月'}</div>
        <div class="arrow-right">
          <span class="next-month arrow" onClick={()=>toogleDate('nextMonth')}>&gt;</span>
          <span class="next-year arrow" onClick={()=>toogleDate('nextYear')}>&lt;&lt;</span>
        </div>
      </div>
    );
  }
});
