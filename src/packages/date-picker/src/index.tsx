import { defineComponent } from 'vue';
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

    return () => (
      <div>

      </div>

    );
  },
});
