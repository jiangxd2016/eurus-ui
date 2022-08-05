import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import DatePickerWeekBar from './DatePickerWeekBar';
import DatePickerDayContent from './DatePickerDayContent';

const DateTableProps = {
  // 表格数据
  list: {
    type: Array as PropType<string[][]>,
    default() {
      return [];
    },
  },
};
export default defineComponent({
  name: 'DateTable',
  props: DateTableProps,
  setup(props, { emit }) {

    const dateChange = (date: any) => {
      emit('dateChange', date);
    };
    const dateHover = (date: any) => {
      emit('dateHover', date);
    };
    return () => (
      <div class="date-table">
        <table>
          <DatePickerWeekBar />
          <DatePickerDayContent
            list={props.list}
            onDateHover={dateHover}
            onDateChange={dateChange}
          />

        </table>
      </div>
    );
  }
});
