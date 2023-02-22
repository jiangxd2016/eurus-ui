import { defineComponent } from 'vue';
import useLocaleTransform from '@/packages/_hooks/localeTransform';
import { getPrefixCls } from '@/packages/_utils/global-config';

export default defineComponent({
  name: 'DatePickerFooter',
  emits: ['dateRangeChange'],
  setup(_, { emit }) {
    const prefixCls = getPrefixCls('date-picker-footer');
    const t = useLocaleTransform();
    const today = () => {
      emit('dateRangeChange', 'today');
    };
    return () => (
      <div class={prefixCls} role="button" tabindex={0} onClick={today}>
        {t('datePicker.today')}
      </div>
    );
  }
});
