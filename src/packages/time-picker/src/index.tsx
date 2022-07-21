import { defineComponent } from 'vue';
import './style.scss';

const ETimePickerProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'ETimePicker',
  props: ETimePickerProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
