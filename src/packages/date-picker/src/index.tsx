import { defineComponent } from 'vue';
import useLocaleTransform from '../hooks/locale-transform';
import './style.scss';

const EDatePickerProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EDatePicker',
  props: EDatePickerProps,
  setup(props, { slots, emit }) {
    const t = useLocaleTransform();
    return () => (
      <div>
        {t('date-picker.today')}
      </div>

    );
  },
});
