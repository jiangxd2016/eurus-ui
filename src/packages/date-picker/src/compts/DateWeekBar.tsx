import { defineComponent } from 'vue';
import useLocaleTransform from '@/packages/_hooks/localeTransform';
import { getPrefixCls } from '@/packages/_utils/global-config';

export default defineComponent({
  name: 'DateWeekBar',
  setup() {

    const prefixCls = getPrefixCls('date-picker-week-bar');

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
      <thead class={prefixCls}>
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
