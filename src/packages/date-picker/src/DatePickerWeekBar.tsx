import { defineComponent } from 'vue';
import useLocaleTransform from '../hooks/locale-transform';

export default defineComponent({
  name: 'DatePickerWeekBar',
  setup() {

    const t = useLocaleTransform();
    const weekList = [
      t('datePicker.week.short.monday'),
      t('datePicker.week.short.tuesday'),
      t('datePicker.week.short.wednesday'),
      t('datePicker.week.short.thursday'),
      t('datePicker.week.short.friday'),
      t('datePicker.week.short.saturday'),
      t('datePicker.week.short.sunday')];

    return () => (
      <thead class="date-picker-week-bar">
        <tr>
          {
            weekList.map((item) => {
              return <th key={item}>{item}</th>;
            })
          }
        </tr>
      </thead>
    );
  }
});
