import { defineComponent } from 'vue';
import useLocaleTransform from '../hooks/locale-transform';

export default defineComponent({
  name: 'DatePickerFooter',
  setup(_, { emit }) {
    const t = useLocaleTransform();
    const today = () => {
      emit('dateRangeChange', 'today');
    };
    return () => (
      <div class="date-picker-footer" onClick={today}>
        {t('datePicker.today')}
      </div>
    );
  }
});
