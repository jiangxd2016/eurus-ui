import { defineComponent, ref } from 'vue';

import { weekList as _weekList } from './utils';
export default defineComponent({
  name: 'DatePickerWeekBar',
  setup() {
    const weekList = ref(_weekList);
    return () => (
      <thead class="date-picker-week-bar">
        <tr>
          {
            weekList.value.map((item) => {

              return <th v-for="item in weekList" key={item}>{item}</th>;
            })
          }
        </tr>
      </thead>
    );
  }
});
